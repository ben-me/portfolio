import { mountSuspended } from "@nuxt/test-utils/runtime";
import { flushPromises } from "@vue/test-utils";

import ContactPage from "../../app/pages/contact/index.vue";
import { useNotificationsStore } from "../../app/store/notifications";

// emailjs is the only real side effect of handleSubmit — stub it so we can
// assert when it is (and isn't) called and drive both success/failure paths.
const { sendForm } = vi.hoisted(() => ({ sendForm: vi.fn() }));
vi.mock("@emailjs/browser", () => ({ default: { sendForm } }));

const validInput = {
  name: "John",
  email: "john@example.com",
  phone: "+1234567890",
  subject: "Hello",
  description: "This is a long enough message",
};

async function fillForm(wrapper: Awaited<ReturnType<typeof mountSuspended>>, data: Record<string, string> = validInput) {
  for (const [key, value] of Object.entries(data)) {
    await wrapper.find(`#${key}`).setValue(value);
  }
}

describe("contact form handleSubmit", () => {
  beforeEach(() => {
    sendForm.mockReset();
    sendForm.mockResolvedValue({ status: 200, text: "OK" });
    useNotificationsStore().active = [];
  });

  it("blocks sending and surfaces field errors when the form is empty", async () => {
    const wrapper = await mountSuspended(ContactPage);

    await wrapper.find("form").trigger("submit");
    await flushPromises();

    expect(sendForm).not.toHaveBeenCalled();
    expect(wrapper.find("#name-error").exists()).toBe(true);
    expect(wrapper.find("#email-error").exists()).toBe(true);
    expect(useNotificationsStore().active).toHaveLength(0);
  });

  it("sends the email, clears the form and pushes a success notification on valid input", async () => {
    const wrapper = await mountSuspended(ContactPage);
    const store = useNotificationsStore();

    await fillForm(wrapper);
    await wrapper.find("form").trigger("submit");
    await flushPromises();

    expect(sendForm).toHaveBeenCalledTimes(1);
    expect(store.active.at(-1)?.status).toBe("success");
    expect((wrapper.find("#name").element as HTMLInputElement).value).toBe("");
    expect((wrapper.find("#description").element as HTMLTextAreaElement).value).toBe("");
  });

  it("pushes an error notification and re-enables the button when sending fails", async () => {
    sendForm.mockRejectedValueOnce(new Error("network down"));
    const wrapper = await mountSuspended(ContactPage);
    const store = useNotificationsStore();

    await fillForm(wrapper);
    await wrapper.find("form").trigger("submit");
    await flushPromises();

    expect(store.active.at(-1)?.status).toBe("error");
    expect((wrapper.find("button").element as HTMLButtonElement).disabled).toBe(false);
  });

  it("shows the subject's own validation message in the subject error slot", async () => {
    const wrapper = await mountSuspended(ContactPage);

    // Everything valid except the subject -> only the subject error should appear.
    await fillForm(wrapper, { ...validInput, subject: "" });
    await wrapper.find("form").trigger("submit");
    await flushPromises();

    const subjectError = wrapper.find("#subject-error");
    expect(subjectError.exists()).toBe(true);
    expect(subjectError.text().length).toBeGreaterThan(0);
  });
});

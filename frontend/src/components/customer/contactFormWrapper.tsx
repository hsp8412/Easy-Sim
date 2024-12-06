"use client";

import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";
import ContactForm from "./contactForm";

const ContactFormWrapper = () => {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!recaptchaKey) {
    return (
      <div className="text-red-500 font-bold text-lg">
        Error: Recaptcha key not found.
      </div>
    );
  }
  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <ContactForm />
    </GoogleReCaptchaProvider>
  );
};

export default ContactFormWrapper;

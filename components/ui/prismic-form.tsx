"use client";
import { verifyCaptcha } from "@/features/recaptcha/verifyCaptcha";
import Image from "next/image";
import { Input } from "./input";
import { useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/utils";
import { Textarea } from "./textarea";

const CAPTCHA_PUBLIC_KEY = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_PUBLIC_KEY;

function send(formData: FormData) {
  return Promise.resolve({ ok: true });
}

export const PrismicFormComponent = ({ formType, fields, title, preamble, submitText, submittingText, submittedText }: { formType: string; fields: { type: string; text?: string; label: string; name: string; required: boolean; options: { value: string; label: string; image: { url: string; alt: string } }[] }[]; title: string; preamble: string; submitText: string; submittingText: string; submittedText: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (formData: FormData) => {
    if (!executeRecaptcha) {
      console.warn("Recaptcha not initialized yet.");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await executeRecaptcha("submit");
      const { success, message } = await verifyCaptcha(token);

      if (success) {
        // Handle successful submission
        await send(formData).then((result: { ok: boolean }) => {
          if (result.ok) {
            setIsSubmitted(true);
          }
        });
      } else {
        // Handle reCAPTCHA failure
        console.warn("[next/captcha]: ", message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      // Handle form submission error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex w-[768px] max-w-full flex-col">
      {title && <h2 className="mb-2 text-4xl font-[550] font-semibold lg:text-3xl">{title}</h2>}
      {preamble && <p className="mb-4 text-base">{preamble}</p>}

      <form action={handleSubmit} className="mx-auto flex w-[768px] max-w-full flex-col space-y-3">
        {fields.map((field: { type: string; text?: string; label: string; name: string; required: boolean; options: { value: string; label: string; image: { url: string; alt: string } }[] }, index: number) => {
          switch (field.type) {
            case "form_input":
              return (
                <div key={index}>
                  {field.label && (
                    <label className="font-semibold" htmlFor={field.name}>
                      {field.label}
                    </label>
                  )}
                  <Input {...field} id={field.name} name={field.name} required={!!field.required} />
                </div>
              );

            case "form_textarea":
              return (
                <div key={index}>
                  {field.label && (
                    <label className="font-semibold" htmlFor={field.name}>
                      {field.label}
                    </label>
                  )}
                  <Textarea {...field} id={field.name} name={field.name} />
                </div>
              );

            case "form_options":
              return (
                <div key={index}>
                  {field.label && <label className="font-semibold">{field.label}</label>}
                  {field.text && <p>{field.text}</p>}
                  <div className="flex w-full flex-col">
                    {field.options.map((option, optIndex) => (
                      <div
                        className={cn(
                          "ui-border flex flex-row items-center justify-center p-2",
                          option.value === "payment" ? "border-black" : "border-gray-200"
                        )}
                        key={optIndex}>
                        <Input className="hidden" type="radio" id={option.value} name={field.name} value={option.value} />
                        {option.image && (
                          <Image src={option.image.url} alt={option.image.alt} className="h-8 w-8" width={50} height={50} />
                        )}
                        <span>{option.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );

            default:
              return null;
          }
        })}

        <Button className="mt-2" color="primary" variant="default" size="lg" type="submit" disabled={isSubmitted}>
          {isSubmitted ? "Skickat!" : isSubmitting ? "Skickar..." : submitText ?? "Skicka förfrågan"}
        </Button>
      </form>
    </div>
  );
};

export const PrismicForm = (props) => (
  <GoogleReCaptchaProvider reCaptchaKey={CAPTCHA_PUBLIC_KEY ?? ""}>
    <PrismicFormComponent {...props} />
  </GoogleReCaptchaProvider>
);

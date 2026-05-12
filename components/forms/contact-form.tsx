"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type FieldName = "inquiryType" | "company" | "name" | "email" | "phone" | "message" | "robotVerified";

const REQUIRED_FIELDS: FieldName[] = ["inquiryType", "company", "name", "email", "phone", "message"];
const RECAPTCHA_SCRIPT_SRC = "https://www.recaptcha.net/recaptcha/api.js?render=explicit";

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        parameters: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
        },
      ) => number;
      ready?: (callback: () => void) => void;
      reset: (widgetId?: number) => void;
    };
  }
}

export function ContactForm({
  locale,
}: {
  locale: string;
}) {
  const [status, setStatus] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [captchaSiteKey, setCaptchaSiteKey] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaRendered, setCaptchaRendered] = useState(false);
  const [captchaLoadFailed, setCaptchaLoadFailed] = useState(false);
  const captchaContainerRef = useRef<HTMLDivElement | null>(null);
  const captchaWidgetIdRef = useRef<number | null>(null);
  const isKo = locale === "ko";
  const requiredErrorMessage = isKo ? "\uD544\uC218 \uC785\uB825 \uAC12\uC785\uB2C8\uB2E4" : "This field is required.";
  const robotErrorMessage = isKo ? "\uB85C\uBD07\uC774 \uC544\uB2D8\uC744 \uD655\uC778\uD574 \uC8FC\uC138\uC694." : "Please complete the reCAPTCHA verification.";

  useEffect(() => {
    let active = true;

    async function loadSiteKey() {
      const response = await fetch("/api/contact/recaptcha-site-key");
      const data = (await response.json()) as { siteKey?: string };

      if (active && data.siteKey) {
        setCaptchaSiteKey(data.siteKey);
      }
    }

    loadSiteKey().catch(() => {
      if (active) {
        setCaptchaSiteKey("");
      }
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!captchaSiteKey || !captchaContainerRef.current || captchaWidgetIdRef.current !== null) {
      return;
    }

    let disposed = false;
    let retryCount = 0;
    let retryTimer: number | null = null;
    setCaptchaLoadFailed(false);

    function renderCaptcha() {
      if (disposed || captchaWidgetIdRef.current !== null) {
        return;
      }

      if (!window.grecaptcha || typeof window.grecaptcha.render !== "function" || !captchaContainerRef.current) {
        if (retryCount < 20) {
          retryCount += 1;
          retryTimer = window.setTimeout(renderCaptcha, 250);
        } else {
          setCaptchaLoadFailed(true);
        }
        return;
      }

      const doRender = () => {
        if (disposed || !window.grecaptcha || !captchaContainerRef.current || captchaWidgetIdRef.current !== null) {
          return;
        }

        try {
          captchaWidgetIdRef.current = window.grecaptcha.render(captchaContainerRef.current, {
            sitekey: captchaSiteKey,
            callback: (token) => {
              setCaptchaToken(token);
              clearFieldError("robotVerified");
            },
            "expired-callback": () => setCaptchaToken(""),
            "error-callback": () => setCaptchaToken(""),
          });
          setCaptchaRendered(true);
        } catch {
          setCaptchaLoadFailed(true);
        }
      };

      if (typeof window.grecaptcha.ready === "function") {
        window.grecaptcha.ready(doRender);
      } else {
        doRender();
      }
    }

    if (window.grecaptcha) {
      renderCaptcha();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${RECAPTCHA_SCRIPT_SRC}"]`);
    const script = existingScript ?? document.createElement("script");
    const handleScriptError = () => setCaptchaLoadFailed(true);

    script.src = RECAPTCHA_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", renderCaptcha);
    script.addEventListener("error", handleScriptError);

    if (!existingScript) {
      document.head.appendChild(script);
    }

    return () => {
      disposed = true;
      if (retryTimer) {
        window.clearTimeout(retryTimer);
      }
      script.removeEventListener("load", renderCaptcha);
      script.removeEventListener("error", handleScriptError);
    };
  }, [captchaSiteKey]);

  function validateForm(formData: FormData) {
    const nextErrors: Partial<Record<FieldName, string>> = {};

    for (const field of REQUIRED_FIELDS) {
      const value = formData.get(field);
      if (typeof value !== "string" || value.trim().length === 0) {
        nextErrors[field] = requiredErrorMessage;
      }
    }

    if (!captchaToken) {
      nextErrors.robotVerified = robotErrorMessage;
    }

    return nextErrors;
  }

  function clearFieldError(field: FieldName) {
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("");

    const formData = new FormData(form);
    const nextErrors = validateForm(formData);

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          inquiryType: formData.get("inquiryType"),
          company: formData.get("company"),
          position: formData.get("position"),
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
          recaptchaToken: captchaToken,
          locale,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = (await response.json()) as { message?: string; error?: string };
      setStatus(data.message ?? data.error ?? "");
      if (response.ok) {
        form.reset();
        setCaptchaToken("");
        if (window.grecaptcha && captchaWidgetIdRef.current !== null) {
          window.grecaptcha.reset(captchaWidgetIdRef.current);
        }
        window.setTimeout(() => {
          window.location.reload();
        }, 1200);
      }
    } catch {
      setStatus(isKo ? "\uBB38\uC758 \uC811\uC218\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4." : "Unable to submit the inquiry.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="contactForm" noValidate>
      <div className="contactFormGrid">
        <div className="field">
          <label htmlFor="inquiryType" className="contactFormLabel isRequired">
            {isKo ? "\uBB38\uC758\uC720\uD615" : "Inquiry Type"}
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            defaultValue=""
            aria-invalid={fieldErrors.inquiryType ? "true" : "false"}
            onChange={() => clearFieldError("inquiryType")}
          >
            <option value="" disabled>
              {isKo ? "\uC120\uD0DD\uD574 \uC8FC\uC138\uC694" : "Please select"}
            </option>
            <option value="Sales">Sales</option>
            <option value="Service">Service</option>
          </select>
          {fieldErrors.inquiryType ? <p className="contactFormError">{fieldErrors.inquiryType}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="company" className="contactFormLabel isRequired">
            {isKo ? "\uD68C\uC0AC\uBA85" : "Company"}
          </label>
          <input
            id="company"
            name="company"
            aria-invalid={fieldErrors.company ? "true" : "false"}
            onChange={() => clearFieldError("company")}
          />
          {fieldErrors.company ? <p className="contactFormError">{fieldErrors.company}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="name" className="contactFormLabel isRequired">
            {isKo ? "\uB2F4\uB2F9\uC790\uBA85" : "Name"}
          </label>
          <input
            id="name"
            name="name"
            aria-invalid={fieldErrors.name ? "true" : "false"}
            onChange={() => clearFieldError("name")}
          />
          {fieldErrors.name ? <p className="contactFormError">{fieldErrors.name}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="position" className="contactFormLabel">
            {isKo ? "\uC9C1\uCC45" : "Position"}
          </label>
          <input id="position" name="position" />
        </div>
        <div className="field">
          <label htmlFor="email" className="contactFormLabel isRequired">
            {isKo ? "\uC774\uBA54\uC77C" : "Email"}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            aria-invalid={fieldErrors.email ? "true" : "false"}
            onChange={() => clearFieldError("email")}
          />
          {fieldErrors.email ? <p className="contactFormError">{fieldErrors.email}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="phone" className="contactFormLabel isRequired">
            {isKo ? "\uC5F0\uB77D\uCC98" : "Phone"}
          </label>
          <input
            id="phone"
            name="phone"
            aria-invalid={fieldErrors.phone ? "true" : "false"}
            onChange={() => clearFieldError("phone")}
          />
          {fieldErrors.phone ? <p className="contactFormError">{fieldErrors.phone}</p> : null}
        </div>
      </div>
      <div className="field">
        <label htmlFor="message" className="contactFormLabel isRequired">
          {isKo ? "\uBB38\uC758 \uB0B4\uC6A9" : "Message"}
        </label>
        <textarea
          id="message"
          name="message"
          aria-invalid={fieldErrors.message ? "true" : "false"}
          onChange={() => clearFieldError("message")}
        />
        {fieldErrors.message ? <p className="contactFormError">{fieldErrors.message}</p> : null}
      </div>
      <div className="contactRobotCheck">
        <div ref={captchaContainerRef} className="contactRecaptchaWidget" />
        {!captchaSiteKey || (!captchaRendered && !captchaLoadFailed) ? (
          <span>{isKo ? "\uBCF4\uC548 \uC778\uC99D\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\uC785\uB2C8\uB2E4." : "Loading security verification."}</span>
        ) : null}
        {captchaLoadFailed ? (
          <p className="contactFormError">
            {isKo
              ? "\uBCF4\uC548 \uC778\uC99D\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uD398\uC774\uC9C0\uB97C \uC0C8\uB85C\uACE0\uCE68\uD574 \uC8FC\uC138\uC694."
              : "Security verification could not be loaded. Please refresh the page."}
          </p>
        ) : null}
        {fieldErrors.robotVerified ? <p className="contactFormError">{fieldErrors.robotVerified}</p> : null}
      </div>
      <button className="button primary" disabled={submitting} type="submit">
        {submitting
          ? isKo
            ? "\uC804\uC1A1 \uC911..."
            : "Sending..."
          : isKo
            ? "\uBB38\uC758\uD558\uAE30"
            : "Send Inquiry"}
      </button>
      {status ? <p className="contactFormStatus">{status}</p> : null}
    </form>
  );
}

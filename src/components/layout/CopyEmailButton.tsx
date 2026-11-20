"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { copyTextToClipboard } from "@/lib/clipboard";

interface CopyEmailButtonProps {
  email: string;
}

type CopyStatus = "idle" | "copied" | "error";

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    const ok = await copyTextToClipboard(email);
    setStatus(ok ? "copied" : "error");

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setStatus("idle");
      timerRef.current = null;
    }, 2200);
  };

  const label =
    status === "copied"
      ? "Copied"
      : status === "error"
        ? "Copy failed"
        : "Copy email";

  const announcement =
    status === "copied"
      ? `${email} copied to clipboard.`
      : status === "error"
        ? `Could not copy ${email} to clipboard.`
        : "";

  return (
    <>
      <button type="button" onClick={handleCopy} className="btn-secondary">
        <span className="relative inline-flex h-4 w-4 items-center justify-center">
          <span
            className={`absolute inset-0 inline-flex items-center justify-center transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none ${
              status === "idle"
                ? "scale-100 opacity-100"
                : "scale-75 opacity-0"
            }`}
          >
            <Copy size={16} aria-hidden="true" />
          </span>
          <span
            className={`absolute inset-0 inline-flex items-center justify-center transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none ${
              status === "copied"
                ? "scale-100 opacity-100"
                : "scale-75 opacity-0"
            }`}
          >
            <Check size={16} className="text-accent" aria-hidden="true" />
          </span>
          <span
            className={`absolute inset-0 inline-flex items-center justify-center transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none ${
              status === "error"
                ? "scale-100 opacity-100"
                : "scale-75 opacity-0"
            }`}
          >
            <AlertCircle
              size={16}
              className="text-rose-400"
              aria-hidden="true"
            />
          </span>
        </span>
        <span>{label}</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {announcement}
      </span>
    </>
  );
}

"use client";

import { useState } from "react";
import { InputMask } from "primereact/inputmask";

type PhoneInputProps = {
  id: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
};

function nationalNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  return (
    value.trim().startsWith("+998") ||
    (digits.startsWith("998") && digits.length > 9)
      ? digits.slice(3)
      : digits
  ).slice(0, 9);
}

export default function PhoneInput({
  id,
  name,
  defaultValue = "",
  disabled = false,
}: PhoneInputProps) {
  const [value, setValue] = useState(() => nationalNumber(defaultValue));

  return (
    <div className="mt-2 flex min-h-[52px] items-center rounded-xl border border-[#8da39530] bg-[var(--mini-bg)] px-4 focus-within:border-[var(--mini-accent)]">
      <span
        className="shrink-0 border-r border-[#8da39530] pr-3 text-[16px]"
        aria-hidden="true"
      >
        +998
      </span>
      <InputMask
        id={id}
        value={value}
        onChange={(event) => setValue(event.value ?? "")}
        onPasteCapture={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setValue(nationalNumber(event.clipboardData.getData("text")));
        }}
        mask="99 999 99 99"
        unmask
        autoClear={false}
        required
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        disabled={disabled}
        pattern="[0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}"
        title="+998 dan keyingi 9 ta raqamni kiriting."
        placeholder="90 123 45 67"
        unstyled
        className="min-h-[50px] w-full min-w-0 bg-transparent pl-3 text-[16px] text-[var(--mini-text)] outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
      <input
        type="hidden"
        name={name}
        value={`+998${value.replace(/\D/g, "")}`}
        disabled={disabled}
      />
    </div>
  );
}

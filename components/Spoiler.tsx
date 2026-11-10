"use client";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";

export default function Spoiler({ children, label = "Revelar spoiler" }: { children: React.ReactNode; label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative block">
      <span
        className={`block transition-[filter,opacity] duration-700 ${open ? "opacity-100 blur-0" : "select-none opacity-60 blur-[7px]"}`}
        aria-hidden={!open}
      >
        {children}
      </span>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="press absolute inset-0 m-auto flex h-11 w-fit items-center gap-2 rounded-full border border-blood/60 bg-ink/90 px-5 text-sm text-paper transition-colors duration-200 hover:bg-blood"
        >
          <EyeOff size={16} aria-hidden />
          {label}
        </button>
      )}
      {open && (
        <span className="mt-2 inline-flex items-center gap-1.5 font-type text-[11px] text-smoke">
          <Eye size={12} aria-hidden /> Spoiler revelado
        </span>
      )}
    </span>
  );
}

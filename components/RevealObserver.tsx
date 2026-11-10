"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Acende (classe "in") os elementos marcados quando entram na tela, uma vez só.
export default function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );
    const scan = () =>
      document.querySelectorAll(".reveal:not(.in), .redact:not(.in), .draw:not(.in), [data-io]:not(.in)").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);
  return null;
}

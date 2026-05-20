"use client";
import { useEffect, useState } from "react";
import { whatsappUrl, WHATSAPP_DEFAULT_MSG } from "@/lib/constants";

export default function WhatsAppFab() {
  const [show, setShow] = useState(false);
  const [tip, setTip] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!show) return;
    const t1 = window.setTimeout(() => setTip(true), 1200);
    const t2 = window.setTimeout(() => setTip(false), 5200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [show]);

  if (!show) return null;

  return (
    <a
      href={whatsappUrl(WHATSAPP_DEFAULT_MSG)}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
    >
      <span
        className={`hidden sm:block bg-white text-navy text-sm font-semibold px-4 py-2 rounded-full shadow-coastal transition-all duration-300 ${
          tip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        Reserve pelo WhatsApp
      </span>
      <span className="bg-[#25D366] text-white w-14 h-14 rounded-full ring-4 ring-white shadow-coastal-lg flex items-center justify-center transition-transform group-hover:scale-110 group-active:scale-95">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.402 0 6.556-5.332 11.891-11.891 11.891-2.01 0-3.987-.51-5.742-1.47l-6.154 1.69zm6.33-4.043c1.554.921 3.22 1.408 4.935 1.408 5.281 0 9.578-4.297 9.578-9.578 0-2.559-1.002-4.965-2.822-6.786-1.821-1.821-4.225-2.819-6.756-2.819-5.281 0-9.578 4.297-9.578 9.578 0 1.83.518 3.619 1.498 5.163l-.986 3.601 3.731-.969zm8.561-5.541c-.273-.136-1.614-.796-1.863-.887-.25-.091-.432-.136-.614.136-.182.273-.705.887-.864 1.068-.159.182-.318.204-.591.068-.273-.136-1.152-.424-2.195-1.353-.811-.724-1.358-1.618-1.517-1.891-.159-.273-.017-.42.12-.555.123-.122.273-.318.409-.477.136-.159.182-.273.273-.455.091-.182.045-.341-.023-.477-.068-.136-.614-1.477-.841-2.023-.222-.53-.446-.458-.614-.467l-.523-.011c-.182 0-.477.068-.727.341-.25.273-.955.932-.955 2.273 0 1.341.977 2.636 1.114 2.818.136.182 1.922 2.936 4.656 4.114.65.28 1.157.447 1.551.572.653.208 1.247.179 1.717.109.524-.078 1.614-.659 1.841-1.295.227-.636.227-1.182.159-1.295-.068-.113-.25-.182-.523-.318z" />
        </svg>
      </span>
    </a>
  );
}

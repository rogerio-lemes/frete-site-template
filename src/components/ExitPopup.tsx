import { useEffect, useRef, useState } from "react";
import { X, MessageCircle, Phone } from "lucide-react";
import { trackClick } from "@/hooks/use-tracking";
import { EMPRESA } from "@/config/empresa";

const WA_LINK = `https://wa.me/${EMPRESA.telefoneRaw}?text=${encodeURIComponent(EMPRESA.waMensagemPadrao)}`;
const STORAGE_KEY = "ef_exit_popup_v1";

export function ExitPopup() {
  const [open, setOpen] = useState(false);
  const shownRef = useRef(false);

  const wasShown = () => {
    try { return sessionStorage.getItem(STORAGE_KEY) === "1"; } catch { return false; }
  };
  const markShown = () => {
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch { /* noop */ }
  };

  const show = () => {
    if (shownRef.current || wasShown()) return;
    shownRef.current = true;
    markShown();
    setOpen(true);
  };

  const close = () => setOpen(false);

  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (!isMobile) {
      const onLeave = (e: MouseEvent) => { if (e.clientY <= 8) show(); };
      document.addEventListener("mouseleave", onLeave);
      return () => document.removeEventListener("mouseleave", onLeave);
    }
    const t = window.setTimeout(show, 35000);
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0 && window.scrollY / h >= 0.65) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={close}
    >
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[image:var(--gradient-hero)] px-6 py-5 text-center">
          <p className="text-white/80 text-sm font-medium">Espera! Antes de sair…</p>
          <h2 className="text-white font-bold text-xl mt-1 leading-snug">
            Precisa de frete em Uberlândia?
          </h2>
          <p className="text-white/75 text-sm mt-1">Fale agora, resposta em minutos 🚛</p>
        </div>

        <button
          onClick={close}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Botões */}
        <div className="px-6 py-5 space-y-3">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener"
            onClick={() => { trackClick("exit_popup_whatsapp", WA_LINK); close(); }}
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:brightness-110 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md"
          >
            <MessageCircle className="w-5 h-5" /> Chamar no WhatsApp
          </a>

          <a
            href={`tel:+${EMPRESA.telefoneRaw}`}
            onClick={() => { trackClick("exit_popup_telefone"); close(); }}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:brightness-110 active:scale-[0.98] text-primary-foreground font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md"
          >
            <Phone className="w-5 h-5" /> {EMPRESA.telefone}
          </a>

          <button
            onClick={close}
            className="w-full text-center text-xs text-gray-400 hover:text-gray-600 pt-1 transition-colors"
          >
            Não, obrigado
          </button>
        </div>
      </div>
    </div>
  );
}

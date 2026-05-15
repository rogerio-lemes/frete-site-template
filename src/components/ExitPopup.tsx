import { useEffect, useRef, useState } from "react";
import { X, MessageCircle, MapPin, Star, ShieldCheck, Zap } from "lucide-react";
import { saveLead, trackClick } from "@/hooks/use-tracking";

const WA_NUMBER = "5534991412518";
const STORAGE_KEY = "ef_exit_popup_v1";

const SERVICOS = [
  "Frete pequeno",
  "Pequena mudança",
  "Transporte de móveis",
  "Retirada em loja",
  "Entrega urgente",
  "Outro",
];

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function trackEvent(name: string, payload?: Record<string, unknown>) {
  try {
    const w = window as unknown as { dataLayer?: unknown[] };
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: name, ...(payload || {}) });
    }
  } catch {
    /* noop */
  }
}

export function ExitPopup() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState({
    nome: "",
    whatsapp: "",
    bairroRetirada: "",
    bairroEntrega: "",
    tipoServico: "",
  });
  const shownRef = useRef(false);

  const wasShown = () => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  };
  const markShown = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* noop */
    }
  };

  const show = () => {
    if (shownRef.current || wasShown()) return;
    shownRef.current = true;
    markShown();
    setOpen(true);
    trackEvent("exit_popup_view");
  };

  const close = (reason: string) => {
    setOpen(false);
    trackEvent("exit_popup_close", { reason });
  };

  // Triggers
  useEffect(() => {
    const isMobile =
      typeof window !== "undefined" &&
      /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

    if (!isMobile) {
      const onMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 8) show();
      };
      document.addEventListener("mouseleave", onMouseLeave);
      return () => document.removeEventListener("mouseleave", onMouseLeave);
    }

    // Mobile: tempo + scroll
    const t = window.setTimeout(show, 35000);
    const onScroll = () => {
      const h =
        document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0 && window.scrollY / h >= 0.6) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // ESC para fechar
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close("esc");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const nome = data.nome.trim();
    const whatsapp = data.whatsapp.trim();
    const ret = data.bairroRetirada.trim();
    const ent = data.bairroEntrega.trim();
    const tipo = data.tipoServico.trim() || "Não informado";

    if (!nome || nome.length < 2) return setError("Informe seu nome.");
    const digits = whatsapp.replace(/\D/g, "");
    if (digits.length < 10) return setError("Informe um WhatsApp válido.");
    if (!ret) return setError("Informe o bairro de retirada.");
    if (!ent) return setError("Informe o bairro de entrega.");

    setSubmitting(true);

    const obs = `Retirada: ${ret} | Entrega: ${ent} | Serviço: ${tipo}`;
    try {
      await saveLead({
        nome,
        telefone: digits,
        origem: "exit_popup",
        observacoes: obs,
      });
    } catch {
      /* segue mesmo se falhar */
    }

    trackEvent("exit_popup_submit", { tipo });

    const msg =
      `Olá, quero solicitar um orçamento de frete.\n\n` +
      `Nome: ${nome}\n` +
      `WhatsApp: ${whatsapp}\n` +
      `Retirada: ${ret}\n` +
      `Entrega: ${ent}\n` +
      `Tipo de serviço: ${tipo}\n\n` +
      `Aguardo retorno com o orçamento.`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

    trackClick("exit_popup_whatsapp", url);
    trackEvent("exit_popup_whatsapp_redirect");

    setSubmitting(false);
    setOpen(false);
    window.open(url, "_blank", "noopener");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-popup-title"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => close("overlay")}
      />
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl bg-primary text-primary-foreground shadow-[0_30px_80px_-15px_oklch(0.15_0.05_250/0.7)] border border-white/10 animate-scale-in">
        {/* Selo superior — agora dentro do modal para não ser cortado pelo header sticky */}
        <div className="flex justify-center pt-5">
          <div className="bg-orange-500 text-white text-[11px] sm:text-xs font-bold tracking-wider px-4 py-1.5 rounded-full shadow-lg uppercase">
            Oferta Especial
          </div>
        </div>

        <button
          onClick={() => close("button")}
          aria-label="Fechar"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-4">
          <h2
            id="exit-popup-title"
            className="text-2xl sm:text-[26px] font-bold leading-tight text-center"
          >
            Saindo sem saber quanto fica seu frete?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/85 text-center leading-relaxed">
            Informe retirada e entrega. Te chamamos no WhatsApp com uma estimativa rápida.
          </p>
          <p className="mt-1.5 text-xs text-white/65 text-center leading-relaxed">
            Atendimento em Uberlândia e região: fretes pequenos, móveis, retiradas em loja e pequenas mudanças.
          </p>

          {/* Benefícios — hover laranja */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-[12px] sm:text-xs">
            <div className="group flex items-center gap-1.5 bg-white/10 rounded-lg px-2.5 py-1.5 cursor-default transition-colors duration-300 hover:bg-orange-500 hover:text-white">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-300 group-hover:text-white transition-colors" /> Sem compromisso
            </div>
            <div className="group flex items-center gap-1.5 bg-white/10 rounded-lg px-2.5 py-1.5 cursor-default transition-colors duration-300 hover:bg-orange-500 hover:text-white">
              <Zap className="w-3.5 h-3.5 text-orange-300 group-hover:text-white transition-colors" /> Resposta rápida
            </div>
            <div className="group flex items-center gap-1.5 bg-white/10 rounded-lg px-2.5 py-1.5 cursor-default transition-colors duration-300 hover:bg-orange-500 hover:text-white">
              <Star className="w-3.5 h-3.5 text-orange-300 fill-current group-hover:text-white transition-colors" /> Avaliação 5,0
            </div>
            <div className="group flex items-center gap-1.5 bg-white/10 rounded-lg px-2.5 py-1.5 cursor-default transition-colors duration-300 hover:bg-orange-500 hover:text-white">
              <MapPin className="w-3.5 h-3.5 text-orange-300 group-hover:text-white transition-colors" /> Uberlândia
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-2.5">
            <input
              type="text"
              required
              maxLength={80}
              placeholder="Seu nome"
              value={data.nome}
              onChange={(e) => setData({ ...data, nome: e.target.value })}
              className="w-full px-3.5 py-3 rounded-lg bg-white text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="tel"
              required
              inputMode="numeric"
              placeholder="WhatsApp (DDD + número)"
              value={data.whatsapp}
              onChange={(e) =>
                setData({ ...data, whatsapp: maskPhone(e.target.value) })
              }
              className="w-full px-3.5 py-3 rounded-lg bg-white text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-orange-400"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <input
                type="text"
                required
                maxLength={60}
                placeholder="Bairro de retirada"
                value={data.bairroRetirada}
                onChange={(e) =>
                  setData({ ...data, bairroRetirada: e.target.value })
                }
                className="w-full px-3.5 py-3 rounded-lg bg-white text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                required
                maxLength={60}
                placeholder="Bairro de entrega"
                value={data.bairroEntrega}
                onChange={(e) =>
                  setData({ ...data, bairroEntrega: e.target.value })
                }
                className="w-full px-3.5 py-3 rounded-lg bg-white text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <select
              value={data.tipoServico}
              onChange={(e) =>
                setData({ ...data, tipoServico: e.target.value })
              }
              className="w-full px-3.5 py-3 rounded-lg bg-white text-foreground text-sm outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Tipo de serviço (opcional)</option>
              {SERVICOS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {error && (
              <p className="text-xs text-orange-200 bg-orange-900/40 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-1 inline-flex items-center justify-center gap-2 bg-whatsapp text-whatsapp-foreground px-5 py-3.5 rounded-lg font-bold text-sm sm:text-base hover:brightness-110 active:scale-[0.98] transition shadow-lg disabled:opacity-70"
            >
              <MessageCircle className="w-5 h-5" />
              {submitting ? "Enviando..." : "Receber orçamento no WhatsApp"}
            </button>

            <button
              type="button"
              onClick={() => close("decline")}
              className="w-full text-center text-xs text-white/60 hover:text-white/90 underline-offset-2 hover:underline pt-1"
            >
              Não, obrigado — vou sair sem orçamento
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

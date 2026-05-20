import { useState, useEffect, useRef } from "react";
import { X, MessageCircle, User, Phone, Package, Loader2, AlertCircle } from "lucide-react";
import { EMPRESA } from "@/config/empresa";
import { trackClick } from "@/hooks/use-tracking";
import { supabase } from "@/integrations/supabase/client";

const TENANT_ID = "04170f77-8db2-4605-a5d8-e446d9926edc";

const SERVICOS = [
  "Mudança Residencial",
  "Mudança Comercial",
  "Mini Frete",
  "Transporte de Móveis",
  "Frete de Eletrodomésticos",
  "Outro / Não sei ainda",
];

interface Props {
  open: boolean;
  onClose: () => void;
  origem?: string;
}

export function OrcamentoModal({ open, onClose, origem = "modal_orcamento" }: Props) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [servico, setServico] = useState("");
  const [loading, setLoading] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [erroGeral, setErroGeral] = useState("");
  const nomeRef = useRef<HTMLInputElement>(null);

  // Foca no primeiro campo ao abrir
  useEffect(() => {
    if (open) {
      setTimeout(() => nomeRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Fecha com ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  function formatTel(v: string) {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    return v;
  }

  function validar() {
    const e: Record<string, string> = {};
    if (!nome.trim() || nome.trim().length < 2) e.nome = "Informe seu nome";
    if (!telefone.replace(/\D/g, "") || telefone.replace(/\D/g, "").length < 10) e.telefone = "Informe um número válido";
    if (!servico) e.servico = "Selecione o serviço";
    setErros(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validar()) return;

    setLoading(true);
    setErroGeral("");

    // Salva lead no Supabase
    const payload = {
      tenant_id: TENANT_ID,
      nome: nome.trim(),
      telefone: telefone.replace(/\D/g, ""),
      origem,
      pagina_origem: window.location.pathname,
      produto_interesse: servico,
      observacoes: null,
      status: "novo",
      tags: ["site", origem],
    };

    console.log("[lead] salvando:", payload);
    const { error } = await supabase.from("leads").insert(payload);

    if (error) {
      // 23505 = telefone já existe no banco — lead já registrado, segue normalmente
      if (error.code === "23505") {
        console.log("[lead] telefone já existe, lead atualizado ✅");
      } else {
        console.error("[lead] ERRO:", error.code, error.message, error.hint);
        setErroGeral("Não foi possível salvar. Tente novamente.");
        setLoading(false);
        return;
      }
    } else {
      console.log("[lead] salvo com sucesso ✅");
    }

    // Monta mensagem do WhatsApp
    const linhas = [
      `Olá, tudo bem? 😊 Vi o site da *${EMPRESA.nome}* e gostaria de um orçamento.`,
      ``,
      `Meu nome é *${nome.trim()}* e preciso de *${servico}*.`,
      null,
      `Meu WhatsApp é *${telefone}*.`,
      ``,
      `Podem me ajudar? 🚛`,
    ];
    const msg = linhas.filter(Boolean).join("\n");

    const waUrl = `https://wa.me/${EMPRESA.telefoneRaw}?text=${encodeURIComponent(msg)}`;
    await trackClick(origem, waUrl);

    setLoading(false);
    setNome(""); setTelefone(""); setServico(""); setErros({});
    onClose();
    window.open(waUrl, "_blank", "noopener");
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-up overflow-hidden">
        {/* Header */}
        <div className="bg-[image:var(--gradient-hero)] px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-xl text-white">Solicitar Orçamento</h2>
            <p className="text-white/80 text-sm mt-0.5">Preencha e falaremos no WhatsApp</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

          {/* Nome */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              <User className="inline w-3.5 h-3.5 mr-1 text-primary" />
              Nome completo *
            </label>
            <input
              ref={nomeRef}
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Ex: João Silva"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
                ${erros.nome ? "border-red-400 bg-red-50 focus:border-red-500" : "border-gray-200 focus:border-primary bg-gray-50 focus:bg-white"}`}
            />
            {erros.nome && <p className="text-red-500 text-xs mt-1">{erros.nome}</p>}
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              <Phone className="inline w-3.5 h-3.5 mr-1 text-primary" />
              WhatsApp / Telefone *
            </label>
            <input
              type="tel"
              value={telefone}
              onChange={e => setTelefone(formatTel(e.target.value))}
              placeholder="(34) 99999-9999"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
                ${erros.telefone ? "border-red-400 bg-red-50 focus:border-red-500" : "border-gray-200 focus:border-primary bg-gray-50 focus:bg-white"}`}
            />
            {erros.telefone && <p className="text-red-500 text-xs mt-1">{erros.telefone}</p>}
          </div>

          {/* Serviço */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              <Package className="inline w-3.5 h-3.5 mr-1 text-primary" />
              Tipo de serviço *
            </label>
            <select
              value={servico}
              onChange={e => setServico(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors appearance-none bg-no-repeat cursor-pointer
                ${erros.servico ? "border-red-400 bg-red-50 focus:border-red-500" : "border-gray-200 focus:border-primary bg-gray-50 focus:bg-white"}`}
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundPosition: "right 12px center" }}
            >
              <option value="">Selecione o serviço…</option>
              {SERVICOS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {erros.servico && <p className="text-red-500 text-xs mt-1">{erros.servico}</p>}
          </div>

          {/* Erro geral */}
          {erroGeral && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {erroGeral}
            </div>
          )}

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:brightness-110 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md mt-2 disabled:opacity-70"
          >
            {loading
              ? <><Loader2 className="w-5 h-5 animate-spin" /> Enviando…</>
              : <><MessageCircle className="w-5 h-5" /> Enviar pelo WhatsApp</>
            }
          </button>

          <p className="text-center text-xs text-gray-400 pb-1">
            Seus dados são usados apenas para este contato
          </p>
        </form>
      </div>
    </div>
  );
}

import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const TENANT_ID = "04170f77-8db2-4605-a5d8-e446d9926edc";

function getSessionId(): string {
  const key = "app_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

const getDevice = () => (window.innerWidth <= 768 ? "mobile" : "desktop");
const getTid = () => localStorage.getItem("tenant_id") || TENANT_ID;

function getNavegador(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Edg")) return "Edge";
  return "Outro";
}

/** Envia page view — chamada direta sem hook */
async function sendPageView(pagina: string) {
  const payload = {
    tenant_id: getTid(),
    pagina,
    referrer: document.referrer || null,
    device: getDevice(),
    session_id: getSessionId(),
    navegador: getNavegador(),
  };
  console.log("[tracking] enviando page_view:", payload);
  const { error } = await supabase.from("page_views").insert(payload);
  if (error) {
    console.error("[tracking] ERRO page_view:", error.code, error.message, error.details, error.hint);
  } else {
    console.log("[tracking] page_view OK ✅");
  }
}

/** Hook React — registra page view ao montar o componente */
export function useTrackPageView(pagina: string) {
  useEffect(() => {
    sendPageView(pagina);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Registra clique em botão/link */
export async function trackClick(tipo: string, url_destino?: string, pagina?: string) {
  const payload = {
    tenant_id: getTid(),
    tipo,
    pagina: pagina ?? window.location.pathname,
    url_destino: url_destino ?? null,
    device: getDevice(),
  };
  const { error } = await supabase.from("link_clicks").insert(payload);
  if (error) {
    console.error("[tracking] ERRO link_click:", error.code, error.message, error.hint);
  }
}

/** Salva lead no Supabase */
export async function submitLead(data: {
  nome: string;
  telefone?: string;
  email?: string;
  origem?: string;
  pagina_origem?: string;
  produto_interesse?: string;
  observacoes?: string;
  status?: string;
}) {
  const payload = {
    tenant_id: getTid(),
    nome: data.nome,
    telefone: data.telefone ?? null,
    email: data.email ?? null,
    origem: data.origem ?? "site",
    pagina_origem: data.pagina_origem ?? window.location.pathname,
    produto_interesse: data.produto_interesse ?? null,
    observacoes: data.observacoes ?? null,
    status: data.status ?? "novo",
    tags: ["site", data.origem ?? "site"],
  };
  const { error } = await supabase.from("leads").insert(payload);
  if (error) {
    console.error("[tracking] ERRO lead:", error.code, error.message, error.hint);
  } else {
    console.log("[tracking] lead salvo ✅");
  }
}

// Aliases para compatibilidade
export const trackPageView = (pagina = window.location.pathname) => sendPageView(pagina);
export const saveLead = (params: {
  nome: string;
  telefone?: string;
  origem: string;
  observacoes?: string;
}) => submitLead(params);

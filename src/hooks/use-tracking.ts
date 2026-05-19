import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const TENANT_ID = "8f6787a6-2cb4-45b6-b048-d087ffc28e48";

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

/** Hook React — registra page view uma única vez por montagem */
export function useTrackPageView(pagina: string) {
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    supabase.from("page_views").insert({
      tenant_id: getTid(),
      pagina,
      referrer: document.referrer || null,
      device: getDevice(),
      session_id: getSessionId(),
      navegador: getNavegador(),
    });
  }, [pagina]);
}

/** Registra clique em botão/link */
export async function trackClick(tipo: string, url_destino?: string, pagina?: string) {
  try {
    await supabase.from("link_clicks").insert({
      tenant_id: getTid(),
      tipo,
      pagina: pagina ?? window.location.pathname,
      url_destino: url_destino ?? null,
      device: getDevice(),
    });
  } catch (_) {
    // silencioso
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
  try {
    await supabase.from("leads").insert({
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
    });
  } catch (_) {
    // silencioso
  }
}

// Aliases para compatibilidade com código existente
export const trackPageView = (pagina = window.location.pathname) =>
  supabase.from("page_views").insert({
    tenant_id: getTid(),
    pagina,
    referrer: document.referrer || null,
    device: getDevice(),
    session_id: getSessionId(),
    navegador: getNavegador(),
  }).then(() => {}).catch(() => {});

export const saveLead = (params: {
  nome: string;
  telefone?: string;
  origem: string;
  observacoes?: string;
}) => submitLead(params);

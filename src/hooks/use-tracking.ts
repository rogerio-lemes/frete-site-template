import { supabase } from "@/integrations/supabase/client";

const TENANT_ID = "8f6787a6-2cb4-45b6-b048-d087ffc28e48";

// Gera ou reutiliza session_id por sessão de navegação
function getSessionId(): string {
  const key = "ef_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

function getDevice(): string {
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? "mobile" : "desktop";
}

function getNavegador(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Edg")) return "Edge";
  return "Outro";
}

/** Registra visualização de página */
export async function trackPageView(pagina = window.location.pathname) {
  try {
    await supabase.from("page_views").insert({
      tenant_id: TENANT_ID,
      pagina,
      session_id: getSessionId(),
      device: getDevice(),
      navegador: getNavegador(),
      referrer: document.referrer || null,
    });
  } catch (_) {
    // silencioso — nunca interrompe a navegação
  }
}

/** Registra clique em link/CTA */
export async function trackClick(tipo: string, url_destino?: string) {
  try {
    await supabase.from("link_clicks").insert({
      tenant_id: TENANT_ID,
      tipo,
      pagina: window.location.pathname,
      device: getDevice(),
      url_destino: url_destino ?? null,
    });
  } catch (_) {
    // silencioso
  }
}

/** Salva lead no Supabase antes de redirecionar ao WhatsApp */
export async function saveLead(params: {
  nome: string;
  telefone?: string;
  origem: string;
  observacoes?: string;
}) {
  try {
    await supabase.from("leads").insert({
      tenant_id: TENANT_ID,
      nome: params.nome,
      telefone: params.telefone ?? null,
      origem: params.origem,
      pagina_origem: window.location.pathname,
      status: "novo",
      tags: ["site", params.origem],
      observacoes: params.observacoes ?? null,
    });
  } catch (_) {
    // silencioso
  }
}

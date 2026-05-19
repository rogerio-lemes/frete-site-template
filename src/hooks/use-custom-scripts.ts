import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const TENANT_ID = "8f6787a6-2cb4-45b6-b048-d087ffc28e48";

function injectScript(codigo: string, local: string) {
  const container =
    local === "head"
      ? document.head
      : local === "footer"
      ? document.body
      : document.body;

  const wrapper = document.createElement("div");
  wrapper.innerHTML = codigo;

  wrapper.querySelectorAll("script").forEach((original) => {
    const s = document.createElement("script");
    if (original.src) {
      s.src = original.src;
      s.async = true;
    } else {
      s.textContent = original.textContent;
    }
    Array.from(original.attributes).forEach((attr) => {
      if (attr.name !== "src") s.setAttribute(attr.name, attr.value);
    });
    container.appendChild(s);
  });
}

/** Busca scripts ativos do tenant e injeta no DOM */
export function useCustomScripts() {
  useEffect(() => {
    supabase
      .from("scripts_customizados")
      .select("codigo, local")
      .eq("tenant_id", TENANT_ID)
      .eq("ativo", true)
      .then(({ data, error }) => {
        if (error || !data) return;
        data.forEach(({ codigo, local }) => {
          if (codigo) injectScript(codigo, local ?? "body");
        });
      });
  }, []);
}

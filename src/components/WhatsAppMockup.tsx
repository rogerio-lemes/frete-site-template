import { CheckCheck, MessageCircle, Headphones, Clock, ShieldCheck } from "lucide-react";
import atendenteImg from "@/assets/atendente-mockup.svg";

export function WhatsAppMockup() {
 return (
  <div className="relative mx-auto w-full max-w-[340px]">
   {/* Glow estático */}
   <div className="absolute -inset-8 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
   <div className="absolute -inset-4 bg-primary/15 blur-2xl rounded-full pointer-events-none" />

   {/* Card principal */}
   <div className="relative rounded-3xl overflow-hidden bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.6)] ring-1 ring-black/5">
    <div className="relative aspect-[4/5] overflow-hidden">
     <img
      src={atendenteImg}
      alt="Atendente Gilmar Fretes pronto para atender"
      width={960}
      height={1280}
      loading="lazy"
      className="w-full h-full object-cover"
     />

     {/* Gradient overlay base */}
     <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

     {/* Badge online topo */}
     <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full shadow-md">
      <span className="relative flex w-2 h-2">
       <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-70 lp-pulse-dot" />
       <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
      </span>
      <span className="text-[10px] font-semibold text-neutral-800">Online agora</span>
     </div>

     {/* Headset chip */}
     <div className="absolute top-3 right-3 inline-flex items-center gap-1 bg-primary text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow-md">
      <Headphones className="w-3 h-3" /> Atendimento Humano
     </div>

     {/* Copy persuasiva sobre o card */}
     <div className="absolute inset-x-0 bottom-0 p-4 text-white">
      <div className="text-[10px] uppercase tracking-[0.15em] text-blue-200 font-semibold mb-1">Atendimento Direto</div>
      <div className="font-display text-xl font-bold leading-tight mb-1">Tire suas dúvidas em segundos</div>
      <div className="text-xs opacity-90 leading-snug">
       Atendimento humano, rápido e sem robô. Resposta em poucos minutos pelo WhatsApp.
      </div>
     </div>
    </div>

    {/* Footer com benefícios */}
    <div className="bg-white px-4 py-3 grid grid-cols-3 gap-2 border-t border-neutral-100">
     <div className="flex flex-col items-center text-center gap-1 lp-badge-bounce">
      <Clock className="w-4 h-4 text-primary lp-icon-tick" />
      <span className="text-[10px] font-semibold text-neutral-700 leading-tight">Resposta<br />em minutos</span>
     </div>
     <div className="flex flex-col items-center text-center gap-1 border-x border-neutral-100 lp-badge-bounce lp-badge-bounce-d1">
      <ShieldCheck className="w-4 h-4 text-emerald-600 lp-icon-wobble" />
      <span className="text-[10px] font-semibold text-neutral-700 leading-tight">Sem<br />compromisso</span>
     </div>
     <div className="flex flex-col items-center text-center gap-1 lp-badge-bounce lp-badge-bounce-d2">
      <MessageCircle className="w-4 h-4 text-primary lp-icon-chat" />
      <span className="text-[10px] font-semibold text-neutral-700 leading-tight">Direto no<br />WhatsApp</span>
     </div>
    </div>
   </div>

  </div>
 );
}

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

    </div>
   </div>

  </div>
 );
}

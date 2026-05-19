import { createFileRoute } from "@tanstack/react-router";
import { EMPRESA, WA_LINK as WA_LINK_CONFIG, WA_BASIC as WA_BASIC_CONFIG } from "@/config/empresa";
import logoImage from "@/assets/logo-gilmar.png";
import avatarAtendente from "@/assets/galeria-gilmar-3.jpg";
import heroImage from "@/assets/galeria-gilmar-1.jpg";
import ctaImage from "@/assets/galeria-gilmar-5.jpg";
import galeria1 from "@/assets/galeria-gilmar-1.jpg";
import galeria2 from "@/assets/galeria-gilmar-2.jpg";
import galeria3 from "@/assets/galeria-gilmar-3.jpg";
import galeria4 from "@/assets/galeria-gilmar-4.jpg";
import galeria5 from "@/assets/galeria-gilmar-5.jpg";
import galeria6 from "@/assets/galeria-gilmar-6.jpg";
import {
 Truck, Package, Home, Building2, Zap, Refrigerator,
 MessageCircle, Phone, Clock, MapPin, ShieldCheck, DollarSign,
 Users, Star, CheckCircle2, ArrowRight, ArrowDown, Menu, X, Mail,
 ChevronDown,
} from "lucide-react";
import { useState, useCallback, useEffect, useRef } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTrackPageView, trackClick, saveLead } from "@/hooks/use-tracking";
import { useCustomScripts } from "@/hooks/use-custom-scripts";
import { ExitPopup } from "@/components/ExitPopup";
import { WhatsAppMockup } from "@/components/WhatsAppMockup";
import { SideNav } from "@/components/SideNav";

const WA_LINK = WA_LINK_CONFIG;
const WA_BASIC = WA_BASIC_CONFIG;
const WA_CHAT = WA_LINK_CONFIG;

const galeriaImgs = [galeria1, galeria2, galeria3, galeria4, galeria5, galeria6];

export const Route = createFileRoute("/")({
 component: Index,
});

const serviceIcons = [Home, Building2, Package, Truck, Building2, Zap];
const services = EMPRESA.services.map((s, i) => ({ icon: serviceIcons[i] ?? Truck, ...s }));

const benefitIcons = [Zap, Users, DollarSign, Truck, MapPin, ShieldCheck];
const benefits = EMPRESA.benefits.map((b, i) => ({ icon: benefitIcons[i] ?? ShieldCheck, ...b }));

const steps = EMPRESA.steps.slice(0, 3).map((s, i) => ({ n: String(i + 1), ...s }));

const GOOGLE_REVIEW_LINK = EMPRESA.googleReviewLink;

const testimonialColors = ["bg-primary", "bg-[#4285F4]", "bg-[#34A853]"];
const testimonials = EMPRESA.testimonials.map((t, i) => ({
 name: t.nome,
 initials: t.nome.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(),
 color: testimonialColors[i] ?? "bg-primary",
 stars: t.nota,
 date: `há ${i + 1} semana${i > 0 ? "s" : ""}`,
 text: t.texto,
}));

const faqs = EMPRESA.faqs;

const heroSlides = [galeria1, galeria2, galeria3];

function HeroSlider() {
 const [current, setCurrent] = useState(0);

 useEffect(() => {
  const timer = setInterval(() => {
   setCurrent(c => (c + 1) % heroSlides.length);
  }, 3800);
  return () => clearInterval(timer);
 }, []);

 return (
  <div className="relative animate-slide-left" style={{animationDelay:"200ms"}}>
   <div className="absolute -inset-4 bg-[image:var(--gradient-hero)] rounded-3xl blur-2xl opacity-20" />
   {/* Slides */}
   <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-elegant)] aspect-[4/3] w-full">
     {heroSlides.map((src, i) => (
      <img
       key={i}
       src={src}
       alt={`${EMPRESA.nome} - fretes e mudanças em Uberlândia ${i + 1}`}
       className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
       style={{ opacity: i === current ? 1 : 0 }}
       loading={i === 0 ? "eager" : "lazy"}
       decoding="async"
       {...(i === 0 ? { fetchPriority: "high" as any } : {})}
      />
     ))}
    {/* Dots */}
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
     {heroSlides.map((_, i) => (
      <button
       key={i}
       onClick={() => setCurrent(i)}
       className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"}`}
      />
     ))}
    </div>
   </div>
   {/* Badge flutuante */}
   <div className="absolute -bottom-5 -left-5 bg-card border border-border rounded-xl p-4 shadow-[var(--shadow-card)] hidden md:flex items-center gap-3 lp-float">
    <div className="w-10 h-10 rounded-full bg-success/15 flex items-center justify-center text-success"><Star className="w-5 h-5 fill-current" /></div>
    <div>
     <div className="font-bold text-sm">Avaliação 5.0</div>
     <div className="text-xs text-muted-foreground">Centenas de clientes</div>
    </div>
   </div>
  </div>
 );
}

function Index() {
 const [menuOpen, setMenuOpen] = useState(false);
 const [openFaq, setOpenFaq] = useState<number | null>(0);
 const [lightbox, setLightbox] = useState<number | null>(null);
 const [activeSection, setActiveSection] = useState("inicio");
 const [chatOpen, setChatOpen] = useState(false);
 const [chatBubble, setChatBubble] = useState(true);

 // States dos formulários para capturar lead
 const [formNome, setFormNome] = useState("");
 const [formTel, setFormTel] = useState("");

 useScrollAnimation();
 useTrackPageView("/");
 useCustomScripts();


 // Scroll suave e lento para seções internas
 const smoothScrollTo = useCallback((id: string) => {
  const el = id ? document.getElementById(id) : document.documentElement;
  if (!el) return;
  const headerOffset = 80;
  const targetY = id
   ? el.getBoundingClientRect().top + window.scrollY - headerOffset
   : 0;
  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = 1100;
  let startTime: number | null = null;
  const ease = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
  const step = (ts: number) => {
   if (!startTime) startTime = ts;
   const elapsed = ts - startTime;
   const progress = Math.min(elapsed / duration, 1);
   window.scrollTo(0, startY + distance * ease(progress));
   if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
 }, []);

  // Track active section on scroll — picks the section whose top crossed the viewport marker
  useEffect(() => {
   const ids = ["inicio","servicos","como-funciona","diferenciais","orcamento","depoimentos","quem-somos","faq","contato-final"];
   const update = () => {
    const marker = window.innerHeight * 0.35; // 35% from top
    let current = ids[0];
    for (const id of ids) {
     const el = document.getElementById(id);
     if (!el) continue;
     const top = el.getBoundingClientRect().top;
     if (top - marker <= 0) current = id;
    }
    setActiveSection(prev => (prev === current ? prev : current));
   };
   update();
   window.addEventListener("scroll", update, { passive: true });
   window.addEventListener("resize", update);
   return () => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
   };
  }, []);

 const openLightbox = useCallback((i: number) => setLightbox(i), []);
 const closeLightbox = useCallback(() => setLightbox(null), []);
 const prevImg = useCallback(() => setLightbox(i => i !== null ? (i - 1 + galeriaImgs.length) % galeriaImgs.length : null), []);
 const nextImg = useCallback(() => setLightbox(i => i !== null ? (i + 1) % galeriaImgs.length : null), []);

 // Teclado no lightbox: ESC fecha, ← → navega
 useEffect(() => {
  if (lightbox === null) return;
  const handler = (e: KeyboardEvent) => {
   if (e.key === "Escape") closeLightbox();
   if (e.key === "ArrowLeft") prevImg();
   if (e.key === "ArrowRight") nextImg();
  };
  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
 }, [lightbox, closeLightbox, prevImg, nextImg]);

 return (
   <div className="text-foreground font-sans relative lp-animated-bg" style={{overflow: "clip"}}>
    <SideNav activeSection={activeSection} onNavigate={smoothScrollTo} />
   {/* Top bar */}
   <div className="hidden md:block bg-primary text-primary-foreground text-sm">
    <div className="mx-auto px-4 max-w-[1320px] py-2 flex justify-between items-center">
     <a href={`tel:+${EMPRESA.telefoneRaw}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity"><Phone className="w-3.5 h-3.5" /> {EMPRESA.telefone}</a>
     <span className="flex items-center gap-4">
      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {EMPRESA.horario}</span>
      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {EMPRESA.regiao}</span>
     </span>
    </div>
   </div>

   {/* Header */}
   <header className="sticky top-0 z-40 bg-white border-b border-border shadow-[0_4px_24px_-4px_oklch(0.32_0.08_250/0.10)]">
    <div className="mx-auto px-4 max-w-[1320px] flex items-center justify-between">
     <a href="#" onClick={e => { e.preventDefault(); smoothScrollTo(""); }} className="flex items-center">
      <img src={logoImage} alt={EMPRESA.nome} style={{height: '96px', width: 'auto'}} className="object-contain" />
     </a>
     <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
      {[["Início","inicio"],["Serviços","servicos"],["Como Funciona","como-funciona"],["Orçamento","orcamento"],["Depoimentos","depoimentos"],["FAQ","faq"],["Contato","contato-final"]].map(([label, id]) => (
       <a key={id} href={`#${id}`}
        onClick={e => { e.preventDefault(); smoothScrollTo(id); }}
        className={`px-3 py-1.5 rounded-md transition-all duration-200 ${
         activeSection === id || (id === "contato-final" && activeSection === "contato-final")
          ? "text-white bg-primary font-semibold"
          : "text-foreground/70 hover:text-white hover:bg-primary"
        }`}>
        {label}
       </a>
      ))}
     </nav>
     <a href={WA_LINK} target="_blank" rel="noopener" onClick={() => trackClick("whatsapp_header", WA_LINK)} className="inline-flex items-center gap-2 bg-whatsapp text-whatsapp-foreground px-4 py-2.5 rounded-lg font-semibold text-sm hover:brightness-110 hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 shadow-[var(--shadow-card)] animate-wa-pulse">
      <MessageCircle className="w-4 h-4" /> Solicitar Orçamento
     </a>
     <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2" aria-label="Menu">
      {menuOpen ? <X /> : <Menu />}
     </button>
    </div>
    {menuOpen && (
     <div className="lg:hidden border-t border-border bg-background">
      <nav className="mx-auto px-4 max-w-[1320px] py-4 flex flex-col gap-3 text-sm font-medium">
        {[["Início","inicio"],["Serviços","servicos"],["Como Funciona","como-funciona"],["Orçamento","orcamento"],["Depoimentos","depoimentos"],["FAQ","faq"],["Contato","contato-final"]].map(([l,id]) => (
         <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); setMenuOpen(false); smoothScrollTo(id); }} className={`py-2 px-3 -mx-3 rounded-md border-b border-border transition-all duration-200 ${activeSection === id ? "bg-primary text-white font-semibold" : "hover:bg-primary hover:text-white"}`}>{l}</a>
        ))}
       <a href={WA_LINK} target="_blank" rel="noopener" onClick={() => trackClick("whatsapp_header_mobile", WA_LINK)} className="bg-whatsapp text-whatsapp-foreground px-4 py-3 rounded-lg font-semibold text-center mt-2">Solicitar Orçamento</a>
      </nav>
     </div>
    )}
   </header>

   {/* Hero */}
   <section id="inicio" className="relative overflow-hidden">
    {/* Dot grid */}
    <div className="absolute inset-0" style={{backgroundImage:'radial-gradient(circle, oklch(0.32 0.08 250 / 0.12) 1.5px, transparent 1.5px)', backgroundSize:'32px 32px'}} />
    {/* Blobs */}
    <div className="absolute -top-48 -right-24 w-[700px] h-[700px] rounded-full bg-primary/[0.09] blur-[120px] pointer-events-none" />
    <div className="absolute -bottom-24 -left-32 w-[550px] h-[550px] rounded-full pointer-events-none" style={{background:'radial-gradient(circle, oklch(0.7 0.18 50 / 0.09), transparent 70%)'}} />
    <div className="absolute top-1/3 left-[40%] w-[380px] h-[380px] rounded-full bg-primary/[0.04] blur-[80px] pointer-events-none" />
    <div className="mx-auto px-4 max-w-[1320px] py-6 md:py-10 grid lg:grid-cols-2 gap-12 items-center relative">
     <div>
      <span className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-semibold mb-5 animate-fade-up" style={{animationDelay:"0ms"}}>
       <MapPin className="w-3.5 h-3.5" /> Uberlândia e cidades vizinhas
      </span>
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-5 animate-fade-up" style={{animationDelay:"100ms"}}>
       {EMPRESA.heroH1Inicio} <span className="text-primary">{EMPRESA.heroH1Destaque}</span>
      </h1>
      <p className="text-lg text-muted-foreground mb-7 leading-relaxed animate-fade-up" style={{animationDelay:"200ms"}}>
       {EMPRESA.heroSubtitulo}
      </p>
      <div className="flex flex-wrap gap-3 mb-8 animate-fade-up" style={{animationDelay:"320ms"}}>
       <a href={WA_LINK} target="_blank" rel="noopener" onClick={() => trackClick("whatsapp_hero", WA_LINK)} className="inline-flex items-center gap-2 bg-whatsapp text-whatsapp-foreground px-6 py-3.5 rounded-lg font-semibold hover:brightness-110 active:scale-[0.97] transition-all duration-200 lp-glow-whatsapp animate-cta-pulse">
        <MessageCircle className="w-5 h-5" /> Pedir Orçamento pelo WhatsApp
       </a>
       <a href="#servicos" onClick={e => { e.preventDefault(); smoothScrollTo("servicos"); }} className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3.5 rounded-lg font-semibold hover:bg-primary/10 hover:text-primary hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 border border-border">
        Ver nossos serviços <ArrowRight className="w-4 h-4" />
       </a>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm animate-fade-up" style={{animationDelay:"420ms"}}>
       {EMPRESA.trustBadges.map(t => (
        <div key={t} className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-success shrink-0" /> {t}</div>
       ))}
      </div>
     </div>
     {/* Hero image slideshow */}
     <HeroSlider />
    </div>
   </section>

   {/* Gallery Carousel */}
   <section className="py-12">
    <div className="mx-auto px-4 max-w-[1320px]">
     <div className="text-center mb-6">
      <span className="text-primary font-semibold text-sm uppercase tracking-wider">Nossos Trabalhos</span>
      <h2 className="font-display text-2xl font-bold mt-1">Carretos e Fretes Realizados em Uberlândia</h2>
     </div>
     <div className="group overflow-hidden rounded-2xl">
      <div className="flex gap-4 w-max animate-carousel group-hover:[animation-play-state:paused]">
       {[...galeriaImgs, ...galeriaImgs].map((img, i) => (
        <img
         key={i}
         src={img}
         alt={`${EMPRESA.nome} - fretes e mudanças em Uberlândia ${(i % galeriaImgs.length) + 1}`}
         className="h-60 w-80 object-cover rounded-2xl flex-shrink-0 shadow-md cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all duration-300"
         loading="lazy"
         onClick={() => openLightbox(i % galeriaImgs.length)}
        />
       ))}
      </div>
     </div>
    </div>
   </section>

   {/* Lightbox */}
   {lightbox !== null && (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={closeLightbox}>
     <button onClick={(e) => { e.stopPropagation(); prevImg(); }} className="absolute left-4 md:left-8 text-white bg-white/20 hover:bg-white/40 rounded-full p-3 transition z-10">
      <ChevronDown className="w-7 h-7 rotate-90" />
     </button>
     <img
      src={galeriaImgs[lightbox]}
      alt={`Foto ${lightbox + 1}`}
      className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
      onClick={(e) => e.stopPropagation()}
     />
     <button onClick={(e) => { e.stopPropagation(); nextImg(); }} className="absolute right-4 md:right-8 text-white bg-white/20 hover:bg-white/40 rounded-full p-3 transition z-10">
      <ChevronDown className="w-7 h-7 -rotate-90" />
     </button>
     <button onClick={closeLightbox} className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/40 rounded-full p-2 transition">
      <X className="w-6 h-6" />
     </button>
     <div className="absolute bottom-4 text-white/70 text-sm">{lightbox + 1} / {galeriaImgs.length}</div>
    </div>
   )}

   {/* Services */}
   <section id="servicos" className="py-16 md:py-24 relative overflow-hidden">
    <div className="mx-auto px-4 max-w-[1320px]">
     <div className="text-center max-w-2xl mx-auto mb-12 anim">
      <span className="text-primary font-semibold text-sm uppercase tracking-wider">Nossos Serviços</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">Nossos Serviços de Frete e Mudança em Uberlândia e Região</h2>
      <p className="text-muted-foreground">Os principais serviços que a {EMPRESA.nome} oferece para facilitar a sua vida, sempre com agilidade, cuidado e o melhor custo-benefício.</p>
     </div>
     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {services.map((s, i) => (
       <div key={s.title} className="group relative rounded-2xl p-6 shadow-[0_16px_48px_-12px_oklch(0.32_0.08_250/0.18)] -translate-y-1 lp-glass-card lp-card-hover anim overflow-hidden" style={{transitionDelay:`${i*80}ms`}}>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none" />
        <div className="w-12 h-12 rounded-xl bg-[image:var(--gradient-hero)] text-primary-foreground flex items-center justify-center mb-4 lp-icon-pop shadow-sm">
         <s.icon className="w-6 h-6" />
        </div>
        <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{s.desc}</p>
        <a href={WA_LINK} target="_blank" rel="noopener" onClick={() => trackClick("whatsapp_servicos", WA_LINK)} className="inline-flex items-center gap-2 bg-primary/[0.07] hover:bg-whatsapp hover:text-white text-primary font-semibold text-sm px-4 py-2 rounded-lg transition-all duration-200 group-hover:gap-3 lp-glow-whatsapp">
         <MessageCircle className="w-4 h-4" /> Pedir pelo WhatsApp
        </a>
       </div>
      ))}
     </div>
    </div>
   </section>

   {/* How it works */}
   <section id="como-funciona" className="pt-20 md:pt-28 pb-16 md:pb-24 relative overflow-hidden">
    <div className="mx-auto px-4 max-w-[1320px]">
     <div className="text-center max-w-2xl mx-auto mb-12 anim">
      <span className="text-primary font-semibold text-sm uppercase tracking-wider">Como Funciona</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">Como Funciona o Atendimento da {EMPRESA.nome}</h2>
      <p className="text-muted-foreground">Sem burocracia. Sem surpresa. Do contato até a entrega, você sabe o que vai acontecer em cada etapa.</p>
     </div>
     <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
      {steps.map((s, i) => (
       <div key={s.n} className="relative anim group" style={{transitionDelay:`${i*100}ms`}}>
        <div className="rounded-2xl p-5 h-full shadow-[0_16px_48px_-12px_oklch(0.32_0.08_250/0.18)] -translate-y-1 lp-glass-card lp-card-hover overflow-hidden">
         {/* Animated mockup */}
         <div className="relative h-32 mb-4 rounded-xl bg-gradient-to-br from-primary/5 to-orange-500/5 border border-primary/10 overflow-hidden">
          {i === 0 && (
           <div className="absolute inset-0 flex items-center justify-center p-3">
            <div className="w-full space-y-1.5">
             <div className="flex justify-end lp-step1-msg-a">
              <div className="bg-emerald-500 text-white text-[10px] px-2 py-1 rounded-lg rounded-tr-none max-w-[80%] shadow-sm">Oi! Preciso de um frete 🚚</div>
             </div>
             <div className="flex justify-start lp-step1-msg-b">
              <div className="bg-white text-neutral-800 text-[10px] px-2 py-1 rounded-lg rounded-tl-none shadow-sm flex gap-1 items-center">
               <span className="w-1 h-1 rounded-full bg-neutral-400 lp-typing-dot" />
               <span className="w-1 h-1 rounded-full bg-neutral-400 lp-typing-dot" style={{animationDelay:'0.2s'}} />
               <span className="w-1 h-1 rounded-full bg-neutral-400 lp-typing-dot" style={{animationDelay:'0.4s'}} />
              </div>
             </div>
             <div className="flex justify-start lp-step1-msg-c">
              <div className="bg-white text-neutral-800 text-[10px] px-2 py-1 rounded-lg rounded-tl-none max-w-[80%] shadow-sm">Olá! Vamos fazer 👍</div>
             </div>
            </div>
           </div>
          )}
          {i === 1 && (
           <div className="absolute inset-0 flex items-center justify-center p-3">
            <div className="relative bg-white rounded-lg shadow-md p-2.5 w-[88%] lp-step2-doc">
             <div className="flex items-center justify-between mb-1.5">
              <div className="text-[9px] font-bold text-neutral-700">ORÇAMENTO</div>
              <div className="text-[8px] bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded font-semibold">APROVADO</div>
             </div>
             <div className="space-y-1">
              <div className="h-1 bg-neutral-200 rounded w-full lp-step2-line" style={{animationDelay:'0.2s'}} />
              <div className="h-1 bg-neutral-200 rounded w-3/4 lp-step2-line" style={{animationDelay:'0.5s'}} />
              <div className="flex items-center justify-between mt-1.5">
               <div className="text-[9px] text-neutral-500">Total</div>
               <div className="text-[11px] font-bold text-emerald-600">R$ 280</div>
              </div>
             </div>
             <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg lp-step2-stamp">
              <CheckCircle2 className="w-4 h-4 text-white" />
             </div>
            </div>
           </div>
          )}
          {i === 2 && (
           <div className="absolute inset-0">
            {/* Sky line */}
            <div className="absolute inset-x-0 bottom-6 h-px bg-neutral-300/60" />
            {/* Road dashes */}
            <div className="absolute inset-x-0 bottom-3 h-0.5 lp-road-line"
              style={{backgroundImage:'repeating-linear-gradient(to right, oklch(0.55 0.03 250) 0 8px, transparent 8px 16px)'}} />
            {/* House left */}
            <div className="absolute left-2 bottom-7 w-4 h-4 bg-primary/30 rounded-sm" />
            <div className="absolute left-1.5 bottom-10 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[8px] border-l-transparent border-r-transparent border-b-primary/40" />
            {/* House right */}
            <div className="absolute right-2 bottom-7 w-4 h-4 bg-orange-400/40 rounded-sm" />
            <div className="absolute right-1.5 bottom-10 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[8px] border-l-transparent border-r-transparent border-b-orange-400/60" />
            {/* Pin destination */}
            <MapPin className="absolute right-1 bottom-12 w-3 h-3 text-orange-500 lp-step3-pin" />
            {/* Truck */}
            <div className="absolute bottom-5 lp-step3-truck">
             <Truck className="w-7 h-7 text-primary drop-shadow-md" />
            </div>
           </div>
          )}
          {i === 3 && (
           <div className="absolute inset-0 flex items-center justify-center p-3">
            <div className="relative bg-white rounded-lg shadow-md p-2.5 w-[90%] lp-step2-doc">
             <div className="flex items-center justify-between mb-2">
              <div className="text-[9px] font-bold text-neutral-700">AGENDAMENTO</div>
              <div className="text-[8px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-semibold">CONFIRMADO</div>
             </div>
             {/* Calendar grid */}
             <div className="grid grid-cols-7 gap-px mb-2">
              {['D','S','T','Q','Q','S','S'].map((d,j) => (
               <div key={j} className="text-[7px] text-center text-neutral-400 font-medium">{d}</div>
              ))}
              {[null,null,null,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].map((d,j) => (
               <div key={j} className={`text-[7px] text-center py-0.5 rounded ${d === 15 ? 'bg-primary text-white font-bold lp-step2-stamp' : d ? 'text-neutral-600' : ''}`}>{d ?? ''}</div>
              ))}
             </div>
             <div className="flex items-center gap-1.5 bg-primary/8 rounded px-2 py-1">
              <Clock className="w-2.5 h-2.5 text-primary shrink-0" />
              <span className="text-[8px] text-neutral-700 font-semibold">09:00 · Seg, 15 Jan</span>
             </div>
             <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow-md lp-step2-stamp">
              <CheckCircle2 className="w-3 h-3 text-white" />
             </div>
            </div>
           </div>
          )}
          {i === 4 && (
           <div className="absolute inset-0">
            {/* Road */}
            <div className="absolute inset-x-0 bottom-6 h-px bg-neutral-300/60" />
            <div className="absolute inset-x-0 bottom-3 h-0.5 lp-road-line"
             style={{backgroundImage:'repeating-linear-gradient(to right, oklch(0.55 0.03 143) 0 8px, transparent 8px 16px)'}} />
            {/* House destination */}
            <div className="absolute right-4 bottom-7 w-5 h-5 bg-primary/30 rounded-sm" />
            <div className="absolute right-3 bottom-11 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[10px] border-l-transparent border-r-transparent border-b-primary/50" />
            {/* Package at door */}
            <div className="absolute right-2 bottom-7 lp-step2-stamp" style={{animationDelay:'0.4s'}}>
             <Package className="w-4 h-4 text-primary" />
            </div>
            {/* Big checkmark */}
            <div className="absolute right-0 bottom-16 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg lp-step2-stamp">
             <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
            {/* Truck parked left */}
            <div className="absolute bottom-5 left-4">
             <Truck className="w-7 h-7 text-primary drop-shadow-md" />
            </div>
            {/* Stars above */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-0.5">
             {[0,1,2,3,4].map(s => (
              <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400 lp-star-twinkle" style={{animationDelay:`${s*180}ms`}} />
             ))}
            </div>
           </div>
          )}
         </div>
         <div className="w-10 h-10 rounded-full bg-[image:var(--gradient-cta)] text-white flex items-center justify-center font-bold mb-3 lp-icon-pop">{s.n}</div>
         <h3 className="font-display font-bold mb-2">{s.title}</h3>
         <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
        </div>
        {i < steps.length - 1 && (
         <>
          <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 w-5 h-5 text-primary/60 z-10 lp-step-arrow" />
          <ArrowDown className="lg:hidden absolute left-1/2 -translate-x-1/2 -bottom-6 w-5 h-5 text-primary/60 z-10 lp-step-arrow-down" />
         </>
        )}
       </div>
      ))}
     </div>
     <div className="text-center mt-10">
      <a href={`https://wa.me/${EMPRESA.telefoneRaw}?text=${encodeURIComponent("Olá, estou no seu site e quero entender qual serviço de frete é ideal para mim!")}`} target="_blank" rel="noopener" onClick={() => trackClick("whatsapp_servicos_ideal", WA_BASIC)} className="inline-flex items-center gap-2 bg-whatsapp text-whatsapp-foreground px-6 py-3.5 rounded-lg font-semibold hover:brightness-110 hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 shadow-[var(--shadow-card)]">
       <MessageCircle className="w-5 h-5" /> Quero entender qual solução é ideal para mim
      </a>
     </div>
    </div>
   </section>

   {/* Benefits */}
   <section id="diferenciais" className="pt-20 md:pt-28 pb-16 md:pb-24 relative overflow-hidden scroll-mt-24">
    <div className="mx-auto px-4 max-w-[1320px]">
     <div className="text-center max-w-2xl mx-auto mb-12 anim">
      <span className="text-primary font-semibold text-sm uppercase tracking-wider">Diferenciais</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">Por Que Escolher a {EMPRESA.nome} em Uberlândia</h2>
     </div>
     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {benefits.map((b, i) => (
       <div key={b.title} className="group relative rounded-2xl p-6 shadow-[0_16px_48px_-12px_oklch(0.32_0.08_250/0.18)] -translate-y-1 lp-glass-card lp-card-hover anim overflow-hidden transition-colors duration-300 hover:!bg-primary hover:!border-primary" style={{transitionDelay:`${i*70}ms`}}>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.05] to-transparent pointer-events-none group-hover:opacity-0 transition-opacity duration-300" />
        <div className="relative w-11 h-11 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mb-4 lp-icon-pop group-hover:bg-white group-hover:text-primary shadow-sm transition-colors duration-300">
         <b.icon className="w-5 h-5" />
        </div>
        <h3 className="relative font-display font-bold text-lg mb-2 group-hover:text-white transition-colors duration-300">{b.title}</h3>
        <p className="relative text-sm text-muted-foreground leading-relaxed group-hover:text-white/85 transition-colors duration-300">{b.desc}</p>
       </div>
      ))}
     </div>
    </div>
   </section>

   {/* CTA Intermediate */}
   <section id="orcamento" className="pt-20 md:pt-28 pb-16 md:pb-20 relative overflow-hidden lp-cta-mid-bg scroll-mt-24">
    <div className="absolute inset-0 lp-cta-mid-grid pointer-events-none" />
    <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-cyan-400/20 blur-3xl lp-blob-float pointer-events-none" />
    <div className="absolute -bottom-32 -right-20 w-[480px] h-[480px] rounded-full bg-blue-400/20 blur-3xl lp-blob-float pointer-events-none" style={{animationDelay:'-4s'}} />
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
    <div className="mx-auto px-4 max-w-[1320px] relative text-primary-foreground">
     <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
      <div className="text-center lg:text-left">
       <span className="inline-flex items-center gap-2 bg-emerald-400/15 border border-emerald-300/30 text-emerald-200 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 lp-pulse-dot" />
        Resposta em poucos minutos
       </span>
       <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ainda tem dúvida sobre qual serviço escolher?</h2>
       <p className="max-w-2xl mx-auto lg:mx-0 mb-7 opacity-90">Fale agora com a nossa equipe e receba uma orientação personalizada, sem custo e sem compromisso. Atendemos você em Uberlândia e região 24 horas por dia.</p>
       <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
        <a href={WA_CHAT} target="_blank" rel="noopener" onClick={() => trackClick("whatsapp_cta", WA_CHAT)} className="inline-flex items-center gap-2 bg-whatsapp text-whatsapp-foreground px-6 py-3.5 rounded-lg font-semibold hover:brightness-110 active:scale-[0.97] transition-all duration-200 lp-glow-whatsapp">
         <MessageCircle className="w-5 h-5" /> Falar pelo WhatsApp
        </a>
        <a href={`tel:+${EMPRESA.telefoneRaw}`} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-primary-foreground px-6 py-3.5 rounded-lg font-semibold hover:bg-white/25 hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 border border-white/20">
         <Phone className="w-5 h-5" /> {EMPRESA.telefone}
        </a>
       </div>
       <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm opacity-90">
        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Atendimento 24h</span>
        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Orçamento sem compromisso</span>
        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Honestidade garantida</span>
       </div>
      </div>
      <div className="flex justify-center lg:justify-end">
       <WhatsAppMockup />
      </div>
     </div>
    </div>
   </section>

   {/* Testimonials */}
   <section id="depoimentos" className="pt-20 md:pt-28 pb-16 md:pb-24 relative overflow-hidden">
    <div className="mx-auto px-4 max-w-[1320px]">

     {/* Header */}
     <div className="text-center max-w-3xl mx-auto mb-10 anim">
      <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
       <span className="w-8 h-px bg-primary/40" />
       Avaliações Google
       <span className="w-8 h-px bg-primary/40" />
      </span>
      <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-4 leading-tight">
       O que dizem quem já <span className="text-primary">confiou</span> na Gilmar Fretes
      </h2>
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
       Cada avaliação é de um <strong className="text-foreground">cliente real de Uberlândia</strong> que viveu a experiência de perto.<br />Veja por que a Gilmar Fretes é a empresa mais indicada para fretes e mudanças na região.
      </p>
     </div>

     {/* Google rating summary com movimento */}
     <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 anim">
      <div className="relative group [perspective:1200px]">
       {/* Glow pulsante */}
       <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/30 via-[#FBBC05]/20 to-primary/30 blur-2xl opacity-60 lp-glow-breathe" />
       {/* Card */}
       <div className="relative flex items-center gap-5 bg-card border border-border rounded-2xl px-7 py-5 shadow-[0_20px_50px_-15px_oklch(0.32_0.08_250/0.35)] lp-score-float transition-transform duration-500 group-hover:[transform:rotateX(8deg)_rotateY(-8deg)_scale(1.04)]">
        {/* G animado */}
        <div className="relative shrink-0 lp-spin-slow">
         <svg viewBox="0 0 48 48" className="w-12 h-12" aria-label="Google">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.08 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-3.58-13.46-8.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
         </svg>
        </div>
        <div className="text-left">
         <div className="flex items-baseline gap-2">
          <div className="font-display text-5xl font-bold leading-none bg-gradient-to-br from-foreground to-primary bg-clip-text text-transparent">5,0</div>
          <div className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">EXCELENTE</div>
         </div>
         <div className="flex gap-0.5 text-[#FBBC05] my-1.5">
          {[...Array(5)].map((_,i) => (
           <Star key={i} className="w-5 h-5 fill-current lp-star-twinkle" style={{animationDelay: `${i*180}ms`}} />
          ))}
         </div>
         <div className="text-xs text-muted-foreground font-medium">Baseado em <strong className="text-foreground">avaliações reais</strong> no Google</div>
         <div className="mt-1.5 inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full lp-badge-bounce">
          <span className="relative flex w-2 h-2"><span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 lp-pulse-dot"/><span className="relative inline-flex w-2 h-2 rounded-full bg-primary"/></span>
          <span><span className="lp-count-up font-display text-sm">350</span>+ avaliações</span>
         </div>
        </div>
        {/* Brilho diagonal */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
         <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] lp-shine-sweep" />
        </div>
       </div>
      </div>

      {/* Stats laterais */}
      <div className="hidden md:flex flex-col gap-2 text-sm">
       <div className="flex items-center gap-2 text-foreground"><CheckCircle2 className="w-4 h-4 text-whatsapp" /> <span><strong>100%</strong> dos clientes recomendam</span></div>
       <div className="flex items-center gap-2 text-foreground"><CheckCircle2 className="w-4 h-4 text-whatsapp" /> <span>Resposta em <strong>menos de 5 min</strong></span></div>
       <div className="flex items-center gap-2 text-foreground"><CheckCircle2 className="w-4 h-4 text-whatsapp" /> <span><strong>Zero reclamações</strong> em todo histórico</span></div>
      </div>
     </div>

     {/* Review cards carousel */}
     <div className="group overflow-hidden rounded-xl">
      <div className="flex items-start gap-4 w-max animate-carousel group-hover:[animation-play-state:paused] pb-2">
       {[...testimonials, ...testimonials].map((t, i) => (
        <div key={i} className="w-72 rounded-2xl p-5 shrink-0 shadow-[0_16px_48px_-12px_oklch(0.32_0.08_250/0.18)] -translate-y-1 lp-glass-card lp-card-hover">
         {/* Card header */}
         <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
           <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
            {t.initials}
           </div>
           <div>
            <div className="font-semibold text-sm leading-tight line-clamp-1">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.date}</div>
           </div>
          </div>
          <svg viewBox="0 0 48 48" className="w-5 h-5 shrink-0 mt-0.5 ml-1" aria-label="Google">
           <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.08 17.74 9.5 24 9.5z"/>
           <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
           <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
           <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-3.58-13.46-8.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
           <path fill="none" d="M0 0h48v48H0z"/>
          </svg>
         </div>
         {/* Stars */}
         <div className="flex gap-0.5 text-[#FBBC05] mb-3">
          {[...Array(t.stars)].map((_,j) => <Star key={j} className="w-3.5 h-3.5 fill-current" />)}
         </div>
         {/* Review text */}
         <p className="text-foreground/80 text-sm leading-relaxed">{t.text}</p>
        </div>
       ))}
      </div>
     </div>

     {/* CTA buttons */}
     <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 anim">
      <a
       href={GOOGLE_REVIEW_LINK}
       target="_blank"
       rel="noopener noreferrer"
       className="inline-flex items-center gap-2.5 bg-white border-2 border-[#4285F4] text-[#4285F4] px-6 py-3.5 rounded-lg font-semibold hover:bg-[#4285F4] hover:text-white hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 shadow-sm"
      >
       <svg viewBox="0 0 48 48" className="w-5 h-5 shrink-0">
        <path fill="currentColor" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.08 17.74 9.5 24 9.5z"/>
        <path fill="currentColor" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="currentColor" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="currentColor" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-3.58-13.46-8.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
       </svg>
       Deixar minha avaliação no Google
      </a>
      <a href={WA_CHAT} target="_blank" rel="noopener" onClick={() => trackClick("whatsapp_regiao", WA_CHAT)} className="inline-flex items-center gap-2 bg-whatsapp text-whatsapp-foreground px-6 py-3.5 rounded-lg font-semibold hover:brightness-110 hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 shadow-[var(--shadow-card)]">
       <MessageCircle className="w-5 h-5" /> Solicitar meu frete agora
      </a>
     </div>

    </div>
   </section>

   {/* About */}
   <section id="quem-somos" className="py-16 md:py-24 scroll-mt-24">
    <div className="container mx-auto px-4 max-w-5xl">
     <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

      {/* Logo */}
      <div className="shrink-0 anim anim-scale group [perspective:1000px]">
       <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-3xl bg-white border border-border flex items-center justify-center p-6 shadow-md transition-all duration-500 ease-out group-hover:shadow-[0_25px_60px_-15px_oklch(0.32_0.08_250/0.45)] group-hover:-translate-y-2 group-hover:[transform:translateY(-8px)_rotateX(6deg)_rotateY(-6deg)] group-hover:border-primary/40 overflow-hidden">
        {/* Glow azul atrás */}
        <div className="absolute -inset-2 rounded-3xl bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        {/* Brilho diagonal (shine) */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1100ms] ease-out bg-[linear-gradient(115deg,transparent_30%,oklch(0.32_0.08_250/0.18)_50%,transparent_70%)]" />
        <img src={logoImage} alt={EMPRESA.nome} className="relative w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />
       </div>
      </div>

      {/* Content */}
      <div className="flex-1 anim anim-right">
       <span className="text-primary font-semibold text-sm uppercase tracking-wider">Institucional</span>
       <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">Conheça a {EMPRESA.nome}</h2>
       <p className="text-muted-foreground leading-relaxed mb-8">{EMPRESA.sobreTexto}</p>
       <div className="grid grid-cols-2 gap-3">
        {/* MapPin — radar pulsando */}
        <div className="group relative overflow-hidden flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 lp-card-hover transition-colors duration-300 hover:!bg-primary hover:!border-primary cursor-default">
         <div className="relative w-7 h-7 shrink-0 flex items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-primary/20 lp-radar-ping" />
          <span className="absolute inset-0 rounded-full bg-primary/10 lp-radar-ping" style={{animationDelay:"0.9s"}} />
          <MapPin className="relative w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
         </div>
         <div className="text-sm font-semibold group-hover:text-white transition-colors duration-300">Todos os bairros de Uberlândia e região</div>
        </div>

        {/* Users — avatares animados */}
        <div className="group relative overflow-hidden flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 lp-card-hover transition-colors duration-300 hover:!bg-primary hover:!border-primary cursor-default">
         <div className="relative w-7 h-7 shrink-0 flex items-center justify-center">
          <Users className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300 lp-users-bob" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-success ring-2 ring-card lp-pulse-dot" />
         </div>
         <div className="text-sm font-semibold group-hover:text-white transition-colors duration-300">Centenas de clientes atendidos</div>
        </div>

        {/* Truck — caminhão dirigindo */}
        <div className="group relative overflow-hidden flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 lp-card-hover transition-colors duration-300 hover:!bg-primary hover:!border-primary cursor-default">
         <div className="relative w-7 h-7 shrink-0 overflow-hidden">
          <Truck className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300 lp-truck-drive absolute top-1/2 -translate-y-1/2" />
         </div>
         <div className="text-sm font-semibold group-hover:text-white transition-colors duration-300">Frota própria e organizada</div>
         <span className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent lp-road-line" />
        </div>

        {/* Star — estrelinhas brilhando em sequência */}
        <div className="group relative overflow-hidden flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 lp-card-hover transition-colors duration-300 hover:!bg-primary hover:!border-primary cursor-default">
         <div className="relative w-7 h-7 shrink-0 flex items-center justify-center">
          <Star className="w-5 h-5 text-primary fill-primary group-hover:text-white group-hover:fill-white transition-colors duration-300 lp-star-twinkle" />
         </div>
         <div className="flex flex-col">
          <div className="text-sm font-semibold group-hover:text-white transition-colors duration-300">Avaliação positiva no Google</div>
          <div className="flex gap-0.5 mt-0.5">
           {[0,1,2,3,4].map(i => (
            <Star key={i} className="w-2.5 h-2.5 text-amber-400 fill-amber-400 group-hover:text-white group-hover:fill-white lp-star-twinkle" style={{animationDelay:`${i*180}ms`}} />
           ))}
          </div>
         </div>
        </div>
       </div>
      </div>

     </div>
    </div>
   </section>


   {/* FAQ */}
   <section id="faq" className="pt-20 md:pt-28 pb-16 md:pb-24 relative overflow-hidden">
    <div className="container mx-auto px-4 max-w-3xl">
     <div className="text-center mb-12 anim">
      <span className="text-primary font-semibold text-sm uppercase tracking-wider">Tire suas dúvidas</span>
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-3">
       Perguntas Frequentes sobre{" "}
       <span className="text-primary">Fretes em Uberlândia</span>
      </h2>
      <p className="text-muted-foreground text-sm max-w-xl mx-auto">
       Reunimos as dúvidas mais comuns de quem precisa de frete em Uberlândia com mais clareza, agilidade e segurança.
      </p>
     </div>
     <div className="space-y-3">
      {faqs.map((f, i) => (
       <div
        key={i}
        className={`group rounded-xl overflow-hidden border transition-all duration-300 ${
         openFaq === i
          ? "bg-primary border-primary shadow-xl"
          : "bg-card border-border hover:bg-primary hover:border-primary hover:shadow-xl"
        }`}
       >
        <button
         onClick={() => setOpenFaq(openFaq === i ? null : i)}
         className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        >
         <span className={`font-semibold leading-snug transition-colors duration-300 ${openFaq === i ? "text-white" : "text-foreground group-hover:text-white"}`}>
          {f.q}
         </span>
         <ChevronDown className={`w-5 h-5 shrink-0 transition-all duration-300 ${openFaq === i ? "rotate-180 text-white/80" : "text-primary group-hover:text-white"}`} />
        </button>
        {openFaq === i && (
         <div className="px-5 pb-5">
          <p className="text-white/85 leading-relaxed mb-5 text-sm">{f.a}</p>
          <div className="flex flex-wrap gap-3">
           <a
            href={WA_LINK}
            target="_blank"
            rel="noopener"
            onClick={() => trackClick("whatsapp_depoimentos", WA_LINK)}
            className="inline-flex items-center gap-2 bg-whatsapp text-whatsapp-foreground px-4 py-2.5 rounded-lg font-semibold text-sm hover:brightness-110 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 shadow-md"
           >
            <MessageCircle className="w-4 h-4" /> Chamar no WhatsApp
           </a>
           <a
            href={`tel:+${EMPRESA.telefoneRaw}`}
            className="inline-flex items-center gap-2 bg-white/15 text-white border border-white/30 px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/25 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
           >
            <Phone className="w-4 h-4" /> Ligar agora
           </a>
          </div>
         </div>
        )}
       </div>
      ))}
     </div>
    </div>
   </section>

   {/* Final CTA */}
   <section id="contato-final" className="pt-20 md:pt-28 pb-16 md:pb-24 relative overflow-hidden lp-cta-bg">
    {/* Camadas decorativas */}
    <div className="absolute inset-0 bg-[image:var(--gradient-cta)]" />
    <div className="absolute inset-0 lp-cta-grid opacity-[0.18] pointer-events-none" />
    <div className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-blue-300/20 blur-3xl lp-blob-float pointer-events-none" />
    <div className="absolute -bottom-40 -right-20 w-[560px] h-[560px] rounded-full bg-indigo-500/20 blur-3xl lp-blob-float pointer-events-none" style={{animationDelay:"-3s"}} />
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-white/10 blur-3xl pointer-events-none" />
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-primary/40 pointer-events-none" />

    <div className="mx-auto px-4 max-w-[1320px] relative text-center text-white">
     <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/25 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5 anim">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 lp-pulse-dot" />
      Atendimento agora
     </span>
     <h2 className="font-display text-3xl md:text-5xl font-bold mb-5 max-w-3xl mx-auto leading-tight anim drop-shadow-[0_2px_20px_rgba(0,0,0,0.25)]">Pronto para Resolver Seu Frete em Uberlândia?</h2>
     <p className="max-w-2xl mx-auto mb-8 opacity-95 text-lg anim">Seja uma mudança residencial, comercial ou um mini frete, a {EMPRESA.nome} está pronta para atender você com agilidade, equipe preparada e preço justo em Uberlândia. Não deixe para depois o que pode ser resolvido hoje.</p>
     <div className="flex flex-wrap gap-3 justify-center mb-7">
      <a href={WA_LINK} target="_blank" rel="noopener" onClick={() => trackClick("whatsapp_final_cta", WA_LINK)} className="inline-flex items-center gap-2 bg-whatsapp text-whatsapp-foreground px-7 py-4 rounded-lg font-semibold hover:brightness-110 active:scale-[0.97] transition-all duration-200 lp-glow-whatsapp">
       <MessageCircle className="w-5 h-5" /> Falar pelo WhatsApp agora
      </a>
      <a href={WA_LINK} target="_blank" rel="noopener" onClick={() => trackClick("whatsapp_final_cta_secondary", WA_LINK)} className="inline-flex items-center gap-2 bg-white/15 backdrop-blur text-white px-7 py-4 rounded-lg font-semibold hover:bg-white/25 hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 border border-white/30">
       Solicitar Orçamento
      </a>
     </div>
     <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm opacity-95">
      <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Atendimento 24h</span>
      <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Uberlândia e região</span>
      <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Orçamento sem compromisso</span>
     </div>
    </div>
   </section>

   {/* Footer */}
   <footer className="relative bg-primary text-primary-foreground pt-14 pb-6 overflow-hidden lp-footer-bg">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
    <div className="absolute -top-24 right-10 w-[420px] h-[420px] rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
    <div className="absolute -bottom-24 -left-10 w-[380px] h-[380px] rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
    <div className="absolute inset-0 lp-footer-grid opacity-[0.06] pointer-events-none" />
    <div className="relative mx-auto px-4 max-w-[1320px]">

     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
      <div>
       <div className="mb-4">
        <div className="inline-block bg-white rounded-xl p-2">
          <img src={logoImage} alt={EMPRESA.nome} style={{height: '96px', width: 'auto'}} className="object-contain" />
        </div>
       </div>
       <p className="text-sm opacity-80 leading-relaxed">{EMPRESA.footerDescricao}</p>
      </div>
      <div>
       <h3 className="font-display font-bold mb-4">Contato</h3>
       <ul className="space-y-2.5 text-sm opacity-90">
        <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4" /> <a href={WA_BASIC} className="hover:underline">{EMPRESA.telefone}</a></li>
        <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> <a href={`tel:+${EMPRESA.telefoneRaw}`} className="hover:underline">{EMPRESA.telefone}</a></li>
        <li className="flex items-center gap-2"><Clock className="w-4 h-4" /> {EMPRESA.horario}</li>
        <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {EMPRESA.enderecoCompleto}</li>
       </ul>
       {/* Callback form — mobile only, below contact list */}
       <div className="md:hidden mt-6 bg-white rounded-2xl p-5 shadow-xl">
        <h3 className="font-display font-bold text-base mb-0.5 text-foreground">Se desejar, ligamos pra você</h3>
        <p className="text-muted-foreground text-xs mb-4">Deixe seu nome e telefone. Retornamos o mais rápido possível.</p>
        <form
         className="space-y-3"
         onSubmit={async (e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget as HTMLFormElement);
          const nome = fd.get("nome") as string;
          const tel = fd.get("tel") as string;
          const tipo = fd.get("tipo") as string;
          const waUrl = `https://wa.me/${EMPRESA.telefoneRaw}?text=${encodeURIComponent(`Olá, estou no seu site! Sou ${nome} e gostaria de um orçamento para ${tipo}. Meu telefone é ${tel} 🚛`)}`;
          await saveLead({ nome, telefone: tel, origem: "footer", observacoes: `Serviço: ${tipo}` });
          await trackClick("whatsapp_footer", waUrl);
          window.open(waUrl, "_blank");
         }}
        >
         <input name="nome" required maxLength={100} placeholder="Seu nome" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm" />
         <input name="tel" required maxLength={20} placeholder="(00) 00000-0000" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm" />
         <select name="tipo" required className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm">
          <option value="">Tipo de serviço...</option>
          {EMPRESA.services.map(s => (
           <option key={s.title}>{s.title}</option>
          ))}
          <option>Outro</option>
         </select>
         <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-lg font-semibold text-sm hover:brightness-110 active:scale-[0.97] transition-all duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          Quero que me liguem
         </button>
         <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          Seus dados serão usados apenas para contato.
         </p>
        </form>
       </div>
      </div>
      <div>
       <h3 className="font-display font-bold mb-4">Serviços</h3>
       <ul className="space-y-2 text-sm opacity-90">
        {EMPRESA.services.map((s, i) => (
         <li key={i}><a href="#servicos" onClick={e => { e.preventDefault(); smoothScrollTo("servicos"); }} className="hover:underline">{s.title}</a></li>
        ))}
       </ul>
      </div>
      <div>
       <h3 className="font-display font-bold mb-3">Legal</h3>
       <ul className="space-y-2 text-sm opacity-90">
        <li><a href="#" className="hover:underline">Política de Privacidade</a></li>
        <li><a href="#" className="hover:underline">Termos de Uso</a></li>
       </ul>
      </div>
     </div>
     <div className="border-t border-white/15 pt-6 text-xs opacity-75 text-center">
      {EMPRESA.copyright} · {EMPRESA.cidadeEstado}
     </div>
    </div>
   </footer>

   {/* Floating Avatar WhatsApp */}
   <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
    {/* Balão de fala */}
    {chatBubble && (
     <div className="relative animate-fade-up lp-bubble-bob">
      <a
       href={WA_LINK}
       target="_blank" rel="noopener"
       onClick={() => trackClick("whatsapp_avatar_bubble", WA_BASIC)}
       className="flex items-center gap-2 bg-white rounded-2xl rounded-br-none px-4 py-3 shadow-xl border border-border hover:shadow-2xl transition-shadow duration-200"
      >
       <span className="text-sm font-semibold text-foreground whitespace-nowrap leading-tight">
        <span className="lp-typing-cursor">Clique aqui e solicite</span><br />um orçamento rápido!
       </span>
      </a>
      {/* Pontinha do balão apontando para baixo */}
      <div className="absolute -bottom-2 right-6 w-4 h-3 bg-white border-r border-b border-border" style={{clipPath:'polygon(0 0, 100% 0, 50% 100%)'}} />
      <button
       onClick={e => { e.stopPropagation(); setChatBubble(false); }}
       className="absolute -top-2 -right-2 w-5 h-5 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition"
      ><X className="w-3 h-3" /></button>
     </div>
    )}

    {/* Avatar feminino */}
    <a
     href={WA_LINK}
     target="_blank" rel="noopener"
     onClick={() => trackClick("whatsapp_avatar", WA_BASIC)}
     aria-label="Falar pelo WhatsApp"
     className="w-16 h-16 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 relative shrink-0 overflow-hidden border-[3px] border-white lp-avatar-pulse"
    >
     {/* Anéis de pulso */}
     <span aria-hidden className="absolute inset-0 rounded-full lp-ring-ping bg-emerald-400/40" />
     <span aria-hidden className="absolute inset-0 rounded-full lp-ring-ping lp-ring-ping-delay bg-emerald-400/30" />
     <img src={avatarAtendente} alt={`Atendente ${EMPRESA.nome}`} className="w-full h-full object-cover object-top relative z-10" />
     <span className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-green-400 border-2 border-white z-20 lp-pulse-dot" />
    </a>
   </div>

   <ExitPopup />
  </div>
 );
}

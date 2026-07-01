interface SideNavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

const sections: { id: string; label: string }[] = [
  { id: "inicio", label: "Início" },
  { id: "servicos", label: "Serviços" },
  { id: "como-funciona", label: "Como Funciona" },
  { id: "diferenciais", label: "Diferenciais" },
  { id: "orcamento", label: "Faça seu Orçamento" },
  { id: "depoimentos", label: "Depoimentos" },
  { id: "quem-somos", label: "Quem Somos" },
  { id: "faq", label: "FAQ" },
  { id: "contato-final", label: "Contato" },
];

export function SideNav({ activeSection, onNavigate }: SideNavProps) {
  return (
    <nav
      aria-label="Navegação de seções"
      className="hidden lg:flex fixed left-5 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-7 px-2 py-9 rounded-full bg-white/85 backdrop-blur-md border border-border shadow-[0_10px_30px_-10px_oklch(0.32_0.08_250/0.25)]"
    >
      {sections.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <div key={id} className="group relative flex items-center">
            <button
              type="button"
              onClick={() => onNavigate(id)}
              aria-label={label}
              aria-current={isActive ? "true" : undefined}
              className="flex items-center justify-center h-4 w-8 cursor-pointer"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ease-out ${
                  isActive
                    ? "w-6 bg-primary"
                    : "w-5 bg-primary/25 group-hover:w-6 group-hover:bg-primary"
                }`}
              />
            </button>
            {/* Floating label — clickable & hoverable */}
            <button
              type="button"
              onClick={() => onNavigate(id)}
              tabIndex={-1}
              className="absolute left-full ml-3 whitespace-nowrap bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg transition-all duration-200 cursor-pointer hover:brightness-110 opacity-0 -translate-x-1 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto"
            >
              {label}
            </button>
          </div>
        );
      })}
    </nav>
  );
}

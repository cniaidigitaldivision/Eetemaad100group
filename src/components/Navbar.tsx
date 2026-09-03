import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Home, Building2, Gem, Sparkles, Plane } from "lucide-react";
import logo from "@/assets/logo.png";

const NAV = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Group Companies", href: "/#group-companies" },
  { name: "Contact", href: "/contact" }
];

const COMPANIES = [
  { n: "01", icon: Home, name: "Gulshan e Chitral Homes Pvt Ltd", slug: "gulshan-e-chitral-homes", tag: "Residential Real Estate" },
  { n: "02", icon: Building2, name: "GC Homes Pvt Ltd", slug: "gc-homes", tag: "Property Development" },
  { n: "03", icon: Gem, name: "Chitral Gemstone Pvt Ltd", slug: "chitral-gemstone", tag: "Precious Gemstones" },
  { n: "04", icon: Sparkles, name: "GC Royal Emporium Chitral Pvt Ltd", slug: "gc-royal-emporium", tag: "Premium Retail" },
  {
    n: "05",
    icon: Plane,
    name: "GITA (Gulshan International Travel Agency Pvt Ltd)",
    slug: "gita-travel",
    tag: "International Travel",
  },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 md:px-10">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="ETEMAAD100 Group logo" className="h-14 w-14 md:h-16 md:w-16 object-contain" />
          <span className="text-[11px] font-bold leading-[1.15] tracking-[0.08em] text-foreground">
            ETEMAAD100
            <br />
            GROUP
          </span>
        </Link>

        {/* Mobile Hamburger Menu */}
        <button 
          className="block md:hidden text-foreground hover:text-brand-bright transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => {
            if (item.name === "Group Companies") {
              return (
                <div key={item.name} className="relative group">
                  <Link
                    to={item.href}
                    className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground py-2"
                  >
                    {item.name}
                  </Link>
                  {/* Dropdown Menu Wrapper with transparent bridge */}
                  <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 z-50">
                    <div className="flex w-72 flex-col rounded-xl border border-white/10 bg-black/80 p-2 backdrop-blur-md">
                      {COMPANIES.map((c) => (
                        <Link
                          key={c.n}
                          to={`/companies/${c.slug}` as any}
                          className="block rounded-lg px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            
            return (
              <Link
                key={item.name}
                to={item.href as any}
                className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            );
          })}
          <Link
            to="/contact"
            className="rounded-full border border-brand-bright/70 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-brand/25"
          >
            Stay Tuned
          </Link>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-5 md:hidden shadow-2xl flex flex-col gap-6">
          <nav className="flex flex-col gap-4">
            {NAV.map((item) => (
              <div key={item.name} className="flex flex-col">
                <Link 
                  to={item.href as any} 
                  className="text-sm font-semibold uppercase tracking-wider text-white/90 hover:text-brand-bright py-2 border-b border-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.name === "Group Companies" && (
                  <div className="pl-4 mt-2 flex flex-col gap-2">
                    {COMPANIES.map((c) => (
                      <Link
                        key={c.n}
                        to={`/companies/${c.slug}` as any}
                        className="text-xs uppercase tracking-wider text-white/50 hover:text-white py-1.5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <Link
            to="/contact"
            className="text-center rounded-lg bg-brand-bright/10 border border-brand-bright/50 px-6 py-3 text-xs font-bold uppercase tracking-widest text-brand-bright transition-colors hover:bg-brand-bright/20 mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Stay Tuned
          </Link>
        </div>
      )}
    </header>
  );
}

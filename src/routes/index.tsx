import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import Markdown from "react-markdown";
import {
  Search, Code2, Share2, Megaphone, Star, ArrowRight, Menu, X, Mail, MessageCircle,
  Linkedin, Instagram, Twitter, Youtube, Quote,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rakesh Jangid — SEO & Digital Marketing Consultant India | RJ SEO Digital Tool" },
      { name: "description", content: "Rakesh Jangid helps Indian businesses grow organic traffic, leads and revenue with data-driven SEO, web development, social media and paid ads." },
      { property: "og:title", content: "Rakesh Jangid — SEO & Digital Marketing Consultant" },
      { property: "og:description", content: "Data-driven SEO and digital marketing that turns search traffic into revenue." },
    ],
  }),
  component: Index,
});

const NAV = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#seo-tool", label: "SEO Tool" },
  { href: "#results", label: "Results" },
  { href: "#contact", label: "Contact" },
];

const WHATSAPP = "919876543210";
const EMAIL = "hello@rjseodigital.in";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-visible"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="reveal mb-12 max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function CtaLink({ href, children, ghost }: { href: string; children: React.ReactNode; ghost?: boolean }) {
  return (
    <a
      href={href}
      className={
        ghost
          ? "inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:border-primary hover:text-primary"
          : "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:shadow-glow"
      }
    >
      {children}
    </a>
  );
}

function Index() {
  useReveal();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <SeoTool />
        <Results />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6" aria-label="Main">
        <a href="#top" className="font-display text-lg font-bold">
          Rakesh Jangid<span className="text-primary">.</span>
        </a>
        <ul className="hidden gap-8 text-sm text-muted-foreground md:flex">
          {NAV.map((n) => (
            <li key={n.href}><a href={n.href} className="transition hover:text-foreground">{n.label}</a></li>
          ))}
        </ul>
        <div className="hidden md:block"><CtaLink href="#contact">Get Free Audit</CtaLink></div>
        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <ul className="space-y-4 border-t border-border px-6 py-6 md:hidden">
          {NAV.map((n) => (
            <li key={n.href}><a href={n.href} onClick={() => setOpen(false)} className="block text-lg">{n.label}</a></li>
          ))}
          <li><CtaLink href="#contact">Get Free Audit</CtaLink></li>
        </ul>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 md:pb-32 md:pt-32">
        <p className="reveal inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> Taking 3 new clients for Q1
        </p>
        <h1 className="reveal mt-8 text-5xl font-bold leading-[1.02] md:text-7xl lg:text-8xl">
          Rakesh Jangid<br />
          <span className="text-muted-foreground">SEO & Digital</span><br />
          <span className="text-primary">Marketing Consultant</span>
        </h1>
        <p className="reveal mt-8 max-w-xl text-lg text-muted-foreground">
          I turn Google search into a predictable revenue channel for Indian businesses — with strategy you can measure, not guesswork.
        </p>
        <div className="reveal mt-10 flex flex-wrap gap-4">
          <CtaLink href="#contact">Get Your Free SEO Audit <ArrowRight size={16} /></CtaLink>
          <CtaLink href="#results" ghost>See Results</CtaLink>
        </div>
        <dl className="reveal mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-border pt-8">
          {[["120+", "Projects delivered"], ["8 yrs", "Experience"], ["₹14Cr+", "Client revenue driven"]].map(([n, l]) => (
            <div key={l}><dt className="sr-only">{l}</dt><dd className="font-display text-2xl font-bold text-primary md:text-4xl">{n}</dd><p className="mt-1 text-xs text-muted-foreground md:text-sm">{l}</p></div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function TrustBar() {
  const logos = ["UrbanNest", "SpiceRoute", "FitIndia+", "Kalakriti", "EduSpark", "GreenLeaf"];
  return (
    <section aria-label="Clients" className="border-y border-border bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-10 lg:flex-row lg:justify-between">
        <ul className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {logos.map((l) => (
            <li key={l} className="font-display text-lg font-semibold text-muted-foreground/60">{l}</li>
          ))}
        </ul>
        <div className="flex items-center gap-3 rounded-full border border-border px-5 py-2">
          <span className="font-display font-bold">G</span>
          <div className="flex text-primary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
          <span className="text-sm"><strong>4.9</strong> <span className="text-muted-foreground">· 87 Google reviews</span></span>
        </div>
      </div>
    </section>
  );
}

function About() {
  const skills = ["Technical SEO", "Local SEO", "Content Strategy", "Google Ads", "Meta Ads", "GA4 & GSC", "Next.js / WordPress", "CRO"];
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-[2fr_3fr]">
        <div className="reveal relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-card">
          <div className="bg-grid absolute inset-0" aria-hidden />
          <div className="absolute inset-0 flex items-center justify-center font-display text-8xl font-bold text-primary/30">RJ</div>
          <div className="absolute bottom-4 left-4 rounded-xl border border-border bg-background/80 px-4 py-3 backdrop-blur">
            <p className="font-display text-3xl font-bold text-primary">8+</p>
            <p className="text-xs text-muted-foreground">Years in SEO</p>
          </div>
        </div>
        <div>
          <SectionHead eyebrow="About" title="Search strategist, builder, numbers person." />
          <div className="reveal space-y-4 text-muted-foreground">
            <p>I'm Rakesh Jangid, a Jaipur-based SEO and digital marketing consultant. Since 2017 I've helped startups, D2C brands and local businesses across India climb Google and convert that traffic into customers.</p>
            <p>I built RJ SEO Digital Tool India to combine hands-on consulting with in-house tools that make audits faster and reporting crystal clear.</p>
          </div>
          <ul className="reveal mt-8 flex flex-wrap gap-2">
            {skills.map((s) => <li key={s} className="rounded-full border border-border px-4 py-1.5 text-sm">{s}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    { icon: Search, t: "Search Engine Optimization", d: "Technical audits, on-page, content and link building that compound month after month." },
    { icon: Code2, t: "Web Development", d: "Fast, SEO-ready websites built to load in under two seconds and convert visitors." },
    { icon: Share2, t: "Social Media Marketing", d: "Content calendars and community growth on Instagram, LinkedIn and YouTube." },
    { icon: Megaphone, t: "Paid Ads", d: "Google and Meta campaigns tuned for lowest cost per lead, tracked to revenue." },
  ];
  return (
    <section id="services" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHead eyebrow="Services" title="Everything you need to grow online." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, t, d }) => (
            <article key={t} className="reveal group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/50">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground"><Icon size={20} /></div>
              <h3 className="mt-6 text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SeoTool() {
  const [url, setUrl] = useState("");
  const [goals, setGoals] = useState("");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const run = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(""); setReport("");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), goals: goals.trim() }),
      });
      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? (res.status === 429 ? "Too many requests — please try again shortly." : "The audit couldn't be generated. Please try again later."));
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let text = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += dec.decode(value, { stream: true });
        setReport(text);
      }
      if (!text.trim()) throw new Error("The audit couldn't be generated. Please try again later.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  const field = "w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary";
  return (
    <section id="seo-tool" className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHead eyebrow="RJ SEO Tool · AI-powered" title="Get an instant, prioritized SEO audit." sub="Share your website and goals — get a ranked action plan with quick wins, core fixes and long-term growth moves." />
        <form onSubmit={run} className="reveal grid max-w-3xl gap-4">
          <div>
            <label htmlFor="site" className="mb-1.5 block text-sm">Website URL</label>
            <input id="site" type="url" required maxLength={300} placeholder="https://yourwebsite.in" value={url} onChange={(e) => setUrl(e.target.value)} className={field} />
          </div>
          <div>
            <label htmlFor="goals" className="mb-1.5 block text-sm">Business goals</label>
            <textarea id="goals" required minLength={3} maxLength={1000} rows={3} placeholder="e.g. Rank for 'interior designer in Jaipur' and get 30 more enquiries a month" value={goals} onChange={(e) => setGoals(e.target.value)} className={field} />
          </div>
          <button disabled={loading} className="justify-self-start rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:shadow-glow disabled:opacity-60">
            {loading ? "Analyzing…" : "Generate SEO Audit"}
          </button>
        </form>
        {error && <p className="mt-6 text-sm text-destructive">{error}</p>}
        {(report || loading) && (
          <article className="mt-10 max-w-3xl rounded-2xl border border-border bg-background p-6 md:p-8 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-primary [&_h2:first-child]:mt-0 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-5 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_p]:mt-2 [&_p]:text-muted-foreground [&_li]:text-muted-foreground [&_strong]:text-foreground">
            {report ? <Markdown>{report}</Markdown> : <p className="animate-pulse">Analyzing your site and goals…</p>}
            {report && !loading && <div className="mt-8"><CtaLink href="#contact">Get the full manual audit <ArrowRight size={16} /></CtaLink></div>}
          </article>
        )}
      </div>
    </section>
  );
}

function Bars({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex h-24 items-end gap-1.5" aria-hidden>
      {data.map((v, i) => (
        <div key={i} className="flex-1 rounded-t bg-primary" style={{ height: `${(v / max) * 100}%`, opacity: 0.3 + (i / data.length) * 0.7 }} />
      ))}
    </div>
  );
}

function Line({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${40 - (v / max) * 36}`).join(" ");
  return (
    <svg viewBox="0 0 100 40" className="h-24 w-full text-primary" preserveAspectRatio="none" aria-hidden>
      <polyline points={`0,40 ${pts} 100,40`} fill="currentColor" opacity="0.12" />
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function Results() {
  const cases = [
    { client: "UrbanNest Interiors · Jaipur", metric: "+180%", label: "organic traffic in 6 months", chart: <Line data={[10, 12, 15, 14, 20, 26, 31, 38]} /> },
    { client: "SpiceRoute Foods · D2C", metric: "+65%", label: "leads in 90 days", chart: <Bars data={[22, 25, 28, 30, 34, 38, 42]} /> },
    { client: "EduSpark Academy · Pune", metric: "3.2x", label: "ROAS on Google Ads", chart: <Line data={[8, 9, 14, 13, 18, 22, 25, 29]} /> },
  ];
  return (
    <section id="results" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHead eyebrow="Results" title="Numbers, not promises." />
        <div className="grid gap-4 md:grid-cols-3">
          {cases.map((c) => (
            <article key={c.client} className="reveal rounded-2xl border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.client}</p>
              <p className="mt-4 font-display text-5xl font-bold text-primary">{c.metric}</p>
              <p className="mt-1 text-sm">{c.label}</p>
              <div className="mt-6">{c.chart}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ["Audit", "A 40-point technical, content and competitor review of your site."],
    ["Strategy", "A prioritised 90-day roadmap focused on revenue-driving keywords."],
    ["Execute", "On-page fixes, content, links and campaigns — shipped weekly."],
    ["Report", "Clear monthly dashboards: rankings, traffic, leads and ROI."],
  ];
  return (
    <section className="border-t border-border bg-card/40" aria-labelledby="process-h">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="reveal mb-12"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Process</p><h2 id="process-h" className="mt-3 text-3xl font-bold md:text-5xl">How we work together.</h2></div>
        <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-border md:block" aria-hidden />
          {steps.map(([t, d], i) => (
            <li key={t} className="reveal relative">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-primary bg-background font-display text-sm font-bold text-primary">0{i + 1}</span>
              <h3 className="mt-5 text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    ["Rakesh took us from page 4 to the top 3 for our main keywords. Enquiries doubled within two quarters.", "Ananya Sharma", "Founder, UrbanNest Interiors"],
    ["Finally a marketer who explains the numbers. Our cost per lead dropped 40% in the first month.", "Vikram Mehta", "Director, SpiceRoute Foods"],
    ["Our new website loads instantly and actually ranks. The monthly reports are the clearest I've seen.", "Priya Nair", "CEO, EduSpark Academy"],
  ];
  return (
    <section className="border-t border-border" aria-labelledby="testi-h">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="reveal mb-12"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Testimonials</p><h2 id="testi-h" className="mt-3 text-3xl font-bold md:text-5xl">Clients who grew.</h2></div>
        <div className="grid gap-4 md:grid-cols-3">
          {t.map(([q, n, r]) => (
            <figure key={n} className="reveal flex flex-col rounded-2xl border border-border bg-card p-6">
              <Quote className="text-primary" size={24} />
              <blockquote className="mt-4 flex-1">"{q}"</blockquote>
              <figcaption className="mt-6 border-t border-border pt-4"><p className="font-semibold">{n}</p><p className="text-sm text-muted-foreground">{r}</p></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [err, setErr] = useState("");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim().slice(0, 100);
    const email = String(f.get("email") ?? "").trim().slice(0, 255);
    const msg = String(f.get("message") ?? "").trim().slice(0, 1000);
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !msg) return setErr("Please fill in all fields with a valid email.");
    setErr("");
    const body = `Name: ${name}\nEmail: ${email}\n\n${msg}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Free SEO Audit request")}&body=${encodeURIComponent(body)}`;
  };
  const input = "w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary";
  return (
    <section id="contact" className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
        <div>
          <SectionHead eyebrow="Contact" title="Let's grow your traffic." sub="Tell me about your business and I'll send a free audit within 48 hours." />
          <div className="reveal flex flex-col gap-3 sm:flex-row">
            <CtaLink href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Rakesh, I'd like a free SEO audit.")}`}><MessageCircle size={16} /> WhatsApp</CtaLink>
            <CtaLink href={`mailto:${EMAIL}`} ghost><Mail size={16} /> {EMAIL}</CtaLink>
          </div>
        </div>
        <form onSubmit={submit} className="reveal space-y-4 rounded-2xl border border-border bg-card p-6">
          <div><label htmlFor="name" className="mb-1.5 block text-sm">Name</label><input id="name" name="name" maxLength={100} required className={input} /></div>
          <div><label htmlFor="email" className="mb-1.5 block text-sm">Email</label><input id="email" name="email" type="email" maxLength={255} required className={input} /></div>
          <div><label htmlFor="message" className="mb-1.5 block text-sm">Message</label><textarea id="message" name="message" rows={5} maxLength={1000} required className={input} /></div>
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:shadow-glow">Send Message</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const company = [["About Us", "#about"], ["Gallery", "#results"], ["Guest Reviews", "#contact"], ["Blog", "#services"], ["FAQs", "#contact"], ["Contact Us", "#contact"]];
  const socials = [[Linkedin, "LinkedIn"], [Instagram, "Instagram"], [Twitter, "X"], [Youtube, "YouTube"]] as const;
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-bold">Rakesh Jangid<span className="text-primary">.</span></p>
          <p className="mt-3 text-sm text-muted-foreground">RJ SEO Digital Tool India — SEO & digital marketing from Jaipur, for all of India.</p>
          <ul className="mt-5 flex gap-3">
            {socials.map(([Icon, l]) => (
              <li key={l}><a href="#" aria-label={l} className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary"><Icon size={16} /></a></li>
            ))}
          </ul>
        </div>
        <nav aria-label="Footer"><h3 className="text-sm font-semibold">Navigate</h3><ul className="mt-4 space-y-2 text-sm text-muted-foreground">{NAV.map((n) => <li key={n.href}><a href={n.href} className="hover:text-primary">{n.label}</a></li>)}</ul></nav>
        <div><h3 className="text-sm font-semibold">Company</h3><ul className="mt-4 space-y-2 text-sm text-muted-foreground">{company.map(([l, h]) => <li key={l}><a href={h} className="hover:text-primary">{l}</a></li>)}</ul></div>
        <div><h3 className="text-sm font-semibold">Legal</h3><ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li><Link to="/legal/$page" params={{ page: "privacy" }} className="hover:text-primary">Privacy Policy</Link></li>
          <li><Link to="/legal/$page" params={{ page: "terms" }} className="hover:text-primary">Terms & Conditions</Link></li>
          <li><Link to="/legal/$page" params={{ page: "cancellation" }} className="hover:text-primary">Cancellation Policy</Link></li>
        </ul></div>
      </div>
      <p className="border-t border-border py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} RJ SEO Digital Tool India. All rights reserved.</p>
    </footer>
  );
}

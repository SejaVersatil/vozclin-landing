import {
  Activity,
  ArrowRight,
  AudioLines,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  LockKeyhole,
  MessageCircle,
  Mic2,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UsersRound,
  Workflow
} from "lucide-react";
import { HeroDynamicWord } from "./components/hero-dynamic-word";
import { RecordingSignalFlow } from "./components/recording-signal-flow";
import {
  audiences,
  differentiators,
  faqs,
  navItems,
  pricingPlans,
  problems,
  securityPoints,
  workflowSteps,
  type IconKey
} from "@/lib/site-content";

const heroProofPoints = [
  "Captação por voz para ditados e conversas",
  "Ficha revisável antes de copiar ou exportar",
  "Apoio à rotina clínica, não decisão autônoma"
];

const icons = {
  activity: Activity,
  audio: AudioLines,
  calendar: CalendarCheck2,
  check: CheckCircle2,
  clipboard: ClipboardCheck,
  clock: Clock3,
  file: FileCheck2,
  lock: LockKeyhole,
  message: MessageCircle,
  mic: Mic2,
  shield: ShieldCheck,
  spark: Sparkles,
  stethoscope: Stethoscope,
  users: UsersRound,
  workflow: Workflow
} satisfies Record<IconKey, typeof Activity>;

function IconBadge({ icon }: { icon: IconKey }) {
  const Icon = icons[icon];

  return (
    <span className="icon-badge" aria-hidden="true">
      <Icon size={20} strokeWidth={2.1} />
    </span>
  );
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" focusable="false">
        <rect x="1" y="1" width="38" height="38" rx="10" fill="#F7FFFC" stroke="#BFE7DF" strokeWidth="1.2" />
        <path
          d="M10.5 10.5l7.1 19.1c.72 1.95 3.54 1.97 4.3.04l7.6-19.14"
          fill="none"
          stroke="#08766F"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.4 22h2.9l1.25-3.2 2.55 6.6 1.45-3.4h3"
          fill="none"
          stroke="#12A99C"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function Home() {
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim();
  const demoHref = whatsappUrl || "#contato";

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="VozClin início">
          <BrandMark />
          <span>VozClin</span>
        </a>
        <nav className="nav-links" aria-label="Navegação principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="topbar-cta" href="#contato">
          <CalendarCheck2 size={17} />
          Agendar demonstração
        </a>
      </header>

      <section id="inicio" className="hero section-wrap">
        <div className="hero-copy">
          <div className="hero-visual" aria-hidden="true">
            <RecordingSignalFlow />
          </div>
          <h1 aria-label="Documentação clínica pelo poder da voz. Documentação clínica pelo comando da voz.">
            <span aria-hidden="true">
              <span className="hero-title-line">
                <span className="hero-title-word">Documentação</span>
                <span className="hero-title-word">clínica</span>
              </span>
              <span className="voice-gradient hero-title-voice">
                <span>pelo</span>
                {" "}
                <HeroDynamicWord />
                {" "}
                <span>da voz.</span>
              </span>
            </span>
          </h1>
          <p className="hero-lead">
            O VozClin transforma ditados e conversas clínicas em fichas estruturadas,
            revisáveis e prontas para uso pelo profissional.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="https://voxialaw.com/login">
              Testar VozClin
              <ArrowRight size={18} />
            </a>
            <a className="button secondary" href="#fluxo">
              Ver como funciona
            </a>
          </div>
          <div className="proof-strip hero-proof-strip" aria-label="Pontos de confiança">
            {heroProofPoints.map((point) => (
              <span key={point}>
                <CheckCircle2 size={16} />
                {point}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap problem-section" aria-labelledby="problema-title">
        <div className="section-heading">
          <p className="section-kicker">Dor operacional</p>
          <h2 id="problema-title">
            Documentar bem não deveria consumir o melhor horário da clínica.
          </h2>
          <p>
            O VozClin usa IA como camada de organização documental. A rotina
            reduz atrito, preserva a revisão humana e mantém os limites clínicos
            claros para o profissional.
          </p>
        </div>
        <div className="three-grid">
          {problems.map((problem) => (
            <article className="info-card" key={problem.title}>
              <IconBadge icon={problem.icon} />
              <h3>{problem.title}</h3>
              <p>{problem.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="fluxo" className="section-wrap workflow-section">
        <div className="workflow-intro">
          <p className="section-kicker">Fluxo VozClin</p>
          <h2>Voz, estrutura e revisão em um mesmo movimento.</h2>
          <p>
            O profissional registra a fala, recebe uma ficha estruturada e
            revisa o conteúdo antes de copiar, exportar ou usar no sistema da
            clínica.
          </p>
        </div>
        <div className="workflow-list">
          {workflowSteps.map((step, index) => (
            <article className="workflow-item" key={step.title}>
              <span className="step-count">0{index + 1}</span>
              <IconBadge icon={step.icon} />
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="planos" className="section-wrap pricing-section">
        <div className="section-heading pricing-heading">
          <p className="section-kicker">Planos VozClin</p>
          <h2>Escolha o plano ideal para sua rotina clínica.</h2>
          <p>
            Sem taxas ocultas. Cancele quando quiser. Todos os planos mantêm
            revisão humana, sessões temporárias e cuidado LGPD desde a
            demonstração.
          </p>
        </div>
        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <article
              className={plan.recommended ? "pricing-card recommended" : "pricing-card"}
              key={plan.name}
            >
              <div className="pricing-card-topline">
                <span className="pricing-segment">{plan.segment}</span>
                {plan.recommended ? <span className="recommended-badge">Recomendado</span> : null}
              </div>
              <h3>{plan.name}</h3>
              <div className="plan-price">
                <strong>{plan.price}</strong>
                <span>{plan.cadence}</span>
              </div>
              <p className="plan-quantity">{plan.quantity}</p>
              <ul className="plan-benefits">
                {plan.benefits.map((benefit) => (
                  <li key={benefit}>
                    <CheckCircle2 size={16} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="pricing-cta-panel">
          <div>
            <p className="cta-eyebrow">Próximo passo</p>
            <h3>
              Pronto para <span>revolucionar</span> sua documentação clínica?
            </h3>
          </div>
          <a className="button pricing-cta-button" href="https://voxialaw.com/login">
            Abrir plataforma
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section id="seguranca" className="security-band">
        <div className="section-wrap security-layout">
          <div>
            <p className="section-kicker">Confiança clínica</p>
            <h2>IA com limites explícitos e experiência desenhada para revisão.</h2>
            <p>
              O VozClin não é prontuário eletrônico, não faz diagnóstico, não
              prescreve e não substitui o profissional. A proposta é apoiar a
              organização da documentação clínica com responsabilidade.
            </p>
          </div>
          <div className="security-list">
            {securityPoints.map((point) => (
              <article className="security-point" key={point.title}>
                <IconBadge icon={point.icon} />
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="clinicas" className="section-wrap audience-section audience-flow-section">
        <div className="section-heading audience-flow-heading">
          <p className="section-kicker">Clínicas ideais</p>
          <h2>Para operações onde cada atendimento gera informação importante.</h2>
        </div>
        <div className="audience-grid audience-flow-grid">
          {audiences.map((audience, index) => (
            <article className="audience-card audience-flow-card" key={audience.title}>
              <IconBadge icon={audience.icon} />
              <span className="audience-step">0{index + 1}</span>
              <h3>{audience.title}</h3>
              <p>{audience.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap product-section" aria-labelledby="produto-title">
        <div className="product-story">
          <div>
            <p className="section-kicker">Produto clínico</p>
            <h2 id="produto-title">Um SaaS que prioriza segurança antes de parecer inteligente.</h2>
            <p>
              O VozClin privilegia clareza, precisão e cuidado operacional. A
              tecnologia existe para aliviar a documentação, sem tomar a decisão
              do profissional.
            </p>
          </div>
          <ul className="differentiator-list">
            {differentiators.map((item) => (
              <li key={item}>
                <CheckCircle2 size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" className="section-wrap faq-section">
        <div className="section-heading compact">
          <p className="section-kicker">FAQ</p>
          <h2>Perguntas frequentes antes da demonstração.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <article className="faq-item" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contato" className="section-wrap contact-section">
        <div className="contact-copy">
          <p className="section-kicker">Demonstração</p>
          <h2>Veja o VozClin aplicado à rotina da sua clínica.</h2>
          <p>
            A demonstração mostra como a documentação por voz pode entrar no
            fluxo da equipe sem substituir revisão, critério profissional ou
            sistemas já usados pela clínica.
          </p>
        </div>
        <div className="contact-panel">
          <div className="contact-status">
            <MessageCircle size={22} />
            <div>
              <strong>Canal de demonstrações</strong>
              <span>{whatsappUrl ? "WhatsApp oficial conectado" : "Atendimento comercial em preparação"}</span>
            </div>
          </div>
          <a className="button primary full" href={demoHref}>
            {whatsappUrl ? "Abrir WhatsApp" : "Agendar demonstração"}
            <ArrowRight size={18} />
          </a>
          <p className="contact-note">
            Use este canal para tirar dúvidas comerciais, entender os planos e
            agendar uma apresentação do VozClin.
          </p>
        </div>
      </section>

      <footer className="footer section-wrap">
        <a className="brand" href="#inicio">
          <BrandMark />
          <span>VozClin</span>
        </a>
        <p>
          Apoio à documentação clínica por voz com IA, fichas estruturadas e
          revisão humana obrigatória.
        </p>
      </footer>
    </main>
  );
}

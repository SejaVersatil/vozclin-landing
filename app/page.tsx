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
import Image from "next/image";
import {
  audiences,
  differentiators,
  faqs,
  navItems,
  problems,
  proofMetrics,
  securityPoints,
  workflowSteps,
  type IconKey
} from "@/lib/site-content";

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
      <Mic2 size={19} strokeWidth={2.2} />
    </span>
  );
}

function ProductPreview() {
  return (
    <div className="product-preview" aria-label="Prévia conceitual da interface VozClin">
      <div className="preview-toolbar">
        <span />
        <span />
        <span />
        <strong>Sessão clínica em revisão</strong>
      </div>
      <div className="preview-grid">
        <aside className="preview-sidebar">
          <div className="preview-brand">
            <BrandMark />
            <span>VozClin</span>
          </div>
          <div className="preview-tab active">Nova sessão</div>
          <div className="preview-tab">Modelos clínicos</div>
          <div className="preview-tab">Fichas em revisão</div>
          <div className="preview-tab">Segurança</div>
        </aside>
        <div className="preview-main">
          <div className="session-panel">
            <div>
              <p className="mini-label">Consulta ambulatorial</p>
              <h3>Grave, estruture e revise sem quebrar o ritmo da clínica.</h3>
              <p>
                Áudio tratado como apoio à documentação. Uso final somente após
                conferência profissional.
              </p>
            </div>
            <Image
              className="signal-map"
              src="/voice-clinical-map.svg"
              alt=""
              width="252"
              height="164"
              unoptimized
            />
          </div>
          <div className="preview-steps">
            <div>
              <Mic2 size={18} />
              <strong>Voz</strong>
              <span>captura guiada</span>
            </div>
            <div className="selected">
              <FileCheck2 size={18} />
              <strong>Ficha</strong>
              <span>campos estruturados</span>
            </div>
            <div>
              <CheckCircle2 size={18} />
              <strong>Revisão</strong>
              <span>validação humana</span>
            </div>
          </div>
          <div className="note-panel">
            <div className="note-head">
              <span>Ficha estruturada</span>
              <em>rascunho</em>
            </div>
            <div className="note-line wide" />
            <div className="note-line" />
            <div className="note-line short" />
          </div>
        </div>
      </div>
    </div>
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
          <p className="eyebrow">
            <ShieldCheck size={16} />
            Documentação clínica por voz com revisão humana
          </p>
          <h1>Documentação clínica por voz, revisada antes de virar ficha.</h1>
          <p className="hero-lead">
            O VozClin apoia clínicas e profissionais de saúde na transformação
            de ditados, áudios e conversas clínicas em fichas estruturadas,
            revisáveis e prontas para uso responsável.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#contato">
              Agendar demonstração
              <ArrowRight size={18} />
            </a>
            <a className="button secondary" href="#fluxo">
              Ver fluxo do produto
            </a>
          </div>
          <div className="proof-strip" aria-label="Pontos de confiança">
            {proofMetrics.map((metric) => (
              <div key={metric.label} className="proof-item">
                <IconBadge icon={metric.icon} />
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
        <ProductPreview />
      </section>

      <section className="section-wrap problem-section" aria-labelledby="problema-title">
        <div className="section-heading">
          <p className="section-kicker">Dor operacional</p>
          <h2 id="problema-title">
            Documentar bem não deveria consumir o melhor horário da clínica.
          </h2>
          <p>
            A experiência posiciona a IA como uma camada de organização. Ela
            reduz atrito, preserva a revisão humana e mantém os limites clínicos
            claros.
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
            A landing apresenta o produto como uma rotina simples e auditável:
            primeiro a fala, depois a ficha estruturada, por fim a conferência
            profissional.
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

      <section id="clinicas" className="section-wrap audience-section">
        <div className="section-heading">
          <p className="section-kicker">Clínicas ideais</p>
          <h2>Para operações onde cada atendimento gera informação importante.</h2>
        </div>
        <div className="audience-grid">
          {audiences.map((audience) => (
            <article className="audience-card" key={audience.title}>
              <Stethoscope size={22} />
              <h3>{audience.title}</h3>
              <p>{audience.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap product-section" aria-labelledby="produto-title">
        <div className="product-story">
          <div>
            <p className="section-kicker">Direção de produto</p>
            <h2 id="produto-title">Um SaaS clínico que parece seguro antes de parecer esperto.</h2>
            <p>
              A linguagem visual evita exageros de IA e privilegia clareza,
              precisão, hierarquia e cuidado. O produto deve transmitir que a
              tecnologia existe para aliviar a documentação, não para tomar a
              decisão do profissional.
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
          <h2>Perguntas que a landing responde sem forçar promessa.</h2>
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
            O canal oficial será ativado para conversas comerciais, triagem de
            interesse e agendamento das primeiras apresentações.
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

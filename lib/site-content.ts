export type IconKey =
  | "activity"
  | "audio"
  | "calendar"
  | "check"
  | "clipboard"
  | "clock"
  | "file"
  | "lock"
  | "message"
  | "mic"
  | "shield"
  | "spark"
  | "stethoscope"
  | "users"
  | "workflow";

type IconCard = {
  icon: IconKey;
  title: string;
  text: string;
};

type Metric = {
  value: string;
  label: string;
  icon: IconKey;
};

export const navItems = [
  { label: "Fluxo", href: "#fluxo" },
  { label: "Segurança", href: "#seguranca" },
  { label: "Clínicas", href: "#clinicas" },
  { label: "FAQ", href: "#faq" }
];

export const proofMetrics: Metric[] = [
  {
    value: "3 etapas",
    label: "voz, estrutura e revisão",
    icon: "workflow"
  },
  {
    value: "100%",
    label: "uso final após conferência humana",
    icon: "check"
  },
  {
    value: "LGPD",
    label: "privacidade tratada como requisito",
    icon: "shield"
  }
];

export const problems: IconCard[] = [
  {
    icon: "clock",
    title: "Horas perdidas depois da consulta",
    text: "Profissionais precisam reconstruir detalhes do atendimento quando a agenda já seguiu para o próximo paciente."
  },
  {
    icon: "clipboard",
    title: "Informação clínica dispersa",
    text: "Anotações, áudios e memória ficam separados, criando atrito para montar uma ficha clara e revisável."
  },
  {
    icon: "activity",
    title: "Pressa em rotinas de alto volume",
    text: "Clínicas particulares precisam documentar melhor sem transformar cada atendimento em retrabalho operacional."
  }
];

export const workflowSteps: IconCard[] = [
  {
    icon: "mic",
    title: "Capture a sessão",
    text: "O profissional dita ou grava informações relevantes do atendimento, com foco na rotina real da clínica."
  },
  {
    icon: "file",
    title: "Estruture a ficha",
    text: "O VozClin organiza a fala em campos clínicos revisáveis, mantendo o conteúdo como apoio documental."
  },
  {
    icon: "check",
    title: "Revise antes de usar",
    text: "A ficha permanece como rascunho até a conferência do profissional responsável."
  }
];

export const securityPoints: IconCard[] = [
  {
    icon: "users",
    title: "Revisão humana obrigatória",
    text: "A experiência reforça que o profissional valida a ficha antes do uso."
  },
  {
    icon: "lock",
    title: "Privacidade desde a narrativa",
    text: "A landing evita promessas vagas e comunica cuidado com LGPD e processos internos."
  },
  {
    icon: "shield",
    title: "Limites clínicos explícitos",
    text: "O VozClin não é prontuário eletrônico, diagnóstico, prescrição ou substituto profissional."
  }
];

export const audiences = [
  {
    title: "Fisioterapia e reabilitação",
    text: "Avaliações, evoluções, planos terapêuticos e acompanhamento de progresso."
  },
  {
    title: "Clínicas médicas particulares",
    text: "Registros de consulta, histórico, orientações e organização pós-atendimento."
  },
  {
    title: "Clínicas multidisciplinares",
    text: "Padronização de fichas entre especialidades e equipes com rotinas distintas."
  },
  {
    title: "Dermatologia e estética",
    text: "Histórico, queixas, condutas revisáveis e acompanhamento com linguagem clara."
  }
];

export const differentiators = [
  "Produto apresentado como apoio operacional, não como substituto clínico.",
  "Fluxo visual centrado em voz, estrutura e revisão.",
  "Contato provisório preparado para evoluir para WhatsApp oficial.",
  "Copy B2B em português, pensada para clínicas particulares."
];

export const faqs = [
  {
    question: "O VozClin substitui o prontuário da clínica?",
    answer: "Não. O VozClin deve ser posicionado como apoio para documentação clínica por voz, com revisão humana antes de qualquer uso."
  },
  {
    question: "A IA faz diagnóstico ou prescrição?",
    answer: "Não. A proposta é organizar informação falada em uma ficha estruturada e revisável. Decisões clínicas continuam com o profissional."
  },
  {
    question: "Para quem a demonstração faz mais sentido?",
    answer: "Clínicas particulares e equipes de saúde que registram muitos atendimentos e querem reduzir retrabalho de digitação."
  }
];

export interface ProjectItem {
  id: string;
  name: string;
  category: 'production' | 'personal';
  period: string;
  context: string;
  contextUrl?: string;
  role: string;
  highlight: string;
  summary: string;
  details: string[];
  stack: string[];
  filterTags: string[];
  url?: string;
  urlLabel?: string;
  relatedPostSlug?: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'magalog-portal',
    name: 'Magalog · Malha Logística Aberta',
    category: 'production',
    period: '2025 – atual',
    context: 'Luizalabs',
    contextUrl: 'https://luizalabs.com',
    role: 'Senior Software Engineer · Arquitetura',
    highlight: '10+ microsserviços · event-driven',
    summary:
      'Arquitetura e desenvolvimento do ecossistema que abre a operação logística da Magalog para sellers externos de plataformas de e-commerce, começando pela integração ponta a ponta com a Nuvemshop.',
    details: [
      'Esteira de cotação de frete em tempo real com SLAs rígidos de latência para checkouts externos.',
      'Geração de etiquetas, rastreamento, conciliação de pedidos e sistema extensível de plugins de mercado com contratos OpenAPI, mensageria assíncrona em RabbitMQ e foco em idempotência.',
    ],
    stack: [
      'Java',
      'Spring Boot',
      'Quarkus',
      'RabbitMQ',
      'MongoDB',
      'OpenAPI',
      'TypeScript',
      'Node.js',
      'Event-Driven',
    ],
    filterTags: ['java', 'typescript', 'arquitetura', 'dados'],
    url: 'https://portal.magalog.com.br',
    urlLabel: 'portal.magalog.com.br',
  },
  {
    id: 'sephora-keyrus',
    name: 'Sephora Brasil · Operação E-commerce',
    category: 'production',
    period: '2024 – 2025',
    context: 'Keyrus',
    contextUrl: 'https://keyrus.com/br/pt/home',
    role: 'Full Stack Developer',
    highlight: 'Salesforce Commerce Cloud · Alta escala',
    summary:
      'Atuação na engenharia do e-commerce da Sephora no Brasil pela Keyrus, desenvolvendo evoluções e integrações sobre Salesforce Commerce Cloud em uma operação de varejo de alto volume.',
    details: [
      'Desenvolvimento full stack de fluxos de loja, integrações e componentes modulares voltados a performance e estabilidade.',
      'Apoio técnico na definição de padrões de engenharia e boas práticas junto ao squad.',
    ],
    stack: ['Salesforce Commerce Cloud', 'TypeScript', 'JavaScript', 'Node.js', 'React', 'GraphQL'],
    filterTags: ['typescript', 'arquitetura'],
    url: 'https://www.sephora.com.br',
    urlLabel: 'sephora.com.br',
  },
  {
    id: 'bemol-checkout',
    name: 'Bemol · Checkout Customizado',
    category: 'production',
    period: '2024 – 2025',
    context: 'Keyrus',
    contextUrl: 'https://keyrus.com/br/pt/home',
    role: 'Engenharia de Checkout',
    highlight: '+16 mil vendas/semana',
    summary:
      'Engenharia de um checkout customizado de alta conversão integrado à VTEX e Assurant, desenhado para sustentar alto volume semanal com baixa latência e estabilidade operacional.',
    details: [
      'Integração de fluxos de pagamento, garantias/seguros (Assurant) e catálogo sem degradar conversão.',
      'Foco em resiliência nas integrações externas e performance de carregamento no front-end.',
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'VTEX', 'GraphQL'],
    filterTags: ['typescript', 'arquitetura'],
    url: 'https://www.bemol.com.br',
    urlLabel: 'bemol.com.br',
  },
  {
    id: 'cocatrel-flutter',
    name: 'Cocatrel · App de Controle de Sacas de Café',
    category: 'production',
    period: '2024 – 2025',
    context: 'Keyrus',
    contextUrl: 'https://keyrus.com/br/pt/home',
    role: 'Mobile & Full Stack Developer',
    highlight: 'Flutter · Publicado na App Store',
    summary:
      'Desenvolvimento do aplicativo mobile da Cocatrel em Flutter para controle e acompanhamento de sacas de café, atendendo cooperados e rotinas operacionais do agronegócio.',
    details: [
      'Construção de fluxos móveis para consulta, rastreamento e gestão de lotes e sacas de café.',
      'Integração com APIs corporativas e foco em usabilidade em campo para uso contínuo pelos cooperados.',
    ],
    stack: ['Flutter', 'Dart', 'Mobile', 'REST APIs'],
    filterTags: ['mobile', 'arquitetura'],
    url: 'https://apps.apple.com/br/app/cocatrel/id6740828537',
    urlLabel: 'App Store',
  },
  {
    id: 'mercafe-3coracoes',
    name: 'Mercafé (3 Corações) · Plataforma E-commerce',
    category: 'production',
    period: '2022 – 2024',
    context: 'Codeby (Keyrus)',
    contextUrl: 'https://keyrus.com/br/pt/home',
    role: 'Tech Lead / Dev Lead',
    highlight: 'Governança & Liderança Técnica',
    summary:
      'Liderança técnica do projeto oficial de e-commerce da 3 Corações, definindo padrões arquiteturais, revisão de código e esteira de entregas contínuas junto ao time de produto.',
    details: [
      'Alinhamento arquitetural entre engenharia e negócio, mentoria técnica e estabilização da operação.',
      'Modularização de componentes focada em Core Web Vitals e manutenção previsível.',
    ],
    stack: ['TypeScript', 'Next.js', 'FastStore', 'VTEX IO', 'React', 'GraphQL'],
    filterTags: ['typescript', 'arquitetura'],
    url: 'https://www.mercafe.com.br',
    urlLabel: 'mercafe.com.br',
  },
  {
    id: 'dux-human-health',
    name: 'DUX Human Health · E-commerce VTEX',
    category: 'production',
    period: '2022 – 2024',
    context: 'Codeby (Keyrus)',
    contextUrl: 'https://keyrus.com/br/pt/home',
    role: 'Tech Lead / Full Stack Developer',
    highlight: 'VTEX · D2C de alto volume',
    summary:
      'Desenvolvimento e evolução da loja oficial da DUX Human Health sobre a plataforma VTEX, atendendo uma operação D2C de nutrição e saúde com forte volume de campanhas e lançamentos.',
    details: [
      'Implementação de storefront, componentes customizados e integrações de catálogo e carrinho em VTEX.',
      'Foco em estabilidade em picos promocionais, performance de navegação e manutenibilidade do código.',
    ],
    stack: ['VTEX IO', 'TypeScript', 'React', 'Node.js', 'GraphQL'],
    filterTags: ['typescript', 'arquitetura'],
    url: 'https://duxhumanhealth.com',
    urlLabel: 'duxhumanhealth.com',
  },
  {
    id: 'frattina-rolex',
    name: 'Frattina · E-commerce FastStore & Vitrine Oficial Rolex',
    category: 'production',
    period: '2022 – 2024',
    context: 'Codeby (Keyrus)',
    contextUrl: 'https://keyrus.com/br/pt/home',
    role: 'Tech Lead / Full Stack Developer',
    highlight: 'FastStore · Homologação Rolex & Adobe ADS',
    summary:
      'Construção do e-commerce da joalheria Frattina em FastStore, incluindo a vitrine oficial da Rolex com integração ao Adobe ADS seguindo rigorosamente as diretrizes técnicas e de aprovação global da marca.',
    details: [
      'Implementação da seção dedicada da Rolex sob critérios estritos de compliance visual, performance e rastreamento via Adobe ADS.',
      'Arquitetura de storefront moderno em FastStore / Next.js integrada ao ecossistema VTEX.',
    ],
    stack: ['FastStore', 'Next.js', 'TypeScript', 'VTEX', 'Adobe ADS', 'React'],
    filterTags: ['typescript', 'arquitetura'],
    url: 'https://www.frattina.com.br',
    urlLabel: 'frattina.com.br',
  },
  {
    id: 'allos-aliansce-sonae',
    name: 'Allos (Aliansce Sonae) · Marketplace de Shoppings',
    category: 'production',
    period: '2022 – 2024',
    context: 'Codeby (Keyrus)',
    contextUrl: 'https://keyrus.com/br/pt/home',
    role: 'Tech Lead / Full Stack Developer',
    highlight: 'VTEX Marketplace · Multi-lojistas',
    summary:
      'Atuação no ecossistema de marketplace omnichannel da Allos (antiga Aliansce Sonae, maior rede de shoppings do Brasil, incluindo Shopping Leblon), conectando lojas físicas dos shoppings em um canal digital unificado sobre VTEX.',
    details: [
      'Arquitetura de marketplace multi-seller integrando catálogos, políticas comerciais e split de pedidos entre lojistas físicos.',
      'Desenvolvimento de componentes customizados e evolução da experiência de compra em VTEX IO.',
    ],
    stack: ['VTEX IO', 'Marketplace', 'TypeScript', 'React', 'Node.js', 'GraphQL'],
    filterTags: ['typescript', 'arquitetura'],
    url: 'https://allos.com.br',
    urlLabel: 'allos.com.br',
  },
  {
    id: 'the-north-face-br',
    name: 'The North Face Brasil · E-commerce VTEX',
    category: 'production',
    period: 'Varejo Outdoor',
    context: 'E-commerce VTEX',
    role: 'Desenvolvedor Full Stack',
    highlight: 'Operação Brasil · VTEX IO',
    summary:
      'Atuação no desenvolvimento e evolução da loja oficial da The North Face no Brasil sobre VTEX IO, com foco em experiência de storefront, catálogo e integrações de e-commerce.',
    details: [
      'Implementação de componentes customizados de vitrine, catálogo e jornada de compra.',
      'Otimização de performance front-end e sustentação da operação online no Brasil.',
    ],
    stack: ['VTEX IO', 'TypeScript', 'React', 'Node.js', 'GraphQL'],
    filterTags: ['typescript', 'arquitetura'],
    url: 'https://www.thenorthface.com.br',
    urlLabel: 'thenorthface.com.br',
  },
  {
    id: 'uauness-ambev',
    name: 'Uauness (Ambev) · Marketplace & Conteúdo de Bem-Estar',
    category: 'production',
    period: 'Iniciativa Ambev',
    context: 'E-commerce & Conteúdo',
    role: 'Desenvolvedor Full Stack',
    highlight: 'VTEX + WordPress · Ouro Prêmio ClienteSA',
    summary:
      'Desenvolvimento da plataforma Uauness, iniciativa digital da Ambev voltada a alimentação natural, produtos saudáveis e comunidade de bem-estar, integrando loja VTEX e portal editorial em WordPress.',
    details: [
      'Integração entre storefront de marketplace D2C em VTEX e hub de conteúdo em WordPress.',
      'Projeto premiado com Ouro em Estratégia em Mídias Sociais no Prêmio ClienteSA (posteriormente descontinuado pela companhia).',
    ],
    stack: ['VTEX IO', 'WordPress', 'TypeScript', 'React', 'PHP'],
    filterTags: ['typescript', 'arquitetura'],
    url: 'https://www.linkedin.com/posts/francisconevess_ouro-como-melhor-estrat%C3%A9gia-em-m%C3%ADdias-sociais-share-7115687514421571584-5tMf/',
    urlLabel: 'prêmio ClienteSA',
  },
  {
    id: 'unigran-portal-sistemas',
    name: 'UNIGRAN · Portal Institucional & Sistemas Acadêmicos',
    category: 'production',
    period: '2018 – 2021',
    context: 'UNIGRAN',
    contextUrl: 'https://www.unigran.br',
    role: 'Estagiário → Desenvolvedor Web',
    highlight: 'PHP · PostgreSQL · Início de carreira',
    summary:
      'Desenvolvimento e manutenção do portal institucional e dos sistemas web internos da UNIGRAN (Centro Universitário da Grande Dourados), onde comecei minha trajetória profissional em engenharia de software.',
    details: [
      'Evolução de módulos web acadêmicos e administrativos integrados a bases relacionais em PostgreSQL.',
      'Base prática em modelagem SQL, backend em PHP e aplicações web em produção com milhares de alunos.',
    ],
    stack: ['PHP', 'PostgreSQL', 'JavaScript', 'React', 'Node.js'],
    filterTags: ['dados', 'arquitetura'],
    url: 'https://www.unigran.br',
    urlLabel: 'unigran.br',
  },
  {
    id: 'mitgot-rust-mmorpg',
    name: 'MitgOT · Servidor MMORPG & Cliente Nativo em Rust',
    category: 'personal',
    period: '2025 – atual',
    context: 'Projeto pessoal & laboratório',
    role: 'Arquitetura, Engine & Infra',
    highlight: 'Baixa latência · Clean DDD Hexagonal',
    summary:
      'MMORPG autoritativo em Rust com cliente nativo em Bevy ECS, launcher desktop em Tauri e portal web próprio, construído como laboratório prático de concorrência, consistência distribuída e performance sob orçamento rígido de tick.',
    details: [
      'Troca de canal entre nós com commit atômico no PostgreSQL e lock distribuído no Valkey, além de particionamento de dados por tipo de mundo.',
      'Protocolo binário próprio, engine de scripts TypeScript sandboxed em Deno V8 dentro do servidor Tokio e pipeline CI otimizado com foco em FinOps.',
    ],
    stack: ['Rust', 'Tokio', 'Bevy ECS', 'Tauri', 'PostgreSQL', 'Valkey', 'Deno V8', 'TypeScript'],
    filterTags: ['rust', 'typescript', 'arquitetura', 'dados', 'cloud'],
    url: 'https://mitgot.com',
    urlLabel: 'mitgot.com',
  },
  {
    id: 'kamity-dev',
    name: 'kamity.dev · Blog de Engenharia',
    category: 'personal',
    period: '2026',
    context: 'Projeto aberto',
    role: 'Design, Arquitetura & Conteúdo',
    highlight: 'Custo $0/mês · Edge global',
    summary:
      'Blog técnico estático inspirado no formato editorial direto do AkitaOnRails: zero banco de dados, busca full-text no navegador com Pagefind e geração automática de cards Open Graph no build.',
    details: [
      'Artigos versionados em MDX no Git com validação Zod, séries, índice automático e preview por PR.',
      'Deploy contínuo via Cloudflare Workers Static Assets com Email Routing configurado no domínio próprio.',
    ],
    stack: ['Astro', 'TypeScript', 'MDX', 'Pagefind (Rust)', 'Satori', 'Cloudflare Workers'],
    filterTags: ['typescript', 'rust', 'cloud'],
    url: 'https://github.com/kamityx/kamity.dev',
    urlLabel: 'github.com/kamityx/kamity.dev',
    relatedPostSlug: 'por-que-coloquei-o-kamity-dev-no-ar',
  },
];

export interface TalkItem {
  year: string;
  event: string;
  stage: string;
  title: string;
  summary: string;
  url?: string;
  urlLabel?: string;
}

export const TALKS: TalkItem[] = [
  {
    year: '2023',
    event: 'VTEX Day 2023',
    stage: 'Palco de Tecnologia',
    title: 'Web Performance e sua importância para o sucesso nas taxas de conversão e experiência do cliente',
    summary:
      'Palestra em parceria entre Codeby e VTEX (ao lado de Reginaldo França e Laricia Mota) sobre otimização de PageSpeed, Core Web Vitals, testes A/B para acompanhar conversão e decisões de arquitetura web.',
    url: 'https://www.linkedin.com/feed/update/urn:li:share:7066864272454131712/',
    urlLabel: 'ver divulgação no LinkedIn',
  },
];

export const STACK_GROUPS = [
  {
    label: 'Arquitetura',
    items: 'Sistemas Distribuídos, Microsserviços, Event-Driven, DDD, Clean & Hexagonal Architecture, OpenAPI, Idempotência',
  },
  {
    label: 'Linguagens & Back-end',
    items: 'Java (Spring Boot, Quarkus), TypeScript / Node.js, Rust, Python, SQL',
  },
  {
    label: 'Dados & Mensageria',
    items: 'PostgreSQL, MongoDB, Redis / Valkey, RabbitMQ, Filas e Streams assíncronos',
  },
  {
    label: 'Web, Mobile & Cloud',
    items: 'React, Next.js, Astro, Flutter, Docker, Cloudflare, Magalu Cloud, FinOps & CI/CD',
  },
] as const;

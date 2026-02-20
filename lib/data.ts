import type { Project, TerritoryData } from "@/types/project";

// Projetos mockados — substituir por dados do Strapi quando disponível
export const projects: Project[] = [
  {
    slug: "laboratorio-passarinho",
    title: "Laboratório Passarinho",
    description:
      "Oficina de construção de instrumentos musicais com materiais reutilizados, voltada para crianças e jovens do bairro Saco dos Limões.",
    longDescription: `O Laboratório Passarinho nasceu de uma pergunta simples: o que acontece quando você entrega uma tesoura, cola e sucata para um grupo de crianças e pede que elas inventem um som?

Durante seis semanas, trinta jovens entre 8 e 14 anos construíram instrumentos com garrafas PET, latas, elásticos e bambu. Cada instrumento ganhou nome, história e um repertório próprio. O processo culminou em uma apresentação aberta ao bairro — não um espetáculo, mas uma mostra do que foi aprendido e inventado.

O laboratório revelou que a música pode ser um ponto de entrada para a autonomia criativa: quem faz o instrumento, decide o som; quem decide o som, passa a escutar o mundo de outro jeito.`,
    type: "oficina",
    territory: "Florianópolis",
    featured: true,
    year: 2024,
    gallery: [
      {
        src: "/images/placeholders/laboratorio-passarinho-1.svg",
        alt: "Crianças construindo instrumentos com materiais reutilizados",
        caption: "Construção de instrumentos com garrafas PET e bambu",
      },
      {
        src: "/images/placeholders/laboratorio-passarinho-2.svg",
        alt: "Instrumentos musicais artesanais expostos",
        caption: "Os instrumentos criados ao longo das seis semanas",
      },
      {
        src: "/images/placeholders/laboratorio-passarinho-3.svg",
        alt: "Jovem concentrado montando instrumento",
        caption: "Detalhe do processo de montagem",
      },
      {
        src: "/images/placeholders/laboratorio-passarinho-4.svg",
        alt: "Apresentação final para a comunidade",
        caption: "Mostra aberta ao bairro",
      },
    ],
    highlights: [
      "30 participantes entre 8 e 14 anos",
      "6 semanas de encontros semanais",
      "30 instrumentos construídos",
      "1 mostra aberta para o bairro Saco dos Limões",
      "Parceria com a Escola Municipal Henrique Veras",
    ],
    credits: [
      { name: "Ana Vieira", role: "Coordenação pedagógica" },
      { name: "Thiago Melo", role: "Facilitação musical" },
      { name: "Cláudia Ramos", role: "Produção" },
    ],
    partners: [
      "Escola Municipal Henrique Veras",
      "Associação de Moradores Saco dos Limões",
    ],
  },
  {
    slug: "cartografias-do-possivel",
    title: "Cartografias do Possível",
    description:
      "Residência artística de dois meses em Atibaia, reunindo artistas e pesquisadores para investigar as relações entre território, memória e paisagem sonora.",
    longDescription: `Cartografias do Possível foi uma residência artística realizada em uma propriedade rural nos arredores de Atibaia durante os meses de março e abril de 2024. Seis artistas de diferentes áreas — artes visuais, música, fotografia e escrita — viveram e trabalharam juntos por oito semanas.

O projeto partiu de uma questão: como o território fala? E como nós aprendemos a escutá-lo?

Cada residente desenvolveu um trabalho autoral a partir da experiência de imersão: caminhadas, conversas com moradores, registros sonoros da mata, da chuva, dos animais. O processo gerou uma publicação coletiva e uma exposição itinerante que circulou por três cidades.`,
    type: "residencia",
    territory: "Atibaia",
    featured: true,
    year: 2024,
    gallery: [
      {
        src: "/images/placeholders/cartografias-do-possivel-1.svg",
        alt: "Paisagem rural de Atibaia ao amanhecer",
        caption: "A propriedade rural que abrigou a residência",
      },
      {
        src: "/images/placeholders/cartografias-do-possivel-2.svg",
        alt: "Artistas em processo de trabalho coletivo",
        caption: "Sessão de troca e feedback entre residentes",
      },
      {
        src: "/images/placeholders/cartografias-do-possivel-3.svg",
        alt: "Material de pesquisa e registros",
        caption: "Diários de campo e registros fotográficos",
      },
      {
        src: "/images/placeholders/cartografias-do-possivel-4.svg",
        alt: "Exposição dos trabalhos produzidos",
        caption: "Abertura da exposição itinerante",
      },
    ],
    highlights: [
      "6 artistas residentes de 5 estados",
      "8 semanas de imersão",
      "1 publicação coletiva impressa (200 exemplares)",
      "Exposição itinerante em 3 cidades",
      "40 conversas com moradores locais documentadas",
    ],
    credits: [
      { name: "Beatriz Fontes", role: "Curadoria e coordenação" },
      { name: "Rafael Souza", role: "Facilitação do processo" },
      { name: "Marina Costa", role: "Produção e logística" },
    ],
    partners: [
      "Fazenda Boa Vista",
      "Secretaria de Cultura de Atibaia",
      "Coletivo Margem",
    ],
  },
  {
    slug: "tecendo-redes",
    title: "Tecendo Redes",
    description:
      "Programa de formação em tecnologia e comunicação digital para jovens de comunidades pesqueiras do litoral do Ceará.",
    longDescription: `Tecendo Redes surgiu de uma parceria com associações de pescadores e pescadoras do litoral do Ceará. O programa oferece formação em fotografia com celular, produção de vídeo, podcast e gestão de redes sociais — ferramentas para que as comunidades contem suas próprias histórias.

Em quatro meses, jovens entre 16 e 25 anos produziram um podcast sobre a vida na pesca artesanal, um documentário curto sobre técnicas tradicionais de tecelagem de rede, e um perfil coletivo nas redes sociais que já reúne mais de 3.000 seguidores.

O projeto não ensina tecnologia como fim. Ensina tecnologia como linguagem — uma forma de fazer a voz chegar mais longe.`,
    type: "tecnologia",
    territory: "Nordeste",
    featured: true,
    year: 2023,
    gallery: [
      {
        src: "/images/placeholders/tecendo-redes-1.svg",
        alt: "Jovens em oficina de produção de conteúdo digital",
        caption: "Oficina de produção de podcast",
      },
      {
        src: "/images/placeholders/tecendo-redes-2.svg",
        alt: "Litoral do Ceará com barcos de pesca",
        caption: "O território: litoral pesqueiro do Ceará",
      },
      {
        src: "/images/placeholders/tecendo-redes-3.svg",
        alt: "Jovem fazendo gravação de vídeo",
        caption: "Produção do documentário sobre tecelagem de rede",
      },
    ],
    highlights: [
      "45 jovens formados em 4 turmas",
      "4 meses de formação continuada",
      "1 podcast com 12 episódios",
      "1 documentário curto (18 minutos)",
      "+3.000 seguidores no perfil coletivo",
      "Parceria com 3 associações de pescadores",
    ],
    credits: [
      { name: "Joana Ferreira", role: "Coordenação do programa" },
      { name: "Lucas Alves", role: "Formação em vídeo e podcast" },
      { name: "Sofia Mendes", role: "Formação em fotografia" },
    ],
    partners: [
      "Associação de Pescadores de Trairi",
      "Colônia de Pesca Z-6",
      "Governo do Estado do Ceará — Secult",
    ],
  },
];

export const territories: TerritoryData[] = [
  {
    slug: "florianopolis",
    name: "Florianópolis",
    description:
      "Base principal da Juca Maria, Florianópolis concentra as atividades regulares de formação, laboratórios e parcerias com escolas e comunidades da região.",
    phrase: "Base de laboratórios e formação continuada",
    image: "/images/placeholders/territorio-florianopolis.svg",
  },
  {
    slug: "atibaia",
    name: "Atibaia",
    description:
      "A serra de Atibaia abriga as residências artísticas da Juca Maria — um espaço de imersão, produção coletiva e encontro entre artistas de diferentes territórios.",
    phrase: "Residências artísticas e imersão criativa",
    image: "/images/placeholders/territorio-atibaia.svg",
  },
  {
    slug: "nordeste",
    name: "Nordeste",
    description:
      "Atuação em parceria com comunidades do litoral e do sertão nordestino, com projetos de tecnologia, cultura popular e formação para jovens.",
    phrase: "Parcerias territoriais e formação comunitária",
    image: "/images/placeholders/territorio-nordeste.svg",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByType(type: string): Project[] {
  return projects.filter((p) => p.type === type);
}

export function getProjectsByTerritory(territory: string): Project[] {
  return projects.filter((p) => p.territory === territory);
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  return projects
    .filter(
      (p) =>
        p.slug !== project.slug &&
        (p.type === project.type || p.territory === project.territory)
    )
    .slice(0, limit);
}

import Layout from "@/components/layout/Layout";

const colegiado = [
  {
    name: "Ana Vieira",
    role: "Coordenação pedagógica e processos formativos",
    city: "Florianópolis — SC",
  },
  {
    name: "Beatriz Fontes",
    role: "Curadoria e produção cultural",
    city: "Atibaia — SP",
  },
  {
    name: "Rafael Souza",
    role: "Facilitação de processos criativos",
    city: "Atibaia — SP",
  },
  {
    name: "Joana Ferreira",
    role: "Coordenação de programas territoriais",
    city: "Fortaleza — CE",
  },
  {
    name: "Lucas Alves",
    role: "Formação em tecnologia e comunicação",
    city: "Fortaleza — CE",
  },
  {
    name: "Marina Costa",
    role: "Produção e logística",
    city: "Florianópolis — SC",
  },
  {
    name: "Sofia Mendes",
    role: "Fotografia e documentação",
    city: "Florianópolis — SC",
  },
];

const parceiros = [
  "Escola Municipal Henrique Veras",
  "Secretaria de Cultura de Atibaia",
  "Colônia de Pesca Z-6",
  "Coletivo Margem",
  "Associação de Pescadores de Trairi",
  "Associação de Moradores Saco dos Limões",
  "Fazenda Boa Vista",
  "Governo do Estado do Ceará — Secult",
];

export default function SobrePage() {
  return (
    <Layout
      title="Sobre"
      description="A Juca Maria é uma produtora cultural associativa com função pública. Conheça nossa missão, colegiado e forma de trabalhar."
    >
      {/* Header */}
      <section className="bg-[#2B2B2B] py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
            Organização
          </p>
          <h1
            style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
            className="text-4xl md:text-5xl font-semibold text-[#F2EFE8] mb-6 leading-tight"
          >
            Uma casa de projetos com curadoria.
          </h1>
          <p className="text-[#D8D3CA] text-lg leading-relaxed">
            A Juca Maria – Cultura, Arte e Educação é uma organização de
            articulação, produção e residência de projetos culturais e
            educativos. Não centralizamos autoria: cuidamos das condições para
            que projetos existam e floresçam.
          </p>
        </div>
      </section>

      {/* O que somos */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
              Posicionamento
            </p>
            <h2
              style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
              className="text-3xl font-semibold text-[#2B2B2B] mb-6"
            >
              O que é a Juca Maria
            </h2>
            <div className="flex flex-col gap-4 text-[#555] leading-relaxed">
              <p>
                Somos uma{" "}
                <strong className="text-[#2B2B2B]">
                  produtora cultural associativa com função pública
                </strong>
                . Não somos uma ONG de assistência, não somos uma escola, não
                somos um coletivo informal. Somos uma estrutura que abriga
                artistas, educadores, tecnólogos e pesquisadores que desenvolvem
                projetos em diferentes territórios do Brasil.
              </p>
              <p>
                Nossa atuação acontece através de residências artísticas,
                oficinas, laboratórios criativos, ações comunitárias, parcerias
                territoriais e produção e circulação cultural.
              </p>
              <p>
                A organização entende a arte não como entretenimento, mas como{" "}
                <strong className="text-[#2B2B2B]">
                  ferramenta de reorganização da experiência humana
                </strong>
                .
              </p>
            </div>
          </div>

          <div>
            <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
              Missão
            </p>
            <h2
              style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
              className="text-3xl font-semibold text-[#2B2B2B] mb-6"
            >
              Para que existimos
            </h2>
            <p className="text-[#555] leading-relaxed mb-8">
              Promover experiências de arte, cultura e tecnologia que ampliem
              autonomia, pertencimento e sentido de dignidade nas pessoas e nos
              territórios.
            </p>
            <div className="border-l-2 border-[#C65A3A] pl-6">
              <p
                style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
                className="text-xl text-[#2B2B2B] italic leading-relaxed"
              >
                &ldquo;Criar é uma forma de pertencimento. Cada território produz sua
                própria linguagem.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Método */}
      <section className="bg-[#EDE9E0] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
            Método
          </p>
          <h2
            style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
            className="text-3xl font-semibold text-[#2B2B2B] mb-12"
          >
            Como trabalhamos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Laboratório",
                body: "Prototipar, experimentar, errar rápido. Criamos espaços onde a tentativa é o método — não o fracasso. A incerteza faz parte do processo.",
              },
              {
                title: "Residência",
                body: "Tempo longo, imersão, produção coletiva. Quando o processo tem duração, ele transforma quem participa — e o que é produzido.",
              },
              {
                title: "Circulação",
                body: "Compartilhar com o território: mostras, encontros, publicações. O que foi criado precisa chegar a quem não estava lá dentro.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3
                  style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
                  className="text-xl font-semibold text-[#2B2B2B] mb-3"
                >
                  {item.title}
                </h3>
                <p className="text-[#555] leading-relaxed text-sm">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Colegiado */}
      <section id="colegiado" className="py-20 max-w-7xl mx-auto px-6">
        <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
          Pessoas
        </p>
        <h2
          style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
          className="text-3xl font-semibold text-[#2B2B2B] mb-10"
        >
          Colegiado
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {colegiado.map((person) => (
            <div key={person.name} className="border-b border-[#D8D3CA] pb-6">
              <h3
                style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
                className="text-lg font-semibold text-[#2B2B2B] mb-1"
              >
                {person.name}
              </h3>
              <p className="text-sm text-[#555] mb-1">{person.role}</p>
              <p className="text-xs text-[#888] uppercase tracking-wide">
                {person.city}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Parceiros */}
      <section className="bg-[#EDE9E0] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
            Rede
          </p>
          <h2
            style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
            className="text-3xl font-semibold text-[#2B2B2B] mb-10"
          >
            Parceiros
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {parceiros.map((p) => (
              <div
                key={p}
                className="bg-[#F2EFE8] border border-[#D8D3CA] px-4 py-3 text-sm text-[#555] text-center"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparência */}
      <section id="transparencia" className="py-20 max-w-7xl mx-auto px-6">
        <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
          Prestação de contas
        </p>
        <h2
          style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
          className="text-3xl font-semibold text-[#2B2B2B] mb-6"
        >
          Transparência
        </h2>
        <p className="text-[#555] leading-relaxed max-w-xl mb-8">
          Documentos institucionais, relatórios de atividades e prestações de
          contas serão disponibilizados aqui à medida que forem produzidos.
          Transparência não é uma obrigação burocrática — é uma forma de
          respeito com quem acredita no trabalho.
        </p>
        <div className="border border-[#D8D3CA] p-6 max-w-md">
          <p className="text-sm text-[#888] italic">
            Documentos em preparação. Esta seção será atualizada em breve.
          </p>
        </div>
      </section>
    </Layout>
  );
}

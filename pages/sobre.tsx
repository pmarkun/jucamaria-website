import { useLanguage } from "@/lib/i18n";
import Layout from "@/components/layout/Layout";

export default function SobrePage() {
  const { t } = useLanguage();
  return (
    <Layout
      title={t("Sobre")}
      description={t("A Juca Maria é uma produtora cultural associativa com função pública. Conheça nossa missão, colegiado e forma de trabalhar.")}
    >
      {/* Header */}
      <section className="bg-[#2B2B2B] py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
            {t("Organização")}
          </p>
          <h1
            style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
            className="text-4xl md:text-5xl font-semibold text-[#F2EFE8] mb-6 leading-tight"
          >
            {t("Uma casa de projetos com curadoria.")}
          </h1>
          <p className="text-[#D8D3CA] text-lg leading-relaxed">
            {t("A Juca Maria – Cultura, Arte e Educação é uma organização de articulação, produção e residência de projetos culturais e educativos. Não centralizamos autoria: cuidamos das condições para que projetos existam e floresçam.")}
          </p>
        </div>
      </section>

      {/* O que somos */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
              {t("Posicionamento")}
            </p>
            <h2
              style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
              className="text-3xl font-semibold text-[#2B2B2B] mb-6"
            >
              {t("O que é a Juca Maria")}
            </h2>
            <div className="flex flex-col gap-4 text-[#555] leading-relaxed">
              <p>
                {t("Somos uma")}{" "}
                <strong className="text-[#2B2B2B]">
                  {t("produtora cultural associativa com função pública")}
                </strong>
                {t(". Não somos uma ONG de assistência, não somos uma escola, não somos um coletivo informal. Somos uma estrutura que abriga artistas, educadores, tecnólogos e pesquisadores que desenvolvem projetos em diferentes territórios do Brasil.")}
              </p>
              <p>
                {t("Nossa atuação acontece através de residências artísticas, oficinas, laboratórios criativos, ações comunitárias, parcerias territoriais e produção e circulação cultural.")}
              </p>
              <p>
                {t("A organização entende a arte não como entretenimento, mas como")}{" "}
                <strong className="text-[#2B2B2B]">
                  {t("ferramenta de reorganização da experiência humana")}
                </strong>
                .
              </p>
            </div>
          </div>

          <div>
            <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
              {t("Missão")}
            </p>
            <h2
              style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
              className="text-3xl font-semibold text-[#2B2B2B] mb-6"
            >
              {t("Para que existimos")}
            </h2>
            <p className="text-[#555] leading-relaxed mb-8">
              {t("Promover experiências de arte, cultura e tecnologia que ampliem autonomia, pertencimento e sentido de dignidade nas pessoas e nos territórios.")}
            </p>
            <div className="border-l-2 border-[#C65A3A] pl-6">
              <p
                style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
                className="text-xl text-[#2B2B2B] italic leading-relaxed"
              >
                {t("“Criar é uma forma de pertencimento. Cada território produz sua própria linguagem.”")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Método */}
      <section className="bg-[#FAFAF7] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
            {t("Método")}
          </p>
          <h2
            style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
            className="text-3xl font-semibold text-[#2B2B2B] mb-12"
          >
            {t("Como trabalhamos")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: t("Laboratório"),
                body: t("Prototipar, experimentar, errar rápido. Criamos espaços onde a tentativa é o método — não o fracasso. A incerteza faz parte do processo."),
              },
              {
                title: t("Residência"),
                body: t("Tempo longo, imersão, produção coletiva. Quando o processo tem duração, ele transforma quem participa — e o que é produzido."),
              },
              {
                title: t("Circulação"),
                body: t("Compartilhar com o território: mostras, encontros, publicações. O que foi criado precisa chegar a quem não estava lá dentro."),
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

      {/* Parceiros */}
      <section className="bg-[#FAFAF7] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
            {t("Rede")}
          </p>
          <h2
            style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
            className="text-3xl font-semibold text-[#2B2B2B] mb-10"
          >
            {t("Parceiros")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Escola Municipal Henrique Veras",
              "Secretaria de Cultura de Atibaia",
              "Colônia de Pesca Z-6",
              "Coletivo Margem",
              "Associação de Pescadores de Trairi",
              "Associação de Moradores Saco dos Limões",
              "Fazenda Boa Vista",
              "Governo do Estado do Ceará — Secult",
            ].map((p) => (
              <div
                key={p}
                className="bg-[#FAFAF7] border border-[#D8D3CA] px-4 py-3 text-sm text-[#555] text-center"
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
          {t("Prestação de contas")}
        </p>
        <h2
          style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
          className="text-3xl font-semibold text-[#2B2B2B] mb-6"
        >
          {t("Transparência")}
        </h2>
        <p className="text-[#555] leading-relaxed max-w-xl mb-8">
          {t("Documentos institucionais, relatórios de atividades e prestações de contas serão disponibilizados aqui à medida que forem produzidos. Transparência não é uma obrigação burocrática — é uma forma de respeito com quem acredita no trabalho.")}
        </p>
        <div className="border border-[#D8D3CA] p-6 max-w-md">
          <p className="text-sm text-[#888] italic">
            {t("Documentos em preparação. Esta seção será atualizada em breve.")}
          </p>
        </div>
      </section>
    </Layout>
  );
}

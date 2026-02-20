import Layout from "@/components/layout/Layout";

export default function ContatoPage() {
  return (
    <Layout
      title="Contato"
      description="Entre em contato com a Juca Maria."
    >
      {/* Header */}
      <section className="bg-[#FAFAF7] py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#C65A3A] text-xs uppercase tracking-widest font-medium mb-3">
            Conversa
          </p>
          <h1
            style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
            className="text-4xl md:text-5xl font-semibold text-[#2B2B2B] mb-4"
          >
            Fale com a gente
          </h1>
          <p className="text-[#555] text-lg">
            Trabalhamos com pessoas, não com públicos.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-3xl mx-auto px-6">
        <p className="text-[#555] text-lg leading-relaxed mb-6">
          Para parcerias, convites, imprensa ou qualquer outra conversa, escreva para:
        </p>
        <a
          href="mailto:contato@jucamaria.org.br"
          className="text-[#C65A3A] text-xl font-medium hover:underline"
        >
          contato@jucamaria.org.br
        </a>
      </section>
    </Layout>
  );
}

"use client";

import { useState, FormEvent } from "react";
import Layout from "@/components/layout/Layout";

type Assunto = "parceria" | "territorio" | "imprensa" | "";

const ASSUNTOS = [
  {
    value: "parceria" as const,
    label: "Propor parceria",
    description:
      "Você tem uma iniciativa, organização ou projeto e quer construir algo junto.",
  },
  {
    value: "territorio" as const,
    label: "Convidar para atuar em território",
    description:
      "Você está em um contexto específico e quer trazer os formatos da Juca Maria.",
  },
  {
    value: "imprensa" as const,
    label: "Imprensa / Institucional",
    description:
      "Jornalistas, pesquisadores e financiadores interessados na organização.",
  },
];

export default function ContatoPage() {
  const [assunto, setAssunto] = useState<Assunto>("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Placeholder — integrar com backend (Strapi, Resend, etc.) depois
    setSent(true);
  }

  return (
    <Layout
      title="Contato"
      description="Entre em contato com a Juca Maria para propor parcerias, convidar para atuar em território ou para imprensa e questões institucionais."
    >
      {/* Header */}
      <section className="bg-[#EDE9E0] py-20 px-6">
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
        {sent ? (
          <div className="text-center py-16">
            <div className="text-5xl text-[#C65A3A] mb-6">◎</div>
            <h2
              style={{ fontFamily: "var(--font-lora, Lora, serif)" }}
              className="text-3xl font-semibold text-[#2B2B2B] mb-4"
            >
              Mensagem enviada.
            </h2>
            <p className="text-[#555] text-lg">
              Retornamos em até 5 dias úteis. Obrigada pelo contato.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Seleção de assunto */}
            <div>
              <p className="text-xs uppercase tracking-widest text-[#888] font-medium mb-4">
                Qual é o seu interesse?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ASSUNTOS.map((item) => (
                  <button
                    type="button"
                    key={item.value}
                    onClick={() => setAssunto(item.value)}
                    className={`text-left p-4 border transition-colors ${
                      assunto === item.value
                        ? "border-[#C65A3A] bg-[#C65A3A]/5"
                        : "border-[#D8D3CA] hover:border-[#2B2B2B]"
                    }`}
                  >
                    <p
                      className={`text-sm font-medium mb-1 ${assunto === item.value ? "text-[#C65A3A]" : "text-[#2B2B2B]"}`}
                    >
                      {item.label}
                    </p>
                    <p className="text-xs text-[#888] leading-relaxed">
                      {item.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Campos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-[#888] font-medium">
                  Nome *
                </label>
                <input
                  required
                  type="text"
                  className="border border-[#D8D3CA] bg-transparent px-4 py-3 text-sm text-[#2B2B2B] placeholder-[#aaa] focus:outline-none focus:border-[#C65A3A]"
                  placeholder="Seu nome"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-[#888] font-medium">
                  E-mail *
                </label>
                <input
                  required
                  type="email"
                  className="border border-[#D8D3CA] bg-transparent px-4 py-3 text-sm text-[#2B2B2B] placeholder-[#aaa] focus:outline-none focus:border-[#C65A3A]"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-widest text-[#888] font-medium">
                Organização / contexto (opcional)
              </label>
              <input
                type="text"
                className="border border-[#D8D3CA] bg-transparent px-4 py-3 text-sm text-[#2B2B2B] placeholder-[#aaa] focus:outline-none focus:border-[#C65A3A]"
                placeholder="Onde você atua?"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-widest text-[#888] font-medium">
                Mensagem *
              </label>
              <textarea
                required
                rows={5}
                className="border border-[#D8D3CA] bg-transparent px-4 py-3 text-sm text-[#2B2B2B] placeholder-[#aaa] focus:outline-none focus:border-[#C65A3A] resize-none"
                placeholder="Conte um pouco sobre o que você tem em mente..."
              />
            </div>

            {/* LGPD */}
            <div className="flex items-start gap-3">
              <input
                required
                type="checkbox"
                id="lgpd"
                className="mt-1 accent-[#C65A3A]"
              />
              <label htmlFor="lgpd" className="text-xs text-[#888] leading-relaxed">
                Concordo que meus dados sejam utilizados exclusivamente para
                resposta a este contato, conforme a Lei Geral de Proteção de
                Dados (LGPD — Lei 13.709/2018).
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="px-10 py-3 bg-[#C65A3A] text-[#F2EFE8] text-sm font-medium hover:bg-[#a8492e] transition-colors"
              >
                Enviar mensagem
              </button>
            </div>
          </form>
        )}
      </section>
    </Layout>
  );
}

/**
 * Seed script — popula o Strapi local com os dados iniciais da Juca Maria.
 * Escreve diretamente no banco SQLite (sem precisar de API token).
 *
 * Uso:
 *   node strapi/seed.mjs
 *
 * Pré-requisitos:
 *   - Strapi já inicializado (npm run develop rodado ao menos uma vez)
 *   - Banco em strapi/.tmp/data.db
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Database = require("./strapi/node_modules/better-sqlite3");
import { randomUUID } from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "strapi", ".tmp", "data.db");

const db = new Database(DB_PATH);
// Strapi v5 armazena timestamps como milissegundos (número inteiro), não ISO string.
const nowMs = Date.now();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function uuid() {
  return randomUUID();
}

function getAdminUserId() {
  const user = db.prepare("SELECT id FROM admin_users LIMIT 1").get();
  if (!user) {
    throw new Error(
      "Nenhum usuário admin encontrado. Acesse http://localhost:1337/admin e crie o usuário admin primeiro."
    );
  }
  return user.id;
}

/**
 * Strapi v5 cria dois registros por document:
 *   1. draft  — published_at = null
 *   2. published — published_at = <timestamp ms>
 * Ambos compartilham o mesmo document_id.
 * O admin panel lê os documentos pela versão draft; a API pública retorna a publicada.
 */
function insertProject(p, adminId) {
  const existing = db
    .prepare("SELECT id FROM projects WHERE slug = ? AND published_at IS NULL")
    .get(p.slug);
  if (existing) {
    console.log(`  ⏭  projeto já existe: ${p.slug}`);
    return existing.id;
  }

  const docId = uuid();

  const stmt = db.prepare(`
    INSERT INTO projects (
      document_id, title, slug, description, long_description,
      type, territory, featured, partners,
      start_date, end_date,
      created_at, updated_at, published_at, created_by_id, updated_by_id
    ) VALUES (
      @document_id, @title, @slug, @description, @long_description,
      @type, @territory, @featured, @partners,
      @start_date, @end_date,
      @created_at, @updated_at, @published_at, @created_by_id, @updated_by_id
    )
  `);

  const common = {
    document_id: docId,
    title: p.title,
    slug: p.slug,
    description: p.description,
    long_description: p.longDescription ?? null,
    type: p.type,
    territory: p.territory,
    featured: p.featured ? 1 : 0,
    partners: p.partners ?? null,
    start_date: p.startDate ?? null,
    end_date: p.endDate ?? null,
    created_at: nowMs,
    updated_at: nowMs,
    created_by_id: adminId,
    updated_by_id: adminId,
  };

  // Draft (published_at = null) — visível no admin panel
  stmt.run({ ...common, published_at: null });

  // Published (published_at = timestamp ms) — retornado pela API pública
  const result = stmt.run({ ...common, published_at: nowMs });

  console.log(`  ✓  projeto criado: ${p.slug} (document_id=${docId})`);
  return result.lastInsertRowid;
}

function insertTerritory(t, adminId) {
  const existing = db
    .prepare("SELECT id FROM territories WHERE slug = ? AND published_at IS NULL")
    .get(t.slug);
  if (existing) {
    console.log(`  ⏭  território já existe: ${t.slug}`);
    return existing.id;
  }

  const docId = uuid();

  const stmt = db.prepare(`
    INSERT INTO territories (
      document_id, name, slug, description, phrase,
      created_at, updated_at, published_at, created_by_id, updated_by_id
    ) VALUES (
      @document_id, @name, @slug, @description, @phrase,
      @created_at, @updated_at, @published_at, @created_by_id, @updated_by_id
    )
  `);

  const common = {
    document_id: docId,
    name: t.name,
    slug: t.slug,
    description: t.description,
    phrase: t.phrase,
    created_at: nowMs,
    updated_at: nowMs,
    created_by_id: adminId,
    updated_by_id: adminId,
  };

  // Draft
  stmt.run({ ...common, published_at: null });

  // Published
  const result = stmt.run({ ...common, published_at: nowMs });

  console.log(
    `  ✓  território criado: ${t.slug} (document_id=${docId})`
  );
  return result.lastInsertRowid;
}

// ---------------------------------------------------------------------------
// Dados
// ---------------------------------------------------------------------------

const projects = [
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
    startDate: "2024-04-01",
    endDate: "2024-05-12",
    partners: `**Equipe**\n- Ana Vieira — Coordenação pedagógica\n- Thiago Melo — Facilitação musical\n- Cláudia Ramos — Produção\n\n**Parceiros**\n- Escola Municipal Henrique Veras\n- Associação de Moradores Saco dos Limões`,
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
    startDate: "2024-03-01",
    endDate: "2024-04-30",
    partners: `**Equipe**\n- Beatriz Fontes — Curadoria e coordenação\n- Rafael Souza — Facilitação do processo\n- Marina Costa — Produção e logística\n\n**Parceiros**\n- Fazenda Boa Vista\n- Secretaria de Cultura de Atibaia\n- Coletivo Margem`,
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
    startDate: "2024-06-01",
    partners: `**Equipe**\n- Joana Ferreira — Coordenação do programa\n- Lucas Alves — Formação em vídeo e podcast\n- Sofia Mendes — Formação em fotografia\n\n**Parceiros**\n- Associação de Pescadores de Trairi\n- Colônia de Pesca Z-6\n- Governo do Estado do Ceará — Secult`,
  },
];

const territories = [
  {
    slug: "florianopolis",
    name: "Florianópolis",
    description:
      "Base principal da Juca Maria, Florianópolis concentra as atividades regulares de formação, laboratórios e parcerias com escolas e comunidades da região.",
    phrase: "Base de laboratórios e formação continuada",
  },
  {
    slug: "atibaia",
    name: "Atibaia",
    description:
      "A serra de Atibaia abriga as residências artísticas da Juca Maria — um espaço de imersão, produção coletiva e encontro entre artistas de diferentes territórios.",
    phrase: "Residências artísticas e imersão criativa",
  },
  {
    slug: "nordeste",
    name: "Nordeste",
    description:
      "Atuação em parceria com comunidades do litoral e do sertão nordestino, com projetos de tecnologia, cultura popular e formação para jovens.",
    phrase: "Parcerias territoriais e formação comunitária",
  },
];

// ---------------------------------------------------------------------------
// Executar
// ---------------------------------------------------------------------------

console.log("\n🌱 Iniciando seed...\n");

const adminId = getAdminUserId();
console.log(`  → usando admin id=${adminId}\n`);

console.log("Territórios:");
for (const t of territories) {
  insertTerritory(t, adminId);
}

console.log("\nProjetos:");
for (const p of projects) {
  insertProject(p, adminId);
}

db.close();
console.log("\n✅ Seed concluído!\n");

# Juca Maria

Site estático em português e inglês. Textos, imagens e fontes ficam neste
repositório. Não é necessário iniciar um CMS, configurar `.env.local` ou acessar
uma API para desenvolver, gerar ou visitar o site.

## Rodar localmente

Com as dependências já instaladas:

```sh
nix develop --command npm run dev
```

Abra `http://localhost:3000`. Em uma instalação nova, rode primeiro
`nix develop --command npm ci`; essa instalação inicial precisa de internet.

## Editar conteúdo

- `content/home.json`: chamada da página inicial, logo, capa e método.
- `content/projects.json`: projetos, galeria, datas, equipe e parceiros.
- `content/territories.json`: territórios de atuação.
- `content/categories.json`: categorias dos projetos.
- `public/images/content/`: imagens utilizadas pelo conteúdo.
- `public/fonts/`: fontes locais Lora e Inter, com suas licenças OFL.
- `pages/`: textos institucionais e estrutura das páginas.

Imagens usam caminhos como `/images/content/capa.jpg`, sem domínio ou prefixo do
GitHub. O site aplica o prefixo de publicação automaticamente. `categorySlug` e
`territorySlug` devem apontar para registros existentes; `categorySlug: null`
mantém um projeto sem categoria. Os registros e imagens públicos vieram do CMS
local existente. Os textos e nomes foram preservados.

Português fica em `/`; inglês em `/en/`. O seletor PT/EN mantém a página,
os parâmetros e a âncora. As traduções estão em `lib/translations/en.json`.
Ao editar um texto em português, atualize sua tradução nesse catálogo.
Texto sem tradução usa o original; nomes de projetos, pessoas e organizações
permanecem no original. URLs, identificadores e datas não são traduzidos.

## Validar e gerar

```sh
nix develop --command npm test
nix develop --command npm run lint
nix develop --command npm run build
```

O resultado pronto para hospedagem fica em `out/`. Para provar que a geração
não depende de rede, use o mesmo bloqueio adotado na publicação:

```sh
NEXT_TELEMETRY_DISABLED=1 NODE_OPTIONS='--require=./scripts/no-network.cjs' nix develop --command npm run build
```

## Publicar

O workflow do GitHub Pages instala as dependências, executa os testes e gera o
site usando somente os arquivos do repositório. Durante a geração, conexões de
rede estão bloqueadas. Não há variável, secret ou serviço Strapi envolvido.
O GitHub e o registro de pacotes continuam necessários para enviar o código,
instalar dependências numa máquina nova e hospedar os arquivos prontos.

Depois do merge em `main`, o workflow publica automaticamente em
`https://pmarkun.github.io/jucamaria-website/`. A versão inglesa fica em `/en/`.

## Arquivos antigos

A pasta `strapi/` e o script `seed.mjs` foram preservados como histórico da
configuração anterior. Não participam do site, dos testes ou da publicação.
O banco local, os arquivos de ambiente e os lockfiles com alterações anteriores
não foram apagados nem publicados. O antigo cache em `public/_cms/` também não
é utilizado; nenhuma dessas pastas é necessária em uma cópia nova do site.

# Validação — Mangue das Capivaras

Data: 15/10/2026. Site exportado e servido localmente, sem CMS ou mídia remota.

- `nix develop --command npm test`: 14 testes aprovados, incluindo vínculos de
  território/categoria, tradução dos campos estruturados e preservação de IDs.
- `nix develop --command npm run lint`: sem avisos ou erros.
- Build estático com `scripts/no-network.cjs`: aprovado sem acesso à rede.
- Chrome conectado, português: larguras 360, 390, 767, 768, 769, 1023, 1024,
  1025, 1366 e 1440 px; alturas de 844 e 900 px conforme viewport. Sem overflow
  horizontal ou imagens quebradas. Inspeção visual de página inteira em 1440 e
  390 px e do primeiro viewport móvel.
- Inglês: 360, 768 e 1440 px, sem overflow ou imagens quebradas; textos do projeto
  e idioma do documento conferidos.
- Interações: filtro Literatura, abertura pela listagem, troca PT → EN mantendo
  o projeto, âncora de seção e links entre projeto e Florianópolis. Categoria
  Literatura e seção de Florianópolis incluem o projeto.
- Console da página do projeto em PT e EN: sem erros ou avisos.

Não validados: Firefox, WebKit/Safari, dispositivos físicos, leitores de tela e
deploy público. A inspeção em Chrome não comprova compatibilidade nesses ambientes.

As fontes e os limites editoriais estão em
[`../sources/mangue-das-capivaras.md`](../sources/mangue-das-capivaras.md).

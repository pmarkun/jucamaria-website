This is a Next.js project bootstrapped with [`create-plasmic-app`](https://www.npmjs.com/package/create-plasmic-app).

## Languages

Portuguese remains at `/`; English is available at `/en/`. The PT/EN selector
keeps the current page, query and anchor. Internal navigation stays in the selected
language, including project and category pages. Both versions are exported as
static HTML for GitHub Pages; no translation service or new dependency is needed.

English pages reuse the Portuguese page components through `pages/en/` exports.
Interface copy and the current CMS content are translated in
`lib/translations/en.json`. When editing or adding CMS text, add its English
translation there too. Unknown text falls back to the original Portuguese;
project titles, people's names and partner organizations keep their original names.
URLs, slugs and dates are never translated. Adding another language requires a
new dictionary, static route exports and an option in the language selector.

Validate with `nix develop --command node --test scripts/i18n.test.cjs`,
`nix develop --command npm run lint` and `nix develop --command npm run build`.
The build needs access to the CMS configured in `NEXT_PUBLIC_STRAPI_URL`.

## Development

First, run the development server:

```bash
npm run dev
```

Open your browser to see the result.

You can start editing your project in Plasmic Studio. The page auto-updates as you edit the project.

## Learn More

With Plasmic, you can enable non-developers on your team to publish pages and content into your website or app.

To learn more about Plasmic, take a look at the following resources:

- [Plasmic Website](https://www.plasmic.app/)
- [Plasmic Documentation](https://docs.plasmic.app/learn/)
- [Plasmic Community Forum](https://forum.plasmic.app/)

You can check out [the Plasmic GitHub repository](https://github.com/plasmicapp/plasmic) - your feedback and contributions are welcome!

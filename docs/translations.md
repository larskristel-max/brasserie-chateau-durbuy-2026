# Translation Status

Last updated: 2026-08-27

## Scope Reviewed

- Homepage UI and static copy in FR/NL/EN/DE.
- Journal shell UI in FR/NL/EN/DE.
- Published journal article bodies in NL/EN/DE, stored as translations under the original French entries.

## Editorial Decisions

- French remains the source language and brand voice.
- Dutch copy is aimed at Netherlands Dutch readers, with Belgian place names and brand terms kept intact.
- English uses restrained European hospitality wording.
- German uses standard German with `Anwesen` preferred over the stiffer `Domäne`.
- The journal keeps French as the editorial source. Manually curated translations are attached to the same article entry, but each published language now has its own stable self-canonical URL and reciprocal `hreflang` set.

## Guardrails Applied

- No ecommerce language such as online shop, immediate order, or guaranteed stock.
- No price or stock promise.
- No promise of opening dates or automatic reservation confirmation.
- No visible personal Gmail.
- Historical wording was tightened toward documented brewing in Durbuy rather than a continuous château-brewing claim.

## Still To Decide

- How new journal articles should enter the translation workflow after publication.
- Which person or workflow provides final native-level approval for NL, EN and DE before publication.
- Whether German should remain website-only for visits or become an offered visit language.

## 2026-05-26 Audit Notes

- The availability section was softened away from retail/order language in all four languages. It remains informational only: no ecommerce, no prices, no stock guarantee.
- Journal shell copy now avoids foregrounding an individual author and presents the Carnet as an estate publication.
- Published journal translations received idiomatic fixes in NL/EN/DE; French typography and historical precision were tightened.
- Stable localized homepage, Journal and article URLs now exist with reciprocal `hreflang`; the previous French-canonical-only technical state is superseded.

## 2026-08-27 Generator Note

- The generated localized homepage FAQ structured data was still French even though the visible FAQ was localized.
- `scripts/generate-language-pages.js` now contains a source-level localization fix for FAQ and Brewery `additionalProperty` structured data.
- The booking preview was removed from the production homepage files on Lars's instruction. The localized homepages were then regenerated with the approved structured-data fix, and the SEO validator passes.

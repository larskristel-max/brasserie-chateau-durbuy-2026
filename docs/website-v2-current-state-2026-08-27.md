# Website v2 - Current State and Local Work Boundary

Last updated: 2026-09-01

This is the current operational status for local website, SEO and AI-visibility work. Older dated handoffs remain useful as history, but this file takes precedence when they contradict the current repository.

## Safety Boundary

- Work locally unless Lars explicitly approves publication.
- Before any publication: show the affected pages in the browser, explain the changes, and obtain approval.
- Do not combine the unpublished booking preview with unrelated SEO or editorial changes.
- Do not commit, push, deploy, purge caches, request indexing, or change external listings as part of local preparation.
- Make generated-page changes in their canonical content source or generator rather than hand-editing output that will later be overwritten.

## Unpublished Work Separation

The working tree contained these changes before the 2026-08-27 Website v2 maintenance pass:

- Four localized `journal/published-articles-2026-05-27.json` files: generated feed changes.
- Untracked rain article source/alternate image files under `src/assets/`.

The local booking-calendar preview was removed from the four production homepage files on Lars's instruction. Booking design work now belongs in the separate Codex task `Website Booking` and must remain outside production website code until Lars approves a reviewed prototype.

## Current Implemented Architecture

- Canonical public domain: `https://brasseriechateaudurbuy.be/`.
- Static site delivered through the Cloudflare site-proxy Worker from the built `gh-pages` branch.
- Four stable homepage routes: French root, `/nl/`, `/en/`, `/de/`.
- Four localized Journal indexes and localized canonical article URLs.
- Reciprocal `hreflang` for homepages, Journal indexes and localized article equivalents, with French as `x-default`.
- Journal source: `content/journal/articles.json`.
- Page generation: `scripts/generate-journal-pages.js` and `scripts/generate-language-pages.js`.
- Generated sitemap, localized public Journal feeds and `llms.txt` article map.
- Cloudflare Web Analytics is automatically injected; do not add a second beacon.
- Search Console domain property and sitemap are configured.
- Public forms use the reservations Worker and Resend.
- The private Google Calendar `Brewery Visits` exists, but the calendar-backed booking backend is not live.

## Current Public Content Facts

- Exact public entity name: `Brasserie du Château de Durbuy`.
- Current displayed range: Blonde du Château, Bohemian Pilsner, Amber Ale and IPA.
- Marckloff remains in production and is also presented as Amber Ale under another label.
- The brewery is situated in the former stables/outbuilding of the Château de Durbuy estate.
- The château remains private.
- Do not claim uninterrupted château brewing since the sixteenth century.
- Do not publish unapproved opening hours, prices, stock, visit availability or automatic booking confirmation.

## Current Measurement Baseline

Search Console, 2026-07-28 through 2026-08-24:

- 156 clicks.
- 3,084 impressions.
- 5.1% CTR.
- Average position 6.0.
- Main weakness: `brasserie durbuy`, 1 click from 239 impressions (about 0.4% CTR).

Cloudflare Web Analytics, latest recorded 30-day window on 2026-08-27:

- 640 visits.
- 760 page views.
- 1.19 pages per visit.
- Approximately 880 ms page-load time.
- Mobile accounts for about 77% of visits.

Targets remain 175+ search clicks, 6.5% CTR, 10+ Journal/article clicks, at least 3% CTR for `brasserie durbuy`, and pages per visit above 1.20 before targeting 1.30.

## Completed Technical Foundations

- Canonicals, sitemap, robots and localized routes.
- Homepage, Journal and article `hreflang` where translated equivalents exist.
- Brewery/Organization, FAQ, Blog/BlogPosting and breadcrumb structured data.
- Legacy alias handling through redirects and generated `noindex, follow` compatibility pages.
- Official factual fiche at `/fiche-officielle/`.
- Current beer range and Marckloff clarification.
- Localized launch and rain articles.
- Homepage-to-Journal links and article related/pager navigation.

## Local Technical Finding - 2026-08-27

The visible FAQ is localized on the NL/EN/DE homepages, but the generated FAQ structured data remained French. The Brewery structured-data `additionalProperty` values also remained French.

A source-level fix was added to `scripts/generate-language-pages.js` to localize those values from the existing reviewed homepage translation dictionary. A `--homepages-only` mode prevents this correction from rewriting Journal pages, feeds, articles, the sitemap or `llms.txt`.

The NL/EN/DE homepages were regenerated after the booking preview was removed. `scripts/validate-seo.js` now checks sitemap files, canonical URLs, reciprocal `hreflang`, JSON-LD parsing, visible/structured FAQ alignment and public product-feed discovery.

## Local Maintenance - 2026-09-01

- The SEO validator now also checks route language, Open Graph URL/canonical equality and Open Graph locale.
- The GitHub Pages build runs the SEO validator after generation and stops before deployment if validation fails.
- The NL/EN/DE public Journal JSON feeds now expose localized article fields at the top level for simple scrapers; the French feed remains French. Stable IDs, language slugs and nested translations are preserved.
- Journal-index sitemap dates now follow the newest published or updated article, and localized Journal indexes carry the correct Open Graph URL and locale.
- The approved public beer feed now says that EAN/GTIN information is not available in the brewery's current records, rather than claiming that no identifier has been assigned.
- The unused full-resolution rain JPG was removed from the repository working area and archived outside the repository. The two active responsive WebP files remain in place.
- These changes are local only. They have not been committed, pushed, deployed or submitted for indexing.

## Next Safe Local Work

1. Keep the structured-data generator fix separate and ready for the next intentional regeneration.
2. Audit generator output in an isolated copy after every generator change.
3. Keep the machine-checkable SEO validator in the pre-publication workflow.
4. Keep the approved public ingredient and allergen summaries aligned with the final labels whenever a recipe or label changes.
5. The food pairings are approved for machine-readable and editorial use; re-review them if a recipe or tasting profile changes.

The detailed beer-and-buyer verification worksheet is maintained outside this public repository so private trade figures are not exposed. The public repository contains only the approved subset in `data/beers.json`.

## Decisions Required From Lars Before Public-Facing Work

- Final French homepage title after evaluating the completed CTR test.
- No consumer, wholesale or distributor prices are to be published. Current terms are supplied privately and still require the normal contractual verification before use.
- Ets Dispas is approved for public identification as a beverage distributor in Barvaux-sur-Ourthe, linked to `https://www.ets-dispas.be/`. Its normal brewery stock still needs direct confirmation before making product-specific availability claims.
- Visit days, exact duration, buffer, programme, price and small-group pricing.
- Public brewery visits are offered in French, English and Dutch. German-language visits are not offered; the German information pages may remain available for reading.
- Approval to regenerate the protected homepage previews and publish any resulting changes.

## AI Visibility Policy

- AI visibility is treated as an extension of crawlable, indexable, people-first SEO.
- Important facts must exist as visible HTML and should be consistent across the official fiche, homepage, Journal and structured data.
- Structured data must match visible content; there is no special AI schema.
- `llms.txt` remains a conservative content map for systems that may use it, but it is not treated as a Google ranking signal.
- Avoid thin question pages, inauthentic mentions, keyword variants created only for AI, and claims unsupported by brewery records or independent sources.

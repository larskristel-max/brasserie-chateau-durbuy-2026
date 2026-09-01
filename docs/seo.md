# SEO / Visibility Notes

Last updated: 2026-09-01

## Current Decisions

- Canonical public domain: `https://brasseriechateaudurbuy.be/`.
- Temporary preview remains available at `https://larskristel-max.github.io/brasserie-chateau-durbuy-2026/`, but public metadata should point to the permanent domain.
- Current permanent-domain delivery: Cloudflare Worker serves the built `gh-pages` branch directly.
- Public contact email: `info@brasseriechateaudurbuy.be`.
- Instagram: `https://www.instagram.com/brasserieduchateaudedurbuy`.
- No public opening hours are published until access policy is confirmed.
- Reciprocal `hreflang` is published for the four homepage routes, localized Journal indexes and article sets with real translated equivalents. French is the `x-default` version.
- Journal articles keep French as the editorial source and use stable, self-canonical NL/EN/DE URLs when manually curated translations exist.
- Cloudflare Managed `robots.txt` is currently active on the zone and prepends its own AI-crawler rules. The repo `robots.txt` explicitly allows AI search / assistant retrieval agents while keeping `ai-train=no`.
- Daily SEO / Google / outreach continuity for 20/05/2026 is recorded in `docs/daily-ops-seo-google-outreach-2026-05-20.md`.
- Root `llms.txt` is used as a lightweight AI-readable summary and content map for systems that may consume it. Google states that `llms.txt` is not used for Google Search or its generative-AI ranking, so maintain it conservatively but do not treat it as a Google visibility lever.
- The official fiche at `https://brasseriechateaudurbuy.be/fiche-officielle/` is the canonical public reference for business identity, address, category, contact, social profiles, and access policy. Prefer this page for AI / directory / press citation over partly corrected third-party listings.

## Google / Discovery State - 20/05/2026

- Google Search Console domain property for `brasseriechateaudurbuy.be` was created and verified.
- Correct Google DNS verification record was added in Cloudflare.
- Accidental / wrong Google verification record was removed.
- Sitemap was submitted in Search Console.
- Indexing was requested for the homepage and `/journal/`.
- Sitemap fetching may need time even though the live sitemap works.
- Google Business Profile was created / updated with cautious brewery positioning: microbrasserie, official website, description, social profiles, and relevant attributes.
- Business profile guardrails: no invented opening hours, no menu, no restaurant claims, and no unsupported service claims.

## External Citation Audit - 27/05/2026

- Current legal / business-directory signal: Companyweb lists `La Brasserie du Château de Durbuy`, company number `BE 0553.910.976`, address `Rue du Comte Théodule d'Ursel 2, 6940 Durbuy`, and main activity `Vervaardiging van bier`.
- Main off-site discovery risk: older tourism, beer, restaurant, and map listings still associate Marckloff / La Ferme au Chêne with `36, rue Comte Théodule d'Ursel`, restaurant claims, menus, public visit claims, or legacy brewery naming.
- Priority cleanup targets: Google Business Profile, Google Maps duplicate/legacy pins, Apple Business Connect, Bing Places, Cirkwi, Ourthe & Aisne, Petit Futé, Untappd, beer directories, tourism boards, and local partner pages.
- Citation correction rule: align listings around the official site, the current name, address `Rue du Comte Théodule d'Ursel 2`, former stables of the Château de Durbuy, and cautious visit/access wording.
- Do not correct third-party listings by adding unapproved opening hours, menus, taproom claims, ABVs, tasting notes, online shop claims, or uninterrupted brewing since 1560.
- Owner execution pack: `docs/off-site-owner-action-pack-2026-05-27.md`.

## Metadata Policy

- Homepage canonical, Open Graph, Twitter card, and JSON-LD should use the permanent domain.
- From 2026-08-01, the French homepage runs a 21-day CTR test using `Brasserie du Château de Durbuy | Site officiel`; compare against the Search Console baseline in `docs/analytics.md` before retaining or reverting it.
- Structured data should stay factual: name, description, address, public email, site URL, logo/image, and Instagram.
- Do not add `openingHours`, reservation URLs, telephone numbers, product offers, beer names, ABVs, tasting notes, or event details until approved for public release.
- Keep `index.html` and `redesign-template.html` byte-identical after metadata edits.
- Keep `robots.txt` aligned with the visibility goal: allow ordinary search, AI search, and assistant retrieval; avoid training permission unless explicitly approved.
- Keep `llms.txt` factual and conservative: official identity, contact details, heritage context, important URLs, and unsupported claims to avoid.
- Do not add third-party listings to `sameAs` or citation preference until public rechecks confirm they no longer expose old La Ferme au Chêne / Marckloff titles, old address or phone data, restaurant/menu/taproom wording, public opening hours, or unsupported continuity claims.
- Homepage FAQ questions should be mirrored in `FAQPage` JSON-LD only when the same question and answer are visibly present on the page.
- Homepage includes a small factual FAQ and `FAQPage` JSON-LD. Keep answers strictly factual and avoid hidden SEO-only copy.
- Localized structured data must use the same language and facts as the visible localized page. The language generator owns this transformation.

## Current Search Checkpoint - 2026-08-27

- Search Console period: 2026-07-28 through 2026-08-24.
- 156 clicks, 3,084 impressions, 5.1% CTR and average position 6.0.
- `brasserie durbuy` remains the priority snippet problem: 1 click from 239 impressions, about 0.4% CTR.
- The French homepage title test begun on 2026-08-01 has completed its planned 21-day observation period and now requires a retain/revise/revert decision.
- Cloudflare's latest recorded 30-day baseline is 640 visits, 760 page views, 1.19 pages per visit and about 880 ms page-load time.

## Search Themes

- Brasserie du Château de Durbuy.
- Durbuy.
- Château de Durbuy.
- Domaine du Château de Durbuy.
- Brasserie dans les anciennes écuries du château.
- Histoire brassicole à Durbuy depuis le XVIe siècle.
- Philippe Marckloff, only with careful wording.
- Petites séries and fermentation traditionnelle, without generic craft-beer SEO language.

## Content Principles

- Estate first, brewery second, product last.
- French-first.
- Restrained, factual, and heritage-led.
- No "best brewery", "craft beer destination", "must visit", or tourist-brochure phrasing.
- Avoid unsupported continuity claims such as "brassée au château depuis 1560".

## Local SEO Tasks

- Claim or update Google Business Profile with the exact official name and permanent domain.
- Use a brewery / beer producer category where available; avoid restaurant positioning unless the business model changes.
- Keep appointment-only / private-access status accurate.
- Claim or update Bing Places and Apple Business Connect.
- Align tourism, directory, Untappd, Instagram, and Google naming around `Brasserie du Château de Durbuy`.
- Ask tourism and local partner pages to link to the permanent domain once the listing text is corrected.
- Use `docs/off-site-owner-action-pack-2026-05-27.md` as the working queue for platform claims, duplicate checks, outreach messages, and evidence tracking.

## Future Work

- Continue native-level review for every newly added NL/EN/DE article before publication.
- Keep translations grouped under the French editorial source while generating stable self-canonical localized URLs.
- Keep generated sitemap, `hreflang`, public feeds and `llms.txt` entries current for each approved stable article URL.
- Add a future `Le Domaine` page only after approved editorial direction and source review.
- Evaluate the completed French title test before running another snippet experiment.
- Maintain and validate the approved public beer-information feed in `data/beers.json` without publishing confidential trade terms. Add a restrained, visible people-first presentation only after editorial approval.

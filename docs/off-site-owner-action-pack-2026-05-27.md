# Off-Site Owner Action Pack - 27/05/2026

## Purpose

Use this as the working queue for Google, Maps, directories, tourism listings, and partner backlinks. The goal is to make `Brasserie du Château de Durbuy` the clear official brewery entity for Durbuy without adding restaurant, public-hours, menu, taproom, ABV, stock, or unsupported heritage claims.

## Status Update - 28/05/2026

- Google Search Console: property is accessible under `brasseurduchateau@gmail.com`. Performance report showed 10 web-search clicks, 312 impressions, 3.2% CTR, average position 5.9 for the visible 28-day view.
- Query evidence: `brasserie durbuy` had 32 impressions and 0 clicks; `brouwerij durbuy` had 10 impressions and 1 click. This confirms the main issue is local/entity relevance and click-through, not only crawlability.
- Sitemap: `https://brasseriechateaudurbuy.be/sitemap.xml` was resubmitted and re-read on 28/05/2026. Search Console now shows 7 discovered URLs.
- URL inspection: homepage, journal index, and all five article URLs are indexed and eligible for Google results.
- Google Business Profile: the listing is validated, named `Brasserie du Château de Durbuy`, uses address `Rue du Comte Théodule d'Ursel 2, 6940 Durbuy`, category `Microbrasserie`, and links to `https://brasseriechateaudurbuy.be/`.
- Google Business Profile caution: Google still surfaces restaurant-style prompts such as menu, reservations, phone, and opening hours. Do not fill these unless the facts are confirmed; avoid creating a public restaurant/taproom signal.
- Google Business Profile note: profile is verified and shows the correct name/address/category. Its description currently has an active Google review / pending-change state; Google says publication can take up to 30 days. Revisit once editable and replace wording such as `poursuit ce fil` with a more factual line to avoid any automated inference of uninterrupted brewing continuity.
- Google Business Profile note: Google Search publicly surfaced a `Réservations: brasseriechateaudurbuy.be` signal even though the profile also says `Ne prend pas de réservations`. This should be cleaned up in the Business Profile if Google exposes a safe removal path, because it can reinforce restaurant/taproom intent.
- Cloudflare: fixed on 28/05/2026. `http://brasseriechateaudurbuy.be/` and `https://www.brasseriechateaudurbuy.be/` now redirect to the canonical `https://brasseriechateaudurbuy.be/`.
- Repo-side improvement: journal index and article pages now include preview image metadata (`og:image`, `twitter:image`, and schema `image`) using the existing chateau image.
- Public Google result check: exact brand search shows the official site and validated profile, but Facebook and TerroirLux can still appear above the owned homepage. `brasserie durbuy` is mostly interpreted as restaurant/brasserie-in-Durbuy intent. `brewery durbuy` shows the target Maps listing, but still mixes in Brasserie de Durbuy, Marckloff, La Ferme au Chêne, and generic tourism/directory results.
- Highest-priority external cleanup from current results: tourism/directory pages that still say Marckloff / La Ferme au Chêne, pages pointing to Facebook instead of the official website, and directory results whose snippets imply the old brewery is closed or located at the old identity/address.

## Status Update - 29/05/2026

- Gmail follow-up check completed for SEO/AEO/GEO outreach.
- Petit Futé replied that the submitted corrections were accepted for processing and should be visible within 48 hours. A short French thank-you draft is prepared for review, not sent.
- Wanderlog replied that the stale page was removed as a good-faith measure, but warned it is generated from Google Places data and can reappear if Google's source data is not corrected.
- CellarMonk replied that the correction was made and invited brewery copy/photos, but the public listing still appears to show the old `Brasserie La Ferme au Chêne` name, old address, old phone/fax, and broad restaurant/taproom-style tags. A reply draft is prepared asking them to recheck publication and giving safe official copy.
- BeerPlanet email outreach bounced because `info@beerplanet.net` does not exist. Use the public contact form instead.
- Sluurpy email outreach bounced for both `ristoratori@sluurpy.com` and `segnalazioni@sluurpy.com`. Their business data-change route is the next path, with WhatsApp as backup if the form remains inaccessible.
- Google Search Console canonical notice received 29/05/2026 for `Autre page avec balise canonique correcte`. Live verification found no public noindex/robots issue. Slashless section URLs such as `/journal` now redirect to their canonical trailing-slash URL.
- Gmail drafts currently awaiting review: Untappd, Petit Futé thank-you, CellarMonk recheck/copy, Biernet follow-up, Craft Beer Monkey / Brewers Marketing, and Kompass.

## Copy/Paste Canonical Facts

- Official name: `Brasserie du Château de Durbuy`
- Legal variant where needed: `La Brasserie du Château de Durbuy`
- Company number: `BE 0553.910.976`
- Address: `Rue du Comte Théodule d'Ursel 2, 6940 Durbuy, Belgium`
- Website: `https://brasseriechateaudurbuy.be/`
- Email: `info@brasseriechateaudurbuy.be`
- Instagram: `https://www.instagram.com/brasserieduchateaudedurbuy`
- Facebook: `https://www.facebook.com/brasseriechateaudedurbuy`
- Category: brewery / microbrewery / beer producer
- Location context: former stables of the Château de Durbuy
- Access wording: brewery visits are in preparation and by appointment only for groups of 10 or more; the château is private and cannot be visited.

## Safe Descriptions

French:

`Site officiel de la Brasserie du Château de Durbuy, microbrasserie installée dans les anciennes écuries du Château de Durbuy. Brassage à Durbuy, patrimoine local et visites de la brasserie en préparation, uniquement sur réservation pour groupes à partir de 10 personnes. Le château est privé et ne se visite pas.`

Dutch:

`Officiële site van Brasserie du Château de Durbuy, een microbrouwerij in de voormalige stallen van het Château de Durbuy. Brouwerijbezoeken zijn in voorbereiding en gebeuren uitsluitend op afspraak, voor groepen vanaf 10 personen. Het kasteel is privé en kan niet worden bezocht.`

Short French:

`Brasserie du Château de Durbuy, microbrasserie située dans les anciennes écuries du Château de Durbuy. Site officiel.`

Short Dutch:

`Brasserie du Château de Durbuy, microbrouwerij in de voormalige stallen van het Château de Durbuy. Officiële site.`

## Platform Checklist

Use this table as the current tracking view. Older platform rows below are context, not proof of completion.

| Platform / listing | URL | Current status | Next action |
|---|---|---|---|
| Google Business Profile | `https://business.google.com/locations` | Validated and currently uses the official name, address, category, and website. Description has an active pending-review state; public panel also shows a reservation-link signal to the website. | Recheck after Google review clears; keep restaurant-style prompts blank unless facts change and remove reservation-link signal if a safe control is exposed. |
| Google Search Console | `https://search.google.com/search-console?resource_id=sc-domain%3Abrasseriechateaudurbuy.be` | Sitemap read successfully on 28/05/2026; homepage, journal, and five articles are indexed; re-indexing requested. Canonical notice received 29/05/2026 appears informational; live checks show public pages are indexable and canonicals match the sitemap. | Monitor queries and CTR weekly; inspect affected canonical examples only if Google lists an intended canonical page there. |
| Google Maps duplicates | Search Maps for duplicate names below | Rechecked 28/05/2026. `La Ferme au Chêne` still exists as a permanently closed Google Maps place at Rue du Comte Théodule d'Ursel 36 with old reviews. `Marckloff Durbuy` surfaces the official brewery in results, but also mixes restaurant/brasserie entities. | Keep closed predecessor as-is unless it starts competing as active; do not merge into the official brewery profile. |
| Apple Business Connect | `https://businessconnect.apple.com/` | Opened 28/05/2026; requires Apple sign-in / owner setup. Public Apple Maps search for `Brasserie du Chateau de Durbuy` resolves to `Durbuy Castle`, not the brewery. Apple Business sign-in/start page opened in the in-app browser. | Owner-login setup is a high-priority discovery fix. |
| Bing Places | `https://www.bingplaces.com/` | Opened 28/05/2026; requires Microsoft/Bing sign-in / owner setup. Public Bing Maps search for the official name resolves to `Brasserie de Durbuy srl`, not Brasserie du Château de Durbuy. Bing Places sign-in page opened in the in-app browser for owner login. | Owner-login setup is a high-priority discovery fix. |
| Untappd | `https://untappd.com/w/la-brasserie-du-chateau-de-durbuy/36617` | Public page found; name/location are useful, but category appears as `Brew Pub`, which can reinforce restaurant/taproom intent. Gmail draft prepared to `business@untappd.com` on 28/05/2026. | Review/send draft or claim brewery page. |
| Cirkwi | `https://www.cirkwi.com/fr/point-interet/2863862-la-marckloff-micro-brasserie-du-chateau-de-durbuy` | Support acknowledged, but public indexed FR/NL/EN/DE pages still show `La Marckloff / Micro-brasserie du château de Durbuy`; older snippets also expose a stale personal email/mobile. | Follow up if no correction appears; ask MTFA/Famenne-Ardenne data source to rename the point consistently. |
| Ardenne Belge | `https://www.ardennebelge.be/diffusio/nl/p/lokale-producent/la-marckloff-micro-brasserie-du-chateau-de-durbuy-durbuy_TFOTER-A0-00DW-06W9/` | Contacted; still needs public title/entity cleanup. | Follow up if no correction appears. |
| Biernet | `https://www.biernet.nl/bier/brouwerijen/belgie/luxemburg/durbuy/marckloff-la` | Reply received 28/05/2026 with new URL `https://www.biernet.nl/bier/brouwerijen/belgie/luxemburg/durbuy/brasserie-du-chateau-de-durbuy`. Dutch follow-up draft prepared asking them to avoid leaving the old Marckloff / La Ferme au Chêne page as a competing current listing. | Review/send draft; recheck both old and new Biernet URLs after publication settles. |
| Menuweb | `https://menuweb.menu/restaurants/durbuy/la-ferme-au-chene-2` | Submitted 28/05/2026 with on-page receipt. | Wait, then chase if unchanged. |
| LaCarte | `https://lacarte.menu/restaurants/durbuy/la-ferme-au-chene-2` | Submitted 28/05/2026 with on-page receipt. | Wait, then chase if unchanged. |
| Resto.be | `https://en.resto.be/restaurant/durbuy/6940-durbuy/173931-la-ferme-au-chene/` | Submitted 28/05/2026 with on-page receipt. | Wait, then chase if unchanged. |
| Belgique Heures | `https://belgique.heures.info/commerce/la-ferme-au-chene/durbuy` | Submitted 28/05/2026 with on-page receipt. | Wait, then chase if unchanged. |
| Petit Fute | `https://www.petitfute.com/v68892-durbuy-6940/c650-produits-gourmands-vins/c1117-vins-alcools/c714-biere-brasserie/c1352-brasserie-artisanale-et-micro-brasserie/1394487-marckloff.html` | Submitted 28/05/2026 with on-page receipt. Reply received 29/05/2026: corrections should be visible within 48 hours. | Recheck public page after 31/05/2026; thank-you draft prepared if desired. |
| OpCafeGaan | `https://www.opcafegaan.be/durbuy/la-ferme-au-chne` | Gmail outreach sent 28/05/2026. | Wait, then chase if unchanged; high priority because it shows active/open old signals. |
| Polybeer | `https://polybeer.com/breweries/index.php?COMPID=1057&sub=1` | Gmail outreach sent 28/05/2026. | Wait, then chase if unchanged. |
| BeerPlanet | `https://beerplanet.net/brewery/brasserie-la-ferme-au-chene/` | Gmail outreach to `info@beerplanet.net` bounced on 28/05/2026. Contact form at `https://beerplanet.net/contact/` staged/prefilled for owner review, not submitted. | Review visible form and submit if approved; use submit-brewery form only if contact form fails. |
| Vlaamse Brouwers | `https://vlaamsebrouwers.be/brouwerijlocaties/belgium/luxemburg-1/durbuy/la-brasserie-du-chateau-de-durbuy/` | Correct name/address found, but public copy includes a phone number and a stronger historical line than desired. Gmail outreach sent 28/05/2026. | Wait, then chase if unchanged. |
| CellarMonk | `https://www.cellarmonk.com/europe/brewery-europe/brasserie-la-ferme-au-chene/` | Reply received 28/05/2026 saying corrections were made, but public page still appears stale. Gmail draft prepared 29/05/2026 asking them to recheck publication and giving safe official copy. | Review/send draft; recheck public listing after response. |
| Tripadvisor | `https://www.tripadvisor.com/ImproveListing-d3665299.html` | Blocked in in-app browser because Google auth popup failed. | Complete in a normal/login-capable browser. |
| BeerXchange | `https://www.beerxchange.com/brewery/la-ferme-au-cha-ne/36617` | Public page appears to mirror Untappd and shows `Brew Pub`; likely lower priority and dependent on Untappd data. | Recheck after Untappd is corrected. |
| Craft Beer Monkey | `https://www.craftbeermonkey.com/Brewery/Brasserie-La-Ferme-Au-Chene/11779` | New stale listing found 28/05/2026: `Brasserie La Ferme Au Chene`, old/wrong address, claimable brewery profile. Claim route appears account/portal-based and returned `403 Site Disabled` in checks. Gmail draft prepared to Brewers Marketing at `info@brewersmarketing.com`. | Review/send Brewers Marketing draft; use claim route only if account setup becomes acceptable. |
| Belvicci | `https://www.belvicci.com/index.php/discovery/belgium/durbuy/marckloff` | New stale listing found 28/05/2026: `MARCKLOFF`, old phone/email/address, reservation language, restaurant/discovery framing. Contact/register links exist, but no usable public correction form/email was found in page checks. | Manual/account route only for now; prioritize if the listing keeps surfacing because it reinforces restaurant/reservation intent. |
| Bizique / AllBiz | `https://www.bizique.be/la-ferme-au-ch%C3%AAne` | Old `La Ferme au Chêne` is marked closed, but still lists old address and surfaces `Brasserie Marckloff` as another business at the same address. Bizique exposes `Modifier ou supprimer`, a support ticket form, and a removal tool; the edit route `https://user.bizique.be/edit/?i=BE&u=la-ferme-au-ch%C3%AAne&l=fr` is behind Cloudflare verification in the in-app browser. | Manual browser pass if this becomes a priority; lower priority because the old record is already marked closed. |
| Nonoresto | `https://nonoresto.be/restaurant/la-ferme-au-chene/` | New stale Dutch restaurant page found 28/05/2026; presents La Ferme au Chene as a current brewery cafe/restaurant. Contact form staged/prefilled with a short Dutch correction message, not submitted. | Review visible form and submit if approved. |
| Kompass | `https://xk.kompass.com/en/c/la-brasserie-du-chateau-de-durbuy/ben0631179/` | Public page has correct name/address and beer manufacturing classifications, but also shows broad/legacy categories such as bars/restaurants and unrelated food-processing classifications. Profile-owner update route requires registration; Belgian contact form route exists. Gmail draft prepared to `info@kompass.com`. | Review/send draft or use Belgian Kompass contact form under company-profile management. |
| Wikipedia Marckloff | `https://fr.wikipedia.org/wiki/Marckloff` | Not edited. | Only update if policy-compliant sourcing is available. |

## Prioritized External Cleanup - 28/05/2026

1. La Ferme au Chêne active local listings:
   - `https://www.opcafegaan.be/durbuy/la-ferme-au-chne`
   - `https://belgique.heures.info/commerce/la-ferme-au-chene/durbuy`
   - `https://en.resto.be/restaurant/durbuy/6940-durbuy/173931-la-ferme-au-chene/`
   - Correction: mark as closed / historical predecessor; remove active hours, booking, old phone, and old address signals from any current brewery context.

2. Restaurant aggregators carrying old La Ferme au Chêne / Marckloff signals:
   - `https://be.sluurpy.com/durbuy/restaurant/2243551/la-ferme-au-chene`
   - `https://menuweb.menu/restaurants/durbuy/la-ferme-au-chene-2`
   - `https://lacarte.menu/restaurants/durbuy/la-ferme-au-chene-2`
   - `https://wanderlog.com/place/details/219345/la-ferme-au-chne`
   - Correction: closed / historical only; Marckloff should point to Brasserie du Château de Durbuy at Rue du Comte Théodule d'Ursel 2.

3. Tripadvisor old attraction:
   - `https://www.tripadvisor.fr/Attraction_Review-g580121-d3665299-Reviews-Micro_Brasserie_Marckloff-Durbuy_Luxembourg_Province_The_Ardennes_Wallonia.html`
   - Correction: old attraction closed for visits; clarify Marckloff is tied to Brasserie du Château de Durbuy, not an active La Ferme au Chêne visit.

4. Petit Futé Marckloff:
   - `https://www.petitfute.com/v68892-durbuy-6940/c650-produits-gourmands-vins/c1117-vins-alcools/c714-biere-brasserie/c1352-brasserie-artisanale-et-micro-brasserie/1394487-marckloff.html`
   - Correction: remove old Rue d'Ursel 36, old phone, hours, restaurant/group menu claims; update to current brewery NAP or mark historical.

5. Wikipedia:
   - `https://fr.wikipedia.org/wiki/Marckloff`
   - `https://fr.wikipedia.org/wiki/Liste_de_brasseries_belges`
   - Correction: replace old `lafermeauchene.be` and `Brasserie La Ferme au Chêne` signals with current official site / Brasserie du Château de Durbuy where policy and sourcing allow; keep La Ferme au Chêne as former/historical.

6. Tourism syndication naming:
   - `https://www.ardennebelge.be/diffusio/fr/p/producteur/la-marckloff-micro-brasserie-du-chateau-de-durbuy-durbuy_TFOTER-A0-00DW-06W9/`
   - `https://www.cirkwi.com/fr/point-interet/2863862-la-marckloff-micro-brasserie-du-chateau-de-durbuy`
   - Correction: primary title should be `La Brasserie du Château de Durbuy`; Marckloff should be a product/brand/historical mention, not the main place entity.

7. Old beer-directory records:
   - `https://beerplanet.net/brewery/brasserie-la-ferme-au-chene/`
   - `https://polybeer.com/breweries/index.php?COMPID=1057&LETTER=F&sub=1`
   - `https://www.cellarmonk.com/europe/brewery-europe/brasserie-la-ferme-au-chene/`
   - Correction: mark as former / renamed and moved; current entity is Brasserie du Château de Durbuy at Rue du Comte Théodule d'Ursel 2.

8. Brasserie de Durbuy disambiguation:
   - `https://brasseriededurbuy.be/`
   - Correction: do not merge. It is a separate business at Avenue Louis de Loncin 7. Any third-party listing using `Brasserie de Durbuy` for Marckloff or the château brewery should be corrected to the full château name.

## Duplicate Search Terms

Use these in Google Maps, Google Search, Apple Maps, Bing Maps, Untappd, and directories:

- `Brasserie du Château de Durbuy`
- `La Brasserie du Château de Durbuy`
- `Micro-brasserie du Château de Durbuy`
- `La Marckloff`
- `Marckloff Durbuy`
- `La Ferme au Chêne`
- `Brasserie La Ferme au Chêne`
- `Rue du Comte d'Ursel 36`
- `Rue du Comte Théodule d'Ursel 36`
- `Rue du Comte Théodule d'Ursel 2`

## Search Console Monitoring Queue

Already submitted / inspected on 28/05/2026:

- `https://brasseriechateaudurbuy.be/`
- `https://brasseriechateaudurbuy.be/journal/`
- `https://brasseriechateaudurbuy.be/journal/quand-le-grain-manque-2026-05-26/`
- `https://brasseriechateaudurbuy.be/journal/avant-letiquette-finale-2026-05-20/`
- `https://brasseriechateaudurbuy.be/journal/marckloff-et-nous-2026-05-19/`
- `https://brasseriechateaudurbuy.be/journal/les-anciennes-ecuries-2026-05-18/`
- `https://brasseriechateaudurbuy.be/journal/une-biere-dici-2026-05-17/`

Sitemap submitted and read:

- `https://brasseriechateaudurbuy.be/sitemap.xml`

Track queries:

- `brasserie durbuy`
- `brouwerij durbuy`
- `brewery durbuy`
- `Brasserie du Château de Durbuy`
- `La Brasserie du Château de Durbuy`
- `Marckloff Durbuy`
- `microbrasserie durbuy`

Canonical notice follow-up:

- 29/05/2026 Search Console message: `Autre page avec balise canonique correcte`.
- Live technical check passed: homepage, journal index, and all five articles have canonical tags matching the sitemap; `http` and `www` redirect to canonical HTTPS; `/journal` redirects to `/journal/`; public robots allow crawling and no public `noindex` was found.
- No code/content task remains unless Search Console examples show an intended canonical URL in the excluded list.

## Safe Anchor Text

- `Brasserie du Château de Durbuy`
- `La Brasserie du Château de Durbuy`
- `microbrasserie à Durbuy`
- `brouwerij in Durbuy`
- `brewery in Durbuy`
- `anciennes écuries du Château de Durbuy`
- `histoire brassicole de Durbuy`
- `Marckloff et Durbuy`

## Claims To Avoid

- Public opening hours
- Public menu, taproom, restaurant, or online shop
- Beer names, ABVs, tasting notes, or current stock claims unless released
- Public château visits
- Continuous brewing at the château since 1560
- “Best brewery in Durbuy” or tourism-superlative wording

## Outreach Template - French

Objet: Mise à jour de la fiche Brasserie du Château de Durbuy

Bonjour,

Pourriez-vous mettre à jour la fiche liée à la brasserie de Durbuy / Marckloff / La Ferme au Chêne ?

Les informations officielles actuelles sont:

- Nom: Brasserie du Château de Durbuy
- Adresse: Rue du Comte Théodule d'Ursel 2, 6940 Durbuy
- Site officiel: https://brasseriechateaudurbuy.be/
- Description courte: Brasserie du Château de Durbuy, microbrasserie située dans les anciennes écuries du Château de Durbuy. Site officiel.

Merci de ne pas reprendre d'anciens horaires, menus, numéros de téléphone ou informations liées à La Ferme au Chêne sans confirmation. Les visites de la brasserie sont en préparation et se font uniquement sur réservation pour groupes à partir de 10 personnes. Le château est privé et ne se visite pas.

Bien cordialement,

Brasserie du Château de Durbuy

## Outreach Template - Dutch

Onderwerp: Update fiche Brasserie du Château de Durbuy

Beste,

Kunt u de fiche rond de brouwerij in Durbuy / Marckloff / La Ferme au Chêne bijwerken?

De huidige officiële gegevens zijn:

- Naam: Brasserie du Château de Durbuy
- Adres: Rue du Comte Théodule d'Ursel 2, 6940 Durbuy
- Officiële website: https://brasseriechateaudurbuy.be/
- Korte beschrijving: Brasserie du Château de Durbuy, microbrouwerij in de voormalige stallen van het Château de Durbuy. Officiële site.

Gelieve geen oude openingsuren, menu's, telefoonnummers of gegevens van La Ferme au Chêne over te nemen zonder bevestiging. Brouwerijbezoeken zijn in voorbereiding en gebeuren uitsluitend op afspraak voor groepen vanaf 10 personen. Het kasteel is privé en kan niet worden bezocht.

Met vriendelijke groeten,

Brasserie du Château de Durbuy

## Partner Backlink Template - French

Objet: Lien vers le site officiel de la Brasserie du Château de Durbuy

Bonjour,

Dans le cadre de la mise à jour des informations locales autour de Durbuy, pourriez-vous ajouter ou corriger le lien vers le site officiel de la Brasserie du Château de Durbuy ?

Lien: https://brasseriechateaudurbuy.be/

Texte recommandé: `Brasserie du Château de Durbuy`

Merci beaucoup,

Brasserie du Château de Durbuy

## Gmail Outreach Status - 28-29/05/2026

Already sent or answered in Gmail:

- Famenne-Ardenne / Maison du Tourisme: contacted; reply received; photos added to the fiche.
- Ardenne Belge: update request sent to `info@ardennebelge.be`, with `marine.georges@ardenne.belge.be` in copy.
- Cirkwi: support request acknowledged; follow-up sent to `support@cirkwi.com`.
- Durbuy tourism / RSI Durbuy: site-official notice sent to `tourisme@durbuy.be` and `rsidurbuy@gmail.com`.
- APAQ-W / Trinquons Local: reply received from `f.dargent@apaqw.be`; membership form received.
- Zythos / Groep Bier: reply received; offline lists updated and website update expected with the next monthly refresh.

Gmail outreach sent on 28/05/2026:

| Target | Recipient | Language | Listing / issue | Follow-up date |
|---|---|---|---|---|
| OpCafeGaan | `Info@opcafegaan.be` | Dutch | `La Ferme au Chene` active listing | 04/06/2026 |
| Biernet | `info@biernet.nl` | Dutch | Marckloff / brewery naming update | 04/06/2026 |
| Wanderlog | `support@wanderlog.com` | English | old La Ferme au Chene place page; reply received 28/05/2026 saying the page was removed as a good-faith measure but may reappear from Google Places data | Monitor only; focus permanent fix on Google source data |
| Sluurpy | `ristoratori@sluurpy.com`, cc `segnalazioni@sluurpy.com` | French | old La Ferme au Chene restaurant page; both addresses bounced on 28/05/2026 | Use `https://business.sluurpy.com/` data-change route or WhatsApp backup `+39 351 786 8470` |
| Polybeer | `info@polybeer.com` | English | former Brasserie La Ferme au Chene brewery record | 04/06/2026 |
| BeerPlanet | `info@beerplanet.net` | English | former Brasserie La Ferme au Chene brewery record; email bounced on 28/05/2026 | Use `https://beerplanet.net/contact/` |
| Vlaamse Brouwers | `info@vlaamsebrouwers.be` | Dutch | current listing has correct name/address but should remove stale phone and soften historical continuity wording | 04/06/2026 |

Gmail drafts prepared for review:

| Target | Draft recipient | Language | Listing / issue | Follow-up date |
|---|---|---|---|---|
| Untappd | `business@untappd.com` | English | public brewery page uses `Brew Pub`; request review toward brewery / microbrewery and official site alignment | 04/06/2026 |
| Biernet | `info@biernet.nl` | Dutch | thanks them for creating/updating the new Brasserie du Château de Durbuy page and asks that the old Marckloff / La Ferme au Chêne page not remain a competing current listing | Optional; can send after review |
| Petit Fute | `redaction@petitfute.com`, cc `szeremeta@petitfute.com` | French | short thank-you reply after Petit Futé accepted the correction for processing | Optional; can send after review |
| CellarMonk | `theabbot@cellarmonk.com` | English | asks them to recheck publication because live page still appears stale; includes safe official brewery copy | Send after review |
| Craft Beer Monkey / Brewers Marketing | `info@brewersmarketing.com` | English | asks Brewers Marketing to correct the stale Craft Beer Monkey `Brasserie La Ferme Au Chene` listing or mark it former/legacy | Send after review |
| Kompass | `info@kompass.com` | English | asks Kompass to remove misleading restaurant/bar and unrelated activity classifications from the company profile | Send after review |

Remaining manual follow-up:

| Target | Contact path | Language | Note |
|---|---|---|---|
| Tripadvisor | `https://www.tripadvisor.com/ImproveListing-d3665299.html` or `https://www.tripadvisor.com/Owners` | English | skipped for now; direct edit route works, but Google auth popup is blocked in the in-app browser. Use email login or normal browser later. |
| Cirkwi pro support | `https://pro.cirkwi.com/contact-support/` | French | use only if the existing support thread stalls |
| BeerPlanet | `https://beerplanet.net/contact/` | English | replacement route after email bounce; contact form staged/prefilled, not submitted. Contact form is better than submit-brewery because this is a stale listing correction/removal. |
| Nonoresto | `https://nonoresto.be/contact/` | Dutch | contact form staged/prefilled with a short Dutch correction message for the stale `La Ferme au Chene` restaurant page; not submitted. Review visible form and submit if approved. |
| Sluurpy | `https://business.sluurpy.com/` or WhatsApp `+39 351 786 8470` | French or English | replacement route after both Sluurpy emails bounced; business data-change Google Form may require a normal browser/login session. |

Prepared public-form payloads for owner review:

BeerPlanet contact form (`https://beerplanet.net/contact/`):

- Name: `Lars Kristel`
- Email: `info@brasseriechateaudurbuy.be`
- Subject: `Brewery listing correction - Brasserie du Château de Durbuy`
- Message:

```text
Hello,

The listing for Brasserie La Ferme au Chene should be corrected as a former/legacy brewery record.

Current official details:
Name: Brasserie du Château de Durbuy
Address: Rue du Comte Théodule d'Ursel 2, 6940 Durbuy, Belgium
Website: https://brasseriechateaudurbuy.be/
Email: info@brasseriechateaudurbuy.be
Category: brewery / microbrewery

Please do not carry over old public hours, phone numbers, restaurant, taproom, menu, or shop information from La Ferme au Chêne unless confirmed by the brewery.
```

Sluurpy data-change route (`https://business.sluurpy.com/`) or WhatsApp backup:

```text
Bonjour,

Merci de corriger ou retirer la page La Ferme au Chene à Durbuy si elle présente l'établissement comme un restaurant actuel.

Les informations officielles actuelles sont:
Nom: Brasserie du Château de Durbuy
Adresse: Rue du Comte Théodule d'Ursel 2, 6940 Durbuy, Belgium
Site officiel: https://brasseriechateaudurbuy.be/
Email: info@brasseriechateaudurbuy.be
Catégorie: brasserie / microbrasserie

Merci de ne pas reprendre d'anciens horaires, menus, réservations, numéros de téléphone ou informations de restaurant sans confirmation.
```

Nonoresto contact form (`https://nonoresto.be/contact/`):

- Name: `Lars Kristel`
- Email: `info@brasseriechateaudurbuy.be`
- Subject: `Correctie vermelding La Ferme au Chene`
- Message:

```text
Beste,

Kunt u de pagina La Ferme au Chene corrigeren of verwijderen als actuele restaurantpagina?

De huidige officiële gegevens zijn:
Naam: Brasserie du Château de Durbuy
Adres: Rue du Comte Théodule d'Ursel 2, 6940 Durbuy, België
Website: https://brasseriechateaudurbuy.be/
E-mail: info@brasseriechateaudurbuy.be
Categorie: brouwerij / microbrouwerij

Gelieve geen oude openingsuren, menu's, reservaties, telefoonnummers of restaurantinformatie over te nemen zonder bevestiging.
```

Do not auto-submit these without owner review because they transmit owner contact details to third-party platforms and may change or remove public business listings.

### Browser Form Status - 28/05/2026

Submitted or attempted in browser:

| Target | URL / route | Status |
|---|---|---|
| Menuweb | `https://menuweb.menu/contribute/restaurant/la-ferme-au-chene-2` | Submitted 28/05/2026. On-page confirmation: `Your report has been received. Thank you!` |
| Petit Fute | `https://www.petitfute.com/information/contact.html` | Submitted 28/05/2026. On-page confirmation: `Votre message a Ã©tÃ© bien envoyÃ©, merci de votre retour !` |
| Resto.be | `https://www.resto.be/contact` | Submitted 28/05/2026 via `Helpdesk pour restaurants`. On-page confirmation: `Aanvraag verzonden.` |
| Belgique Heures | `https://belgique.heures.info/contact` | Submitted 28/05/2026. On-page confirmation: `Message envoyÃ© ! Nous avons reÃ§u votre message, nous allons le gÃ©rer au plus vite.` |
| CellarMonk | `https://www.cellarmonk.com/contact-us/` | Submitted 28/05/2026 via `Listing Addition/Correction`; reply received from Chris. Public listing still appears stale, so a recheck/copy draft is prepared in Gmail. |
| LaCarte | `https://lacarte.menu/contribute/restaurant/la-ferme-au-chene-2` | Submitted 28/05/2026. On-page confirmation: `Your report has been received. Thank you.` |
| Nonoresto | `https://nonoresto.be/contact/` | Staged/prefilled with a short Dutch correction message for the stale `La Ferme au Chene` restaurant page. Privacy checkbox is checked because the form requires it. Not submitted; review visible form and submit if approved. |
| BeerPlanet | `https://beerplanet.net/contact/` | Staged/prefilled with the English brewery listing correction message. Not submitted; review visible form and submit if approved. |

Email confirmations:

- Menu/Menuweb sent contribution confirmation emails on 28/05/2026; both original confirmation links were opened in the browser. A later Menuweb confirmation email received at 11:13 UTC was also opened and redirected to the Menuweb homepage without a separate success message.

Blocked or needs manual action:

| Target | Status |
|---|---|
| Tripadvisor | Skipped for now. Direct edit route is `https://www.tripadvisor.com/ImproveListing-d3665299.html`; fields to submit later: official name, `https://brasseriechateaudurbuy.be/`, `info@brasseriechateaudurbuy.be`, `Rue du Comte ThÃ©odule d'Ursel 2`, Durbuy, `6940`, category `Breweries`; leave hours blank. Google auth popup did not work in the in-app browser. |
| Sluurpy | Keep manual. Both outreach email addresses bounced; use `https://business.sluurpy.com/` data-change route or WhatsApp `+39 351 786 8470`. The route may require a normal browser/login session, so do not mark submitted unless the form or WhatsApp message is actually sent. |

## Deployment and Search Console Status - 28/05/2026

- Main branch pushed: `c66d817` (`Refine localized SEO wording and citation follow-up`).
- Production branch pushed: `ddb484f` (`Deploy refined SEO wording`).
- GitHub Pages deployment completed successfully.
- Live production check passed for homepage title, meta description, `robots.txt`, `sitemap.xml`, and `llms.txt`.
- Google Search Console sitemap status: `https://brasseriechateaudurbuy.be/sitemap.xml` submitted and read successfully on 28/05/2026, with 7 discovered URLs.
- Google Search Console URL inspection: homepage, journal index, and all five journal article URLs were shown as on Google.
- Re-indexing requested in Search Console for:
  - `https://brasseriechateaudurbuy.be/`
  - `https://brasseriechateaudurbuy.be/journal/`
  - `https://brasseriechateaudurbuy.be/journal/quand-le-grain-manque-2026-05-26/`
  - `https://brasseriechateaudurbuy.be/journal/avant-letiquette-finale-2026-05-20/`
  - `https://brasseriechateaudurbuy.be/journal/marckloff-et-nous-2026-05-19/`
  - `https://brasseriechateaudurbuy.be/journal/les-anciennes-ecuries-2026-05-18/`
  - `https://brasseriechateaudurbuy.be/journal/une-biere-dici-2026-05-17/`

## Future Structural SEO Item

- Multilingual discoverability remains structurally weaker because Dutch, English, and German copy is client-side on the same canonical URLs. Do not add hreflang yet. Revisit separate indexable language URLs only after translations are fully reviewed and approved.

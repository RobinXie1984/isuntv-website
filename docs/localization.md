# Localization release contract

Nine interface languages do not imply translated media. Keep original titles and source URLs. Never derive recording dates from upload dates. Unknown summary fields stay null; audio/subtitle language remains UNKNOWN until verified.

## Current editorial batch

`content/translation-batches.json` records the first existing summary in each featured interview collection: Xian Xinghai, the Marco Polo Bridge episode, Li Delun, and Pujie/Hiro Saga. French, Spanish, Korean, Hindi and Hebrew translations are based on the existing English/Traditional Chinese metadata summaries, not newly inferred video facts. Native-editor review remains UNKNOWN. The remaining archive is a continuing editorial backlog; do not mark it complete.

Keep the original four-language records intact. Titles, all six summary fields (including nulls), referenced person names and search aliases are completed together. Current per-profile counts are published at `/translation-coverage.json` and displayed in the programme catalogue. Original recordings retain their audio/subtitles regardless of interface language.

## Terminology and identity

- Canonical person names: Robin Xie and Chen Ping. Local display forms are aliases, not separate identities. Preserve company names iSunTV and TideiSun Group.
- Executive Director / Managing Partner / Chairman remain distinct source roles. Existing local corporate-title choices need native editorial sign-off; do not invent an assertion of statutory equivalence.
- Brand licensing requires board/management approval. A payment, photograph or business card is not authorization. Missing register information is not proof of misuse.
- Submission acceptance is not confirmed delivery. Translate failure and uncertain-delivery states without increasing certainty.
- Preserve original programme titles alongside translated display names. Expand local-name aliases only from reviewed translations.
- Retained English brand captions and postal addresses are explicitly language-tagged. Hong Kong vocabulary in Simplified Chinese is a regional style choice, not broken script conversion.

## Regression and release

Every profile build runs `scripts/localization.test.mjs` for dictionary parity, missing-key failure, locale error recovery, selected translation completeness/null preservation, content-aware indexing and local-name search. Review 320/390px and desktop heading boxes, including clipped text where document width stays normal. Test locale switching after a changed verification ID, direct links and browser back navigation.

Cloudflare 404s are localized before the response is sent. GitHub Pages can only serve one physical 404 document: it selects the URL locale with a small inline script, plus nine-language recovery links without JavaScript. Never replace the HTTP 404 status with a redirect to a successful page.

Before claiming completion: compare all three live release fingerprints, check every locale's normal/error page and a completed versus pending episode, verify the mobile layout and query preservation, and update the dated audit without erasing its original findings. Physical devices, screen readers and native-editor certification are separate evidence boundaries.

# iSunTV website preview

Traditional Chinese at `/`; Simplified Chinese `/zh-Hans`, English `/en`, Japanese `/ja`.

Install pinned dependencies with `npm ci`; verify with `npm run lint`, `npx tsc --noEmit`, and `npm run build`. Run a local preview with `npm run dev -- --hostname 127.0.0.1 --port 4317`.

The site renders public playlist data at the edge using Vinext. It has no accounts, payments, database, or video downloads. Search uses normal HTML GET forms and the same public catalogue; no client search service or tracking is required. Programme pages preserve playlist order and link to YouTube. The original supplied playlist mapping remains in lib/catalogue.ts; the Journeys page also shows its submitted geography link alongside the observed official Journeys series.

Content is incomplete: 158 source-backed six-question drafts (including partially specified fields); remaining descriptions are being researched. Missing source titles have localized fallbacks. A playlist item is not proof of current video playability. All preview pages request no indexing.

The unused shadcn scaffold is preserved unchanged. Authored application code is linted; unused components/ui and use-mobile scaffold are excluded from lint only. TypeScript checks the full project. Dimensioned source thumbnails use direct image elements, with the specific Next image-optimizer lint rule waived and documented in affected files.

The single operational status file, ingestion scripts, raw evidence and cutover authority are in the canonical parent project. They must not be packaged into the hosted site. .openai/hosting.json contains the existing registered preview project ID; reuse it and do not create another project. Never store source repository write tokens.

Production iSunTV.com cutover requires Robin's explicit approval after a reviewed candidate and rollback plan. No domain cutover has occurred.

Shared descriptions are explicitly labelled in the video view. Drafts summarize titles and descriptions only; unknown details remain null, and upload dates are not substituted for recording dates.

Person references use a shared identity registry in lib/people.json and explicit per-video IDs. Links display localized names, so multi-person episodes identify the linked subject. Sources remain in their original language.

Reviewed localized display titles currently cover 158 episodes. Original source titles and playlist membership remain unchanged in lib/videos.json. The original title is available through a native details disclosure on video pages; search indexes both original and localized titles. Untranslated episodes retain their source title and are not misrepresented as translated.

## Brand authority and institutional pages

The 2026 institutional extension, shared Robin identity, licensing verification and contact-delivery activation steps are documented in [docs/brand-authority.md](docs/brand-authority.md). It preserves the four-language catalogue. The canonical Robin Person ID is `https://www.tideisun.com/robin#robin-xie`; reuse `lib/brand-identity.ts`, never create a separate person for a name variant.

## Collaboration

Public source repository: https://github.com/RobinXie1984/isuntv-website.

- `main`: current review website; 166 drafted episodes across four languages.
- `cutover/public-candidate-20260909`: proposed iSunTV.com indexing and sitemap configuration; not deployed to that domain.
- Review website: https://isuntv-rebuild-preview.robin10.chatgpt.site. Public preview access does not mean the iSunTV.com cutover is complete.

Edit `lib/drafts.json` for six-question summaries, `lib/display-titles.json` for translated titles, and `lib/people.json` for sourced identity links. Preserve the original catalogue IDs, playlist order and titles in `lib/videos.json`. Keep unknown fields null and every episode linked to its source. Run the validation commands above before requesting review. GitHub edits do not automatically deploy; publication is performed separately.

No additional reuse license is granted for third-party video, thumbnail or identity-source content. YouTube media remain on YouTube.

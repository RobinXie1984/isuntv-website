# iSunTV brand authority — September 2026

Robin's approved identity is stored in `lib/brand-identity.ts`. Robin, Robin Xie, Bin Xie, Bin "Robin" Xie, 谢玢 and 謝玢 are one Person, with the stable ID `https://iamrobin.ai/#person`. iSunTV and TideiSun remain separate Organizations. Use this exact Person ID when the other three profile sites are next edited; this change does not alter those external websites.

Roles supplied by Robin and confirmed on the group profile: Executive Director of iSunTV; Managing Partner of TideiSun Group. Robin also identifies as an angel investor and AI system builder. Do not infer ownership, unlimited personal liability or new qualifications from these roles.

## Pages

Traditional Chinese and English: home, about, global, interviews, chairman, robin, licensing, verify, contact, privacy. Existing programmes, videos and search remain available in all four original languages. Catalogue now has its own `/programmes` entry. Simplified Chinese and Japanese homepages retain the existing archive experience.

Approved image 1 supplies the homepage composition, navy/harbour/portrait palette and English labels. Image 3 supplies the warm institutional About direction. Actual logo and executive photographs are sourced assets. The homepage interview portrait and harbour/earth illustrations are generated decorative artwork, not claims that anyone has been interviewed or authorized. Homepage portrait is visibly marked as an illustration. New entrepreneur interviews are described as forthcoming, with the actual archive linked separately.

## Authorization operations

The public register starts **unpublished**, with no invented licenses or operational signing key. The public website explicitly says it is not yet able to confirm authorizations. `/api/authorizations/[id]` returns HTTP 503 in that state, never an active result.

A signed record includes organization, scope, territory, precise UTC start/end times, Robin's stable approver ID, an approval reference, update time, issued/revoked state and revocation time. Ed25519 signatures cover every field. Invalid signatures, wrong approvers, invalid dates and duplicate IDs fail closed. Expiration is calculated at request time; revocation supersedes expiry. Public verification responses are not cached.

Before activation, Maimai must obtain Robin's approved licensing authority and document template; establish a controlled signing process and public key; protect registry/key changes with branch review; import only approved records; and verify a revocation drill. `approvalReference` must be a public-safe reference, never a private contract or personal information. Public-key pinning is a trust decision; cryptography alone does not prove Robin approved a record. Do not store private signing keys in the website, git or chat. Registry history is currently git history, not an independent append-only audit system. Blockchain evidence is not integrated by this change and does not itself establish a valid license.

`/verify` and its API are prepared for signature checking. A signed record's canonical message is the JSON object returned by `authorizationPayload` in its explicit field order, UTF-8 encoded. Status checks distinguish active, future, expired, revoked, missing and unverifiable. Do not publish the register until governance and keys are ready.

## Contact delivery

The POST endpoint fixes the destination to `partner@isuntv.com`; visitor input cannot select recipients or the sender. Input length/type validation, origin checks, a honeypot, timeout, no-store responses and plain-text message composition are implemented. No submission contents are logged or saved to the site. The form retains user input on failure and never announces delivery without a provider acceptance ID. Provider acceptance is not inbox delivery.

The feature is disabled until `CONTACT_FORM_ENABLED=true`, a server-only `RESEND_API_KEY`, and verified `CONTACT_FROM_EMAIL` are configured in the existing Sites environment. Maimai must configure edge rate limiting/anti-abuse before enabling, test provider rejection, and confirm receipt at the partner mailbox. No emails were sent during implementation. Current form submissions clearly fail with a direct email alternative. Private mailbox retention and the operating legal entity still need owner-approved privacy wording before launch.

## SEO / AEO / GEO and cutover

- A single shared JSON-LD graph is emitted in server-rendered HTML; ProfilePage points at Robin's existing Person ID.
- Canonicals and bilingual alternates are explicit for institutional pages; the existing four-language catalog and sitemap remain.
- All preview metadata is noindex/follow. robots allows crawling to discover noindex. Do not turn production indexing on until the domain has actually cut over.
- Maimai must reconcile exact URLs and existing schema on iamrobin.ai and both TideiSun profile pages to this shared ID. Those sites are not changed here.
- Before cutover: inventory existing production URLs and approve redirects; verify real email receipt; activate the approved registry only when ready; confirm DNS/origin ownership and rollback; replace preview indexing settings with environment-specific production settings and submit production sitemap.
- Search and AI answer engines do not guarantee indexing, ranking or citations. Structured data describes visible, supported facts; it is not a substitute for editorial content and external corroboration.

No domain, DNS, mailbox, Cloudflare access or repository permissions were changed. GitHub write access returned 403 for the current integration; local changes have not been merged into Maimai's candidate branch. The public preview is not updated unless explicitly deployed.

## Sources

- https://www.tideisun.com/robin and https://www.tideisun.com/en/robin — official profile, roles and photograph.
- https://www.tideisun.com/founder — Chen Ping profile, photograph and group/media history.
- https://www.tideisun.com — group offices, Hong Kong HQ and media mission.
- User-supplied chairman PDF is linked directly. Its contents were not extracted; biography uses the readable official founder page.
- Three additional VIP/Mall/Tokyo addresses are copied from Robin's instructions. Tokyo's supplied building spelling has not been independently verified; Google Maps opens an address search rather than a claimed exact pin.
- https://developers.google.com/search/docs/appearance/ai-features
- https://schema.org/Person
- https://resend.com/docs/api-reference/emails/send-email

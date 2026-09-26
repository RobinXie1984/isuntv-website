# iSunTV — one source, three entrances

**Edit once. Commit once. Release all three domains from the same commit.** This is the only active source repository for iSunTV.com, iSun1.com and iSunMedia.com. The former `isun1_clone` repository is archived as migration history. Do not maintain separate editable copies or synchronization scripts.

| Profile | Default language | Public origin | Delivery |
|---|---|---|---|
| `isuntv` | Traditional Chinese (`zh-Hant`) | https://isuntv.com | Cloudflare Pages `isuntv-public` |
| `isun1` | Simplified Chinese (`zh-Hans`) | https://isun1.com | GitHub Pages from this repository |
| `isunmedia` | English (`en`) | https://isunmedia.com | Cloudflare Pages `isunmedia-public` |

All profiles share design, text, images, identity data, authorization policy and eight language editions. iSunMedia receives exactly the full iSunTV catalogue and interview selection. `sites.json` supplies each default language and public origin; canonicals, language alternates, sitemaps, robots and internal links derive from it. Each domain is its own canonical. Hosting adapters retain the existing regional delivery and enquiry services.

## Mainland content selection

`content/` is the authoritative source. `content/visibility-policy.json` classifies the three stable playlist IDs belonging to **名人自述 / 口述歷史** as global-only. `scripts/content-visibility.mjs` derives the union of their stable video IDs and excludes those IDs from every Mainland playlist, including cross-listed videos. Display labels never decide visibility.

`project-site.mjs` projects the selected profile into ignored `lib/generated/` and `.generated/public/` before compiling. iSun1 receives no restricted video records, detail routes, search/recommendation entries, thumbnails, playlist links, sitemap entries, metadata, JSON-LD or feeds. Excluded direct routes return 404. The complete source remains available to iSunTV and iSunMedia without a duplicate database.

The interview selections use stable programme IDs:

- iSunTV and iSunMedia: `masters`, `life-online`, `personal-accounts`, `oral-history`.
- iSun1: `masters`, `life-online`, `love-marriage`, `national-tragedy`.

The current full catalogue contains 1,348 videos; iSun1 publishes 820 and excludes 528 global-only IDs. Counts derive from the shared data, not manually maintained copies.

## Build and verify

Use Node 24 and the committed lockfile. Studio is the canonical execution workspace.

```sh
npm ci
npm test
npm run build:all
python3 scripts/check-static.py artifacts/isun1
node scripts/check-pair.mjs
```

Builds are sequential because they reuse the generated projection directory. Never run profile builds concurrently in one checkout. Outputs are `artifacts/isuntv/`, `artifacts/isun1/` and `artifacts/isunmedia/`; generated outputs are not editable content sources. `npm run build:both` remains available for the original two profiles.

Tests cover stable-ID filtering, cross-listed IDs, renamed labels, missing classifications, full-catalogue parity and contact forwarding guards. Consumer checks and complete artifact scans cover every restricted video/playlist ID. Static QA validates generated HTML languages, local links/assets and canonicals. Each `release.json` records the source commit, common source digest and visibility-policy digest.

## One coordinated release

`.github/workflows/release.yml` builds and validates all three artifacts, checks destination access, publishes both Cloudflare Pages projects and this repository's GitHub Pages site, then fetches all three live release markers, default languages and canonicals. A failed, stale or mismatched deployment fails the workflow.

Publishing across providers is not atomic; a brief mixed-version interval is possible. A release is complete only when final verification passes. Repair a failed destination or restore all destinations to the last verified commit. Preserve prior deployments and Actions artifacts for rollback. A branch workflow dispatch can prepare only the new iSunMedia destination while skipping the existing production sites; normal main-branch releases publish all three.

`CLOUDFLARE_PAGES_DEPLOY_TOKEN` is an existing GitHub encrypted secret with Pages Edit only for the Tidenet account. Robin approved it on 2026-09-17; it expires 2027-09-17. The release gate may create only `isunmedia-public` if missing. It does not change DNS, mail or credentials. Never put tokens in source, logs, email or cross-machine copies.

Existing mail secrets remain with their current providers. iSunTV uses its same-origin form endpoint; iSun1 uses `isun1-enquiry.isunmedia.com`. iSunMedia origin-checks and forwards contact requests only to the existing iSunTV handler, stripping cookies and authorization headers. No mail credential is copied. Invalid-input tests send no email. The approved public contact alias remains `partner@isuntv.com`. The unpublished authorization register stays closed unless a signed current verification service is configured.

The iSunMedia domain's MX, SPF, DKIM, mail-host CNAMEs and existing enquiry Worker must be preserved during website routing changes. ChinaSunTV is outside this release; its earlier preparation remains historical evidence.

`.github/workflows/drift.yml` performs a weekly read-only three-domain fingerprint check. It does not redeploy or change content. GitHub failure reporting remains the alert surface. Run `npm run check:drift` on demand.

## Stability and ownership

Robin owns editorial decisions and approvals. Maimai owns routine build, deployment, verification and recovery. Studio owns canonical source and evidence; iMac is the control plane. The approved stability period runs through 2027-03-17. Preserve current design/content; security or availability repairs and Robin's explicit requests remain allowed. The September 26 iSunMedia request is such an authorized extension.

The sole living status is `../PROJECT_STATE.md` in the canonical Studio project. Previous shared-source evidence is retained in `../evidence/two-domains-20260917/`; the iSunMedia release has its own dated receipt. Hong Kong Wi-Fi/cellular acceptance was confirmed by Robin on September 17. Do not infer future availability from that historical acceptance alone.

**中文营运规则：同一代码库、同一内容源、三个域名。** iSunTV 默认繁体中文，iSunMedia 默认英语且内容与 iSunTV 完全一致；iSun1 默认简体中文，保留既定大陆内容选择。稳定影片 ID 决定全球限定内容，原始资料完整保留。一次主分支提交统一发布三站，版本核验全部通过才算完成。保留现有邮箱及 iSun1 咨询服务；无需复制凭证或维护同步脚本。

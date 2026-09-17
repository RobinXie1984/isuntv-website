# iSunTV — one source, two entrances

**Edit once. Commit once. Release both domains from the same commit.** This is the only active source repository for iSunTV.com and iSun1.com. Do not maintain two editable repositories or add a synchronization script. The former `isun1_clone` repository is retained only as migration history until the new release is verified, then archived.

| Profile | Default language | Public origin | Delivery |
|---|---|---|---|
| `isuntv` | Traditional Chinese (`zh-Hant`) | https://isuntv.com | Existing Cloudflare Pages `isuntv-public` |
| `isun1` | Simplified Chinese (`zh-Hans`) | https://isun1.com | GitHub Pages from this repository |

Both profiles share design, text, images, Robin Xie identity data, authorization policy and eight language editions. `sites.json` supplies the default language and public origin; canonicals, language alternates, sitemaps, robots and internal links derive from it. Hosting adapters differ to retain the working regional delivery and enquiry services. Neither site links to the other as its canonical.

## One content exception

`content/` is the authoritative data source. `content/visibility-policy.json` classifies the three stable playlist IDs belonging to **名人自述 / 口述歷史** as global-only. `scripts/content-visibility.mjs` derives the union of their stable video IDs and excludes those IDs from **every** Mainland playlist, including cross-listed videos. Display labels are never used to decide visibility.

`project-site.mjs` projects the selected site into ignored `lib/generated/` and `.generated/public/` before compiling. iSun1 receives no restricted video records, detail routes, search/recommendation entries, thumbnails, playlist links, sitemap entries, metadata, JSON-LD or feeds. A direct request for an excluded video returns 404. The complete source data remains in `content/` for iSunTV. No manual deletion or duplicate database is required.

The interviews feature uses these stable programme IDs:

- iSunTV: `masters`, `life-online`, `personal-accounts`, `oral-history`.
- iSun1: `masters`, `life-online`, `love-marriage`, `national-tragedy` — 百年巨匠、人生在线、百年婚恋、国殇.

These programme selections are part of that single publication policy.

## Build and verify

Use Node 24 and the committed npm lockfile. Studio is the canonical execution workspace.

```sh
npm ci
npm test
npm run build:both
python3 scripts/check-static.py artifacts/isun1
node scripts/check-pair.mjs
```

Builds are sequential because they reuse the generated projection directory. Never run the two profile builds concurrently in the same checkout. Outputs are `artifacts/isuntv/` and `artifacts/isun1/`; generated outputs are never a second editable source.

Tests cover stable-ID filtering, cross-listed IDs, renamed labels, missing classifications, direct lookup, search, metadata and sitemaps. Artifact scanning checks every published text file and filename against all restricted video and playlist IDs. Static QA checks all generated HTML languages, local links/assets and canonicals. `release.json` records the source commit, common source digest and visibility-policy digest on each domain.

## One coordinated release

`.github/workflows/release.yml` builds and validates **both** artifacts before publishing either. It then deploys to the existing Cloudflare project and this repository's GitHub Pages site. The final job requires both deployments to succeed and fetches both live release markers, language defaults and canonicals. A failed or stale deployment fails the workflow and reports which check failed in the GitHub Actions summary.

Two providers cannot commit atomically: a brief mixed-version interval is possible. Never call a release complete unless the final verification passes. Repair the failed side or restore **both** to the last verified commit; preserve the previous Cloudflare deployment and GitHub Actions artifacts for rollback. Do not perform an unrelated domain migration during a content release.

Required setup: GitHub Pages uses Actions in this repository and claims `isun1.com`; the old repository relinquishes only that Pages claim after the new artifacts are ready. `CLOUDFLARE_PAGES_DEPLOY_TOKEN` is a GitHub encrypted secret with only **Cloudflare Pages Edit** for the Tidenet account. It grants deployment control over Pages projects in that account, not DNS, mail or other accounts. Creating this new persistent grant requires Robin's approval. Never put tokens in source, logs, email or a cross-machine copy.

Robin approved the one-year Pages-only publishing grant on 2026-09-17; it is stored encrypted in GitHub and expires 2027-09-17.

The existing mail relay secrets stay in their current hosting providers. The non-secret form-enabled flag and relay URL are explicitly retained in the Pages configuration; no relay secret is stored in Git. iSunTV uses its same-origin form endpoint; iSun1 uses the existing dedicated enquiry worker. Both show the approved public contact alias `partner@isuntv.com`. The empty unpublished authorization register remains closed; a future published register requires a signed current verification service before a static build will proceed.

`.github/workflows/drift.yml` performs a weekly **read-only** fingerprint check. It does not redeploy or modify content. GitHub's failed-workflow reporting is the alert surface; no unsolicited email integration is added. Run `npm run check:drift` on demand.

## Stability period and ownership

Robin owns editorial decisions and approvals. Maimai owns routine build, deployment, verification and recovery. Studio owns the canonical project and evidence; iMac is the control plane.

After the coordinated release passes acceptance, preserve the approved design and content for six months (target through 2027-03-17 if accepted on 2026-09-17). No feature work, redesign, automated dependency upgrades or routine content churn during the freeze. Read-only health/drift checks continue. Necessary security/availability recovery and Robin's explicit later requests remain allowed and must use the same source and paired-release checks.

The one living operational status file is `../PROJECT_STATE.md` in the canonical Studio project (not a second independent website status). Detailed migration evidence is `../evidence/two-domains-20260916/`. Source baselines: iSunTV `e55756bcd25bbe6beb8c453b4282288929502f7c`; iSun1 `62f3cf8ad2339520cb9b9f46eb63610394084e7c`.

The earlier Hong Kong recovery acceptance still needs explicit real Hong Kong Wi-Fi and cellular confirmation; build success or cloud probes cannot substitute for that evidence.

## Deferred technical notes

After the freeze, consider a signed live authorization-register service only if records need publishing; source-verified editorial summaries/translations; and video preservation following Robin's storage/business decisions. Do not add a second content store or a synchronization service. Any future CMS must feed the same stable-ID publication policy.

**中文營運規則：同一代码库、同一内容源、两个域名。** 只改一次並從同一提交發布兩站。名人自述及口述歷史以穩定影片 ID 實施全球限定，完全不進入 iSun1 的頁面、搜尋、推薦、網站地圖、結構化資料或資源包；原始資料仍保留。兩站版本核對全部通過才算完成發布。驗收後穩定運行六個月，保留既定設計；安全修復、可用性恢復及 Robin 明確提出的新要求除外。

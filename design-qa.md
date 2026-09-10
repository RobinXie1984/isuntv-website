# iSunTV institutional extension: design review

Source visual truth:

- Homepage: approved option 1, `../generated_images/exec-fec12f3b-9afc-4400-848d-4dd3657b8628.png` (1487 × 1058).
- About direction: approved option 3, `../generated_images/exec-59dc7f2a-c304-4120-a925-448213debe83.png` (1487 × 1058), adapted into the requested media-mission page.
- User-approved differences: actual logo, shorter Traditional Chinese, “採訪精選”, retained English labels and new institutional routes.

Implementation evidence:

- `docs/screenshots/homepage.jpg`: browser-rendered full overview, returned at 912 × 936 pixels by the capture service. The browser DOM viewport was 1348 × 936 CSS pixels; the overview is downsampled, not a 912px responsive viewport.
- The About page, chairman, Robin, licensing, verification, contact and archive journeys were opened in the cloud browser.
- Homepage reference and rendered implementation were inspected together in the same comparison output. Region review covered masthead, two-panel hero, headlines, buttons, values and the additional licensing section.

Findings and fixes:

- Initial header displayed the source logo with excessive margins. The source image remains intact; its presentation now crops the surrounding empty margins.
- Initial left headline wrapped into two fixed lines. Removed the forced break and aligned the eyebrow labels to better match the approved composition; natural wrapping remains at narrower widths.
- Contact honeypot visibility conflicted with the form-label selector. Added the scoped hiding rule and disabled the form up front when email delivery is not configured.
- Preserved the approved split, navy/harbour palette, warm portrait, editorial typography, red/outline actions and ivory values band. The new About page uses an institutional jade/ivory adaptation. No fabricated biography, interview quotation or license is shown.

Primary interactions:

- Homepage → Robin → licensing → verification works.
- Submitting an ID navigates to `/verify?id=TEST-NOT-A-LICENSE` and displays “公開登記尚未啟用”.
- Contact office disclosure exposes the supplied VIP address; English language switch reaches `/en/contact` with matching canonical and `lang=en`.
- Disabled delivery clearly explains that online submission is unavailable and provides the partner mailbox.
- Chairman biography and interview archive entry are linked and reachable.
- Homepage and English contact DOM checks showed no horizontal overflow at the available desktop viewport.
- Console inspection found browser-extension metadata errors only; no application JavaScript error was observed in the checked journeys.

Remaining verification boundary:

- The capture service returned a scaled overview after a full-page capture timed out. A matching 1487 × 1058 source/implementation viewport pair was not obtained through the exposed browser controls.
- Mobile and 200% text enlargement were not browser-tested. Responsive CSS is implemented, but this is not evidence of visual verification at those sizes.
- Formal pixel-fidelity sign-off therefore remains blocked. This is a reviewable implementation draft, not a claim of completed cross-device design QA.

final result: blocked

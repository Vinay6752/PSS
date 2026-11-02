# PSS redesign preview

This folder contains an isolated, static redesign preview for Punit Security Services.

## Preview
Open `redesign/index.html` in a browser, or serve the repository root with any static HTTP server and visit `/redesign/`.

## Implementation notes
- No framework, build step, or runtime dependency.
- Responsive layout with keyboard-visible focus states and reduced-motion support.
- Mobile navigation and enquiry email composition are implemented in vanilla JavaScript.
- The enquiry form opens the visitor's email client. It does not submit to a backend or store data.
- Company details and service descriptions are based on the existing site configuration. No fabricated testimonials, client logos, workforce totals, or contract statistics were added.
- The preview does not replace the current production `index.html`; review it before deciding whether to promote it.

## Before production
1. Confirm all company details, phone numbers, licence wording, and validity dates.
2. Connect the enquiry form to a server-side endpoint with validation, spam protection, and privacy notice.
3. Replace any placeholder photography or add approved company photography if desired.
4. Test on current mobile and desktop browsers.
5. Review security and deployment configuration for the existing admin functionality separately.

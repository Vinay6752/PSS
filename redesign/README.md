# PSS redesign preview

This folder contains an isolated, static redesign preview for Punit Security Services.

## Preview
Open `redesign/index.html` in a browser, or serve the repository root with any static HTTP server and visit `/redesign/`.

## Design direction
- Bold black, white and electric-blue visual identity inspired by contemporary security-service landing pages.
- Large typographic hero, photographic composition, high-contrast service cards, capability grid and prominent contact panel.
- Uses the original site's embedded team and operational photographs. Images are embedded in the HTML, so the preview has no external image or font requests.
- Responsive desktop, tablet and mobile layouts with accessible navigation, labelled form controls, keyboard focus states and reduced-motion support.
- No framework, build step, or runtime dependency.

## Implementation notes
- The enquiry form opens the visitor's email client with a prefilled message. It does not submit to a backend or store data.
- Company details and service descriptions are based on the existing site. No fabricated testimonials, client logos, workforce totals, or contract statistics were added.
- The preview does not replace the current production `index.html`; review it before deciding whether to promote it.

## Before production
1. Confirm all company details, phone numbers, licence wording, validity dates and the use of the embedded photographs.
2. Connect the enquiry form to a server-side endpoint with validation, spam protection and an appropriate privacy notice.
3. Test on current mobile and desktop browsers, including keyboard-only navigation.
4. Review security and deployment configuration for the existing admin functionality separately.

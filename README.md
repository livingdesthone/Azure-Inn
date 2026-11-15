# Azure Inn — website prototype
Location supplied by owner: Anomabo, Central Region, Ghana.

## Current frontend
- Responsive coastal-inspired homepage, room section, about and contact placeholders.
- Hero image uses the first image supplied in the project conversation. It visibly includes a pool; because the owner confirmed Azure Inn has no pool, the hero crop is positioned to emphasize the pavilion and lounge. The source image is illustrative inspiration, not a verified Azure Inn photograph.
- Two supplied room images are used as illustrative references. A third category uses a neutral placeholder.
- Draft-only sample prices: Standard GHS 450/night; Deluxe GHS 650/night; Executive Suite GHS 950/night. These are not approved rates or confirmed room categories.
- Date validation and a booking enquiry demo dialog.

## Important limitations
No live availability, reservation storage, customer accounts, admin login, email/SMS, or payment processing exists yet. The enquiry dialog is only a front-end demonstration. Do not accept real bookings through this prototype.
The supplied images may depict other properties and must not be represented as actual Azure Inn photographs. Replace with owner-approved images or commissioned/generated illustrative images before public marketing.
No swimming pool is advertised.

## GitHub update
Upload/replace these files in the repository root, preserving folders:
- `index.html`
- `css/style.css`
- `js/main.js`
- `images/` (all three image files)
- `README.md`

GitHub Pages source should remain `main` and `/ (root)`. After committing, allow Pages to redeploy, then hard-refresh the site with Ctrl+F5.

## Still needed from hotel owner
1. Confirm actual room categories, inventory per category, bed types, maximum occupancy and amenities.
2. Approve or replace all sample nightly prices.
3. Supply official phone/WhatsApp, email, street address/map pin and social links.
4. Confirm check-in/out times, cancellation, deposit, refund and no-show policies.
5. Confirm services/facilities actually offered and provide approved hotel description.
6. Choose booking approval process and staff/admin users.
7. Decide payment methods and provide business account details only through secure provider onboarding (never commit secrets to GitHub).

## Future production work
Add a secure backend/database for inventory and reservations, admin authentication/roles, booking notifications, audit trail and payment provider checkout. Verify provider availability, fees, settlement, refunds, webhook support and current Ghana compliance before selecting a payment integration. Keep API secrets server-side, never in public frontend code.

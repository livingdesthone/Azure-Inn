# Azure Inn website — starter prototype

Location: Anomabo, Central Region, Ghana.

## Included
- Responsive single-page hotel website
- Coastal-inspired navy, white and gold visual direction
- Room cards with **draft-only** sample prices:
  - Standard Room: GHS 450/night
  - Deluxe Room: GHS 650/night
  - Executive Suite: GHS 950/night
- Date and guest selectors with basic date validation
- Mobile navigation
- Booking-request demo dialog

## Important prototype limitations
This is a frontend starter only. It does **not** check live inventory, create or store reservations, send email/SMS, or accept payments. The sample room categories, descriptions and prices are not verified hotel facts and must be approved by the hotel owner. No swimming pool is advertised.

The room illustrations are CSS placeholders, not photographs of Azure Inn. Replace them with approved AI-generated room images or actual hotel photos before launch. Any generated imagery must be clearly treated as illustrative rather than documentary photos of the property.

## Run locally
Open `index.html` in a browser, or use VS Code Live Server.

## Publish the frontend with GitHub Pages
1. Create a GitHub repository named `azure-inn`.
2. Upload the contents of this folder to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. GitHub Pages will publish the static frontend.

GitHub Pages cannot run a PHP/Node backend or safely process bookings/payments. For real reservations, connect a backend API and database (for example, a hosted Node/PHP service with PostgreSQL/MySQL), then integrate a Ghana-supported payment provider after checking current fees, settlement terms and API documentation. Never put secret API keys in frontend JavaScript or a public GitHub repository.

## Owner details still required
- Confirm actual room categories and number of rooms in each category
- Approve or replace sample nightly rates
- Confirm room occupancy, bed types and facilities
- Hotel phone/WhatsApp and email
- Exact address and map pin
- Check-in/check-out times, cancellation and deposit policies
- Preferred payment methods and payment provider account
- Approved hotel story and any real facility information

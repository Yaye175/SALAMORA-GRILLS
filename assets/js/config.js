/* =============================================================
   SALAMORA GRILLS — BUSINESS CONFIG
   -------------------------------------------------------------
   THIS IS THE ONLY FILE THE CLIENT NEEDS TO EDIT FOR:
   phone numbers, opening hours, address, socials, delivery areas.
   Menu items + prices live in menu.js.

   ⚠  EVERY VALUE MARKED "PLACEHOLDER" IS UNVERIFIED AND INVENTED.
      Confirm with the business before this goes to a real domain.
   ============================================================= */

window.SALAMORA = {

  brand: {
    name: 'Salamora Grills and Café',
    short: 'Salamora',
    // Taken from the logo badge on their own packaging.
    tagline: 'Premium Grills · Real Flavours',
    estd: '2026',
    instagram: 'salamoragrills.ng',
    instagramUrl: 'https://www.instagram.com/salamoragrills.ng'
  },

  contact: {
    // Confirmed by client brief.
    phoneDisplay: '+234 703 303 3496',
    phoneDial: '+2347033033496',
    // wa.me format: country code + number, no +, no spaces.
    whatsapp: '2347033033496'
  },

  location: {
    // Confirmed by the client, and matches the location on @salamoragrills.ng.
    // An earlier brief said "4 Amisi Musa St, Jabi" — that address is wrong
    // and must not come back.
    venue: 'Dreamland Suites',
    street: 'Jabi Lake',
    area: 'Utako',
    city: 'Abuja',
    country: 'Nigeria',
    get full() { return `${this.venue}, ${this.street}, ${this.area}, ${this.city}`; },
    // A text search, not a surveyed pin. Swap in the exact lat/lng from the
    // Google Business Profile so customers are not sent to a neighbouring unit.
    mapQuery: 'Dreamland Suites, Jabi Lake, Utako, Abuja, Nigeria'
  },

  /* ---------------------------------------------------------------
     OPENING HOURS — confirmed by the client
     ---------------------------------------------------------------
     Mon-Thu 9am-10pm. Fri, Sat and Sun run around the clock.

     A day is either { allDay: true } or 24h "HH:MM" open/close times.
     If `close` is earlier than `open` it is treated as closing after
     midnight. Set a day to `null` to mark it closed.

     Consecutive allDay days join into one continuous run, so Friday
     00:00 through Sunday 24:00 reads as one unbroken stretch rather
     than three separate days.

     Evaluated in Africa/Lagos — NOT the visitor's timezone. A customer
     browsing from London must still see Abuja's open/closed state.
  --------------------------------------------------------------- */
  hours: {
    timeZone: 'Africa/Lagos',
    week: {
      0: { allDay: true },                    // Sunday
      1: { open: '09:00', close: '22:00' },   // Monday
      2: { open: '09:00', close: '22:00' },
      3: { open: '09:00', close: '22:00' },
      4: { open: '09:00', close: '22:00' },   // Thursday
      5: { allDay: true },                    // Friday
      6: { allDay: true }                     // Saturday
    }
  },

  // PLACEHOLDER — confirm actual coverage + whether fees/minimums apply.
  deliveryAreas: [
    'Jabi', 'Utako', 'Wuse 2', 'Maitama', 'Central Area', 'Garki',
    'Gwarinpa', 'Life Camp', 'Katampe', 'Asokoro', 'Jahi', 'Mabushi'
  ],

  // Shown in the hero ticker.
  ticker: [
    'Premium grills · real flavours',
    'Mora Meat combos from ₦8,000',
    'Shawarma off the hot plate',
    'Shisha by the pot',
    'Breakfast served daily',
    'Delivery across Abuja'
  ]
};

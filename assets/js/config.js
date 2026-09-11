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
    name: 'Salamora Grills',
    tagline: 'Charcoal-fired since day one',
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
    street: '4 Amisi Musa St',
    area: 'Jabi',
    city: 'Abuja',
    country: 'Nigeria',
    get full() { return `${this.street}, ${this.area}, ${this.city}`; },
    // PLACEHOLDER co-ordinates — approximate Jabi centre, NOT a surveyed
    // pin. Replace with the exact lat/lng from the business' Google
    // Business Profile before launch or customers will be sent next door.
    mapQuery: '4 Amisi Musa Street, Jabi, Abuja, Nigeria'
  },

  /* ---------------------------------------------------------------
     OPENING HOURS — PLACEHOLDER
     ---------------------------------------------------------------
     24h "HH:MM". If `close` is earlier than `open` it is treated as
     closing after midnight (e.g. open 12:00, close 01:00 = 1am next day).
     Set a day to `null` to mark it closed.
     Evaluated in Africa/Lagos — NOT the visitor's timezone. A customer
     browsing from London must still see Abuja's open/closed state.
  --------------------------------------------------------------- */
  hours: {
    timeZone: 'Africa/Lagos',
    week: {
      0: { open: '13:00', close: '23:00' }, // Sunday
      1: { open: '12:00', close: '22:00' },
      2: { open: '12:00', close: '22:00' },
      3: { open: '12:00', close: '22:00' },
      4: { open: '12:00', close: '23:00' },
      5: { open: '12:00', close: '00:30' }, // Friday — closes 12:30am Sat
      6: { open: '12:00', close: '00:30' }  // Saturday — closes 12:30am Sun
    }
  },

  // PLACEHOLDER — confirm actual coverage + whether fees/minimums apply.
  deliveryAreas: [
    'Jabi', 'Utako', 'Wuse 2', 'Maitama', 'Central Area', 'Garki',
    'Gwarinpa', 'Life Camp', 'Katampe', 'Asokoro', 'Jahi', 'Mabushi'
  ],

  // Shown in the hero ticker.
  ticker: [
    'Open charcoal fire',
    'Same-day delivery across Abuja',
    'Party platters from 10 guests',
    'Point & kill catfish',
    'Suya spiced in-house'
  ]
};

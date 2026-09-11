/* =============================================================
   SALAMORA GRILLS — MENU DATA
   -------------------------------------------------------------
   ⚠  ALL PRICES BELOW ARE PLACEHOLDERS.
      They were invented for layout purposes only. Publishing them
      unchanged means quoting customers prices the kitchen never set.
      Replace every `price` before this site touches a live domain.

   `img` is intentionally null everywhere. No real photography was
   supplied. The site renders a styled placeholder tile instead of a
   broken image. Drop a path in (e.g. 'assets/img/mixed-grill.jpg')
   and it renders automatically.
   ============================================================= */

window.SALAMORA_MENU = {

  categories: [
    { id: 'platters', label: 'Grill Platters & Combos', short: 'Platters' },
    { id: 'seafood',  label: 'Fish & Seafood',          short: 'Seafood'  },
    { id: 'sides',    label: 'Sides & Bites',           short: 'Sides'    },
    { id: 'drinks',   label: 'Drinks & Mocktails',      short: 'Drinks'   }
  ],

  items: [
    /* ---------- GRILL PLATTERS & COMBOS ---------- */
    {
      cat: 'platters', name: 'The Salamora Board', price: 64000,
      serves: '4–6 guests', count: 9,
      desc: 'Whole chicken, beef suya, gizzard, peppered snail, asun, two proteins of the day, yam fries, plantain and a bowl of ata dindin.',
      tags: ['signature'], img: null, featured: true
    },
    {
      cat: 'platters', name: 'Ember Duo Platter', price: 32500,
      serves: '2 guests', count: 6,
      desc: 'Half chicken, beef skewers, spiced gizzard, yam fries, plantain and house pepper dip.',
      tags: ['bestseller'], img: null, featured: true
    },
    {
      cat: 'platters', name: 'Charcoal Chicken Combo', price: 18500,
      serves: '1 guest', count: 4,
      desc: 'Quarter chicken flame-grilled to order, yam fries, plantain, pepper dip.',
      tags: [], img: null
    },
    {
      cat: 'platters', name: 'Beef & Gizzard Skewers', price: 21000,
      serves: '1–2 guests', count: 5,
      desc: 'Six skewers over open coals, dusted in house yaji, onions and fresh tomato.',
      tags: [], img: null
    },
    {
      cat: 'platters', name: 'Goat Meat Asun Platter', price: 27500,
      serves: '2 guests', count: 5,
      desc: 'Smoked goat tossed in scotch bonnet and onion, served with yam fries and plantain.',
      tags: ['hot'], img: null
    },
    {
      cat: 'platters', name: 'Full Bird Family Grill', price: 45000,
      serves: '3–4 guests', count: 7,
      desc: 'Whole spatchcocked chicken, double yam fries, double plantain, coleslaw and two dips.',
      tags: [], img: null
    },

    /* ---------- FISH & SEAFOOD ---------- */
    {
      cat: 'seafood', name: 'Grilled Whole Croaker', price: 23500,
      serves: '1–2 guests', count: 3,
      desc: 'Whole croaker scored and grilled over charcoal, stuffed with onion and basil, plantain on the side.',
      tags: ['signature'], img: null, featured: true
    },
    {
      cat: 'seafood', name: 'Point & Kill Catfish', price: 19500,
      serves: '1–2 guests', count: 3,
      desc: 'Fresh catfish chosen from the tank, peppered and grilled, served with ata dindin and yam fries.',
      tags: ['hot'], img: null
    },
    {
      cat: 'seafood', name: 'Grilled Tilapia', price: 17000,
      serves: '1 guest', count: 3,
      desc: 'Whole tilapia, ginger-garlic marinade, fresh pepper sauce, plantain.',
      tags: [], img: null
    },
    {
      cat: 'seafood', name: 'Peppered Prawns', price: 26000,
      serves: '1–2 guests', count: 2,
      desc: 'King prawns seared over fire in scotch bonnet butter with charred lime.',
      tags: ['hot'], img: null
    },
    {
      cat: 'seafood', name: 'Peppered Snail', price: 15500,
      serves: '1 guest', count: 2,
      desc: 'Giant land snail, grilled and tossed in Salamora pepper mix.',
      tags: [], img: null
    },

    /* ---------- SIDES & BITES ---------- */
    { cat: 'sides', name: 'Yam Fries',          price: 4500,  serves: 'Side', count: 1, desc: 'Thick-cut yam, twice fried, yaji dusted.', tags: ['vegetarian'], img: null },
    { cat: 'sides', name: 'Fried Plantain',     price: 3800,  serves: 'Side', count: 1, desc: 'Ripe dodo, caramelised at the edges.', tags: ['vegetarian'], img: null },
    { cat: 'sides', name: 'Beef Suya (Wrap)',   price: 7500,  serves: 'Bite', count: 1, desc: 'Thin-sliced beef, house yaji, onion, cabbage, wrapped hot.', tags: ['bestseller'], img: null },
    { cat: 'sides', name: 'Asun (Small Bowl)',  price: 10500, serves: 'Bite', count: 1, desc: 'Smoked peppered goat, onion and scotch bonnet.', tags: ['hot'], img: null },
    { cat: 'sides', name: 'Peppered Gizzard',   price: 8000,  serves: 'Bite', count: 1, desc: 'Grilled gizzard in thick ata dindin.', tags: [], img: null },
    { cat: 'sides', name: 'Grilled Corn',       price: 2500,  serves: 'Side', count: 1, desc: 'Charred sweetcorn, butter and yaji.', tags: ['vegetarian'], img: null },
    { cat: 'sides', name: 'Coleslaw',           price: 2500,  serves: 'Side', count: 1, desc: 'Cold, crunchy, cuts the heat.', tags: ['vegetarian'], img: null },
    { cat: 'sides', name: 'Jollof Rice',        price: 5500,  serves: 'Side', count: 1, desc: 'Smoky party-style jollof cooked over wood.', tags: [], img: null },

    /* ---------- DRINKS & MOCKTAILS ---------- */
    { cat: 'drinks', name: 'Zobo Cooler',        price: 3000, serves: '400ml', count: 1, desc: 'Hibiscus, pineapple, ginger, clove. Served over ice.', tags: ['bestseller'], img: null },
    { cat: 'drinks', name: 'Chapman Classic',    price: 4500, serves: '400ml', count: 1, desc: 'Grenadine, citrus, bitters, cucumber ribbon.', tags: [], img: null },
    { cat: 'drinks', name: 'Smoked Tiger Nut',   price: 4000, serves: '350ml', count: 1, desc: 'Kunu aya blended with date and a whisper of smoke.', tags: [], img: null },
    { cat: 'drinks', name: 'Ember Sour (Mocktail)', price: 5500, serves: '300ml', count: 1, desc: 'Charred pineapple, lime, scotch bonnet syrup, egg-white foam.', tags: ['hot'], img: null },
    { cat: 'drinks', name: 'Palm Wine Spritz',   price: 5000, serves: '300ml', count: 1, desc: 'Fresh palm wine, soda, lime. Non-alcoholic option available.', tags: [], img: null },
    { cat: 'drinks', name: 'Bottled Water',      price: 1000, serves: '75cl', count: 1, desc: 'Chilled.', tags: [], img: null },
    { cat: 'drinks', name: 'Soft Drinks',        price: 1200, serves: '50cl', count: 1, desc: 'Coke, Fanta, Sprite, Malt.', tags: [], img: null }
  ],

  /* =============================================================
     CUSTOM PLATTER BUILDER — PLACEHOLDER PRICING
     Base price comes from the protein. Sides carry an upcharge.
     Spice level is free.
     ============================================================= */
  builder: {
    rules: { sidesRequired: 2 },
    proteins: [
      { id: 'chicken',  name: 'Charcoal Chicken',   note: 'Quarter bird',   price: 14000 },
      { id: 'beef',     name: 'Beef Suya Skewers',  note: '4 skewers',      price: 15500 },
      { id: 'goat',     name: 'Goat Asun',          note: 'Smoked & peppered', price: 18000 },
      { id: 'croaker',  name: 'Whole Croaker',      note: 'Grilled whole',  price: 21000 },
      { id: 'catfish',  name: 'Catfish',            note: 'Point & kill',   price: 17500 },
      { id: 'prawns',   name: 'King Prawns',        note: 'Seared in butter', price: 23000 }
    ],
    sides: [
      { id: 'yam',      name: 'Yam Fries',      price: 0 },
      { id: 'plantain', name: 'Fried Plantain', price: 0 },
      { id: 'jollof',   name: 'Jollof Rice',    price: 1500 },
      { id: 'corn',     name: 'Grilled Corn',   price: 0 },
      { id: 'slaw',     name: 'Coleslaw',       price: 0 },
      { id: 'gizzard',  name: 'Peppered Gizzard', price: 3000 },
      { id: 'salad',    name: 'Garden Salad',   price: 1000 },
      { id: 'chips',    name: 'Potato Chips',   price: 500 }
    ],
    spice: [
      { id: 'mild',   name: 'Mild',        note: 'Smoke, no burn',      level: 1 },
      { id: 'medium', name: 'Medium',      note: 'House standard',      level: 2 },
      { id: 'hot',    name: 'Hot',         note: 'Scotch bonnet lean',  level: 3 },
      { id: 'inferno',name: 'Salamora Inferno', note: 'Ask for water',  level: 4 }
    ]
  }
};

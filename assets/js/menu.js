/* =============================================================
   SALAMORA GRILLS AND CAFÉ — MENU DATA
   -------------------------------------------------------------
   Names and prices are transcribed from the menu card published on
   @salamoragrills.ng ("Mora Menu", 22 June). Dish DESCRIPTIONS were
   written for the website and have NOT been confirmed by the kitchen —
   check them before launch.

   `img: null` means no photograph was supplied for that item; the site
   renders a styled placeholder rather than a broken image. Drop a path
   in and it renders automatically.

   A photo is only attached to the dish it actually shows. The three
   wing variants share a recipe but not a preparation, so only Crispy
   Wings carries the wings photograph.
   ============================================================= */

window.SALAMORA_MENU = {

  categories: [
    { id: 'combos',    label: 'Mora Meat Combos',      short: 'Combos'    },
    { id: 'shawarma',  label: 'Shawarma',              short: 'Shawarma'  },
    { id: 'burgers',   label: 'Burgers, Wings & Fries', short: 'Burgers'  },
    { id: 'rice',      label: 'Mora Rice Specials',    short: 'Rice'      },
    { id: 'breakfast', label: 'Breakfast',             short: 'Breakfast' },
    { id: 'lounge',    label: 'Drinks & Lounge',       short: 'Drinks'    },
    { id: 'extras',    label: 'Extras',                short: 'Extras'    }
  ],

  items: [
    /* ---------- MORA MEAT COMBOS — all ₦8,000 ---------- */
    {
      cat: 'combos', name: 'Golden Yam & Mora Meat', price: 8000,
      serves: 'Mora Meat or Chicken', count: 2,
      desc: 'Golden fried yam with peppered Mora Meat, onions and sweet pepper.',
      tags: ['signature'], img: 'assets/img/golden-yam-mora-meat.jpg', featured: true
    },
    {
      cat: 'combos', name: 'Chips & Mora Meat', price: 8000,
      serves: 'Mora Meat or Chicken', count: 2,
      desc: 'A plate of hot chips alongside peppered Mora Meat in its own sauce.',
      tags: ['bestseller'], img: 'assets/img/chips-mora-meat.jpg', featured: true
    },
    {
      cat: 'combos', name: 'Noodles & Mora Meat', price: 8000,
      serves: 'Mora Meat or Chicken', count: 2,
      desc: 'Stir-fried noodles with vegetables and peppered Mora Meat. Add a fried egg for ₦600.',
      tags: [], img: 'assets/img/noodles-mora-meat.jpg', featured: true
    },
    {
      cat: 'combos', name: 'Plantain & Mora Meat', price: 8000,
      serves: 'Mora Meat or Chicken', count: 2,
      desc: 'Sweet fried plantain with peppered Mora Meat.',
      tags: [], img: null
    },
    {
      cat: 'combos', name: 'Mixture of 2', price: 8500,
      serves: 'Mora Meat & Chicken', count: 2,
      desc: 'Can’t choose? Both proteins on one plate, with the base of your choice.',
      tags: [], img: null
    },

    /* ---------- SHAWARMA ---------- */
    {
      cat: 'shawarma', name: 'Beef Shawarma', price: 6000,
      serves: '1 wrap', count: 1,
      desc: 'Toasted wrap with beef, sausage, cabbage and house sauce. Extra cheese ₦2,000.',
      tags: ['bestseller'], img: 'assets/img/shawarma.jpg', featured: true
    },
    {
      cat: 'shawarma', name: 'Chicken Shawarma', price: 6000,
      serves: '1 wrap', count: 1,
      desc: 'Toasted wrap with chicken, sausage, cabbage and house sauce. Extra cheese ₦2,000.',
      tags: [], img: 'assets/img/shawarma.jpg'
    },

    /* ---------- BURGERS, WINGS & FRIES ---------- */
    {
      cat: 'burgers', name: 'Lounge Burger & Fries', price: 12000,
      serves: '1 guest', count: 2,
      desc: 'Beef patty, melted cheese, house slaw and lettuce, with a basket of fries.',
      tags: ['signature'], img: 'assets/img/lounge-burger.jpg', featured: true
    },
    {
      cat: 'burgers', name: 'Crispy Wings & Fries', price: 10500,
      serves: '1 guest', count: 2,
      desc: 'Seasoned crispy wings with sweet peppers, fries and a house dip.',
      tags: [], img: 'assets/img/crispy-wings.jpg'
    },
    {
      cat: 'burgers', name: 'BBQ Wings & Fries', price: 10500,
      serves: '1 guest', count: 2,
      desc: 'Grilled wings glazed in barbecue sauce, served with fries.',
      tags: [], img: null
    },
    {
      cat: 'burgers', name: 'Spicy Wings & Fries', price: 10500,
      serves: '1 guest', count: 2,
      desc: 'Wings in a hot pepper glaze, served with fries.',
      tags: ['hot'], img: null
    },
    {
      cat: 'burgers', name: 'Loaded Fries', price: 8000,
      serves: '1 guest', count: 1,
      desc: 'Fries loaded with sauce and toppings.',
      tags: [], img: null
    },

    /* ---------- MORA RICE SPECIALS ---------- */
    {
      cat: 'rice', name: 'Chinese Rice, Mora Meat & Plantain', price: 14000,
      serves: '1 guest', count: 3,
      desc: 'Wok-fried Chinese rice with peppered Mora Meat and sweet fried plantain.',
      tags: ['signature'], img: 'assets/img/chinese-rice.jpg', featured: true
    },
    {
      cat: 'rice', name: 'Rice & Mora Chicken', price: 12000,
      serves: 'Chicken or Mora Meat', count: 2,
      desc: 'Rice served with Mora Chicken. Mora Meat available at the same price.',
      tags: [], img: null
    },

    /* ---------- BREAKFAST ---------- */
    {
      cat: 'breakfast', name: 'English Breakfast', price: 14000,
      serves: '1 guest', count: 6,
      desc: 'Pancakes or waffles, sausage, scrambled eggs, baked beans, grilled tomato, maple syrup and fries.',
      tags: ['signature'], img: 'assets/img/english-breakfast.jpg', featured: true
    },

    /* ---------- DRINKS & LOUNGE ---------- */
    { cat: 'lounge', name: 'Shisha',      price: 10000, serves: 'Per pot', count: 1, desc: 'One pot, for the table.', tags: ['signature'], img: null },
    { cat: 'lounge', name: 'Arabian Tea', price: 5000,  serves: 'Hot',     count: 1, desc: 'Spiced tea, served hot.', tags: [], img: null },
    { cat: 'lounge', name: 'Chapman',     price: 2000,  serves: 'Chilled', count: 1, desc: 'The house classic — grenadine, citrus and bitters.', tags: ['bestseller'], img: null },
    { cat: 'lounge', name: 'Coke',        price: 2000,  serves: 'Chilled', count: 1, desc: 'Served cold.', tags: [], img: null },
    { cat: 'lounge', name: 'Fanta',       price: 2000,  serves: 'Chilled', count: 1, desc: 'Served cold.', tags: [], img: null },
    { cat: 'lounge', name: 'Sprite',      price: 2000,  serves: 'Chilled', count: 1, desc: 'Served cold.', tags: [], img: null },
    { cat: 'lounge', name: 'Water',       price: 1000,  serves: 'Chilled', count: 1, desc: 'Bottled water.', tags: [], img: null },

    /* ---------- EXTRAS ---------- */
    { cat: 'extras', name: 'Extra Mora Meat', price: 5000, serves: 'Add-on', count: 1, desc: 'An extra portion of peppered Mora Meat.', tags: [], img: null },
    { cat: 'extras', name: 'Extra Rice',      price: 6000, serves: 'Add-on', count: 1, desc: 'An extra portion of rice.', tags: [], img: null },
    { cat: 'extras', name: 'Extra Cheese',    price: 2000, serves: 'Shawarma add-on', count: 1, desc: 'Extra cheese in your shawarma.', tags: [], img: null },
    { cat: 'extras', name: 'Syrup',           price: 2000, serves: 'Caramel · Strawberry · Chocolate', count: 1, desc: 'Choose your flavour.', tags: [], img: null },
    { cat: 'extras', name: 'Sausage',         price: 1000, serves: 'Add-on', count: 1, desc: 'One sausage.', tags: [], img: null },
    { cat: 'extras', name: 'Extra Egg',       price: 600,  serves: 'Add-on', count: 1, desc: 'One fried egg.', tags: [], img: null }
  ],

  /* =============================================================
     BUILD YOUR MORA COMBO
     -------------------------------------------------------------
     This mirrors the Mora Meat Combos section of the real menu:
     any base + Mora Meat or Chicken is ₦8,000, and the two-protein
     "Mixture of 2" is ₦8,500. Extras are priced from the Extras list.
     ============================================================= */
  builder: {
    bases: [
      { id: 'yam',      name: 'Golden Yam', note: 'Fried, dusted',  price: 8000 },
      { id: 'chips',    name: 'Chips',      note: 'Hot and salted', price: 8000 },
      { id: 'plantain', name: 'Plantain',   note: 'Sweet dodo',     price: 8000 },
      { id: 'noodles',  name: 'Noodles',    note: 'Stir-fried',     price: 8000 }
    ],
    proteins: [
      { id: 'mora',    name: 'Mora Meat',   note: 'Peppered beef',   price: 0   },
      { id: 'chicken', name: 'Chicken',     note: 'Mora Chicken',    price: 0   },
      { id: 'both',    name: 'Mixture of 2', note: 'Both proteins',  price: 500 }
    ],
    extras: [
      { id: 'egg',     name: 'Extra Egg',       price: 600  },
      { id: 'sausage', name: 'Sausage',         price: 1000 },
      { id: 'meat',    name: 'Extra Mora Meat', price: 5000 }
    ]
  }
};

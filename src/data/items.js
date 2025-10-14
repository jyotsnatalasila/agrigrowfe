// Centralized product items index aggregated from all per-category components
// Each entry: { id, name, images[], itemPrice, category, path }
const ITEMS = [
  // Rice / Grains (from Rice.jsx)
  { id: 1, name: 'Red Rice (Rose Matta)', images: [process.env.PUBLIC_URL +'/Images/red-rice.jpg',process.env.PUBLIC_URL +'/Images/red-riceimg2.jpg'], itemPrice: 100, category: 'Rice', path: '/rice' },
  { id: 2, name: 'Black Rice', images: [process.env.PUBLIC_URL +'/Images/black-rice.jpg',process.env.PUBLIC_URL +'/Images/blac-riceimg2.jpg'], itemPrice: 140, category: 'Rice', path: '/rice' },
  { id: 3, name: 'Sticky Rice (Bora)', images: [process.env.PUBLIC_URL +'/Images/sticky-rice.jpg',process.env.PUBLIC_URL +'/Images/sticky-riceimg2.jpg'], itemPrice: 150, category: 'Rice', path: '/rice' },
  { id: 4, name: 'Basmati Rice', images: [process.env.PUBLIC_URL +'/Images/basmati-rice.jpg',process.env.PUBLIC_URL +'/Images/basmati-riceimg2.jpg'], itemPrice: 70, category: 'Rice', path: '/rice' },
  { id: 5, name: 'Brown Rice', images: [process.env.PUBLIC_URL +'/Images/brown-rice.webp',process.env.PUBLIC_URL +'/Images/brown-riceimg2.jpg'], itemPrice: 160, category: 'Rice', path: '/rice' },
  { id: 6, name: 'Jasmine Rice', images: [process.env.PUBLIC_URL +'/Images/jasmine-rice.webp',process.env.PUBLIC_URL +'/Images/jasmine-riceimg2.webp'], itemPrice: 140, category: 'Rice', path: '/rice' },
  { id: 7, name: 'Jeerakasala Rice', images: [process.env.PUBLIC_URL +'/Images/jeerakalasala-rice.webp',process.env.PUBLIC_URL +'/Images/jeerakasala-riceimg2.jpg'], itemPrice: 200, category: 'Rice', path: '/rice' },
  { id: 8, name: 'Sona Masoori Rice', images: [process.env.PUBLIC_URL +'/Images/sona-masoori.jpg',process.env.PUBLIC_URL +'/Images/sonamasuri-rice.jpeg'], itemPrice: 100, category: 'Rice', path: '/rice' },
  { id: 9, name: 'White Rice', images: [process.env.PUBLIC_URL +'/Images/white-rice.jpg',process.env.PUBLIC_URL +'/Images/white-riceimg2.webp'], itemPrice: 70, category: 'Rice', path: '/rice' },
  { id: 10, name: 'Tamil Nadu Ponni Rice', images: [process.env.PUBLIC_URL +'/Images/ponni-rice.jpeg',process.env.PUBLIC_URL +'/Images/ponni-riceimg2.jpg'], itemPrice: 180, category: 'Rice', path: '/rice' },

  // Corn (from Corn.jsx)
  { id: 70, name: 'Dent Corn', images: [process.env.PUBLIC_URL +'/Images/dentcorn.webp',process.env.PUBLIC_URL +'/Images/dentcornimg2.webp'], itemPrice: 25, category: 'Corn', path: '/corn' },
  { id: 71, name: 'Sweet Corn', images: [process.env.PUBLIC_URL +'/Images/sweetcorn.jpg',process.env.PUBLIC_URL +'/Images/sweetcornimg2.jpg'], itemPrice: 20, category: 'Corn', path: '/corn' },
  { id: 72, name: 'Popcorn', images: [process.env.PUBLIC_URL +'/Images/popcorn.jpg',process.env.PUBLIC_URL +'/Images/popcornimg2.webp'], itemPrice: 15, category: 'Corn', path: '/corn' },
  { id: 73, name: 'Black Corn', images: [process.env.PUBLIC_URL +'/Images/glasscorn.jpg',process.env.PUBLIC_URL +'/Images/glasscornimg2.webp'], itemPrice: 40, category: 'Corn', path: '/corn' },
  { id: 74, name: 'Flint Corn', images: [process.env.PUBLIC_URL +'/Images/flintcorn.webp',process.env.PUBLIC_URL +'/Images/flintcornimg2.webp'], itemPrice: 250, category: 'Corn', path: '/corn' },
  { id: 75, name: 'Flour Corn', images: [process.env.PUBLIC_URL +'/Images/flourcorn.jpeg',process.env.PUBLIC_URL +'/Images/flourcornimg2.webp'], itemPrice: 20, category: 'Corn', path: '/corn' },
  { id: 76, name: 'Blue Corn', images: [process.env.PUBLIC_URL +'/Images/cluecorn.jpg',process.env.PUBLIC_URL +'/Images/bluecornimg2.webp'], itemPrice: 100, category: 'Corn', path: '/corn' },
  { id: 77, name: 'Red Corn', images: [process.env.PUBLIC_URL +'/Images/redcorn.webp',process.env.PUBLIC_URL +'/Images/redcornimg2.webp'], itemPrice: 120, category: 'Corn', path: '/corn' },
  { id: 78, name: 'White Corn', images: [process.env.PUBLIC_URL +'/Images/whitecorn.webp',process.env.PUBLIC_URL +'/Images/whitecornimg2.jpg'], itemPrice: 60, category: 'Corn', path: '/corn' },

  // Vegetables (from Vegetables.jsx)
  { id: 201, name: 'Zucchini', images: [process.env.PUBLIC_URL +'/Images/zucchini.webp',process.env.PUBLIC_URL +'/Images/zucchiniimg2.webp'], itemPrice: 200, category: 'Vegetables', path: '/vegetables' },
  { id: 202, name: 'Artichoke', images: [process.env.PUBLIC_URL +'/Images/artichoke.jpg',process.env.PUBLIC_URL +'/Images/artichokeimg2.jpg'], itemPrice: 540, category: 'Vegetables', path: '/vegetables' },
  { id: 203, name: 'Yam', images: [process.env.PUBLIC_URL +'/Images/yam.jpg',process.env.PUBLIC_URL +'/Images/yam.webp'], itemPrice: 180, category: 'Vegetables', path: '/vegetables' },
  { id: 204, name: 'Beetroot', images: [process.env.PUBLIC_URL +'/Images/beetroot.jpg','/Images/beetroot.webp'], itemPrice: 60, category: 'Vegetables', path: '/vegetables' },
  { id: 205, name: 'Bell Pepper', images: ['/Images/bellpepper.jpg',process.env.PUBLIC_URL +'/Images/bellpepperimg2.jpg'], itemPrice: 90, category: 'Vegetables', path: '/vegetables' },
  { id: 206, name: 'Eggplant', images: [process.env.PUBLIC_URL +'/Images/eggplant.jpg',process.env.PUBLIC_URL +'/Images/eggplantimg2.jpg'], itemPrice: 40, category: 'Vegetables', path: '/vegetables' },
  { id: 207, name: 'Asparagus', images: [process.env.PUBLIC_URL +'/Images/aspargus.jpg',process.env.PUBLIC_URL +'/Images/asparagus.jpg'], itemPrice: 210, category: 'Vegetables', path: '/vegetables' },
  { id: 208, name: 'Broccoli', images: [process.env.PUBLIC_URL +'/Images/broccoli1.jpg',process.env.PUBLIC_URL +'/Images/broccoliimpg3.jpg'], itemPrice: 105, category: 'Vegetables', path: '/vegetables' },
  { id: 209, name: 'Banana Bloom', images: [process.env.PUBLIC_URL +'/Images/banana.webp',process.env.PUBLIC_URL +'/Images/banana.jpg'], itemPrice: 50, category: 'Vegetables', path: '/vegetables' },
  { id: 210, name: 'Cauliflower', images: [process.env.PUBLIC_URL +'/Images/cauliflower.webp',process.env.PUBLIC_URL +'/Images/cauliflower.jpg'], itemPrice: 20, category: 'Vegetables', path: '/vegetables' },
  { id: 211, name: 'Okra', images: [process.env.PUBLIC_URL +'/Images/okra.webp',process.env.PUBLIC_URL +'/Images/okraimg2.webp'], itemPrice: 45, category: 'Vegetables', path: '/vegetables' },
  { id: 212, name: 'Raddish', images: [process.env.PUBLIC_URL +'/Images/raddish.webp',process.env.PUBLIC_URL +'/Images/raddish.jpg'], itemPrice: 60, category: 'Vegetables', path: '/vegetables' },
  { id: 213, name: 'Lettuce', images: [process.env.PUBLIC_URL +'/Images/lettuce.webp',process.env.PUBLIC_URL +'/Images/lettuce.jpg'], itemPrice: 130, category: 'Vegetables', path: '/vegetables' },

  // Lotus (from Lotus.jsx)
  { id: 300, name: 'Water Lily (White Lotus)', images: [process.env.PUBLIC_URL +'/Images/whitelotus.jpg',process.env.PUBLIC_URL +'/Images/whitelotusimg2.jpg'], itemPrice: 10, category: 'Lotus', path: '/lotus' },
  { id: 301, name: 'Water Lily (Pink Lotus)', images: [process.env.PUBLIC_URL +'/Images/pinklotus.jpg',process.env.PUBLIC_URL +'/Images/pinklotus.webp'], itemPrice: 15, category: 'Lotus', path: '/lotus' },
  { id: 302, name: 'Water Lily (Blue Lotus)', images: [process.env.PUBLIC_URL +'/Images/bluelotus.jpg',process.env.PUBLIC_URL +'/Images/bluelotusimg2.jpg'], itemPrice: 40, category: 'Lotus', path: '/lotus' },
  { id: 303, name: 'Water Lily (Purple Lotus)', images: [process.env.PUBLIC_URL +'/Images/purplelotus.jpg',process.env.PUBLIC_URL +'/Images/purplelotusimg2.jpg'], itemPrice: 50, category: 'Lotus', path: '/lotus' },
  { id: 304, name: 'Water Lily (Red Lotus)', images: [process.env.PUBLIC_URL +'/Images/redlotus.webp',process.env.PUBLIC_URL +'/Images/redlotus.jpg'], itemPrice: 55, category: 'Lotus', path: '/lotus' },
  { id: 305, name: 'Water Lily (Yellow Lotus)', images: [process.env.PUBLIC_URL +'/Images/yellowlotus.webp',process.env.PUBLIC_URL +'/Images/yellowlotus.jpg'], itemPrice: 70, category: 'Lotus', path: '/lotus' },

  // Fruits (from Fruits.jsx)
  { id: 400, name: 'Mango', images: [process.env.PUBLIC_URL +'/Images/mango1.jpg',process.env.PUBLIC_URL +'/Images/mango2.webp'], itemPrice: 100, category: 'Fruits', path: '/fruits' },
  { id: 401, name: 'Banana', images: [process.env.PUBLIC_URL +'/Images/banana1.webp',process.env.PUBLIC_URL +'/Images/banana2.webp'], itemPrice: 60, category: 'Fruits', path: '/fruits' },
  { id: 402, name: 'Apple', images: [process.env.PUBLIC_URL +'/Images/apple1.webp',process.env.PUBLIC_URL +'/Images/apple2.webp'], itemPrice: 180, category: 'Fruits', path: '/fruits' },
  { id: 403, name: 'Papaya', images: [process.env.PUBLIC_URL +'/Images/papaya1.jpg',process.env.PUBLIC_URL +'/Images/papaya2.jpg'], itemPrice: 35, category: 'Fruits', path: '/fruits' },
  { id: 404, name: 'Dragon Fruit', images: [process.env.PUBLIC_URL +'/Images/dragonfruitimg2.webp',process.env.PUBLIC_URL +'/Images/dragonfruit1.webp'], itemPrice: 120, category: 'Fruits', path: '/fruits' },
  { id: 405, name: 'Strawberry', images: [process.env.PUBLIC_URL +'/Images/strawberry.jpg',process.env.PUBLIC_URL +'/Images/strawberry2.jpg'], itemPrice: 80, category: 'Fruits', path: '/fruits' },

  // Flowers (from Flowers.jsx)
  { id: 500, name: 'Rose Flowers', images: [process.env.PUBLIC_URL +'/Images/rose.jpg',process.env.PUBLIC_URL +'/Images/rose1.jpg'], itemPrice: 25, category: 'Flowers', path: '/flowers' },
  { id: 501, name: 'Tulip', images: [process.env.PUBLIC_URL +'/Images/tulip1.jpg',process.env.PUBLIC_URL +'/Images/tulip.jpg'], itemPrice: 50, category: 'Flowers', path: '/flowers' },
  { id: 502, name: 'Marigold Garland', images: [process.env.PUBLIC_URL +'/Images/marigold.jpg',process.env.PUBLIC_URL +'/Images/marigold1.jpg'], itemPrice: 60, category: 'Flowers', path: '/flowers' },
  { id: 503, name: 'Orchid', images: [process.env.PUBLIC_URL +'/Images/orchid.jpg',process.env.PUBLIC_URL +'/Images/orchid.webp'], itemPrice: 90, category: 'Flowers', path: '/flowers' },
  { id: 504, name: 'Lily Bouquet', images: [process.env.PUBLIC_URL +'/Images/lilly1.jpg',process.env.PUBLIC_URL +'/Images/lilly.jpg'], itemPrice: 280, category: 'Flowers', path: '/flowers' },
  { id: 505, name: 'Jasmine', images: [process.env.PUBLIC_URL +'/Images/jasmine.png',process.env.PUBLIC_URL +'/Images/jasmine.jpg'], itemPrice: 90, category: 'Flowers', path: '/flowers' },
  { id: 506, name: 'Chrysanthemum', images: [process.env.PUBLIC_URL +'/Images/chrysanthemum.jpg',process.env.PUBLIC_URL +'/Images/chrysanthemum1.jpg'], itemPrice: 100, category: 'Flowers', path: '/flowers' },

  // Spices (from Spices.jsx)
  { id: 600, name: 'Saffron', images: [process.env.PUBLIC_URL +'/Images/saffron.cms',process.env.PUBLIC_URL +'/Images/saffronimg2.jpg'], itemPrice: 25000, category: 'Spices', path: '/spices' },
  { id: 601, name: 'Bay Leaf', images: [process.env.PUBLIC_URL +'/Images/bay.webp',process.env.PUBLIC_URL +'/Images/bayimg2.webp'], itemPrice: 15, category: 'Spices', path: '/spices' },
  { id: 602, name: 'Black Pepper', images: [process.env.PUBLIC_URL +'/Images/blackpepper.webp',process.env.PUBLIC_URL +'/Images/blackpepperimg2.webp'], itemPrice: 23, category: 'Spices', path: '/spices' },
  { id: 603, name: 'Nutmeg', images: [process.env.PUBLIC_URL +'/Images/nutmeg.jpg',process.env.PUBLIC_URL +'/Images/nutmegimg2.jpg'], itemPrice: 80, category: 'Spices', path: '/spices' },
  { id: 604, name: 'Clove', images: [process.env.PUBLIC_URL +'/Images/clove.jpeg',process.env.PUBLIC_URL +'/Images/cloveimg2.jpg'], itemPrice: 42, category: 'Spices', path: '/spices' },
  { id: 605, name: 'Cardamom', images: [process.env.PUBLIC_URL +'/Images/cardamom.jpg',process.env.PUBLIC_URL +'/Images/cardamaomimg2.jpeg'], itemPrice: 55, category: 'Spices', path: '/spices' },
  { id: 606, name: 'Star Anise', images: [process.env.PUBLIC_URL +'/Images/staranise.webp',process.env.PUBLIC_URL +'/Images/staraniseimg2.webp'], itemPrice: 26, category: 'Spices', path: '/spices' },
  { id: 607, name: 'Fenugreek', images: [process.env.PUBLIC_URL +'/Images/fenugreek.webp',process.env.PUBLIC_URL +'/Images/fenugreekimg2.jpg'], itemPrice: 60, category: 'Spices', path: '/spices' },
  { id: 608, name: 'Mustard Seeds', images: [process.env.PUBLIC_URL +'/Images/mustard.cms',process.env.PUBLIC_URL +'/Images/mustardimg2.jpg'], itemPrice: 14, category: 'Spices', path: '/spices' },
  { id: 609, name: 'Fennel Seeds', images: [process.env.PUBLIC_URL +'/Images/fennel.webp',process.env.PUBLIC_URL +'/Images/fennelimg2.jpg'], itemPrice: 38, category: 'Spices', path: '/spices' },
  { id: 610, name: 'Turmeric', images: [process.env.PUBLIC_URL +'/Images/turmericimg2.jpg',process.env.PUBLIC_URL +'/Images/turmeric.jpg'], itemPrice: 44, category: 'Spices', path: '/spices' },
  { id: 611, name: 'Cumin', images: [process.env.PUBLIC_URL +'/Images/cumin.jpg',process.env.PUBLIC_URL +'/Images/cuminimg2.webp'], itemPrice: 25, category: 'Spices', path: '/spices' },

  // Pulses (from Pulses.jsx)
  { id: 700, name: 'Kidney Beans (Rajma)', images: [process.env.PUBLIC_URL +'/Images/kidney.jpeg',process.env.PUBLIC_URL +'/Images/kidneyimg2.webp'], itemPrice: 25, category: 'Pulses', path: '/pulses' },
  { id: 701, name: 'Chickpeas', images: [process.env.PUBLIC_URL +'/Images/chickpeas.webp',process.env.PUBLIC_URL +'/Images/chickpeasimg2.webp'], itemPrice: 44, category: 'Pulses', path: '/pulses' },
  { id: 702, name: 'Green Gram', images: [process.env.PUBLIC_URL +'/Images/greengram.webp',process.env.PUBLIC_URL +'/Images/greengramimg2.webp'], itemPrice: 23, category: 'Pulses', path: '/pulses' },
  { id: 703, name: 'Red Lentils', images: [process.env.PUBLIC_URL +'/Images/redlentils.jpg',process.env.PUBLIC_URL +'/Images/redlentilsimg2.jpg'], itemPrice: 42, category: 'Pulses', path: '/pulses' },
  { id: 704, name: 'Horse Gram', images: [process.env.PUBLIC_URL +'/Images/horsegram.jpg',process.env.PUBLIC_URL +'/Images/horsegram.webp'], itemPrice: 55, category: 'Pulses', path: '/pulses' },
  { id: 705, name: 'Bengal Gram', images: [process.env.PUBLIC_URL +'/Images/bengalgram.jpg',process.env.PUBLIC_URL +'/Images/bengalgramimg2.jpg'], itemPrice: 80, category: 'Pulses', path: '/pulses' },
  { id: 706, name: 'Black Beans', images: [process.env.PUBLIC_URL +'/Images/blackbeans.jpg',process.env.PUBLIC_URL +'/Images/blackbeansimg2.jpeg'], itemPrice: 26, category: 'Pulses', path: '/pulses' },

  // Saplings (from Sapplings.jsx)
  { id: 800, name: 'Mango Sapling', images: [process.env.PUBLIC_URL +'/Images/mango.webp',process.env.PUBLIC_URL +'/Images/mango.jpg'], itemPrice: 20, category: 'Saplings', path: '/sapplings' },
  { id: 801, name: 'Guava Sapling', images: [process.env.PUBLIC_URL +'/Images/guavaimg1.jpg',process.env.PUBLIC_URL +'/Images/guavaimg2.jpg'], itemPrice: 15, category: 'Saplings', path: '/sapplings' },
  { id: 802, name: 'Teak Sapling', images: [process.env.PUBLIC_URL +'/Images/teak.webp',process.env.PUBLIC_URL +'/Images/teakimg2.jpg'], itemPrice: 10, category: 'Saplings', path: '/sapplings' },
  { id: 803, name: 'Banyan Sapling', images: [process.env.PUBLIC_URL +'/Images/banyan.jpg',process.env.PUBLIC_URL +'/Images/banyanimg2.jpg'], itemPrice: 30, category: 'Saplings', path: '/sapplings' },
  { id: 804, name: 'Dragon Fruit Sapling', images: [process.env.PUBLIC_URL +'/Images/dragonfruit.webp',process.env.PUBLIC_URL +'/Images/dragonfruit.jpg'], itemPrice: 35, category: 'Saplings', path: '/sapplings' },
  { id: 805, name: 'Fig Sapling', images: [process.env.PUBLIC_URL +'/Images/fig.webp',process.env.PUBLIC_URL +'/Images/figimg2.webp'], itemPrice: 40, category: 'Saplings', path: '/sapplings' },
  { id: 806, name: 'Lemon Sapling', images: [process.env.PUBLIC_URL +'/Images/lemon.webp',process.env.PUBLIC_URL +'/Images/lemon.jpg'], itemPrice: 19, category: 'Saplings', path: '/sapplings' },
  { id: 807, name: 'Broccoli Sapling', images: [process.env.PUBLIC_URL +'/Images/broccoli.jpg',process.env.PUBLIC_URL +'/Images/broccoliimg2.jpg'], itemPrice: 8, category: 'Saplings', path: '/sapplings' },

  // Aquatic Feed (from Aquaticfeed.jsx)
  { id: 900, name: 'Fish Pellet Feed', images: [process.env.PUBLIC_URL +'/Images/fishpellet.jpg',process.env.PUBLIC_URL +'/Images/fishpellet.avif'], itemPrice: 120, category: 'Aquatic Feed', path: '/aquaticfeed' },
  { id: 901, name: 'Shrimp Starter Feed', images: [process.env.PUBLIC_URL +'/Images/shrimp.webp'], itemPrice: 250, category: 'Aquatic Feed', path: '/aquaticfeed' },

  // Indoor / Plants (from IndoorPlants.jsx)
  { id: 1000, name: 'String of Pearls', images: [process.env.PUBLIC_URL +'/Images/pearls.webp',process.env.PUBLIC_URL +'/Images/pearlsimg2.webp'], itemPrice: 90, category: 'Indoor Plants', path: '/indoorplants' },
  { id: 1001, name: 'Fittonia', images: [process.env.PUBLIC_URL +'/Images/fittonia.webp',process.env.PUBLIC_URL +'/Images/fittoniaimg2.jpg'], itemPrice: 160, category: 'Indoor Plants', path: '/indoorplants' },
  { id: 1002, name: 'Lithops', images: [process.env.PUBLIC_URL +'/Images/lithopsimg2.webp',process.env.PUBLIC_URL +'/Images/lithops.webp'], itemPrice: 100, category: 'Indoor Plants', path: '/indoorplants' },
  { id: 1003, name: 'Chinese Money Plant', images: [process.env.PUBLIC_URL +'/Images/moneyplant.webp',process.env.PUBLIC_URL +'/Images/money-plant.webp'], itemPrice: 125, category: 'Indoor Plants', path: '/indoorplants' },
  { id: 1004, name: 'Rosette Succulent', images: [process.env.PUBLIC_URL +'/Images/adrenium.webp',process.env.PUBLIC_URL +'/Images/rosette.jpg'], itemPrice: 150, category: 'Indoor Plants', path: '/indoorplants' },
  { id: 1005, name: 'String of Hearts', images: [process.env.PUBLIC_URL +'/Images/hearts.png',process.env.PUBLIC_URL +'/Images/hearts.jpeg'], itemPrice: 80, category: 'Indoor Plants', path: '/indoorplants' },

  // New Releases / Bestsellers / Today deals (some items duplicated across lists)
  { id: 1100, name: '1000 Petals Lotus', images: [process.env.PUBLIC_URL +'/Images/1000petals.webp',process.env.PUBLIC_URL +'/Images/1000petalsimg2.webp'], itemPrice: 150, category: 'New Releases', path: '/newreleases' },
  { id: 1101, name: 'Honey Melon', images: [process.env.PUBLIC_URL +'/Images/honeymelon.jpg',process.env.PUBLIC_URL +'/Images/honeymelonimg2.webp'], itemPrice: 60, category: 'New Releases', path: '/newreleases' },

  // Fallback sample
  { id: 9999, name: 'Sample Product Placeholder', images: [process.env.PUBLIC_URL +'/Images/1000petals.webp'], itemPrice: 1, category: 'Misc', path: '/' },
{
    id: 406,
    name: "Fresh Guavas",
    category: "fruits",
    itemPrice: 120,
    unit: "kg",
    images: [
      process.env.PUBLIC_URL +"/Images/guava.jpg",
      process.env.PUBLIC_URL +"/Images/guava-1.jpg", 
    ],
    description: "Fresh, sweet guavas packed with Vitamin C and nutrients. Perfect for healthy snacks and juices. Grown organically in our farms.",
    features: [
      "Rich in Vitamin C and antioxidants",
      "High in dietary fiber", 
      "Naturally sweet and juicy",
      "Fresh from local organic farms",
      "Perfect for juices and desserts"
    ]
  },
  {
    id: 507,
    name: "Pink Roses",
    category: "flowers", 
    itemPrice: 300,
    unit: "bunch",
    images: [
      process.env.PUBLIC_URL +"/Images/pinkrose.jpg",
      process.env.PUBLIC_URL +"/Images/pinkrose1.jpg",
    ],
    description: "Beautiful pink roses perfect for your garden or as gifts. These fragrant flowers will brighten any space with their vibrant color.",
    features: [
      "Vibrant pink color that lasts",
      "Pleasant natural fragrance",
      "Long-lasting fresh blooms",
      "Perfect for gifting and decoration",
      "Grown in controlled environments"
    ]
  },
  {
    id: 407,
    name: "Fresh Kiwis",
    category: "fruits",
    itemPrice: 80,
    unit: "kg", 
    images: [
      process.env.PUBLIC_URL +"/Images/kiwi.jpg",
    ],
    description: "Import quality kiwis with perfect sweet-tart balance. Rich in Vitamin C and antioxidants for your daily health needs.",
    features: [
      "Rich in Vitamin C and E",
      "High antioxidant properties",
      "Perfect sweet and tangy flavor",
      "Fresh import quality",
      "Great for salads and smoothies"
    ]
  },
  {
    id: 214,
    name: "Fresh Potatoes",
    category: "vegetables",
    itemPrice: 40,
    unit: "kg",
    images: [
      process.env.PUBLIC_URL +"/Images/potato.jpeg",
      process.env.PUBLIC_URL +"/Images/potato1.webp",
    ],
    description: "Fresh, organic potatoes perfect for all your cooking needs. Great for curries, fries, and traditional dishes.",
    features: [
      "Fresh from local farms",
      "Perfect for all recipes",
      "Rich in carbohydrates",
      "Organic farming methods",
      "Long shelf life"
    ]
  },
  {
    id: 408,
    name: "Cashew Fruit",
    category: "fruits",
    itemPrice: 900,
    unit: "kg",
    images: [
      process.env.PUBLIC_URL +"/Images/cashew.webp",
      process.env.PUBLIC_URL +"/Images/cashew1.jpg",
    ],
    description: "Premium quality cashew fruits, carefully selected and packed. Perfect for snacking, cooking, and gifting.",
    features: [
      "Premium quality selection",
      "Rich in healthy fats",
      "Perfect for snacks and desserts",
      "Carefully packed for freshness",
      "No added preservatives"
    ]
  },
  {
    id: 409,
    name: "Fresh Grapes",
    category: "fruits",
    itemPrice: 150,
    unit: "kg",
    images: [
      process.env.PUBLIC_URL +"/Images/grapes.jpg",
      process.env.PUBLIC_URL +"/Images/grapes1.jpg",
    ],
    description: "Sweet and juicy grapes, perfect for fresh consumption, juices, and desserts. Bursting with natural sweetness.",
    features: [
      "Sweet and seedless variety",
      "Perfect for wines and juices",
      "Rich in antioxidants",
      "Fresh harvest",
      "Great for kids' snacks"
    ]
  },
  {
    id: 1110,
    name: "Pistachios",
    category: "nuts",
    itemPrice: 1200,
    unit: "kg",
    images: [
      process.env.PUBLIC_URL +"/Images/pista.webp",
      process.env.PUBLIC_URL +"/Images/pista1.jpg",
    ],
    description: "High-quality pistachios, known for their unique flavor and numerous health benefits. Perfect for healthy snacking.",
    features: [
      "Rich in protein and fiber",
      "Heart-healthy nuts",
      "Perfect for desserts",
      "Premium imported quality",
      "Natural without additives"
    ]
  },
  {
    id: 410,
    name: "Fresh Blueberries",
    category: "fruits",
    itemPrice: 200,
    unit: "pack",
    images: [
      process.env.PUBLIC_URL +"/Images/blueberries.webp",
    ],
    description: "Antioxidant-rich blueberries, perfect for smoothies, desserts, or healthy snacking. Packed with nutrition.",
    features: [
      "High in antioxidants",
      "Perfect for smoothies",
      "Fresh and plump berries",
      "Rich in vitamins",
      "Great for brain health"
    ]
  },
  {
    id: 1111,
    name: "Premium Almonds",
    category: "nuts",
    itemPrice: 900,
    unit: "kg",
    images: [
      process.env.PUBLIC_URL +"/Images/almond.webp",
    ],
    description: "Crunchy and nutritious almonds, perfect for daily consumption. Known for their health benefits and great taste.",
    features: [
      "Rich in Vitamin E",
      "Good for heart health",
      "Perfect for milk and snacks",
      "Premium California quality",
      "Natural and raw"
    ]
  },
  {
    id: 411,
    name: "Fresh Blackberries",
    category: "fruits",
    itemPrice: 250,
    unit: "pack",
    images: [
      process.env.PUBLIC_URL +"/Images/blackberries.jpg",
    ],
    description: "Juicy blackberries with perfect sweet-tart balance. Excellent for desserts, jams, or fresh consumption.",
    features: [
      "Rich in vitamins and fiber",
      "Antioxidant properties",
      "Perfect for jams and desserts",
      "Fresh seasonal harvest",
      "Naturally sweet"
    ]
  },
  {
    id: 405,
    name: "Fresh Strawberries",
    category: "fruits",
    itemPrice: 80,
    unit: "pack",
    images: [
      process.env.PUBLIC_URL +"/Images/strawberry.webp",
    ],
    description: "Sweet and aromatic strawberries, perfect for desserts, shakes, or fresh eating. Bursting with flavor and nutrition.",
    features: [
      "Sweet and aromatic",
      "Perfect for desserts",
      "Rich in Vitamin C",
      "Fresh from farms",
      "Great for shakes and cakes"
    ]
  }
];
export default ITEMS;
// Centralized product items index aggregated from all per-category components
// Each entry: { id, name, images[], itemPrice, category, path }
const ITEMS = [
  // Rice / Grains (from Rice.jsx)
{ id: 1, name: 'Red Rice (Rose Matta)', images: ['/Images/red-rice.jpg', '/Images/red-riceimg2.jpg'], itemPrice: 100, category: 'Rice', path: '/rice' },
{ id: 2, name: 'Black Rice', images: ['/Images/black-rice.jpg', '/Images/blac-riceimg2.jpg'], itemPrice: 140, category: 'Rice', path: '/rice' },
{ id: 3, name: 'Sticky Rice (Bora)', images: ['/Images/sticky-rice.jpg', '/Images/sticky-riceimg2.jpg'], itemPrice: 150, category: 'Rice', path: '/rice' },
{ id: 4, name: 'Basmati Rice', images: ['/Images/basmati-rice.jpg', '/Images/basmati-riceimg2.jpg'], itemPrice: 70, category: 'Rice', path: '/rice' },
{ id: 5, name: 'Brown Rice', images: ['/Images/brown-rice.webp', '/Images/brown-riceimg2.jpg'], itemPrice: 160, category: 'Rice', path: '/rice' },
{ id: 6, name: 'Jasmine Rice', images: ['/Images/jasmine-rice.webp', '/Images/jasmine-riceimg2.webp'], itemPrice: 140, category: 'Rice', path: '/rice' },
{ id: 7, name: 'Jeerakasala Rice', images: ['/Images/jeerakalasala-rice.webp', '/Images/jeerakasala-riceimg2.jpg'], itemPrice: 200, category: 'Rice', path: '/rice' },
{ id: 8, name: 'Sona Masoori Rice', images: ['/Images/sona-masoori.jpg', '/Images/sonamasuri-rice.jpeg'], itemPrice: 100, category: 'Rice', path: '/rice' },
{ id: 9, name: 'White Rice', images: ['/Images/white-rice.jpg', '/Images/white-riceimg2.webp'], itemPrice: 70, category: 'Rice', path: '/rice' },
{ id: 10, name: 'Tamil Nadu Ponni Rice', images: ['/Images/ponni-rice.jpeg', '/Images/ponni-riceimg2.jpg'], itemPrice: 180, category: 'Rice', path: '/rice' },

// Corn (from Corn.jsx)
{ id: 70, name: 'Dent Corn', images: ['/Images/dentcorn.webp', '/Images/dentcornimg2.webp'], itemPrice: 25, category: 'Corn', path: '/corn' },
{ id: 71, name: 'Sweet Corn', images: ['/Images/sweetcorn.jpg', '/Images/sweetcornimg2.jpg'], itemPrice: 20, category: 'Corn', path: '/corn' },
{ id: 72, name: 'Popcorn', images: ['/Images/popcorn.jpg', '/Images/popcornimg2.webp'], itemPrice: 15, category: 'Corn', path: '/corn' },
{ id: 73, name: 'Black Corn', images: ['/Images/glasscorn.jpg', '/Images/glasscornimg2.webp'], itemPrice: 40, category: 'Corn', path: '/corn' },
{ id: 74, name: 'Flint Corn', images: ['/Images/flintcorn.webp', '/Images/flintcornimg2.webp'], itemPrice: 250, category: 'Corn', path: '/corn' },
{ id: 75, name: 'Flour Corn', images: ['/Images/flourcorn.jpeg', '/Images/flourcornimg2.webp'], itemPrice: 20, category: 'Corn', path: '/corn' },
{ id: 76, name: 'Blue Corn', images: ['/Images/cluecorn.jpg', '/Images/bluecornimg2.webp'], itemPrice: 100, category: 'Corn', path: '/corn' },
{ id: 77, name: 'Red Corn', images: ['/Images/redcorn.webp', '/Images/redcornimg2.webp'], itemPrice: 120, category: 'Corn', path: '/corn' },
{ id: 78, name: 'White Corn', images: ['/Images/whitecorn.webp', '/Images/whitecornimg2.jpg'], itemPrice: 60, category: 'Corn', path: '/corn' },

// Vegetables (from Vegetables.jsx)
{ id: 201, name: 'Zucchini', images: ['/Images/zucchini.webp', '/Images/zucchiniimg2.webp'], itemPrice: 200, category: 'Vegetables', path: '/vegetables' },
{ id: 202, name: 'Artichoke', images: ['/Images/artichoke.jpg', '/Images/artichokeimg2.jpg'], itemPrice: 540, category: 'Vegetables', path: '/vegetables' },
{ id: 203, name: 'Yam', images: ['/Images/yam.jpg', '/Images/yam.webp'], itemPrice: 180, category: 'Vegetables', path: '/vegetables' },
{ id: 204, name: 'Beetroot', images: ['/Images/beetroot.jpg', '/Images/beetroot.webp'], itemPrice: 60, category: 'Vegetables', path: '/vegetables' },
{ id: 205, name: 'Bell Pepper', images: ['/Images/bellpepper.jpg', '/Images/bellpepperimg2.jpg'], itemPrice: 90, category: 'Vegetables', path: '/vegetables' },
{ id: 206, name: 'Eggplant', images: ['/Images/eggplant.jpg', '/Images/eggplantimg2.jpg'], itemPrice: 40, category: 'Vegetables', path: '/vegetables' },
{ id: 207, name: 'Asparagus', images: ['/Images/aspargus.jpg', '/Images/asparagus.jpg'], itemPrice: 210, category: 'Vegetables', path: '/vegetables' },
{ id: 208, name: 'Broccoli', images: ['/Images/broccoli1.jpg', '/Images/broccoliimpg3.jpg'], itemPrice: 105, category: 'Vegetables', path: '/vegetables' },
{ id: 209, name: 'Banana Bloom', images: ['/Images/banana.webp', '/Images/banana.jpg'], itemPrice: 50, category: 'Vegetables', path: '/vegetables' },
{ id: 210, name: 'Cauliflower', images: ['/Images/cauliflower.webp', '/Images/cauliflower.jpg'], itemPrice: 20, category: 'Vegetables', path: '/vegetables' },
{ id: 211, name: 'Okra', images: ['/Images/okra.webp', '/Images/okraimg2.webp'], itemPrice: 45, category: 'Vegetables', path: '/vegetables' },
{ id: 212, name: 'Raddish', images: ['/Images/raddish.webp', '/Images/raddish.jpg'], itemPrice: 60, category: 'Vegetables', path: '/vegetables' },
{ id: 213, name: 'Lettuce', images: ['/Images/lettuce.webp', '/Images/lettuce.jpg'], itemPrice: 130, category: 'Vegetables', path: '/vegetables' },
{ id: 214, name: 'Potato', images: ['/Images/potato.jpeg', '/Images/potato1.webp'], itemPrice: 40, category: 'Vegetables', path: '/vegetables' },

// Lotus (from Lotus.jsx)
{ id: 300, name: 'Water Lily (White Lotus)', images: ['/Images/whitelotus.jpg', '/Images/whitelotusimg2.jpg'], itemPrice: 10, category: 'Lotus', path: '/lotus' },
{ id: 301, name: 'Water Lily (Pink Lotus)', images: ['/Images/pinklotus.jpg', '/Images/pinklotus.webp'], itemPrice: 15, category: 'Lotus', path: '/lotus' },
{ id: 302, name: 'Water Lily (Blue Lotus)', images: ['/Images/bluelotus.jpg', '/Images/bluelotusimg2.jpg'], itemPrice: 40, category: 'Lotus', path: '/lotus' },
{ id: 303, name: 'Water Lily (Purple Lotus)', images: ['/Images/purplelotus.jpg', '/Images/purplelotusimg2.jpg'], itemPrice: 50, category: 'Lotus', path: '/lotus' },
{ id: 304, name: 'Water Lily (Red Lotus)', images: ['/Images/redlotus.webp', '/Images/redlotus.jpg'], itemPrice: 55, category: 'Lotus', path: '/lotus' },
{ id: 305, name: 'Water Lily (Yellow Lotus)', images: ['/Images/yellowlotus.webp', '/Images/yellowlotus.jpg'], itemPrice: 70, category: 'Lotus', path: '/lotus' },

// Fruits (from Fruits.jsx)
{ id: 400, name: 'Mango', images: ['/Images/mango1.jpg', '/Images/mango2.webp'], itemPrice: 100, category: 'Fruits', path: '/fruits' },
{ id: 401, name: 'Banana', images: ['/Images/banana1.webp', '/Images/banana2.webp'], itemPrice: 60, category: 'Fruits', path: '/fruits' },
{ id: 402, name: 'Apple', images: ['/Images/apple1.webp', '/Images/apple2.webp'], itemPrice: 180, category: 'Fruits', path: '/fruits' },
{ id: 403, name: 'Papaya', images: ['/Images/papaya1.jpg', '/Images/papaya2.jpg'], itemPrice: 35, category: 'Fruits', path: '/fruits' },
{ id: 404, name: 'Dragon Fruit', images: ['/Images/dragonfruitimg2.webp', '/Images/dragonfruit1.webp'], itemPrice: 120, category: 'Fruits', path: '/fruits' },
{ id: 405, name: 'Strawberry', images: ['/Images/strawberry.jpg', '/Images/strawberry2.jpg'], itemPrice: 80, category: 'Fruits', path: '/fruits' },

// Flowers (from Flowers.jsx)
{ id: 500, name: 'Rose Flowers', images: ['/Images/rose.jpg', '/Images/rose1.jpg'], itemPrice: 25, category: 'Flowers', path: '/flowers' },
{ id: 501, name: 'Tulip', images: ['/Images/tulip1.jpg', '/Images/tulip.jpg'], itemPrice: 50, category: 'Flowers', path: '/flowers' },
{ id: 502, name: 'Marigold Garland', images: ['/Images/marigold.jpg', '/Images/marigold1.jpg'], itemPrice: 60, category: 'Flowers', path: '/flowers' },
{ id: 503, name: 'Orchid', images: ['/Images/orchid.jpg', '/Images/orchid.webp'], itemPrice: 90, category: 'Flowers', path: '/flowers' },
{ id: 504, name: 'Lily Bouquet', images: ['/Images/lilly1.jpg', '/Images/lilly.jpg'], itemPrice: 280, category: 'Flowers', path: '/flowers' },
{ id: 505, name: 'Jasmine', images: ['/Images/jasmine.png', '/Images/jasmine.jpg'], itemPrice: 90, category: 'Flowers', path: '/flowers' },
{ id: 506, name: 'Chrysanthemum', images: ['/Images/chrysanthemum.jpg', '/Images/chrysanthemum1.jpg'], itemPrice: 100, category: 'Flowers', path: '/flowers' },
{ id:507, name:'Pink Rose', images:['/Images/pinkrose.jpg','/Images/pinkrose1.jpg'], itemPrice: 90, category:'Flowers', path:'/flowers'},
// Spices (from Spices.jsx)
{ id: 600, name: 'Saffron', images: ['/Images/saffron.cms', '/Images/saffronimg2.jpg'], itemPrice: 25000, category: 'Spices', path: '/spices' },
{ id: 601, name: 'Bay Leaf', images: ['/Images/bay.webp', '/Images/bayimg2.webp'], itemPrice: 15, category: 'Spices', path: '/spices' },
{ id: 602, name: 'Black Pepper', images: ['/Images/blackpepper.webp', '/Images/blackpepperimg2.webp'], itemPrice: 23, category: 'Spices', path: '/spices' },
{ id: 603, name: 'Nutmeg', images: ['/Images/nutmeg.jpg', '/Images/nutmegimg2.jpg'], itemPrice: 80, category: 'Spices', path: '/spices' },
{ id: 604, name: 'Clove', images: ['/Images/clove.jpeg', '/Images/cloveimg2.jpg'], itemPrice: 42, category: 'Spices', path: '/spices' },
{ id: 605, name: 'Cardamom', images: ['/Images/cardamom.jpg', '/Images/cardamaomimg2.jpeg'], itemPrice: 55, category: 'Spices', path: '/spices' },
{ id: 606, name: 'Star Anise', images: ['/Images/staranise.webp', '/Images/staraniseimg2.webp'], itemPrice: 26, category: 'Spices', path: '/spices' },
{ id: 607, name: 'Fenugreek', images: ['/Images/fenugreek.webp', '/Images/fenugreekimg2.jpg'], itemPrice: 60, category: 'Spices', path: '/spices' },
{ id: 608, name: 'Mustard Seeds', images: ['/Images/mustard.cms', '/Images/mustardimg2.jpg'], itemPrice: 14, category: 'Spices', path: '/spices' },
{ id: 609, name: 'Fennel Seeds', images: ['/Images/fennel.webp', '/Images/fennelimg2.jpg'], itemPrice: 38, category: 'Spices', path: '/spices' },
{ id: 610, name: 'Turmeric', images: ['/Images/turmericimg2.jpg', '/Images/turmeric.jpg'], itemPrice: 44, category: 'Spices', path: '/spices' },
{ id: 611, name: 'Cumin', images: ['/Images/cumin.jpg', '/Images/cuminimg2.webp'], itemPrice: 25, category: 'Spices', path: '/spices' },

// Pulses (from Pulses.jsx)
{ id: 700, name: 'Kidney Beans (Rajma)', images: ['/Images/kidney.jpeg', '/Images/kidneyimg2.webp'], itemPrice: 25, category: 'Pulses', path: '/pulses' },
{ id: 701, name: 'Chickpeas', images: ['/Images/chickpeas.webp', '/Images/chickpeasimg2.webp'], itemPrice: 44, category: 'Pulses', path: '/pulses' },
{ id: 702, name: 'Green Gram', images: ['/Images/greengram.webp', '/Images/greengramimg2.webp'], itemPrice: 23, category: 'Pulses', path: '/pulses' },
{ id: 703, name: 'Red Lentils', images: ['/Images/redlentils.jpg', '/Images/redlentilsimg2.jpg'], itemPrice: 42, category: 'Pulses', path: '/pulses' },
{ id: 704, name: 'Horse Gram', images: ['/Images/horsegram.jpg', '/Images/horsegram.webp'], itemPrice: 55, category: 'Pulses', path: '/pulses' },
{ id: 705, name: 'Bengal Gram', images: ['/Images/bengalgram.jpg', '/Images/bengalgramimg2.jpg'], itemPrice: 80, category: 'Pulses', path: '/pulses' },
{ id: 706, name: 'Black Beans', images: ['/Images/blackbeans.jpg', '/Images/blackbeansimg2.jpeg'], itemPrice: 26, category: 'Pulses', path: '/pulses' },

// Saplings (from Sapplings.jsx)
{ id: 800, name: 'Mango Sapling', images: ['/Images/mango.webp', '/Images/mango.jpg'], itemPrice: 20, category: 'Saplings', path: '/sapplings' },
{ id: 801, name: 'Guava Sapling', images: ['/Images/guavaimg1.jpg', '/Images/guavaimg2.jpg'], itemPrice: 15, category: 'Saplings', path: '/sapplings' },
{ id: 802, name: 'Teak Sapling', images: ['/Images/teak.webp', '/Images/teakimg2.jpg'], itemPrice: 10, category: 'Saplings', path: '/sapplings' },
{ id: 803, name: 'Banyan Sapling', images: ['/Images/banyan.jpg', '/Images/banyanimg2.jpg'], itemPrice: 30, category: 'Saplings', path: '/sapplings' },
{ id: 804, name: 'Dragon Fruit Sapling', images: ['/Images/dragonfruit.webp', '/Images/dragonfruit.jpg'], itemPrice: 35, category: 'Saplings', path: '/sapplings' },
{ id: 805, name: 'Fig Sapling', images: ['/Images/fig.webp', '/Images/figimg2.webp'], itemPrice: 40, category: 'Saplings', path: '/sapplings' },
{ id: 806, name: 'Lemon Sapling', images: ['/Images/lemon.webp', '/Images/lemon.jpg'], itemPrice: 19, category: 'Saplings', path: '/sapplings' },
{ id: 807, name: 'Broccoli Sapling', images: ['/Images/broccoli.jpg', '/Images/broccoliimg2.jpg'], itemPrice: 8, category: 'Saplings', path: '/sapplings' },

// Aquatic Feed (from Aquaticfeed.jsx)
{ id: 900, name: 'Fish Pellet Feed', images: ['/Images/fishpellet.jpg', '/Images/fishpellet.avif'], itemPrice: 120, category: 'Aquatic Feed', path: '/aquaticfeed' },
{ id: 901, name: 'Shrimp Starter Feed', images: ['/Images/shrimp.webp'], itemPrice: 250, category: 'Aquatic Feed', path: '/aquaticfeed' },

// Indoor / Plants (from IndoorPlants.jsx)
{ id: 1000, name: 'String of Pearls', images: ['/Images/pearls.webp', '/Images/pearlsimg2.webp'], itemPrice: 90, category: 'Indoor Plants', path: '/indoorplants' },
{ id: 1001, name: 'Fittonia', images: ['/Images/fittonia.webp', '/Images/fittoniaimg2.jpg'], itemPrice: 160, category: 'Indoor Plants', path: '/indoorplants' },
{ id: 1002, name: 'Lithops', images: ['/Images/lithopsimg2.webp', '/Images/lithops.webp'], itemPrice: 100, category: 'Indoor Plants', path: '/indoorplants' },
{ id: 1003, name: 'Chinese Money Plant', images: ['/Images/moneyplant.webp', '/Images/money-plant.webp'], itemPrice: 125, category: 'Indoor Plants', path: '/indoorplants' },
{ id: 1004, name: 'Rosette Succulent', images: ['/Images/adrenium.webp', '/Images/rosette.jpg'], itemPrice: 150, category: 'Indoor Plants', path: '/indoorplants' },
{ id: 1005, name: 'String of Hearts', images: ['/Images/hearts.png', '/Images/hearts.jpeg'], itemPrice: 80, category: 'Indoor Plants', path: '/indoorplants' },

// New Releases / Bestsellers / Today deals
{ id: 1100, name: '1000 Petals Lotus', images: ['/Images/1000petals.webp', '/Images/1000petalsimg2.webp'], itemPrice: 150, category: 'New Releases', path: '/newreleases' },
{ id: 1101, name: 'Honey Melon', images: ['/Images/honeymelon.jpg', '/Images/honeymelonimg2.webp'], itemPrice: 60, category: 'New Releases', path: '/newreleases' },

// Fallback sample
{ id: 9999, name: 'Sample Product Placeholder', images: ['/Images/1000petals.webp'], itemPrice: 1, category: 'Misc', path: '/' },

{
  id: 406,
  name: "Fresh Guavas",
  category: "fruits",
  itemPrice: 120,
  unit: "kg",
  images: ["/Images/guava.jpg", "/Images/guava-1.jpg"],
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
  images: ["/Images/pinkrose.jpg", "/Images/pinkrose1.jpg"],
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
  images: ["/Images/kiwi.jpg"],
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
  images: ["/Images/potato.jpeg", "/Images/potato1.webp"],
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
  images: ["/Images/cashew.webp", "/Images/cashew1.jpg"],
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
  images: ["/Images/grapes.jpg", "/Images/grapes1.jpg"],
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
  images: ["/Images/pista.webp", "/Images/pista1.jpg"],
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
  images: ["/Images/blueberries.webp"],
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
  images: ["/Images/almond.webp"],
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
  images: ["/Images/blackberries.jpg"],
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
  images: ["/Images/strawberry.webp"],
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


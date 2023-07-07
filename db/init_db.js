const {
  createUser,
  createProduct,
  createOrder
  // declare your model imports here
  // for example, User
} = require('./models');
const client = require("./client");


async function dropTables() {
  console.log("Dropping All Tables...")
  try {
    await client.query(`    
      DROP TABLE IF EXISTS orders;    
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS products;          
      DROP TABLE IF EXISTS users;
      `);

  }
  catch (error) {
    console.log(error);
    throw error
  }

}

async function createTables() {
  console.log("Starting to Create tables...")
  //test with NOT NULL and without 
  try {
    await client.query(
      `
      CREATE TABLE users( 
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(50) DEFAULT 'customer'
      );    
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        prodId VARCHAR(255) NOT NULL,
        brand VARCHAR(255) NOT NULL,
        prodModelName VARCHAR(255) NOT NULL ,
        prodDescription VARCHAR(255) NOT NULL,
        prodImg TEXT NOT NULL,
        prodPrice DECIMAL(10, 2),
        prodAttributes VARCHAR(255),
        reviews VARCHAR(255),
        inventory INT 
      );
      CREATE TABLE cart (
        cartProdId INT PRIMARY KEY,
        cartProdModelName VARCHAR(255) NOT NULL,
        cartProdDescription VARCHAR(255) NOT NULL,
        cartProdUrl VARCHAR(255) NOT NULL,
        cartQuantity INT NOT NULL, 
        cartTotalPrice DECIMAL(10, 2),
        cartStatus VARCHAR(255) NOT NULL
      );  
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        orderId VARCHAR(255) NOT NULL,
        orderProdId VARCHAR(255) NOT NULL,
        orderProdModelName VARCHAR(255) NOT NULL,
        orderQTY INT NOT NULL,
        orderDate TIMESTAMP NOT NULL,
        orderTotalPrice DECIMAL(10, 2) NOT NULL,
        userIdOrder INT NOT NULL,
        orderStatus VARCHAR(255) NOT NULL
      );
      `);
  }
  catch (error) {
    console.log(error);
    throw error;
  }

}

async function createInitialProducts() {
  try {
    console.log("Starting to create these long ass list of products..")

    const productsToCreate = [
      {
        prodId: "prodId1",
        brand: "Audemars Piguet",
        prodModelName: "Royal Oak",
        prodDescription:
          "The Audemars Piguet Royal Oak is an iconic luxury sports watch known for its octagonal bezel and integrated bracelet.",
        prodPrice: 110000.00,
        prodImg:
          "https://images.watchfinder.co.uk/imgv2/stock/231756/AudemarsPiguet-RoyalOak-15450ST.OO.1256ST.03-231756-1-221121-121332.jpg;quality=90;h=640"
      },
      {
        prodId: "prodId2",
        brand: "Audemars Piguet",
        prodModelName: "Royal Oak Offshore",
        prodDescription: "The Audemars Piguet Royal Oak Offshore is a bold and robust variation of the classic Royal Oak, designed for extreme sports and adventures.",
        prodPrice: 42500.00,
        prodImg: "https://images.watchfinder.co.uk/imgv2/stock/219948/AudemarsPiguet-RoyalOak-26331ST.OO.1220ST.02-219948-1-220726-093028.jpg;quality=90;h=640"
      },
      {
        prodId: "prodId3",
        brand: "Audemars Piguet",
        prodModelName: "Royal Oak Chronograph Rose Gold",
        prodDescription: "The Audemars Piguet Royal Oak Chronograph is a high-performance timepiece with a chronograph function and a distinctive octagonal case.",
        prodPrice: 132000.00,
        prodImg: "https://images.watchfinder.co.uk/imgv2/catalogue/26420/AudemarsPiguet-RoyalOak-26320OR.OO.1220OR.01-26420-190118-162819-.jpg;quality=90;h=640"
      },
      {
        prodId: "prodId4",
        brand: "Audemars Piguet",
        prodModelName: "Royal Oak Concept",
        prodDescription: "The Audemars Piguet Royal Oak Concept collection features avant-garde designs and innovative complications, pushing the boundaries of traditional watchmaking.",
        prodPrice: 402000.00,
        prodImg: "https://cdn.shopify.com/s/files/1/0523/4275/1395/products/audemars-piguet-royal-oak-concept-tourbillon-chronograph-openworked-selfwinding-ref-707_540x.jpg?v=1645745482"
      },
      {
        prodId: "prodId5",
        brand: "Audemars Piguet",
        prodModelName: "Millenary",
        prodDescription: "The Audemars Piguet Millenary collection showcases artistic craftsmanship and unconventional design with its oval-shaped case and off-center dial.",
        prodPrice: 20000.00,
        prodImg: "https://cdn.shopify.com/s/files/1/0523/4275/1395/products/audemars-piguet-millenary-4101-ref-15350st-oo-d002cr-01-luxury-swiss-watches-816_540x.jpg?v=1645750974"
      },
      {
        prodId: "prodId6",
        brand: "Breguet",
        prodModelName: "Classique Rose Gold Chronograph",
        prodDescription: "The Breguet Classique collection represents the epitome of traditional watchmaking with its elegant designs and exquisite craftsmanship.",
        prodPrice: 26000.00,
        prodImg: "https://prod-images.fashionphile.com/large/59fcbfa45727d8abad4b096549ffb06a/e506475e37490c3be48bf55db7720d45.jpg"
      },
      {
        prodId: "prodId7",
        brand: "Breguet",
        prodModelName: "Marine",
        prodDescription: "The Breguet Marine collection combines nautical inspiration with technical innovation, offering sporty yet sophisticated timepieces.",
        prodPrice: 11000.00,
        prodImg: "https://d2j6dbq0eux0bg.cloudfront.net/images/16115183/1031105045.jpg"
      },
      {
        prodId: "prodId8",
        brand: "Breguet",
        prodModelName: "Tradition",
        prodDescription: "The Breguet Tradition collection pays homage to the brand's rich heritage, showcasing timepieces with exposed movements and iconic design elements.",
        prodPrice: 19000.00,
        prodImg: "https://images.watchfinder.co.uk/imgv2/stock/161503/Breguet-Tradition-7047BRG99ZU-161503-1-200610-140406.jpg;quality=90;h=640"
      },
      {
        prodId: "prodId9",
        brand: "Breguet",
        prodModelName: "Reine de Naples",
        prodDescription: "The Breguet Reine de Naples collection is a tribute to the original watch created for Queen Marie Antoinette, featuring elegant and feminine designs.",
        prodPrice: 26000.00,
        prodImg: "https://cdn.shopify.com/s/files/1/0416/5874/4986/products/breguet-reine-de-naples-8928-rose-gold-8928br5w944dd0d3l-817337_1024x1024.jpg?v=1644969710"
      },
      {
        prodId: "prodId10",
        brand: "Breguet",
        prodModelName: "Type XX / Type XXI",
        prodDescription: "The Breguet Type XX and Type XXI are aviation-inspired chronographs with a vintage charm and modern functionalities.",
        prodPrice: 13000.00,
        prodImg: "https://prod-images.fashionphile.com/large/e3c5328…56aa74a201f7/7f63b681ad6e06a4674352279916bc00.jpg"
      },
      {
        prodId: 'prodId11',
        brand: 'Grand Seiko',
        prodModelName: 'Grand Seiko SBGA211',
        prodDescription: 'The Grand Seiko SBGA211 is a classic timepiece from Grand Seiko\'s Heritage Collection, known for its high-precision Spring Drive movement and clean dial design.',
        prodPrice: 6200.00,
        prodImg: 'https://cdn2.chrono24.com/images/uhren/29109307-rrsbcosu22bjssgxk312i9d1-ExtraLarge.jpg'
      },
      {
        prodId: 'prodId12',
        brand: 'Grand Seiko',
        prodModelName: 'Grand Seiko SBGJ201',
        prodDescription: 'The Grand Seiko SBGJ201 is a GMT watch with a mechanical movement, featuring Grand Seiko\'s renowned precision and craftsmanship.',
        prodPrice: 5500.00,
        prodImg: 'https://cdn.shopify.com/s/files/1/1889/5061/products/Grand-Seiko-Heritage-Hi-Beat-36000-SBGJ201-10-10-GRS-EMFZ34-3fbcb56ed1fa_1000x.jpg?v=1683316856'
      },
      {
        prodId: 'prodId13',
        brand: 'Grand Seiko',
        prodModelName: 'Grand Seiko SBGA373',
        prodDescription: 'The Grand Seiko SBGA373 is a limited edition watch with a titanium case and a blue dial, offering exceptional accuracy and legibility.',
        prodPrice: '3750.00',
        prodImg: 'https://cdn.shopify.com/s/files/1/0355/9843/4435/products/1133b6cf5637ab13438c2e5af9c7ca86_1024x.jpg?v=1679604299'
      },
      {
        prodId: 'prodId14',
        brand: 'Grand Seiko',
        prodModelName: 'Grand Seiko SBGR311',
        prodDescription: 'The Grand Seiko SBGR311 is a dress watch with a stainless steel case and a silver dial, showcasing Grand Seiko\'s dedication to refinement.',
        prodPrice: 5000.00,
        prodImg: 'https://cdn.shopify.com/s/files/1/1889/5061/products/Grand-Seiko-Heritage-Hi-Beat-36000-SBGR311-10-10-GRS-R5S7CP-e41acbe58698_1000x.jpg?v=1671480132'
      },
      {
        prodId: 'prodId15',
        brand: 'Grand Seiko',
        prodModelName: 'Grand Seiko SBGH271',
        prodDescription: 'The Grand Seiko SBGH271 is a high-beat mechanical watch with a gold case and a black dial, exemplifying Grand Seiko\'s craftsmanship and precision.',
        prodPrice: 5200.00,
        prodImg: 'https://cdn.shopify.com/s/files/1/0416/5874/4986/products/grand-seiko-heritage-sbgh271-sbgh271-100854'
      },
      {
        prodId: "prodId16",
        brand: "IWC",
        prodModelName: "Portugieser",
        prodDescription: "The IWC Portugieser is a classic and elegant watch with a timeless design. It features a large dial, Arabic numerals, and a clean, uncluttered look.",
        prodPrice: 8400.00,
        prodImg: "https://images.watchfinder.co.uk/imgv3/stock/223527/IWC-Portugieser%20Chrono-IW371491-223527-230130-103805.jpg;quality=90;h=640,%20https://images.watchfinder.co.uk/imgv3/stock/223527/IWC-Portugieser%20Chrono-IW371491-223527-230130-103805.jpg;quality=55;h=1280%202x"
      },
      {
        prodId: "prodId17",
        brand: "IWC",
        prodModelName: "Pilot's Watch",
        prodDescription: "The IWC Pilot's Watch collection pays tribute to aviation history with its instrument-inspired designs and precise timekeeping.",
        prodPrice: 9950.00,
        prodImg: "https://res.cloudinary.com/dp9dnliwc/image/upload/c_mfit,h_1200,w_1200/f_auto/q_auto/wmmedia/watch_images/large/iw377709_1512143173.jpg"
      },
      {
        prodId: "prodId18",
        brand: " IWC",
        prodModelName: "Da Vinci Tourbillon",
        prodDescription: "The IWC Da Vinci collection combines innovative technology with artistic design, creating sophisticated and unique timepieces.",
        prodPrice: 95000.00,
        prodImg: "https://cdn.swisswatchexpo.com/productphotos/10/28/iwc-da-vinci-tourbillon-flyback-retrograde-rose-gold-watch-iw393101-box-papers-37989_6357b_md.jpg"
      },
      {
        prodId: "prodId19",
        brand: "IWC",
        prodModelName: "Portofino Chronograph",
        prodDescription: "The IWC Portofino is a collection of elegant and understated watches suitable for any occasion.",
        prodPrice: 6250.00,
        prodImg: "https://prod-images.fashionphile.com/thumb/b7b2fc1b432240fb3df5a5ccac636233/e47a7aee0551977b4bf92f71fde869e6.jpg"
      },
      {
        prodId: "prodId20",
        brand: "IWC",
        prodModelName: "Aquatimer",
        prodDescription: "The IWC Aquatimer is IWC's diver's watch, known for its water resistance and rugged durability.",
        prodPrice: 6100.00,
        prodImg: "https://cdn2.jomashop.com/media/catalog/product/cache/fde19e4197824625333be074956e7640/i/w/iwc-aquatimer-automatic-blue-dial-mens-watch-iw328801.jpg?width=546&height=546"
      },
      {
        prodId: "prodId21",
        brand: "Jaeger-LeCoultre",
        prodModelName: "Master Ultra Thin Moon Rose Gold",
        prodDescription: "The Jaeger-LeCoultre Master Ultra Thin Moon is a sophisticated and slim timepiece featuring a moon phase complication.",
        prodPrice: 23000.00,
        prodImg: "https://images.watchfinder.co.uk/imgv3/stock/232796/Jaeger-LeCoultre-Master%20Ultra%20Thin%20Moon-1362520-232796-230130-124228.jpg;quality=90;h=640,%20https://images.watchfinder.co.uk/imgv3/stock/232796/Jaeger-LeCoultre-Master%20Ultra%20Thin%20Moon-1362520-232796-230130-124228.jpg;quality=55;h=1280%202x"


      },
      {
        prodId: "prodId22",
        brand: "Jaeger-LeCoultre",
        prodModelName: "Reverso Mono Face",
        prodDescription: "The Jaeger-LeCoultre Reverso is an iconic watch known for its reversible case, allowing wearers to protect the dial by flipping it.",
        prodPrice: 8100.00,
        prodImg: "https://img.jaeger-lecoultre.com/product-slider-hero-mobile-3/14ae198ca6f6c5af59d50b347a35b3770f4d72b5.jpg"
      },
      {
        prodId: "prodId23",
        brand: "Jaeger-LeCoultre",
        prodModelName: "Polaris Date",
        prodDescription: "The Jaeger-LeCoultre Polaris collection is inspired by the brand's historical diving watches and offers a blend of sportiness and elegance.",
        prodPrice: 8200.00,
        prodImg: "https://cdn.shopify.com/s/files/1/0551/4906/8368/products/C00006965_1000_160x.jpg?v=1675077253"
      },
      {
        prodId: "prodId24",
        brand: "Jaeger-LeCoultre",
        prodModelName: "Atmos By Marc Newson",
        prodDescription: "The Jaeger-LeCoultre Atmos is a unique mechanical clock that doesn't require winding, powered by changes in atmospheric pressure.",
        prodPrice: 36000.00,
        prodImg: "https://img.jaeger-lecoultre.com/product-slider-hero-mobile-3/c8fc75cb7e8db9cdd0a4fea62ce59d6fe2717cf9.jpg"
      },
      {
        prodId: "prodId25",
        brand: "Jaeger-LeCoultre",
        prodModelName: "Rendez-Vous Rose Gold",
        prodDescription: "The Jaeger-LeCoultre Rendez-Vous collection is designed for women, featuring elegant and feminine timepieces with various complications.",
        prodPrice: 30000.00,
        prodImg: "https://www.net-a-porter.com/variants/images/9679066508384460/in/w2000_q60.jpg"
      },
      {
        prodId: "prodId26",
        brand: "Omega",
        prodModelName: "Seamaster Diver 300M",
        prodDescription: "The Omega Seamaster Diver 300M is a legendary watch that combines Omega's innovation and ocean heritage.",
        prodPrice: 5500.00,
        prodImg: "https://www.omegawatches.com/media/catalog/product/cache/a5c37fddc1a529a1a44fea55d527b9a116f3738da3a2cc38006fcc613c37c391/o/m/omega-seamaster-diver-300m-21032422004001-l.png"
      },
      {
        prodId: "prodId27",
        brand: "Omega",
        prodModelName: "Speedmaster Moonwatch",
        prodDescription: "The Omega Speedmaster Moonwatch is an iconic timepiece known for its association with NASA's space missions.",
        prodPrice: 7600.00,
        prodImg: "https://www.omegawatches.com/media/catalog/product/cache/a5c37fddc1a529a1a44fea55d527b9a116f3738da3a2cc38006fcc613c37c391/o/m/omega-speedmaster-moonwatch-professional-co-axial-master-chronometer-chronograph-42-mm-31030425001001-l.png"
      },
      {
        prodId: "prodId28",
        brand: "Omega",
        prodModelName: "Constellation",
        prodDescription: "The Omega Constellation is a symbol of precision and elegance with its distinctive design and meticulous craftsmanship.",
        prodPrice: 6700.00,
        prodImg: "https://www.omegawatches.com/media/catalog/product/cache/a5c37fddc1a529a1a44fea55d527b9a116f3738da3a2cc38006fcc613c37c391/o/m/omega-constellation-globemaster-13033412206001-l.png"
      },
      {
        prodId: "prodId29",
        brand: "Omega",
        prodModelName: "De Ville",
        prodDescription: "The Omega De Ville collection offers a range of classic and sophisticated watches suitable for any occasion.",
        prodPrice: 5400.00,
        prodImg: "https://www.omegawatches.com/media/catalog/product/cache/a5c37fddc1a529a1a44fea55d527b9a116f3738da3a2cc38006fcc613c37c391/o/m/omega-de-ville-prestige-42410402002002-l.png"
      },
      {
        prodId: "prodId30",
        brand: "Omega",
        prodModelName: "Aqua Terra",
        prodDescription: "The Omega Aqua Terra combines beautiful design with Swiss-made technology for the modern adventurer.",
        prodPrice: 6700.00,
        prodImg: "https://www.omegawatches.com/media/catalog/product/cache/a5c37fddc1a529a1a44fea55d527b9a116f3738da3a2cc38006fcc613c37c391/o/m/omega-seamaster-aqua-terra-150m-22013412106001-l.png"
      },
      {
        prodId: "prodId31",
        brand: "Omega",
        prodModelName: "Seamaster Planet Ocean",
        prodDescription: "The Omega Seamaster Planet Ocean is a professional dive watch with exceptional water resistance and advanced features for underwater exploration.",
        prodPrice: 12000.00,
        prodImg: "https://www.omegawatches.com/media/catalog/product/cache/a5c37fddc1a529a1a44fea55d527b9a116f3738da3a2cc38006fcc613c37c391/o/m/omega-seamaster-planet-ocean-600m-21592462201001-l.png"
      },
      {
        prodId: "prodId32",
        brand: "Omega",
        prodModelName: "Speedmaster Racing",
        prodDescription: "The Omega Speedmaster Racing is a sporty chronograph inspired by the world of motorsports, featuring a distinctive racing dial and tachymeter scale.",
        prodPrice: 8700.00,
        prodImg: "https://www.omegawatches.com/media/catalog/product/o/m/omega-speedmaster-racing-32932445101001-1-product-zoom.png"
      },
      {
        prodId: "prodId33",
        brand: "Omega",
        prodModelName: "Constellation Globemaster",
        prodDescription: "The Omega Constellation Globemaster pays tribute to the brand's heritage while embracing innovative technology, combining classic design with modern precision.",
        prodPrice: 28000.00,
        prodImg: "https://www.omegawatches.com/media/catalog/product/cache/a5c37fddc1a529a1a44fea55d527b9a116f3738da3a2cc38006fcc613c37c391/o/m/omega-constellation-globemaster-13053412203001-l.png"
      },
      {
        prodId: "prodId34",
        brand: "Omega",
        prodModelName: "Seamaster Aqua Terra",
        prodDescription: "The Omega Seamaster Aqua Terra collection offers a balance of sportiness and elegance, suitable for both land and water activities.",
        prodPrice: 5700.00,
        prodImg: "https://www.omegawatches.com/media/catalog/product/cache/a5c37fddc1a529a1a44fea55d527b9a116f3738da3a2cc38006fcc613c37c391/o/m/omega-seamaster-aqua-terra-150m-22010412103001-l.png"
      },
      {
        prodId: "prodId35",
        brand: "Omega",
        prodModelName: "De Ville Trésor",
        prodDescription: "The Omega De Ville Trésor collection showcases timeless elegance with its slim profile, luxurious materials, and refined details.",
        prodPrice: 4700.00,
        prodImg: "https://www.omegawatches.com/media/catalog/product/cache/a5c37fddc1a529a1a44fea55d527b9a116f3738da3a2cc38006fcc613c37c391/o/m/omega-de-ville-prestige-42410402002002-l.png"
      },
      {
        prodId: "prodId36",
        brand: "Patek Philippe",
        prodModelName: "Nautilus Tiffany & Co. Blue",
        prodDescription: "The Patek Philippe Nautilus is a highly coveted and iconic sports watch with a distinctive porthole design.",
        prodPrice: 2200000.00,
        prodImg: "https://cdn2.chrono24.com/images/uhren/26224860-6p7b3uo8vmyuap6a3b3zhb3i-ExtraLarge.jpg"
      },
      {
        prodId: "prodId37",
        brand: "Patek Philippe",
        prodModelName: "Aquanaut Olive",
        prodDescription: "The Patek Philippe Aquanaut is a sporty and contemporary watch designed for active lifestyles, featuring a tropical strap and a rounded octagonal case.",
        prodPrice: 142000.00,
        prodImg: "https://static.patek.com/images/articles/face_white/350/5168G_010_1.jpg"
      },
      {
        prodId: "prodId38",
        brand: "Patek Philippe",
        prodModelName: "Calatrava",
        prodDescription: "The Patek Philippe Calatrava is a timeless and elegant dress watch, known for its clean lines and understated sophistication.",
        prodPrice: 20000.00,
        prodImg: "https://static.patek.com/images/articles/face_white/350/5227R_001_1.jpg"
      },
      {
        prodId: "prodId39",
        brand: "Patek Philippe",
        prodModelName: "Grand Complications",
        prodDescription: "The Patek Philippe Grand Complications collection showcases the brand's mastery in watchmaking with complex complications such as perpetual calendars, minute repeaters, and tourbillons.",
        prodPrice: 234000.00,
        prodImg: "https://static.patek.com/images/articles/face_white/350/5327R_001_1.jpg"
      },
      {
        prodId: "prodId40",
        brand: "Patek Philippe",
        prodModelName: "Twenty-4",
        prodDescription: "The Patek Philippe Twenty-4 is a ladies' watch collection known for its elegant and feminine design, offering both quartz and mechanical movements.",
        prodPrice: 26000.00,
        prodImg: "https://static.patek.com/images/articles/face_white/350/7300_1200A_001_1.jpg"
      },
      {
        prodId: "prodId41",
        brand: "Rolex",
        prodModelName: "Cosmograph Daytona Rose Gold",
        prodDescription: "The Rolex Cosmograph Daytona is a highly reliable chronograph designed for racing drivers. It features a sleek design with a tachymetric scale on the bezel.",
        prodPrice: 59000.00,
        prodImg: "https://content.rolex.com/v7/dam/2023-06/upright-c/m126506-0001.png?impolicy=v7-main-configurator&imwidth=640"
      },
      {
        prodId: "prodId42",
        brand: "Rolex",
        prodModelName: "Explorer",
        prodDescription: "The Rolex Explorer is a rugged and reliable timepiece designed for adventurers and outdoor enthusiasts.",
        prodPrice: 7900.00,
        prodImg: "https://content.rolex.com/v7/dam/2023-06/upright-c/m124270-0001.png?impolicy=v7-main-configurator&imwidth=640"
      },
      {
        prodId: "prodId43",
        brand: "Rolex",
        prodModelName: "Submariner",
        prodDescription: "The Rolex Submariner is a legendary diver's watch known for its water resistance and iconic design.",
        prodPrice: 16000.00,
        prodImg: "https://content.rolex.com/v7/dam/2023-06/upright-c/m126610lv-0002.png?impolicy=v7-main-configurator&imwidth=640"
      },
      {
        prodId: "prodId44",
        brand: "Rolex",
        prodModelName: "Datejust",
        prodDescription: "The Rolex Datejust is a classic timepiece with an elegant and versatile style.",
        prodPrice: 17450.00,
        prodImg: "https://content.rolex.com/v7/dam/2023-06/upright-c/m126334-0027.png?impolicy=v7-main-configurator&imwidth=640"
      },
      {
        prodId: "prodId45",
        brand: "Rolex",
        prodModelName: "GMT-Master II",
        prodDescription: "The Rolex GMT-Master II is designed for travelers with a dual time zone function.",
        prodPrice: 14320.00,
        prodImg: "https://content.rolex.com/v7/dam/2023-06/upright-c/m126710blnr-0003.png?impolicy=v7-main-configurator&imwidth=640"
      },
      {
        prodId: "prodId46",
        brand: "Rolex",
        prodModelName: "Oyster Perpetual",
        prodDescription: "The Rolex Oyster Perpetual is a timeless and versatile watch with a classic design and reliable performance.",
        prodPrice: 8200.00,
        prodImg: "https://content.rolex.com/v7/dam/2023-06/upright-c/m126000-0006.png?impolicy=v7-main-configurator&imwidth=640"
      },
      {
        prodId: "prodId47",
        brand: "Rolex",
        prodModelName: "Yacht-Master II",
        prodDescription: "The Rolex Yacht-Master II is a regatta chronograph designed for sailing competitions, featuring a programmable countdown function and a distinctive nautical style.",
        prodPrice: 27850.00,
        prodImg: "https://content.rolex.com/v7/dam/2023-06/upright-c/m116681-0002.png?impolicy=v7-main-configurator&imwidth=640"
      },
      {
        prodId: "prodId48",
        brand: "Rolex",
        prodModelName: "Sky-Dweller Rose Gold",
        prodDescription: "The Rolex Sky-Dweller is a dual time zone watch with an annual calendar, combining functionality with elegance.",
        prodPrice: 42450.00,
        prodImg: "https://content.rolex.com/v7/dam/2023-06/upright-c/m336935-0004.png?impolicy=v7-main-configurator&imwidth=640"
      },
      {
        prodId: "prodId49",
        brand: "Rolex",
        prodModelName: "Day-Date",
        prodDescription: "The Rolex Day-Date is a prestigious and iconic watch known for its President bracelet and day/date display.",
        prodPrice: 8300.00,
        prodImg: "https://content.rolex.com/v7/dam/2023-06/upright-c/m128239-0005.png?impolicy=v7-main-configurator&imwidth=640"
      },
      {
        prodId: "prodId50",
        brand: "Rolex",
        prodModelName: "Cellini Moonphase",
        prodDescription: "The Rolex Cellini collection embodies timeless elegance and traditional craftsmanship, offering dress watches with refined aesthetics.",
        prodPrice: 32000.00,
        prodImg: "https://content.rolex.com/v7/dam/2023-06/upright-c/m52508-0006.png?impolicy=v7-main-configurator&imwidth=640"
      }

    ]

    const products = await Promise.all(productsToCreate.map(createProduct))

    console.log("Products created! ")
  } catch (error) {
    console.error("Error creating products!")
    throw error
  }
}

async function createInitialUsers() {
  console.log("Starting to create users...")
  try {
    const usersToCreate = [
      { username: "albert", password: "bertie99" , role:'customer' },
      { username: "sandra", password: "sandra123", role: 'customer'},
      { username: "glamgal", password: "glamgal123", role: 'customer' },
      {username: "hellothere", password: "hellothere", role: "admin"}
    ]
    const users = await Promise.all(usersToCreate.map(createUser))

    console.log("Users created:")
    console.log(users)
    console.log("Finished creating users!")
  } catch (error) {
    console.error("Error creating users!")
    throw error
  }
}

const createInitialOrders = async () => {
  console.log("Starting to create orders...");
  try {
    const ordersToCreate = [
      {
        orderProdId: "prodId21",
        orderProdModelName: "Master Ultra Thin Moon Rose Gold",
        orderQty: 1,
        orderDate: '2023-07-05 18:56:22',
        orderTotalPrice: '23000.00',
        orderStatus: "Created"
      },
      {
        orderProdId: "prodId19",
        orderProdModelName: "Portofino Chronograph",
        orderQty: 1,
        orderDate: '2023-07-05 19:21:18',
        orderTotalPrice: '6250.00',
        orderStatus: "Processing"
      },
      {
        orderProdId: "prodId36",
        orderProdModelName: "Nautilus Tiffany & Co. Blue",
        orderQty: 1,
        orderDate: '2023-07-05 20:20:18',
        orderTotalPrice: '2200000.00',
        orderStatus: "Canceled"
      },
      {
        orderProdId: "prodId29",
        orderProdModelName: "De Ville",
        orderQty: 1,
        orderDate: '2023-07-06 20:20:18',
        orderTotalPrice: '5400.00',
        orderStatus: "Created"
      }
    ];

    let previousOrder = null;
    for (const order of ordersToCreate) {
      const createdOrder = await createOrder(
        order.orderProdId,
        order.orderProdModelName,
        order.orderQty,
        order.orderDate,
        order.orderTotalPrice,
        order.userIdOrder,
        order.orderStatus
      );

      if (previousOrder) {
        previousOrder.orderId = createdOrder.orderId;
      }

      previousOrder = createdOrder;
      console.log(createdOrder)
    }

    console.log("Finished creating orders!");
    
  } catch (error) {
    console.error("Error creating orders!");
    throw error;
  }
};


async function buildTables() {
  try {
    await dropTables()
    await createTables()
    await createInitialUsers()
    await createInitialProducts()
    await createInitialOrders()
  } catch (error) {
    console.log("Error during rebuild!");
    throw error
  }

}
client.connect();
buildTables()
  .catch(console.error)
  .finally(() => client.end());




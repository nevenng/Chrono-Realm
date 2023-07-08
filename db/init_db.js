const {
  createUser,
  createProduct,
  createOrder,
  createCart,
  addProductToCart
  // declare your model imports here
  // for example, User
} = require('./models');
const client = require("./client");


async function dropTables() {
  console.log("Dropping All Tables...")
  try {
    await client.query(`    
      DROP TABLE IF EXISTS orders;    
      DROP TABLE IF EXISTS cart_item;
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
        cartId SERIAL PRIMARY KEY,
        cartSessionId VARCHAR(255) NOT NULL,
        userId INT,
        cartStatus VARCHAR(255) DEFAULT 'pending' NOT NULL
      ); 
      CREATE TABLE cart_item (
        cartProdId VARCHAR(255) NOT NULL,
        cartProdName VARCHAR(255) NOT NULL,
        cartProdDescription VARCHAR(255) NOT NULL,
        prodImg TEXT NOT NULL,
        cartQuantity INT NOT NULL, 
        cartProdPrice DECIMAL(10,2) NOT NULL,
        cartTotalPrice DECIMAL(10, 2) NOT NULL,
        cartId INT NOT NULL,
        FOREIGN KEY (cartId) REFERENCES cart(cartId)
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
          "https://www.audemarspiguet.com/content/dam/ap/com/products/watches/MTR009673.00/importer/watch.png.transform.approductmain.png"
      },
      {
        prodId: "prodId2",
        brand: "Audemars Piguet",
        prodModelName: "Royal Oak Offshore",
        prodDescription: "The Audemars Piguet Royal Oak Offshore is a bold and robust variation of the classic Royal Oak, designed for extreme sports and adventures.",
        prodPrice: 42500.00,
        prodImg: "https://www.audemarspiguet.com/content/dam/ap/com/products/watches/MTR009454.00/importer/watch.png.transform.appdpmainmob.png"
      },
      {
        prodId: "prodId3",
        brand: "Audemars Piguet",
        prodModelName: "Royal Oak Tourbillon Rose Gold",
        prodDescription: "The Audemars Piguet Royal Oak Chronograph is a high-performance timepiece with a chronograph function and a distinctive octagonal case.",
        prodPrice: 132000.00,
        prodImg: "https://www.audemarspiguet.com/content/dam/ap/com/products/watches/MTR009710.00/importer/watch.png.transform.appdpmainmob.png"
      },
      {
        prodId: "prodId4",
        brand: "Audemars Piguet",
        prodModelName: "Royal Oak Concept",
        prodDescription: "The Audemars Piguet Royal Oak Concept collection features avant-garde designs and innovative complications, pushing the boundaries of traditional watchmaking.",
        prodPrice: 402000.00,
        prodImg: "https://www.audemarspiguet.com/content/dam/ap/com/products/watches/MTR009585.00/importer/watch.png.transform.appdpmainmob.png"
      },
      {
        prodId: "prodId5",
        brand: "Audemars Piguet",
        prodModelName: "Grande Sonnerie",
        prodDescription: "The Audemars Piguet Millenary collection showcases artistic craftsmanship and unconventional design with its oval-shaped case and off-center dial.",
        prodPrice: 775000.00,
        prodImg: "https://www.audemarspiguet.com/content/dam/ap/com/products/watches/MTR010565AA/importer/watch.png.transform.appdpmainmob.png"
      },
      {
        prodId: "prodId6",
        brand: "Breguet",
        prodModelName: "Classique Rose Gold ",
        prodDescription: "The Breguet Classique collection represents the epitome of traditional watchmaking with its elegant designs and exquisite craftsmanship.",
        prodPrice: 42100.00,
        prodImg: "https://www.breguet.com/sites/default/files/styles/page_modele_preview/public/gardetemps/variante/soldat/7727br_12_9wu_face_0.jpg?itok=OTdZ-PpJ"
      },
      {
        prodId: "prodId7",
        brand: "Breguet",
        prodModelName: "Marine",
        prodDescription: "The Breguet Marine collection combines nautical inspiration with technical innovation, offering sporty yet sophisticated timepieces.",
        prodPrice: 11000.00,
        prodImg: "https://www.breguet.com/sites/default/files/styles/page_modele_preview/public/gardetemps/variante/soldat/5517BB_Y2_BZ0.jpg?itok=BQy88dCq"
      },
      {
        prodId: "prodId8",
        brand: "Breguet",
        prodModelName: "Tradition",
        prodDescription: "The Breguet Tradition collection pays homage to the brand's rich heritage, showcasing timepieces with exposed movements and iconic design elements.",
        prodPrice: 19000.00,
        prodImg: "https://www.breguet.com/sites/default/files/styles/page_modele_preview/public/gardetemps/variante/soldat/7047pt119zu_soldat_face_maps.jpg?itok=jedttFf9"
      },
      {
        prodId: "prodId9",
        brand: "Breguet",
        prodModelName: "Reine de Naples",
        prodDescription: "The Breguet Reine de Naples collection is a tribute to the original watch created for Queen Marie Antoinette, featuring elegant and feminine designs.",
        prodPrice: 26000.00,
        prodImg: "https://www.breguet.com/sites/default/files/styles/page_modele_preview/public/gardetemps/variante/soldat/8928BR_5W_944DD0D_face.jpg?itok=qTqNjCnF"
      },
      {
        prodId: "prodId10",
        brand: "Breguet",
        prodModelName: "Type XX / Type XXI",
        prodDescription: "The Breguet Type XX and Type XXI are aviation-inspired chronographs with a vintage charm and modern functionalities.",
        prodPrice: 13000.00,
        prodImg: "https://www.breguet.com/sites/default/files/styles/page_modele_preview/public/gardetemps/variante/soldat/2057ST923WU.jpg?itok=aDxuEdsy"
      },
      {
        prodId: 'prodId11',
        brand: 'A. Lange & Söhne',
        prodModelName: 'A. Lange & Söhne Lange 1',
        prodDescription: 'The A. Lange & Söhne Lange 1 is an iconic timepiece with asymmetric dial layout and patented big date display.',
        prodPrice: 33900.00,
        prodImg: 'https://img.alange-soehne.com/product-light-box-2/bcf8fe0b2b193dc12f285472418c057caf77979c.jpg'
      },
      {
        prodId: 'prodId12',
        brand: 'A. Lange & Söhne',
        prodModelName: 'A. Lange & Söhne Saxonia Thin',
        prodDescription: 'The A. Lange & Söhne Saxonia Thin is a classic dress watch with ultra-slim profile and timeless elegance.',
        prodPrice: 19900.00,
        prodImg: 'https://img.alange-soehne.com/product-light-box-2/75a1af1a01eefa19f5f08e6cecf7ec4847404957.jpg'
      },
      {
        prodId: 'prodId13',
        brand: 'A. Lange & Söhne',
        prodModelName: 'A. Lange & Söhne Richard Lange',
        prodDescription: 'The A. Lange & Söhne Richard Lange is dedicated to precision timekeeping with platinum case and refined aesthetics.',
        prodPrice: 53500.00,
        prodImg: 'https://img.alange-soehne.com/product-light-box-2/6a3ad53af4afced1f8fba3ede3faa381afef2179.jpg'
      },
      {
        prodId: 'prodId14',
        brand: 'A. Lange & Söhne',
        prodModelName: 'A. Lange & Söhne 1815 Chronograph',
        prodDescription: 'The A. Lange & Söhne 1815 Chronograph is inspired by traditional pocket watches with rose gold case and exquisite craftsmanship.',
        prodPrice: 47000.00,
        prodImg: 'https://img.alange-soehne.com/product-light-box-2/149cf0966b5a87777bfb33e05b1693d85d10a5da.jpg'
      },
      {
        prodId: 'prodId15',
        brand: 'A. Lange & Söhne',
        prodModelName: 'A. Lange & Söhne Datograph Up/Down',
        prodDescription: 'The A. Lange & Söhne Datograph Up/Down is a highly regarded chronograph with platinum case and the pinnacle of watchmaking expertise.',
        prodPrice: 94500.00,
        prodImg: 'https://img.alange-soehne.com/product-light-box-2/5abb63732cf5876aea7fc2634eb3cbd883579424.jpg'
      },
      {
        prodId: "prodId16",
        brand: "IWC",
        prodModelName: "Portugieser",
        prodDescription: "The IWC Portugieser is a classic and elegant watch with a timeless design. It features a large dial, Arabic numerals, and a clean, uncluttered look.",
        prodPrice: 8400.00,
        prodImg: "https://www.iwc.com/content/dam/rcq/iwc/20/15/88/5/2015885.png.transform.global_image_480_2x.png"
      },
      {
        prodId: "prodId17",
        brand: "IWC",
        prodModelName: "Pilot's Watch",
        prodDescription: "The IWC Pilot's Watch collection pays tribute to aviation history with its instrument-inspired designs and precise timekeeping.",
        prodPrice: 9950.00,
        prodImg: "https://www.iwc.com/content/dam/rcq/iwc/21/49/88/2/2149882.png.transform.global_image_940_2x.png"
      },
      {
        prodId: "prodId18",
        brand: "IWC",
        prodModelName: "Da Vinci Tourbillon",
        prodDescription: "The IWC Da Vinci collection combines innovative technology with artistic design, creating sophisticated and unique timepieces.",
        prodPrice: 95000.00,
        prodImg: "https://www.iwc.com/content/dam/rcq/iwc/16/48/96/2/1648962.png.transform.global_image_480_2x.png"
      },
      {
        prodId: "prodId19",
        brand: "IWC",
        prodModelName: "Portofino Chronograph",
        prodDescription: "The IWC Portofino is a collection of elegant and understated watches suitable for any occasion.",
        prodPrice: 6250.00,
        prodImg: "https://www.iwc.com/content/dam/rcq/iwc/19/08/65/8/1908658.png.transform.global_image_940_2x.png"
      },
      {
        prodId: "prodId20",
        brand: "IWC",
        prodModelName: "Aquatimer",
        prodDescription: "The IWC Aquatimer is IWC's diver's watch, known for its water resistance and rugged durability.",
        prodPrice: 6100.00,
        prodImg: "https://www.iwc.com/content/dam/rcq/iwc/89/Hk/HI/UA/zU/qP/HK/Jo/cs/-d/JA/89HkHIUAzUqPHKJocs-dJA.png.transform.global_image_480_2x.png"
      },
      {
        prodId: "prodId21",
        brand: "Jaeger-LeCoultre",
        prodModelName: "Master Ultra Thin Moon Rose Gold",
        prodDescription: "The Jaeger-LeCoultre Master Ultra Thin Moon is a sophisticated and slim timepiece featuring a moon phase complication.",
        prodPrice: 23000.00,
        prodImg: "https://img.jaeger-lecoultre.com/product-light-box-1/2be9ce76e56723b5e6417ec385056b362d268507.jpg"
      },
      {
        prodId: "prodId22",
        brand: "Jaeger-LeCoultre",
        prodModelName: "Reverso Mono Face",
        prodDescription: "The Jaeger-LeCoultre Reverso is an iconic watch known for its reversible case, allowing wearers to protect the dial by flipping it.",
        prodPrice: 8100.00,
        prodImg: "https://img.jaeger-lecoultre.com/product-light-box-1/3db64b2b5e02e18a394fad413d068bff55c1f244.jpg"
      },
      {
        prodId: "prodId23",
        brand: "Jaeger-LeCoultre",
        prodModelName: "Polaris Date",
        prodDescription: "The Jaeger-LeCoultre Polaris collection is inspired by the brand's historical diving watches and offers a blend of sportiness and elegance.",
        prodPrice: 8200.00,
        prodImg: "https://img.jaeger-lecoultre.com/product-light-box-1/2ec95c87d352e1bdf7d6e48c00b7549cae3f5876.jpg"
      },
      {
        prodId: "prodId24",
        brand: "Jaeger-LeCoultre",
        prodModelName: "Atmos By Marc Newson",
        prodDescription: "The Jaeger-LeCoultre Atmos is a unique mechanical clock that doesn't require winding, powered by changes in atmospheric pressure.",
        prodPrice: 36000.00,
        prodImg: "https://img.jaeger-lecoultre.com/product-light-box-1/c8fc75cb7e8db9cdd0a4fea62ce59d6fe2717cf9.jpg"
      },
      {
        prodId: "prodId25",
        brand: "Jaeger-LeCoultre",
        prodModelName: "Rendez-Vous Rose Gold",
        prodDescription: "The Jaeger-LeCoultre Rendez-Vous collection is designed for women, featuring elegant and feminine timepieces with various complications.",
        prodPrice: 30000.00,
        prodImg: "https://img.jaeger-lecoultre.com/product-light-box-1/cfe2132557c20ec946746f5cc1a04c4600f51ea4.jpg"
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
        brand: "Vacheron Constantin",
        prodModelName: "Traditionnelle",
        prodDescription: "The Vacheron Constantin Traditionnelle is a highly coveted and iconic watch known for its traditional craftsmanship.",
        prodPrice: 45000.00,
        prodImg: "https://www.vacheron-constantin.com/dam/rcq/vac/16/23/89/3/1623893.png.transform.vacproddetails.png"
      },
      {
        prodId: "prodId37",
        brand: "Vacheron Constantin",
        prodModelName: "Overseas",
        prodDescription: "The Vacheron Constantin Overseas is a sporty and contemporary watch that combines elegance with rugged durability.",
        prodPrice: 21500.00,
        prodImg: "https://www.vacheron-constantin.com/dam/rcq/vac/10/87/63/3/1087633.png.transform.vacproddetailstab.png"
      },
      {
        prodId: "prodId38",
        brand: "Vacheron Constantin",
        prodModelName: "Patrimony",
        prodDescription: "The Vacheron Constantin Patrimony is a timeless and elegant dress watch, admired for its classic and refined design.",
        prodPrice: 30000.00,
        prodImg: "https://www.vacheron-constantin.com/dam/rcq/vac/16/19/63/0/1619630.png.transform.vacproddetails.png"
      },
      {
        prodId: "prodId39",
        brand: "Vacheron Constantin",
        prodModelName: "Harmony",
        prodDescription: "The Vacheron Constantin Harmony is a collection of watches known for their harmonious blend of aesthetics and precision.",
        prodPrice: 20000.00,
        prodImg: "https://www.vacheron-constantin.com/dam/rcq/vac/67/93/71/679371.png.transform.vacproddetailstab.png"
      },
      {
        prodId: "prodId40",
        brand: "Vacheron Constantin",
        prodModelName: "Traditionnelle for Women",
        prodDescription: "The Vacheron Constantin Traditionnelle for Women is an exquisite watch collection with a perfect blend of femininity and sophistication.",
        prodPrice: 18500.00,
        prodImg: "https://www.vacheron-constantin.com/dam/rcq/vac/22/60/52/1/2260521.png.transform.vacproddetailstab.png"
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
        prodImg: "https://content.rolex.com/v7/dam/2023-06/upright-c/m126610lv-0002.png?impolicy=v7-main-configurator&imwidth=800"
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

const createInitialCart = async () => {
  console.log("Starting to create carts...");

  // two carts: 1 for registered user, 1 for guest
  const cartsToCreate = [
    {
      sessionId: "12345",
      userId: 1,
      cartStatus: "completed"
    },
    {
      sessionId: "23456",
      cartStatus: "pending"
    }
  ]
  try {
    const createdCarts = await Promise.all(cartsToCreate.map(createCart))
    console.log('Carts created successfully')
    console.log(createdCarts)

  } catch (error) {
    console.error("Error creating initial cart!");
    throw error;
  }
}

const createInitialCartItems = async () => {
  console.log("Starting to create carts...");

  // two carts: 1 for registered user, 1 for guest
  const cartItemsToCreate = [
    {
      prodId: "prodId21",
      prodModelName: "Master Ultra Thin Moon Rose Gold",
      prodDescription: "The Jaeger-LeCoultre Master Ultra Thin Moon is a sophisticated and slim timepiece featuring a moon phase complication.",
      prodImg: "https://images.watchfinder.co.uk/imgv3/stock/232796/Jaeger-LeCoultre-Master%20Ultra%20Thin%20Moon-1362520-232796-230130-124228.jpg;quality=90;h=640,%20https://images.watchfinder.co.uk/imgv3/stock/232796/Jaeger-LeCoultre-Master%20Ultra%20Thin%20Moon-1362520-232796-230130-124228.jpg;quality=55;h=1280%202x",
      quantity: 1,
      prodPrice: 6700.00,
      totalPrice: 6700.00,
      cartId: 1
    },
    {
      prodId: "prodId28",
      prodModelName: "Constellation",
      prodDescription: "The Omega Constellation is a symbol of precision and elegance with its distinctive design and meticulous craftsmanship.",
      prodImg: "https://www.omegawatches.com/media/catalog/product/cache/a5c37fddc1a529a1a44fea55d527b9a116f3738da3a2cc38006fcc613c37c391/o/m/omega-constellation-globemaster-13033412206001-l.png",
      quantity: 2,
      prodPrice: 23000.00,
      totalPrice: 46000.00,
      cartId: 1
    }
  ]
  try {
    const createdProducts = await Promise.all(cartItemsToCreate.map(addProductToCart))
    console.log('Products added to carts successfully')
    console.log(createdProducts)

  } catch (error) {
    console.error("Error creating initial products!");
    throw error;
  }
}


async function buildTables() {
  try {
    await dropTables()
    await createTables()
    await createInitialUsers()
    await createInitialProducts()
    await createInitialOrders()
    await createInitialCart()
    await createInitialCartItems()
  } catch (error) {
    console.log("Error during rebuild!");
    throw error
  }

}
client.connect();
buildTables()
  .catch(console.error)
  .finally(() => client.end());




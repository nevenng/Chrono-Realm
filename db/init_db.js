const {
  createUser,
  createProduct
  // declare your model imports here
  // for example, User
} = require('./models');


async function dropTables() {
  console.log("Dropping All Tables...")
  try {
    await client.query(`
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS cart;
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
          password VARCHAR(255) NOT NULL
      );    
      CREATE TABLE products (
        prodId INT PRIMARY KEY,
        brand VARCHAR(255) NULL,
        prodModelName VARCHAR(255) NOT NULL ,
        prodDescription VARCHAR(255) NOT NULL,
        prodImg VARCHAR(255) NOT NULL,
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
        orderId SERIAL PRIMARY KEY,
        productId INT NOT NULL,
        productName VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        orderDate VARCHAR(255) NOT NULL,
        totalPrice DECIMAL(10, 2) NOT NULL
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
        prodPrice: '$6,200.00',
        prodImg: 'https://cdn2.chrono24.com/images/uhren/29109307-rrsbcosu22bjssgxk312i9d1-ExtraLarge.jpg'
      },
      {       
        prodId: 'prodId12',
        brand: 'Grand Seiko',
        prodModelName: 'Grand Seiko SBGJ201',
        prodDescription: 'The Grand Seiko SBGJ201 is a GMT watch with a mechanical movement, featuring Grand Seiko\'s renowned precision and craftsmanship.',
        prodPrice: '$5,500.00',
        prodImg: 'https://cdn.shopify.com/s/files/1/1889/5061/products/Grand-Seiko-Heritage-Hi-Beat-36000-SBGJ201-10-10-GRS-EMFZ34-3fbcb56ed1fa_1000x.jpg?v=1683316856'
      },
      {        
        prodId: 'prodId13',
        brand: 'Grand Seiko',
        prodModelName: 'Grand Seiko SBGA373',
        prodDescription: 'The Grand Seiko SBGA373 is a limited edition watch with a titanium case and a blue dial, offering exceptional accuracy and legibility.',
        prodPrice: '$3,750.00',
        prodImg: 'https://cdn.shopify.com/s/files/1/0355/9843/4435/products/1133b6cf5637ab13438c2e5af9c7ca86_1024x.jpg?v=1679604299'
      },
      {        
        prodId: 'prodId14',
        brand: 'Grand Seiko',
        prodModelName: 'Grand Seiko SBGR311',
        prodDescription: 'The Grand Seiko SBGR311 is a dress watch with a stainless steel case and a silver dial, showcasing Grand Seiko\'s dedication to refinement.',
        prodPrice: '$5,000.00',
        prodImg: 'https://cdn.shopify.com/s/files/1/1889/5061/products/Grand-Seiko-Heritage-Hi-Beat-36000-SBGR311-10-10-GRS-R5S7CP-e41acbe58698_1000x.jpg?v=1671480132'
      },
      {       
        prodId: 'prodId15',
        brand: 'Grand Seiko',
        prodModelName: 'Grand Seiko SBGH271',
        prodDescription: 'The Grand Seiko SBGH271 is a high-beat mechanical watch with a gold case and a black dial, exemplifying Grand Seiko\'s craftsmanship and precision.',
        prodPrice: '$5,200.00',
        prodImg: 'https://cdn.shopify.com/s/files/1/0416/5874/4986/products/grand-seiko-heritage-sbgh271-sbgh271-100854_
      }

    ]
    const products = await Promise.all(productsToCreate.map(createProduct))

    console.log("Products created! ")
  }catch(error){
    console.error("Error creating products!")
    throw error
  }
}



async function createInitialUsers() {
  console.log("Starting to create users...")
  try {
    const usersToCreate = [
      { username: "albert", password: "bertie99" },
      { username: "sandra", password: "sandra123" },
      { username: "glamgal", password: "glamgal123" },
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

async function buildTables() {
  try {
    await dropTables()
    await createTables()
    await createInitialUsers()
    await createInitialProducts()
  } catch (error) {
    console.log("Error during rebuild!");
    throw error
  }

}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());

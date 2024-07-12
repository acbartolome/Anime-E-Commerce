const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function seedData() {
  console.log("Seeding the database");
  try {
    // clear tables
    await prisma.user.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.cart.deleteMany({});
    await prisma.orderHistory.deleteMany({});

    // create admin accounts
    // Do I need to add a orderHistory?/cart?
    const createAdmins = await prisma.user.createMany({
      data: [
        {
          name: "Adryan",
          email: "admin-adryan@gmail.com",
          password: "This1sTotallyaSeCurePasSword",
          admin: true,
        },
        {
          name: "Bradley",
          email: "admin-bradley@gmail.com",
          password: "This1sTotallyaSeCurePasSword",
          admin: true,
        },
      ],
    });

    // Create 3 regular users
    // Do I create the carts and orderHistory here?
    const users = await prisma.user.createMany({
      data: [
        {
          // user with items in cart and order history
          // userId: 1
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          admin: false,
        },
        {
          // user with no items in cart but with order history
          // userId: 2
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          admin: false,
        },
        {
          // user with items in cart but with no order history
          // userId: 3
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          admin: false,
        },
      ],
    });

    // Create the cart and order history entries
    await prisma.cart.createMany({
      data: [
        { userId: 1, productId: 1, quantity: 1 },
        { userId: 1, productId: 6, quantity: 1 },
        { userId: 3, productId: 9, quantity: 1 },
        { userId: 3, productId: 14, quantity: 3 },
      ],
    });

    await prisma.orderHistory.createMany({
      data: [
        {
          orderId: 1,
          userId: 1,
          order: JSON.stringify([
            { productId: 1, quantity: 1 },
            { productId: 3, quantity: 1 },
            { productId: 6, quantity: 1 },
          ]),
        },
        {
          orderId: 2,
          userId: 1,
          order: JSON.stringify([{ productId: 8, quantity: 1 }]),
        },
        {
          orderId: 1,
          userId: 2,
          order: JSON.stringify([
            { productId: 15, quantity: 1 },
            { productId: 10, quantity: 1 },
          ]),
        },
      ],
    });
    // create Products
    // Categories: Clothing, Collectables (figures), Home Entertainment (DVD, CDs etc), Manga & Books
    const products = await prisma.product.createMany({
      data: [
        // Clothing
        {
          // productId: 1
          name: "Naruto Shippuden - Kakashi Hatake '90s T-Shirt",
          description: faker.lorem.paragraph(),
          price: 24.95,
          imageUrl:
            "https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dwffb90b88/images/6715721318444-1-ripple-junction-unisex-t-shirts-naruto-shippuden-kakashi-hatake-90s-t-shirt-crunchyroll-exclusive-29755295334444.jpg",
          category: "Clothing",
          stock: 10,
        },
        {
          // productId: 2
          name: "Jujutsu Kaisen - Gojo Crossed Arms Hoodie",
          description: faker.lorem.paragraph(),
          price: 44.95,
          imageUrl:
            "https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dwbceb9662/images/6872429690924-1-bioworld-hoodies-outerwear-jujutsu-kaisen-gojo-crossed-arms-hoodie-32031244550188.jpg",
          category: "Clothing",
          stock: 15,
        },
        {
          // productId: 3
          name: "One Piece - Luffy Scattered Devil Fruit Short Sleeve T-Shirt",
          description: faker.lorem.paragraph(),
          price: 29.95,
          imageUrl:
            "https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dwd79e8624/images/OPAS3002CY_one-piece-luffy-scattered-devil-fruit-ss-t-shirt_1.jpg",
          category: "Clothing",
          stock: 8,
        },
        {
          // productId: 4
          name: "Attack On Titan - Colossal Titan T-Shirt",
          description: faker.lorem.paragraph(),
          price: 19.95,
          imageUrl:
            "https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dw9ba60740/Apparel/TS62AMATNRE%20-%20Attack%20On%20Titan%20-%20Colossal%20Titan%20T-Shirt/TS62AMATN_1.jpg",
          category: "Clothing",
          stock: 20,
        },
        {
          // productId: 5
          name: "Dragon Ball Z - Z Fighters Sweatpants",
          description: faker.lorem.paragraph(),
          price: 69.95,
          imageUrl:
            "https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dw4d0aa621/images/AP9W7CDBZ_dragon-ball-z-z-fighters-sweatpants_1.jpg",
          category: "Clothing",
          stock: 30,
        },
        // Collectables
        {
          name: "JUJUTSU KAISEN - Satoru Gojo 1/7 Scale Figure (Tokyo Jujutsu High School Ver.)",
          description: faker.lorem.paragraph(),
          price: 135.95,
          imageUrl:
            "https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dw9a99b4aa/images/4580590195677_jujutsu-kaisen-satoru-gojo-17-scale-figure-tokyo-jujutsu-high-school-ver_1.jpg",
          category: "Collectables",
          stock: 15,
        },
        {
          name: "Naruto Shippuden - Sasuke Uchiha Vibration Stars IV Prize Figure",
          description: faker.lorem.paragraph(),
          price: 39.95,
          imageUrl:
            "https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dwc5093e78/images/4983164898125_naruto-shippuden-sasuke-uchiha-vibration-stars-iv-prize-figure_1.jpg",
          category: "Collectables",
          stock: 20,
        },
        {
          name: "Lelouch of the Rebellion: Code Geass - Lelouch Lamperouge G.E.M. Figure (G.E.M.15th Anniversary Ver.)",
          description: faker.lorem.paragraph(),
          price: 185.95,
          imageUrl:
            "https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dw8d3a98e5/images/4535123840678_lelouch-of-the-rebellion-code-geass-lelouch-lamperouge-gem-series-figure-gem15th-anniversary-ver_1.jpg",
          category: "Collectables",
          stock: 16,
        },
        {
          name: "Persona 5 - Makoto Niijima 1/7 Scale Figure (School Uniform Ver.)",
          description: faker.lorem.paragraph(),
          price: 335.95,
          imageUrl:
            "https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dw80218f22/images/4981932521503_persona-5-makoto-niijima-17-scale-figure-school-uniform-ver_12.jpg",
          category: "Collectables",
          stock: 10,
        },
        {
          // productId: 10
          name: "Fullmetal Alchemist: Brotherhood - Alphonse Elric FigZero 1/6 Scale Figure",
          description: faker.lorem.paragraph(),
          price: 189.95,
          imageUrl:
            "https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dw97d74d6c/images/4897056202122_fullmetal-alchemist-brotherhood-alphonse-elric-figzero-16-scale-figure_1.jpg",
          category: "Collectables",
          stock: 18,
        },
        // Home Entertainment
        {
          name: "Dragon Ball Super - The Complete Series - Limited Edition - Blu-ray",
          description: faker.lorem.paragraph(),
          price: 179.95,
          imageUrl:
            "https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dw0e101fe7/images/704400106491_dragon-ball-super-the-complete-series-limited-edition-blu-ray_1.jpg",
          category: "Home Entertainment",
          stock: 20,
        },
        {
          name: "Perfect Blue - Original Score Vinyl - Deluxe Audiophile Edition",
          description: faker.lorem.paragraph(),
          price: 39.95,
          imageUrl:
            "https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dw6defb6a6/images/600385302814_perfect-blue-original-score-vinyl-deluxe-audiophile-edition_1.jpg",
          category: "Home Entertainment",
          stock: 25,
        },
        {
          name: "A Silent Voice Blu-ray/DVD",
          description: faker.lorem.paragraph(),
          price: 24.95,
          imageUrl:
            "https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dw6101f541/rightstuf/826663198829_anime-A-Silent-Voice-Blu-ray-DVD-primary.jpg",
          category: "Home Entertainment",
          stock: 30,
        },
        {
          name: "Code Geass - Collector's Edition - Blu-ray",
          description: faker.lorem.paragraph(),
          price: 549.95,
          imageUrl:
            "https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dwf82897af/Home%20Video/704400105449/704400105449_code-geass-collectors-edition-blu-ray_2.jpg",
          category: "Home Entertainment",
          stock: 5,
        },
        {
          // productId: 15
          name: "My Neighbor Totoro Steelbook Blu-ray/DVD",
          description: faker.lorem.paragraph(),
          price: 24.95,
          imageUrl:
            "https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dwdb47d4db/rightstuf/826663209945_anime-my-neighbor-totoro-steelbook-blu-ray-dvd-primary.jpg",
          category: "Home Entertainment",
          stock: 30,
        },
        // Manga & Books
        {
          name: "Solo Leveling Manhwa Volume 1 (Color)",
          description: faker.lorem.paragraph(),
          price: 13.95,
          imageUrl:
            "https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dweb0aaf7a/rightstuf/9781975319434_manga-solo-leveling-manga-volume-1-primary.jpg",
          category: "Manga & Books",
          stock: 15,
        },
        {
          name: "Jujutsu Kaisen Manga Volume 1",
          description: faker.lorem.paragraph(),
          price: 9.95,
          imageUrl:
            "https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dw9aa641f8/rightstuf/9781974710027_manga-jujutsu-kaisen-volume-1-primary.jpg",
          category: "Manga & Books",
          stock: 20,
        },
        {
          name: "Nana Manga Volume 1",
          description: faker.lorem.paragraph(),
          price: 9.95,
          imageUrl:
            "https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dw7c63d882/images/9781421501086_nana-graphic-novel-1_1.jpg",
          category: "Manga & Books",
          stock: 18,
        },
        {
          name: "BLEACH Manga Box Set 1",
          description: faker.lorem.paragraph(),
          price: 179.95,
          imageUrl:
            "https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dw53204b6b/rightstuf/9781421526102_manga-Bleach-Box-Set-1-primary.jpg",
          category: "Manga & Books",
          stock: 10,
        },
        {
          // productId: 20
          name: "Naruto Manga Box Set 1",
          description: faker.lorem.paragraph(),
          price: 229.95,
          imageUrl:
            "https://store.crunchyroll.com/on/demandware.static/-/Sites-crunchyroll-master-catalog/default/dwe0c8a6d3/rightstuf/9781421525822_manga-Naruto-Graphic-Novel-Box-Set-1-27-primary.jpg",
          category: "Manga & Books",
          stock: 10,
        },
      ],
    });
    console.log("Database is seeded.");
  } catch (error) {
    console.error(error);
  }
}

// Seed the database if we are running this file directly.
if (require.main === module) {
  seedData();
}

module.exports = seedData;

function multiplyNumbers(banna, water, onions) {
  banna * water * onions;
}

console.log(multiplyNumbers(1, 4, 5));
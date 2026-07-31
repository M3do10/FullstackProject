import mongoose from "mongoose";
import { productModel } from "./db/models/product.model.js";
const sampleProducts = [
    // Electronics (15)
    { name: "Wireless Bluetooth Headphones", description: "Noise-cancelling over-ear headphones with 30hr battery life", price: 89.99, category: "Electronics", stock: 50, image: "https://us.sennheiser-hearing.com/cdn/shop/files/M5_Black_Main_IsoFront.jpg?v=1776463846" },
    { name: "Smart Watch Pro", description: "Fitness tracker with heart rate monitor and GPS", price: 199.99, category: "Electronics", stock: 30, image: "https://www.elshennawy.com/image/cache/catalog/2330/Oraimo-SMART-WATCH-6R-OSW-8231-800x800.jpg" },
    { name: "Portable Bluetooth Speaker", description: "Waterproof speaker with 360-degree sound", price: 49.99, category: "Electronics", stock: 100, image: "https://www.sencor.com/getmedia/6770caad-d0be-4d0d-b5f0-01bbc4c1c555/35059169.jpg.aspx?width=2100&height=2100&ext=.jpg" },
    { name: "USB-C Fast Charger", description: "20W GaN charger with dual ports", price: 29.99, category: "Electronics", stock: 200, image: "https://miamicenters.com/wp-content/uploads/2025/11/anker-zolo-20w.webp" },
    { name: "Wireless Mouse", description: "Ergonomic wireless mouse with silent clicks", price: 24.99, category: "Electronics", stock: 150, image: "https://resource.logitech.com/w_544,h_466,ar_7:6,c_pad,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/2025-update/mx-master-3s-bluetooth-edition-top-view-black-new-1.png" },
    { name: "Mechanical Gaming Keyboard", description: "RGB backlit tactile mechanical switches with detachable cable", price: 79.99, category: "Electronics", stock: 40, image: "https://resource.logitech.com/w_416,h_312,ar_4:3,c_pad,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/pro-x60-wireless-keyboard/layouts/pro-x-60-top-hero-gallery-black-deu.png" },
    { name: "Ultra-Wide Monitor 27-inch", description: "IPS display with 144Hz refresh rate", price: 329.99, category: "Electronics", stock: 20, image: "https://hp.widen.net/content/mhca8kbdun/png/mhca8kbdun.png?w=800&h=600&dpi=72&color=ffffff00" },
    { name: "HD Web Camera 1080p", description: "Streaming webcam with dual noise-reducing microphones", price: 59.99, category: "Electronics", stock: 75, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUheaEYq5A6Lcaf_6bAXHlUlriHVUo7w0Y2w&s" },
    { name: "Noise-Cancelling Earbuds", description: "True wireless in-ear headphones with wireless charging case", price: 119.99, category: "Electronics", stock: 65, image: "https://myxprs.com/cdn/shop/files/Anker_Soundcore_P30i_blue.jpg?v=1779717810&width=2048" },
    { name: "External Solid State Drive 1TB", description: "High-speed SSD", price: 109.99, category: "Electronics", stock: 55, image: "https://www.sandisk.com/content/dam/store/en-us/assets/products/internal-storage/ssd-plus-sata-iii-ssd/gallery/ssd-plus-sata-iii-ssd-left.png.wdthumb.1280.1280.png" },
    { name: "Wireless Charging Pad", description: "Qi-certified 15W fast charging stand for smartphones", price: 19.99, category: "Electronics", stock: 180, image: "https://png.pngtree.com/png-vector/20260517/ourmid/pngtree-wireless-charging-pad-png-image_19321127.webp" },
    { name: "Smart Home Security Camera", description: "1080p indoor Wi-Fi camera with night vision and two-way audio", price: 39.99, category: "Electronics", stock: 90, image: "https://www.iegeek.com/cdn/shop/files/17_8919d1e9-ada0-4347-9545-7734f48e9d19.png?v=1766224466&width=1920" },
    { name: "Gaming Headset 7.1 Surround", description: "Wired gaming headset with detachable mic and memory foam ear pads", price: 69.99, category: "Electronics", stock: 45, image: "https://tv-it.com/storage/salma/oct-pic-1-10-2024/headset/logitech-headset-prox2-6.webp" },
    { name: "USB USB-C Multiport Hub", description: "4-in-1 adapter", price: 34.99, category: "Electronics", stock: 130, image: "https://m.media-amazon.com/images/I/61CFiwFj3KL.jpg" },
    { name: "Smart Digital Stylus Pen", description: "Precision active stylus for tablets with palm rejection", price: 44.99, category: "Electronics", stock: 85, image: "https://www.targus.com/content/images/thumbs/0017938_targus-2-in-1-pen-stylus-for-all-touchscreen-devices-black.jpeg" },

    // Clothing
    { name: "Classic Cotton T-Shirt", description: "Soft 100% cotton crew neck t-shirt", price: 19.99, category: "Clothing", stock: 300, image: "https://i5.walmartimages.com/seo/T-Shirts-for-Men-Gildan-2000-S-M-L-XL-2XL-3XL-Classic-Short-Sleeve-Shirt-Best-Gifts-for-Men-Cotton-Tee_b41bd905-f204-4666-8b42-140387381a0b.32043a79df9d2166b1ed7b576bda9e21.jpeg" },
    { name: "Running Sneakers", description: "Lightweight breathable running shoes", price: 79.99, category: "Clothing", stock: 80, image: "https://topshoes.store/cdn/shop/files/rn-image_picker_lib_temp_adccc6a5-c00d-4f39-9a60-4e0c9f3579ba.jpg?v=1780661335&width=500" },
    { name: "Winter Hoodie", description: "Fleece-lined zip-up hoodie for cold weather", price: 39.99, category: "Clothing", stock: 90, image: "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/59/2031431/1.jpg?6143" },
    { name: "Waterproof Rain Jacket", description: "Windproof lightweight coat with hood and zippered pockets", price: 64.99, category: "Clothing", stock: 65, image: "https://satisfyrunning.com/cdn/shop/files/5270-BK_pertex-3L-fly-rain-jacket_black_front2_db969e72-8adf-4c93-8827-4621511904f8.jpg?v=1701969962&width=2000" },
    { name: "Casual Denim Jacket", description: "Timeless trucker-style denim jacket with button closure", price: 59.99, category: "Clothing", stock: 50, image: "https://mobaco.com/wp-content/uploads/2025/04/LH237_918C_1.jpg" },
    { name: "Merino Wool Sweater", description: "Classic crewneck lightweight wool sweater", price: 69.99, category: "Clothing", stock: 45, image: "https://m.media-amazon.com/images/I/61jYaoKvuJL._AC_UY1000_.jpg" },
    { name: "Casual Chino Pants", description: "Slim-fit stretch chino trousers for daily wear", price: 44.99, category: "Clothing", stock: 100, image: "https://onyuclothing.com/cdn/shop/files/IMG_08971.jpg?v=1781682068&width=2000" },
    { name: "Leather Casual Belt", description: "100% genuine full-grain leather belt", price: 29.99, category: "Clothing", stock: 160, image: "https://m.media-amazon.com/images/I/41KE5w4NdvL._SS500_.jpg" },
    { name: "Puffer Winter Vest", description: "Insulated sleeveless zip jacket with fleece collar", price: 49.99, category: "Clothing", stock: 70, image: "https://m.media-amazon.com/images/I/61qwQVWtsCL._AC_UY1000_.jpg" },
    { name: "Classic Polo Shirt", description: "Breathable piqué cotton short-sleeve polo shirt", price: 29.99, category: "Clothing", stock: 130, image: "https://cdn-images.farfetch-contents.com/13/63/94/34/13639434_16416004_600.jpg" },

    // Books
    { name: "JavaScript: The Good Parts", description: "A guide to the best features of JavaScript", price: 29.99, category: "Books", stock: 60, image: "https://www.oreilly.com/covers/urn:orm:book:9781491924471/296w/?format=webp" },
    { name: "Clean Code", description: "A handbook of agile software craftsmanship by Robert C. Martin", price: 34.99, category: "Books", stock: 45, image: "https://m.media-amazon.com/images/I/71nj3JM-igL._AC_UF1000,1000_QL80_.jpg" },
    { name: "The Pragmatic Programmer", description: "Your journey to mastery in software development", price: 39.99, category: "Books", stock: 55, image: "https://m.media-amazon.com/images/I/71-JF4KWbaL._AC_UF350,350_QL50_.jpg" },
    { name: "Refactoring", description: "Improving the design of existing code by Martin Fowler", price: 42.99, category: "Books", stock: 50, image: "https://martinfowler.com/books/refactoringDatabases.jpg" },
    { name: "Structure and Interpretation of Computer Programs", description: "Foundational concepts of computer science and Lisp", price: 54.99, category: "Books", stock: 25, image: "https://m.media-amazon.com/images/I/71BBXQnykuL._AC_UF1000,1000_QL80_.jpg" },
    { name: "Introduction to Algorithms (CLRS)", description: "Comprehensive coverage of modern algorithms and analysis", price: 79.99, category: "Books", stock: 30, image: "https://m.media-amazon.com/images/I/61Pgdn8Ys-L._AC_UF1000,1000_QL80_.jpg" },
    { name: "Site Reliability Engineering", description: "How Google runs production systems", price: 38.99, category: "Books", stock: 40, image: "https://lh3.googleusercontent.com/JvM0JKKuZNJMWAC5iZPm4j-mdS9ORpZbpEWzg0zmJ0i2_xgIcju0OLXJ-zmnvz_GtFFGHe9qZ9Dz-6W0u5fRLFQaRlOI_hGzbetw=rw" },
    { name: "Grokking Algorithms", description: "An illustrated guide for programmers and curious people", price: 31.99, category: "Books", stock: 80, image: "https://m.media-amazon.com/images/I/81BdMC18EUL._AC_UF1000,1000_QL80_.jpg" },
    { name: "Cracking the Coding Interview", description: "189 programming questions and solutions for software engineer roles", price: 36.99, category: "Books", stock: 90, image: "https://m.media-amazon.com/images/I/61yZSqvmJmL._AC_UF1000,1000_QL80_.jpg" },
    { name: "Atomic Habits", description: "An easy and proven way to build good habits and break bad ones", price: 21.99, category: "Books", stock: 120, image: "https://m.media-amazon.com/images/I/81kg51XRc1L._AC_UF1000,1000_QL80_.jpg" },
    { name: "System Design Interview – An Insider's Guide", description: "Step-by-step framework to master system design interviews", price: 37.99, category: "Books", stock: 65, image: "https://m.media-amazon.com/images/I/51vZ6t5W4gL._AC_UF1000,1000_QL80_.jpg" },

    // Home
    { name: "Ceramic Coffee Mug", description: "Set of 4 handcrafted ceramic mugs, 350ml each", price: 24.99, category: "Home", stock: 70, image: "https://elliehome.com/cdn/shop/files/DSC00369.jpg?v=1733921982" },
    { name: "LED Desk Lamp", description: "Adjustable brightness desk lamp with USB charging port", price: 34.99, category: "Home", stock: 85, image: "https://i5.walmartimages.com/seo/LEPOWER-Metal-Desk-Lamp-Adjustable-Gooseneck-Reading-Lamp-for-Home-Office-Bedroom-Black_dceb4fc3-9837-41a0-8823-f4e1fe0847dc.d49bfcf145da1e14ed52d27fbf5457c8.jpeg" },
    { name: "Throw Pillow Covers", description: "Set of 2 velvet cushion covers 45x45cm", price: 15.99, category: "Home", stock: 130, image: "https://forbed.com/cdn/shop/files/2_daff228a-598c-4563-8317-f2b3c4e1b961.jpg?v=1751959965" },
    { name: "Air Purifier HEPA", description: "Compact quiet air purifier for home and office spaces", price: 89.99, category: "Home", stock: 40, image: "https://miamicenters.com/wp-content/uploads/2025/07/powerology-600x600.png" },
    { name: "French Press Coffee Maker", description: "Heat-resistant borosilicate glass press, 1 Liter", price: 21.99, category: "Home", stock: 95, image: "https://www.ikea.com/us/en/images/products/upphetta-french-press-coffee-maker-glass-stainless-steel__0711267_pe728105_s5.jpg?f=s" },
    { name: "Non-Stick Cookware Set", description: "10-piece aluminum pot and pan set with glass lids", price: 119.99, category: "Home", stock: 30, image: "https://m.media-amazon.com/images/I/71w9Fk94wYL._AC_SX679_.jpg" },
    { name: "Bamboo Cutting Board Set", description: "Set of 3 eco-friendly wooden cutting boards with juice grooves", price: 27.99, category: "Home", stock: 105, image: "https://m.media-amazon.com/images/I/71x84Vg3EmL.jpg" },
    { name: "Electric Gooseneck Kettle", description: "1.0L stainless steel pour-over kettle with temperature control", price: 45.99, category: "Home", stock: 60, image: "https://be.fresh.com.eg/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/f/r/fresh_kettle_-_esk17154_-_1.7_liters_stainless.png" },
    { name: "Digital Kitchen Scale", description: "Precision food scale with tempered glass platform", price: 14.99, category: "Home", stock: 150, image: "https://cdn.mafrservices.com/pim-content/EGY/media/product/517207/1745145003/517207_main.jpg" },

    // Sports 
    { name: "Yoga Mat Premium", description: "Non-slip 6mm thick exercise mat with carrying strap", price: 29.99, category: "Sports", stock: 95, image: "https://www.intersport.com.eg/cdn/shop/files/420630-blacka_png-YogaMat.png?v=1707748444&width=2048" },
    { name: "Resistance Bands Set", description: "Set of 5 bands with different resistance levels", price: 19.99, category: "Sports", stock: 140, image: "https://www.benz-sport.com/164729-large_default/theraband-high-resistance-band-set-of-4.jpg" },
    { name: "Stainless Steel Water Bottle", description: "Insulated 750ml bottle keeps drinks cold 24hrs", price: 22.99, category: "Sports", stock: 160, image: "https://tankwaters.com/cdn/shop/files/preview_images/71001137dbd741faa22e431d063952bf.thumbnail.0000000000_630x.jpg?v=1707820975" },
    { name: "Jump Rope Speed", description: "Adjustable steel cable speed rope for cardio training", price: 12.99, category: "Sports", stock: 180, image: "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/67/0856331/1.jpg?6173" },
    { name: "Cycling Gloves Half Finger", description: "Padded shock-absorbing gloves for road and mountain biking", price: 16.99, category: "Sports", stock: 125, image: "https://nwscdn.com/media/catalog/product/cache/h900xw900/w/a/waterproof-thermal-sports-grip_glove----front-and-back_9.jpg" },
    { name: "Ab Roller Wheel", description: "Core workout equipment with knee pad cushion", price: 17.99, category: "Sports", stock: 130, image: "https://fitnessequipmentireland.ie/wp-content/uploads/2019/10/Ab-Wheel-3.jpg" },
    { name: "Kettlebell 15lb", description: "Cast iron kettlebell with wide comfortable grip", price: 34.99, category: "Sports", stock: 65, image: "https://www.marbo-sport.pl/data/gfx/pictures/large/9/1/29819_1.jpg" },
    { name: "Pull-Up Bar Doorway", description: "Heavy-duty chin-up bar with no-screw installation", price: 39.99, category: "Sports", stock: 50, image: "https://k-sport-uk.co.uk/cdn/shop/files/stand-alone-portable-pull-up-bar-01.jpg?v=1781130130&width=1946" },

];
async function seedProducts() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/EcommerceWEB")
        console.log("db connected for seeding")

        // Clear existing products
        await productModel.deleteMany({})
        console.log("cleared existing products")

        // Insert sample products
        let inserted = await productModel.insertMany(sampleProducts)
        console.log(`✅ Successfully seeded ${inserted.length} products`)

        await mongoose.disconnect()
        console.log("db disconnected")
    } catch (err) {
        console.error("❌ Seeding failed:", err.message)
        process.exit(1)
    }
}

seedProducts()

import "dotenv/config";
import Product from "./src/models/Product.js";
import Category from "./src/models/Category.js";
import { categoriesData, productData } from "./seedData.js";
import connectDB from "./src/config/db.js";
import { MONGO_URI } from "./src/config/config.js";

const seeder = async () => {
  try {
    await connectDB(MONGO_URI);
    await Category.deleteMany();
    await Product.deleteMany();
    console.log("Database Removed Successfully ❌");

    const categoriesDataset = await Category.insertMany(categoriesData);

    const categoryMap = categoriesDataset.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    });

    const productWithCategoryId = productData.map((product) => ({
      ...product,
      category: categoryMap[product.category],
    }));

    await Product.insertMany(productWithCategoryId);
    console.log("Database Added Successfully ✅");

    process.exit();
  } catch (error) {
    console.log("Seeder Failed");
    process.exit();
  }
};

seeder();

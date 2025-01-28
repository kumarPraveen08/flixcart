import AdminJS from "adminjs";
import session from "express-session";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import { dark, light, noSidebar } from "@adminjs/themes";
import ConnectMongoDBSession from "connect-mongodb-session";

import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Transaction from "../models/Transaction.js";

AdminJS.registerAdapter(AdminJSMongoose);

const DEFAULT_ADMIN = {
  email: "praveen@email.com",
  password: "12345678",
};

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

// const authenticate = async (email, password) => {
//   if (email && password) {
//     const user = await User.findOne({ email });
//     if (user) {
//       if (user.password === password) {
//         return Promise.resolve({ email: email, password: password });
//       } else {
//         return null;
//       }
//     } else {
//       return null;
//     }
//   } else {
//     return null;
//   }
// };

export const buildAdminJS = async (app) => {
  const admin = new AdminJS({
    resources: [
      { resource: Product },
      { resource: User },
      { resource: Category },
      { resource: Transaction },
      { resource: Order },
    ],
    branding: {
      companyName: "Flipkart",
      withMadeWithLove: false,
    },
    defaultTheme: dark.id,
    availableThemes: [dark, light, noSidebar],
    rootPath: "/admin",
  });

  const MongoDBStore = ConnectMongoDBSession(session);
  const sessionStore = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "sessions",
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: "adminjs",
      cookiePassword: process.env.COOKIE_PASSWORD,
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: process.env.COOKIE_PASSWORD,
      cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      },
      name: "adminjs",
    }
  );
  app.use(admin.options.rootPath, adminRouter);
};

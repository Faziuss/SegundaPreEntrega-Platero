import { Router } from "express";
import Products from "../dao/fileManager/dbManagers/products.js";
import Carts from "../dao/fileManager/dbManagers/carts.js";

const router = Router();
const managerProducts = new Products();
const managerCarts = new Carts();

const publicAccess = (req, res, next) => {
  if (req.session.user) return res.redirect("/");

  next();
};

const privateAcess = (req, res, next) => {
  if (!req.session.user) {
    console.log("not logged in");
    return res.redirect("/login");
  }

  next();
};

router.get("/", privateAcess, async (_req, res) => {
  const products = await managerProducts.getProducts();

  return res.render("home", { products });
});

router.get("/realTimeProducts", privateAcess, async (_req, res) => {
  const products = await managerProducts.getProducts();

  return res.render("realTimeProducts", { products });
});

router.get("/chat", privateAcess, async (_req, res) => {
  return res.render("chat", {});
});

router.get("/products", privateAcess, async (req, res) => {
  const { docs, ...rest } = await managerProducts.getProductsApi(req.query);

  const products = docs;

  return res.render("products", { products, ...rest, user: req.session.user });
});

router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;

  const result = await managerCarts.getCartById(cid);

  const carts = result.products;

  return res.render("carts", { carts: carts.map((item) => item.toJSON()) });
});

router.get("/register", publicAccess, (_req, res) => {
  res.render("register");
});

router.get("/login", publicAccess, (_req, res) => {
  res.render("login");
});

export default router;

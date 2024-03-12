import { Router } from "express";
import Products from "../dao/fileManager/dbManagers/products.js";
import Carts from "../dao/fileManager/dbManagers/carts.js";

const router = Router();
const managerProducts = new Products();
const managerCarts = new Carts();

router.get("/", async (_req, res) => {
  const products = await managerProducts.getProducts();

  return res.render("home", { products });
});

router.get("/realTimeProducts", async (_req, res) => {
  const products = await managerProducts.getProducts();

  return res.render("realTimeProducts", { products });
});

router.get("/chat", async (_req, res) => {
  return res.render("chat", {});
});

router.get("/products", async (req, res) => {
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

router.get("/register", (_req,res)=>{
  res.render('register')
})

router.get("/login", (_req,res)=>{
  res.render('login')
})

export default router;

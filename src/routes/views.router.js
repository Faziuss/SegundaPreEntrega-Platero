import { Router } from "express";
import publicAccess from "../middlewares/publicAcess.js";
import privateAcess from "../middlewares/privateAcess.js";
import ViewsController from "../controllers/views.controller.js";

const router = Router();

router.get("/", privateAcess, ViewsController.getHomeProducts);

router.get(
  "/realTimeProducts",
  privateAcess,
  ViewsController.getRealTimeProducts
);

router.get("/chat", privateAcess, ViewsController.chat);

router.get("/products", privateAcess, ViewsController.getProducts);

router.get("/carts/:cid", privateAcess, ViewsController.getCart);

router.get("/register", publicAccess, ViewsController.register);

router.get("/login", publicAccess, ViewsController.login);

export default router;

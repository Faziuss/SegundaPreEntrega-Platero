import { Router } from "express";
import userModel from "../dao/fileManager/models/user.model.js";
import { AppError } from "../helpers/AppError.js";

const sessionRouter = Router();

sessionRouter.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  if (!first_name || !last_name || !email || !age || !password) {
    throw new AppError(400, { message: "Missing data" });
  }

  await userModel.create({
    first_name,
    last_name,
    email,
    age,
    password,
  });

  res.status(201).send({ status: "sucess", message: "Usuario Registrado" });
});

sessionRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(400, { message: "Missing data" });
  }

  const user = await userModel.findOne({ email, password });
  if (!user) {
    throw new AppError(401, { message: "Credenciales incorrectas" });
  }

  req.session.user = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age,
    roles: user.roles,
  };
  res.status(201).send({
    status: "sucess",
    payload: req.session.user,
    message: "Logeado Correctamente",
  });
});

sessionRouter.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err)
      throw new AppError(500, {
        message: "Hubo un error al intentar destruir la session",
      });
  });
  res.redirect("/login");
});

export default sessionRouter;

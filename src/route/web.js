import express from "express";
import homeCotroller from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeCotroller.getHomePage);
  router.get("/about", homeCotroller.getAbout);
  router.get("/huy", (req, res) => {
    return res.send("duong dinh huy");
  });
  return app.use("/", router);
};
module.exports = initWebRoutes;

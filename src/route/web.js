import express from "express";
import homeCotroller from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeCotroller.getHomePage);
  router.get("/about", homeCotroller.getAbout);
  router.get("/crud", homeCotroller.getcrud);

  router.post("/postcrud", homeCotroller.postCrud);

  router.post("/put-crud", homeCotroller.putCrud);
  router.get("/delete-crud", homeCotroller.DeleteCRUD);

  router.get("/get-crud", homeCotroller.displayCRUD);
  router.get("/edit-crud", homeCotroller.getEditCRUD);

  router.get("/huy", (req, res) => {
    return res.send("duong dinh huy");
  });
  return app.use("/", router);
};
module.exports = initWebRoutes;

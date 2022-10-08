import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log("-----------------------");
    console.log(data);
    return res.render("homePage.ejs", { data: JSON.stringify(data) });
  } catch (e) {
    console.log(e);
  }
};
let getAbout = (req, res) => {
  return res.render("test/about.ejs");
};
let getcrud = (req, res) => {
  // return res.send("get crud with huy"); //keim tra xem da chay den file chua
  return res.render("crud.ejs");
};
let postCrud = async (req, res) => {
  // return res.send("get crud with huy");
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  // console.log(req.body);
  return res.send("get crud with huy");
};
module.exports = {
  getHomePage: getHomePage,
  getAbout: getAbout,
  getcrud: getcrud,
  postCrud: postCrud,
};

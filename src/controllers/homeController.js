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
let displayCRUD = async (req, res) => {
  // return res.send("display get crud");
  let data = await CRUDService.getAllUser();
  // console.log("------------------");
  // console.log(data);
  // console.log("------------------");
  // return res.send("display get crud");
  return res.render("displayCRUD.ejs", { dataTable: data });
};
let postCrud = async (req, res) => {
  // return res.send("get crud with huy");
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  // console.log(req.body);
  return res.send("psst");
};
let getEditCRUD = async (req, res) => {
  // console.log(req.query.id);
  let userId = req.query.id;
  console.log(userId);
  if (userId) {
    let userData = await CRUDService.getUserInfoByID(userId);
    // console.log("-------------------");
    // console.log(userData);
    // console.log("-------------------");
    return res.render("editCRUD.ejs", { getUser: userData });
  } else {
    return res.send("users not found!");
  }
};
let putCrud = async (req, res) => {
  let data = req.body;
  console.log(data);
  let allUser = await CRUDService.updateUserData(data);
  return res.render("displayCRUD.ejs", { dataTable: allUser });
};

let DeleteCRUD = async (req, res) => {
  let id = req.query.id;
  console.log("-----------------------");
  console.log(id);
  console.log("-----------------------");
  let deleteuser = await CRUDService.DeleteCRUD(id);
  return res.render("displayCRUD.ejs", { dataTable: deleteuser });
};
module.exports = {
  getHomePage: getHomePage,
  getAbout: getAbout,
  getcrud: getcrud,
  postCrud: postCrud,
  displayCRUD: displayCRUD,
  getEditCRUD: getEditCRUD,
  putCrud: putCrud,
  DeleteCRUD: DeleteCRUD,
};

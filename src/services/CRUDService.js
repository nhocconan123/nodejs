import bcrypt from "bcryptjs";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcryot = await hasUserPassword(data.password);
      //   console.log(hashPasswordFromBcryot);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcryot,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });
      resolve("ok create sucess");
    } catch (e) {
      reject(e);
    }
  });

  //   console.log("data from server");
  //   console.log(data);
};
let hasUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      //   console.log(hashPassword);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
};

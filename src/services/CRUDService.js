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
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
let getUserInfoByID = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        resolve(user);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};

//update User
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;

        await user.save();
        let alluser = await db.User.findAll();
        resolve(alluser);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
//delete User
let DeleteCRUD = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User;
      await user.destroy({
        where: { id: userId },
      });
      // let user = await db.User.findOne({
      //   where: { id: userId },
      // });
      // if (user) {
      //   await user.distroy();
      // }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoByID: getUserInfoByID,
  updateUserData: updateUserData,
  DeleteCRUD: DeleteCRUD,
};

const User = require("./../models/user");
const UserPoolRole = require("./../models/UserPoolRole");

exports.addUsertoDb =  (user) => {
  const userId = User.create({
    name: user.name,
    surname: user.surname,
    username: user.username,
    mail: user.mail,
    password: user.password,
  })
    .then((result) => {
      console.log("User add successfully.");
      return result?.dataValues?.id;
    })
    .catch((err) => {
      console.log(err);
    });
    return new Promise((resolve,reject) => {
        return resolve(userId);
    });
};

exports.addPoolUserRole = (roleId,poolId,userId) => {
   const query = UserPoolRole.create({
        userId:userId,
        roleId:roleId,
        poolId:poolId
    })
    .then((result) => {
      console.log("UserPoolRole add successfully.");
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
    return new Promise((resolve,reject) => {
        return resolve(query);
    });
};
const bcrypt = require("bcrypt");
const userRepository = require("./../repository/userRepository");
const Joi = require("joi");
require('dotenv').config();
const jwt = require('jsonwebtoken');

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  surname: Joi.string().min(3).max(30).required(),
  mail: Joi.string()
    .required()
    .email()
    .external(async (mail) => {
      const isMailUse = await userRepository.getUserByMail(mail);
      console.log("isMailUse:", isMailUse);
      if (isMailUse) {
        console.log("geldi");
        throw new Error('Email in use');
      }
      return mail;
    }),
  password: Joi.string().min(6).required(),
  username: Joi.allow(),
  pools_roles: Joi.allow(),
});

exports.addUser = async (req, res, next) => {
  const user = req.body;
  console.log("user:", user);
  const poolRoles = user.pools_roles;
  console.log("poolRoles:", poolRoles);
  try {
    const value = await userSchema.validateAsync(user);
    console.log("value:", value);
    user.password = await bcrypt.hash(user.password, 10);

    const userId = await userRepository.addUsertoDb(user);
    console.log("userId:", userId);
    if (poolRoles && poolRoles.length > 0) {
      poolRoles.map(async (poolRole) => {
        console.log("poolRole:", poolRole);
        if (poolRole.pool_id != null && poolRole.role_id != null) {
          await userRepository.addPoolUserRole(
            poolRole.role_id,
            poolRole.role_id,
            userId
          );
        }
      });
    }

    return res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.login = async (req,res,next) => {
  const email=req.body.email;
  const password = req.body.password;

  const user = await userRepository.getUserByMail(email);
 
  if(!user) return res.status(400).send('Cannot find user.');

  const comparePassword = await bcrypt.compare(password,user.password).then((result) => {
    return result;
  });
  console.log('comparePassword:',comparePassword);

  if(comparePassword=== true){
    const accessToken = jwt.sign({email:user.mail,username:user.username},process.env.JWT_SECRET,{
      expiresIn:process.env.JWT_EXPIRES_IN
    });

    const refreshToken = jwt.sign({email:user.mail,username:user.username},process.env.JWT_RENEW);
    return res.json({
      name: user['name'],
      userId: user['id'],
      email: user['mail'],
      username: user['username'],
      token: { accessToken: accessToken, refreshToken: refreshToken },
    })
  }

  res.status(401).json({
    status:'error',
    message:'Wrong password'
  })


}



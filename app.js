const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./utils/db");
const User = require("./models/user");
const Role = require("./models/role");
const Pool = require("./models/Pool");
const UserPoolRole = require("./models/UserPoolRole");
const userRouter = require("./routes/userRoutes");
const app = express();
const port = 3000;
//middlewares
app.use(express.json());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Routes
app.use('/users',userRouter);

//Associations models
User.belongsToMany(Role,{through:'user-pool-role'});
User.belongsToMany(Pool,{through:'user-pool-role'});

//sequelize
sequelize
  .sync()
  //.sync({ force: true })
  //  .then(() => {
  //    User.create({
  //      name: "Toprak",
  //      surname: "Tüzün",
  //      username: "toprak17",
  //      mail: "toprak17@test.com",
  //      password: "123456",
  //    });
  //  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is started on ${port}`);
    });
  })
  .catch((err) => console.log(err));

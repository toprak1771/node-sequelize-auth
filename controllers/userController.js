const bcrypt = require("bcrypt");
const userRepository = require("./../repository/userRepository");

exports.addUser = async (req, res, next) => {
  const user = req.body;
  console.log("user:", user);
  const poolRoles = user.pools_roles;
  console.log("poolRoles:", poolRoles);

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

  res.status(200).json({
    status:"success",
    user,
  });
};

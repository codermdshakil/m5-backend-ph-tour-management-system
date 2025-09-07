import bcryptjs from "bcryptjs";
import { envVars } from "../config/env";
import { IAuthProvider, IUser, Role } from "../modules/User/user.interface";
import { User } from "../modules/User/user.model";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });

    if (isSuperAdminExist) {
      console.log("Super admin already exit!");
      return;
    }

    console.log("Trying to create Super Admin...\n");

    const hashPassword = await bcryptjs.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      parseInt(envVars.BCRYPT_SALT_ROUND)
    );

    // provider
    const authProvider: IAuthProvider = {
      provider: "credentials",
      providerId: envVars.SUPER_ADMIN_EMAIL,
    };

    // super admin payload
    const payload: IUser = {
      name: "Super Admin",
      role: Role.SUPER_ADMIN,
      email: envVars.SUPER_ADMIN_EMAIL,
      isVerified: true,
      password: hashPassword,
      auths: [authProvider],
    };

    const superAdmin = await User.create(payload);
    console.log("Super Admin created Successfully!!!\n");
    console.log(superAdmin, "super admin\n");
  } catch (error) {
    console.log(error);
  }
};

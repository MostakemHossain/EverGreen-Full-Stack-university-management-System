import config from '../app/config';
import { USER_ROLE } from '../app/modules/user/user.constant';
import { User } from '../app/modules/user/user.model';

const superUser = {
  id: '0001',
  email: config.super_admin_email,
  password: config.super_admin_password,
  role: USER_ROLE.superAdmin,
  needsPasswordChange: false,
  status: 'in-progress',
  isDeleted: 'false',
};

const seedsSuperAdmin = async () => {
  const isSuperAdminExists = await User.findOne({ role: USER_ROLE.superAdmin });
  if (!isSuperAdminExists) {
    await User.create(superUser);
  }
};
export default seedsSuperAdmin;

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_access_serect: process.env.JWT_ACCESS_SERECT,
  jwt_refresh_serect:process.env.JWT_REFRESH_SERECT,
  jwt_access_serect_expires_in:process.env.JWT_ACCESS_SERECT_EXPIRES_IN,
  jwt_refresh_serect_expires_in:process.env.JWT_REFRESH_SERECT_EXPIRES_IN,
  reset_password_ui_link:process.env.RESET_PASSWORD_UI_LINK

};

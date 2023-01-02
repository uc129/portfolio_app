/** @format */
import bcrypt from 'bcrypt';
 const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds).then((hash: any) => hash);
};

 export default hashPassword;


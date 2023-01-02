/** @format */
import { User } from '../database/models/user.model';
export async function createUser(user_data: any) {
  let user = '';
  if (user_data) {
    user = await User.create(user_data)
      .then((res: any) => console.log(res))
      .then((res: any) => (user = res))
      .catch((err: any) => console.log(err));
  } else user = 'User Data undefined';

  return user;
}

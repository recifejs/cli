import { Type } from 'recife';

@Type()
class UserModel {
  name!: String;
  email!: String;
  username!: String;
}

export default UserModel;

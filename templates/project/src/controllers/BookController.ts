import { Query, Mutation } from 'recife';

import UserModel from '../models/UserModel';
import { UserForm, UserDelete } from '../inputs/UserInput';

class UserController {
  @Query()
  getUser(): UserModel {
    const user = new UserModel();
    user.name = 'Quaco Cainr';
    user.email = 'quacocainr@email.com';
    user.username = 'quacocainr';

    return user;
  }

  @Mutation()
  createUser(input: UserForm): UserModel {
    const user = new UserModel();
    user.name = input.name;
    user.email = input.email;
    user.username = input.username;

    return user;
  }

  @Mutation()
  updateUser(input: UserForm): UserModel {
    const user = new UserModel();
    user.name = input.name;
    user.email = input.email;
    user.username = input.username;

    return user;
  }

  @Mutation()
  deleteUser(input: UserDelete): boolean {
    return true;
  }
}

export default UserController;

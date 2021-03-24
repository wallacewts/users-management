import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser = new User();

    Object.assign(newUser, {
      name,
      email,
    });
    this.users.push(newUser);

    return newUser;
  }

  findById(id: string): User | undefined {
    const findedUser = this.users.find(
      (userInterator) => userInterator.id === id
    );

    return findedUser;
  }

  findByEmail(email: string): User | undefined {
    const findedUser = this.users.find(
      (userInterator) => userInterator.email === email
    );

    return findedUser;
  }

  turnAdmin(receivedUser: User): User {
    const findedUser = this.users.find(
      (userInterator) => userInterator.id === receivedUser.id
    );
    findedUser.admin = true;

    return findedUser;
  }

  list(): User[] {
    return [...this.users];
  }
}

export { UsersRepository };

import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    this.verifyIfEmailAlreadyExists(email);

    const createdUser = this.usersRepository.create({ name, email });

    return createdUser;
  }

  verifyIfEmailAlreadyExists(email: string): void {
    const userAlreadyExists = this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("E-mail already exists");
    }
  }
}

export { CreateUserUseCase };

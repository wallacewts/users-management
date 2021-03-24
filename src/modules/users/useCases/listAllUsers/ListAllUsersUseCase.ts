import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    this.verifyIfUserIsAnAdmin(user_id);

    const users = this.usersRepository.list();

    return users;
  }

  verifyIfUserIsAnAdmin(user_id: string): void {
    const findedUser = this.usersRepository.findById(user_id);

    if (!findedUser.admin) {
      throw new Error("Not authorized");
    }
  }
}

export { ListAllUsersUseCase };

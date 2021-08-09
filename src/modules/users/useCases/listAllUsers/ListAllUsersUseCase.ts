import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  execute({ user_id }: IRequest): User[] {
    const userLogged = this.usersRepository.findById(user_id);
    const isAdmin = this.usersRepository.isAdmin(userLogged);
    if (!isAdmin) {
      throw new Error("Não é admin");
    }
    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };

import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  execute({ email, name }: IRequest): User {
    const existed_user = this.usersRepository.findByEmail(email);
    if (existed_user) {
      throw new Error("Usuario já existe");
    }
    return this.usersRepository.create({ name, email });
  }
}

export { CreateUserUseCase };

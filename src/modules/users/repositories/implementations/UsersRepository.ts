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
    const user = new User();
    const userExist = this.users.find((user) => user.email === email);
    if (userExist) {
      throw new Error("Email already exists");
    }

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
    });

    this.users.push(user);
    return user;
  }

  findById(id: string): User | undefined {
    const userExist = this.users.find((user) => user.id === id);
    if (!userExist) {
      throw new Error("Usuario não encontrado");
    }
    return userExist;
  }

  findByEmail(email: string): User | undefined {
    const userExists = this.users.find((user) => user.email === email);
    return userExists;
  }

  turnAdmin(receivedUser: User): User {
    const user = this.findById(receivedUser.id);
    if (!user) {
      throw new Error("Usuario não encontrado");
    }
    user.admin = true;
    user.updated_at = new Date();

    return user;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };

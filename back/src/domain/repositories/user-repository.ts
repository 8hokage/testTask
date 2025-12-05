import { User } from "../entities/user";

export interface UserRepository {
  list(search?: string): Promise<User[]>;
  deleteById(id: string): Promise<void>;
}



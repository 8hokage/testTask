import { UserRepository } from "../../domain/repositories/user-repository";
import { User } from "../../domain/entities/user";

export class ListUsers {
  private readonly repo: UserRepository;
  constructor(repo: UserRepository) {
    this.repo = repo;
  }
  async execute(search?: string): Promise<User[]> {
    return this.repo.list(search);
  }
}



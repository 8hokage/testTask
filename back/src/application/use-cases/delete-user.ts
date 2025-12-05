import { UserRepository } from "../../domain/repositories/user-repository";

export class DeleteUser {
  private readonly repo: UserRepository;
  constructor(repo: UserRepository) {
    this.repo = repo;
  }
  async execute(id: string): Promise<void> {
    await this.repo.deleteById(id);
  }
}



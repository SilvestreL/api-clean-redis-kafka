export abstract class BaseEntity {
  public readonly id: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(id: string, createdAt?: Date, updatedAt?: Date) {
    this.id = id;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }

  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
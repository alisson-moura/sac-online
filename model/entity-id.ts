export class EntityId {
  private value: number | null;

  private constructor(value: number | null) {
    this.value = value;
  }

  public static create(value?: number) {
    if (value && !isNaN(value)) {
      return new EntityId(value);
    }

    return new EntityId(null);
  }

  public getValue(): number | null {
    return this.value;
  }

  public isNull(): boolean {
    return this.value === null;
  }
}

import Address from '../value-object/address';

export default class Customer {
  private readonly _id: string;
  private _name: string;
  private _active = false;
  private _address!: Address;
  private _rewardPoints = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get Address(): Address {
    return this._address;
  }

  set Address(address: Address) {
    this._address = address;
  }

  changeAddress(address: Address): void {
    this._address = address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate(): void {
    if (!this._id.length) {
      throw new Error('Id is required');
    }

    if (!this._name.length) {
      throw new Error('Name is required');
    }
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  isActive(): boolean {
    return this._active;
  }

  activate(): void {
    if (!this._address) {
      throw new Error('Address is mandatory to activate a customer');
    }
    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }

  addRewardPoints(points: number): void {
    this._rewardPoints += points;
  }
}

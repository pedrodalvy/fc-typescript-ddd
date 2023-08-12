import OrderItem from './order_item';

export default class Order {
  private readonly _id: string;
  private _customerId: string;
  private _items: OrderItem[];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  validate(): void {
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }

    if (this._customerId.length === 0) {
      throw new Error('CustomerId is required');
    }

    if (this._items.length === 0) {
      throw new Error('Items are required');
    }

    if (this._items.some(item => item.quantity <= 0)) {
      throw new Error('Quantity must be greater than 0');
    }
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }
}
import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface ProductAttributes extends BaseModelAttributes {
  id: string;
  description: string;
  name: string;
  created?: Date;
  modified?: Date;
}

export class ProductModel extends BaseModel<ProductAttributes> {
  constructor() {
    super('products');
  }
}

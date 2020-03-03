'use strict';
import {Table, Column, Model, BelongsTo, HasMany, ForeignKey, DataType} from 'sequelize-typescript';
import Product from "./product";

@Table({
  tableName: 'categories'
})
export default class Category extends Model<Category>{
  @Column(DataType.STRING)
  name: string;

  @ForeignKey(() => Category)
  @Column(DataType.INTEGER)
  parent_id?: number;

  @BelongsTo(() => Category)
  parent: Category;

  @HasMany(() => Category)
  children: Category[];


  @HasMany(() => Product)
  products: Product[];
}

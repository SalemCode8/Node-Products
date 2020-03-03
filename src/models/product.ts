'use strict';
import {Table, Column, Model, BelongsTo, ForeignKey, DataType} from 'sequelize-typescript';
import Category from "./category";
@Table({
    tableName: 'products'
})
export default class Product extends Model<Product> {

    @Column(DataType.STRING)
    name: string;

    @Column(DataType.STRING)
    image_uri: string;

    @ForeignKey(() => Category)
    @Column(DataType.INTEGER)
    category_id: number;

    @BelongsTo(() => Category)
    category: Category;
}

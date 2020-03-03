import express, {Router} from 'express';
import ProductController from '../controllers/products.controller';
import {body, check, checkSchema} from "express-validator";
import Category from "../models/category";

export const apiRouter = Router();

apiRouter.get('/products', ProductController.index);
apiRouter.post('/products',[
    check('name')
        .exists()
        .withMessage('Name is Required')
        .bail().isString().withMessage('Name Must be a String'),
    check('category_id')
        .exists()
        .withMessage('Category is Required')
        .bail()
        .isInt()
        .withMessage('Category Must be Numeric')
        .bail()
        .custom(function(value){
            return Category.findByPk(value).then(category => {
                if(!category){
                    return Promise.reject('Category Not Exists');
                }
            })
        })
], ProductController.store);
apiRouter.put('/products/:product', ProductController.update);
apiRouter.delete('/products/:product', ProductController.destroy);

import Category from "../models/category";
import {validationResult} from "express-validator";
import Product from "../models/product";

class CategoriesController{
    public async index(){
        return Category.findAll();
    }

    public async store(req, res){
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(422).json(result.array({onlyFirstError: true}));
        }
        const category = await Category.create({
           name: req.body.name,
           parent_id: req.body.parent_id
        });

        return res.json({
            status: true,
            message: 'Category Create Successfully',
            category: category
        });
    }

    public async update(req, res){
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(422).json(result.array({onlyFirstError: true}));
        }
        const category = await Category.findByPk(req.params.category);

        await category.update(req.body);

        return res.json({
            status: true,
            message: 'Category Updated Successfully',
            category
        })
    }

    public async destroy(req, res){
        const category: Category = await Category.findByPk(req.params.category);

        await category.destroy();

        return res.json({
            status: true,
            message: 'Category Deleted Successfully',
            category
        });
    }
}

export default new CategoriesController();

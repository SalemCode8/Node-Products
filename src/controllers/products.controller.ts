import Product from "../models/product";
import {validationResult} from "express-validator";
import {Request} from "express";

class ProductsController{
    public index(req, res){
        return res.json(Product.findAll());
    }

    public async store(req, res){
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(422).json(result.array({onlyFirstError: true}));
        }
        const product = await Product.create({
            name: req.body.name,
            category_id: req.body.category_id,
            image_uri: req.files.image
        });
        return res.json({
            status: true,
            message: 'Product Created Successfully'
        });
    }
    public async update(req: Request, res){
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(422).json(result.array({onlyFirstError: true}));
        }
        const product: Product = await Product.findByPk(req.params.product);
        await product.update(req.body);

        return res.json({
            status: true,
            message: 'Product Updated Successfully'
        });
    }

    public async destroy(req, res){
        const product: Product = await Product.findByPk(req.params.product);

        await product.destroy();

        return res.json({
            status: true,
            message: 'Product Deleted Successfully'
        });
    }
}

export default new ProductsController();

import Products from "../models/productModel";
import { APIfeatures } from "../lib/features";

const productCtr = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query)
      .paginating().sorting();
      console.log(features);
      

      const sort = req.query.sort || "-createdAt";
      const products = await features.query.sort(sort);
      return res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  getProduct: async (req, res) => {
    try {
      const product = await Products.findById(req.params.id);
      if (!product)
        return res.status(404).json({ msg: "This Product doesn't exist" });
      return res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  addProduct: async (req, res) => {
    try {
      const { title, description, price, category, image } = req.body;
      const newProduct = new Products({
        title,
        description,
        price,
        category,
        image,
      });
      await newProduct.save();

      return res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { title, description, price, category, image } = req.body;
      const product = await Products.findByIdAndUpdate(req.params.id, {
        title,
        description,
        price,
        category,
        image,
      });
      if (!product) {
        return res.status(404).json({ msg: "This Product doesn't exist" });
      }
      return res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await Products.findByIdAndDelete(req.params.id);

      if (!product) {
        return res.status(404).json({ msg: "This Product doesn't exist" });
      }
      return res.status(200).json({ msg: "Delete Success!" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

export default productCtr;

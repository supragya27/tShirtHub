const Category = require("../models/category")

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, ctg) => {
        if (err) {
            return res.status(400).json({
                error: "Category not found in database"
            })
        }
        req.category = ctg;
        next();
    })
}

exports.createCategory = (req, res) => {
    const category = new Category(req.body)
    Category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to save category in DB" //error handling can be further expanded
            })
        }
        res.json({ category })
    })
}
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
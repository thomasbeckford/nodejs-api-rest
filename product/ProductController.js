var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Product = require('./Product');

// CREATES A NEW PRODUCT
router.post('/', function (req, res) {
    Product.create({
            productName: req.body.productName,
            productCategory: req.body.productCategory,
            productDetail: req.body.productDetail,
            productPrice: req.body.productPrice
        }, 
        function (err, product) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send("New product created successfully");
        });
});

// RETURNS ALL THE PRODUCTS IN THE DATABASE
router.get('/', function (req, res) {
    Product.find({}, function (err, products) {
        if (err) return res.status(500).send("There was a problem finding the products.");
        if(isEmpty(products)) return res.status(200).send("No products found");
        res.status(200).send(products);
    });
});

// GETS A SINGLE PRODUCT FROM THE DATABASE
router.get('/:id', function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return res.status(500).send("There was a problem finding the product.");
        if (!product) return res.status(404).send("No PRODUCTs found in this database.");
        res.status(200).send(product);
    });
});

// DELETES A PRODUCT FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err, product) {
        if (err) return res.status(500).send("There was a problem deleting the product.");
        res.status(200).send("Product: "+ product.name +" was deleted.");
    });
});

// UPDATES A SINGLE PRODUCT IN THE DATABASE
router.put('/:id', function (req, res) {
    Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, product) {
        if (err) return res.status(500).send("There was a problem updating the product.");
        res.status(200).send(product);
    });
});

// CHECK IF THE ARRAY IS EMPTY
var isEmpty = function(obj) {
  return Object.keys(obj).length === 0;
}


module.exports = router;
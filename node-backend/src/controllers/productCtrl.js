const Product = require("../models/products");

exports.createProduct = async (req, res) => {
  const {
    ProductName,
    ProductId,
    ProductImageUrl,
    Price,
    Quantity,
    Status,
    _vpetclinic,
  } = req.body;

  try {
    const newProduct = new Product(
      ProductName,
      ProductId,
      ProductImageUrl,
      Price,
      Quantity,
      Status,
      _vpetclinic
    );

    const productUuid = await newProduct.createProduct();
    res.status(200).json({
      message: "Product created successfully!",
      productUuid,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProductData = async (req, res) => {
  const { id } = req.params;
  const { ProductName, Price, Quantity, Status } = req.body;

  try {
    await Product.updateProductData(id, {
      ProductName,
      Price,
      Quantity,
      Status,
    });
    res.status(200).json({ message: "Product data successfully updated." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProductData = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.deleteProduct(id);

    res.status(200).json({ message: "Product removed successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  const { petclinicId } = req.params;
  try {
    const products = await Product.getAllProducts(petclinicId);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductByName = async (req, res) => {
  const { name } = req.params;
  try {
    const product = await Product.getProductByName(name);
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

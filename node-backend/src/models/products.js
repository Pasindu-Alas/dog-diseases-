const { db } = require("../configs/firebaseConfig");

class Product {
  constructor(
    ProductName,
    ProductId,
    ProductImageUrl,
    Price,
    Quantity,
    Status,
    _vpetclinic
  ) {
    this.ProductName = ProductName;
    this.ProductId = ProductId;
    this.ProductImageUrl = ProductImageUrl;
    this.Price = Price;
    this.Quantity = Quantity;
    this.Status = Status;
    this._vpetclinic = _vpetclinic;
  }

  async createProduct() {
    try {
      const newProduct = await db.collection("Product").add({
        ProductName: this.ProductName,
        ProductId: this.ProductId,
        ProductImageUrl: this.ProductImageUrl,
        Price: this.Price,
        Quantity: this.Quantity,
        Status: this.Status,
        _vpetclinic: this._vpetclinic,
      });
      return newProduct.id;
    } catch (err) {
      console.error("Error creating new product : ", err);
      throw err;
    }
  }

  static async updateProductData(id, data) {
    try {
      const snapshot = await db.collection("Product").doc(id).get();
      if (snapshot.empty) {
        throw new Error("Product not found.");
      }
      const doc = snapshot.docs;
      await db.collection("Product").doc(id).update(data);
      return "Product updated successfully.";
    } catch (err) {
      console.error("Error updating product data : ", err);
      throw err;
    }
  }

  static async deleteProduct(id) {
    try {
      await db.collection("Product").doc(id).delete();
      return "Product removed successfully.";
    } catch (err) {
      console.error("Error removing product data : ", err);
      throw err;
    }
  }

  static async getAllProducts(petclinicId) {
    try {
      const snapshot = await db
        .collection("Product")
        .where("_vpetclinic", "==", petclinicId)
        .get();
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (err) {
      console.error("Error getting product data : ", err);
      throw err;
    }
  }

  static async getProductByName(name) {
    try {
      const snapshot = await db
        .collection("Product")
        .where("ProductName", "==", name)
        .get();

      if (snapshot.empty) {
        throw new Error("Product not found.");
      }

      const products = [];
      snapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });

      return products;
    } catch (err) {
      console.error("Error getting product : ", err);
      throw err;
    }
  }

  //   static async getProductByName(name) {
  //     try {
  //       const snapshot = await db
  //         .collection("Product")
  //         .where("ProductName", "==", name)
  //         .get();
  //       if (snapshot.empty) {
  //         throw new Error("Product not found.");
  //       }
  //       const doc = snapshot.docs;
  //       return { id: doc.id, ...doc.data() };
  //     } catch (err) {
  //       console.error("Error getting product : ", err);
  //       throw err;
  //     }
  //   }
}

module.exports = Product;

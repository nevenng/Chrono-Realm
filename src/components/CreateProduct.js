import React, { useState } from "react";
import { createProduct, fetchProdIdToCreate } from "../axios-services";

const CreateProduct = () => {
    const [productData, setProductData] = useState({
        prodId: "",
        brand: "",
        prodModelName: "",
        prodDescription: "",
        prodPrice: 0,
        prodImg: "",
        prodAttributes: "",
        reviews: "",
        inventory: 0,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const checkExistingProduct = async (prodId) => {
        try {
            const product = await fetchProdIdToCreate(prodId);
            return product || null;
        } catch (error) {
            console.error("Error checking existing product:", error);
            throw error;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const existingProduct = await checkExistingProduct(productData.prodId);
            if (existingProduct !== null) {
                console.log("Product with prodId already exists");
                return;
            }

            const createdProduct = await createProduct(productData);
            console.log("Product created:", createdProduct);
            setProductData({
                prodId: "",
                brand: "",
                prodModelName: "",
                prodDescription: "",
                prodPrice: 0,
                prodImg: "",
                prodAttributes: "",
                reviews: "",
                inventory: 0,
            });
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    return (
        <div className="larger-container">
            <div className="create-prod-container">
                <h2 className="create-prod-title">Create Product</h2>
                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-group">
                        <label htmlFor="prodId">Product ID:</label>
                        <input
                            type="text"
                            name="prodId"
                            value={productData.prodId}
                            onChange={handleInputChange}
                            placeholder="Product ID"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="brand">Brand:</label>
                        <input
                            type="text"
                            name="brand"
                            value={productData.brand}
                            onChange={handleInputChange}
                            placeholder="Brand"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="prodModelName">Product Model Name:</label>
                        <input
                            type="text"
                            name="prodModelName"
                            value={productData.prodModelName}
                            onChange={handleInputChange}
                            placeholder="Product Model Name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="prodDescription">Product Description:</label>
                        <input
                            type="text"
                            name="prodDescription"
                            value={productData.prodDescription}
                            onChange={handleInputChange}
                            placeholder="Product Description"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="prodPrice">Product Price:</label>
                        <input
                            type="number"
                            name="prodPrice"
                            value={productData.prodPrice}
                            onChange={handleInputChange}
                            placeholder="Product Price"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="prodImg">Product Image URL:</label>
                        <input
                            type="text"
                            name="prodImg"
                            value={productData.prodImg}
                            onChange={handleInputChange}
                            placeholder="Product Image URL"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="prodAttributes">Product Attributes:</label>
                        <input
                            type="text"
                            name="prodAttributes"
                            value={productData.prodAttributes}
                            onChange={handleInputChange}
                            placeholder="Product Attributes"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reviews">Reviews:</label>
                        <input
                            type="text"
                            name="reviews"
                            value={productData.reviews}
                            onChange={handleInputChange}
                            placeholder="Reviews"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inventory">Inventory:</label>
                        <input
                            type="number"
                            name="inventory"
                            value={productData.inventory}
                            onChange={handleInputChange}
                            placeholder="Inventory"
                        />
                    </div>
                    <button type="submit" className="btn-create">
                        Create
                    </button>
                </form>
            </div>
            <div className="preview-container">

                <div className="preview-section">
                    <h3>Preview:</h3>
                    <p>
                        <strong>Product ID:</strong> {productData.prodId}
                    </p>
                    <p>
                        <strong>Brand:</strong> {productData.brand}
                    </p>
                    <p>
                        <strong>Product Model Name:</strong> {productData.prodModelName}
                    </p>
                    <p>
                        <strong>Product Description:</strong> {productData.prodDescription}
                    </p>
                    <p>
                        <strong>Product Price:</strong> {productData.prodPrice}
                    </p>
                    <p>
                        <strong>Product Image URL:</strong>{" "}
                        <img src={productData.prodImg} alt="Product" />
                    </p>
                    <p>
                        <strong>Product Attributes:</strong> {productData.prodAttributes}
                    </p>
                    <p>
                        <strong>Reviews:</strong> {productData.reviews}
                    </p>
                    <p>
                        <strong>Inventory:</strong> {productData.inventory}
                    </p>
                </div>
            </div>
        </div>

    );
};

export default CreateProduct;

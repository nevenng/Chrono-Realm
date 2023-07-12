import { React } from "react";
import { Link } from "react-router-dom"
import { checkUserCartExists, createNewCart, addProductToCart, removeProductFromDB, fetchAllProducts } from "../axios-services/index"

const ProductListItem = (props) => {
    const { product, user, sessionId } = props;

    const handleDelete = async () => {
        try {
            await removeProductFromDB(product.prodid);
            console.log("Product deleted successfully");
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const formatPriceWithCommas = (price) => {
        const formattedPrice = parseFloat(price).toFixed(2);
        return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // const addToCartHandler = async () => {
    //     try {
    //         if (!user) {
    //           const _userCartExists = await checkUserCartExists(null, sessionId);

    //           if (!_userCartExists) {
    //             const createdGuestCart = await createNewCart(null, sessionId);
    //             console.log(createdGuestCart);
    //           } else {
    //             const productData = {
    //               prodId: product.prodid,
    //               prodModelName: product.prodmodelname,
    //               prodDescription: product.proddescription,
    //               prodImg: product.prodimg,
    //               quantity: 1,
    //               prodPrice: product.prodprice,
    //               totalPrice: product.prodprice * 1,
    //               cartId: _userCartExists.cartid
    //             };

    //             const addedUserProduct = await addProductToCart(productData);

    //             if (addedUserProduct) {
    //               alert('Product added!');
    //             }
    //           }
    //         } else if (user) {
    //           const _userCartExists = await checkUserCartExists(user.id, sessionId);

    //           if (!_userCartExists) {
    //             await createNewCart(user.id || null, sessionId);
    //           } else {
    //             const productData = {
    //               prodId: product.prodid,
    //               prodModelName: product.prodmodelname,
    //               prodDescription: product.proddescription,
    //               prodImg: product.prodimg,
    //               quantity: 1,
    //               prodPrice: product.prodprice,
    //               totalPrice: product.prodprice * 1,
    //               cartId: _userCartExists.cartid
    //             };

    //             const addedUserProduct = await addProductToCart(productData);

    //             if (addedUserProduct) {
    //               alert('Product added!');
    //             }
    //           }
    //         }
    //       } catch (error) {
    //         console.error(error);
    //       }
    // }

    return (
        <div className="plp-item">
            <Link to={`/products/${product.prodid}`}>
                <img src={product.prodimg} alt="" />
            </Link>
            <h3>{product.prodmodelname}</h3>
            <p>${formatPriceWithCommas(product.prodprice)}</p>
            {user && user.role === "admin" && (
                <button className="delete-button" onClick={handleDelete}>
                    Delete
                </button>
            )}
        </div>
    )
}

export default ProductListItem;
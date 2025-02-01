import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncProduct } from "./../feature/product/productSlice";
import { useOutletContext } from "react-router-dom";

const Products = () => {
  const { onCartUpdate } = useOutletContext();
  const { isLoading, products, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    dispatch(getAsyncProduct());
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, [dispatch]);

  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  const updateQuantity = (product, change) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = currentCart.find((item) => item.id === product.id);

    if (existingProduct) {
      const newQuantity = existingProduct.quantity + change;
      if (newQuantity <= 0) {
        const updatedCart = currentCart.filter(
          (item) => item.id !== product.id
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      } else {
        existingProduct.quantity = newQuantity;
        const updatedCart = currentCart.map((item) =>
          item.id === product.id ? existingProduct : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      }
    } else if (change > 0) {
      const updatedCart = [
        ...currentCart,
        {
          ...product,
          quantity: 1,
          dateAdded: new Date().toISOString(),
        },
      ];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    }
    onCartUpdate();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Error loading products. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((item) => (
          <div
            key={item.id}
            id={`product-${item.id}`}
            className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col"
          >
            <div className="relative p-4 flex justify-center items-center h-48">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-auto object-contain cursor-pointer transition-transform duration-300 hover:scale-110"
                onClick={() => setSelectedImage(item.image)}
              />
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                {item.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-lg font-bold text-blue-600">
                  ${item.price}
                </span>
                {isInCart(item.id) ? (
                  <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item, -1)}
                      className="px-3 py-2 hover:bg-gray-200 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 font-semibold text-gray-800">
                      {cartItems.find((cartItem) => cartItem.id === item.id)
                        ?.quantity || 0}
                    </span>
                    <button
                      onClick={() => updateQuantity(item, 1)}
                      className="px-3 py-2 hover:bg-gray-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => updateQuantity(item, 1)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-2xl w-full bg-white rounded-xl p-4">
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full h-auto object-contain max-h-[70vh]"
            />
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedImage(null)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

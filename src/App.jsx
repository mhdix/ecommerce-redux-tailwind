import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./feature/store";

function App() {
  const [cartUpdate, setCartUpdate] = useState(0);

  const handleCartUpdate = () => {
    setCartUpdate((prev) => prev + 1);
  };

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar - Single line with spacing */}
        <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
          <div className="container mx-auto">
            <nav className="h-16 flex items-center justify-between px-4">
              {/* Logo */}
              <Link to="/" className="text-xl font-bold text-blue-600">
                Store
              </Link>

              {/* Search Bar */}
              <div className="flex-1 max-w-xl mx-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full py-2 px-4 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
                  />
                  <button className="absolute left-2 top-1/2 -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Cart & Profile */}
              <div className="flex items-center gap-4">
                <Link
                  to="/cart"
                  className="cart-button flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Cart
                  {cartUpdate > 0 && (
                    <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartUpdate}
                    </span>
                  )}
                </Link>

                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
              </div>
            </nav>
          </div>
        </header>

        {/* Main Content - With proper spacing from navbar */}
        <main className="pt-20">
          <Outlet context={{ onCartUpdate: handleCartUpdate, cartUpdate }} />
        </main>

        {/* Footer with contact info */}
        <footer className="bg-white border-t mt-12">
          <div className="container mx-auto py-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">About Us</h3>
                <p className="text-gray-600 mb-2">
                  Brief description about the store
                </p>
                <p className="text-gray-600">Contact: +1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    <a href="#" className="hover:text-blue-600">
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-600">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-600">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Customer Service</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    <a href="#" className="hover:text-blue-600">
                      Order Tracking
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-600">
                      Shipping Info
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-600">
                      Product Warranty
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Provider>
  );
}

export default App;

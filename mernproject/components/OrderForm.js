"use client";
import { useSelector } from "react-redux";

const OrderForm = () => {
  const user = useSelector((state) => state.configUser.user);
  const handleInputChange = () => {};

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-center">
        Responsive Checkout Form
      </h2>
      <p className="text-center mb-6">
        Resize the browser window to see the effect. When the screen is less
        than 800px wide, make the two columns stack on top of each other instead
        of next to each other.
      </p>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-3/4 px-4 mb-6 md:mb-0">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <form action="/action_page.php">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2 px-4">
                  <h3 className="text-xl font-bold mb-4">Order</h3>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="fname"
                  >
                    <i className="fa fa-user" /> {user.name}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fname"
                    type="text"
                    placeholder="John M. Doe"
                  />
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    <i className="fa fa-envelope" />{user.email}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    placeholder="john@example.com"
                  />
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="adr"
                  >
                    <i className="fa fa-address-card-o" /> Address
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="adr"
                    type="text"
                    placeholder="542 W. 15th Street"
                  />
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="city"
                  >
                    <i className="fa fa-institution" /> City
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="city"
                    type="text"
                    placeholder="New York"
                  />
                  <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 px-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="country"
                      >
                        Country
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="country"
                        type="text"
                        placeholder="Nepal"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="zip"
                      >
                        Zip
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="zip"
                        type="text"
                        placeholder={10001}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-4">
                  <h3 className="text-xl font-bold mb-4">Payment</h3>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="fname"
                  >
                    Accepted Cards
                  </label>
                  <div className="flex mb-4">
                    <i className="fa fa-cc-visa text-navy text-4xl mx-1" />
                    <i className="fa fa-cc-amex text-blue text-4xl mx-1" />
                    <i className="fa fa-cc-mastercard text-red text-4xl mx-1" />
                    <i className="fa fa-cc-discover text-orange text-4xl mx-1" />
                  </div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="cname"
                  >
                    Name on Card
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="cname"
                    type="text"
                    placeholder="John More Doe"
                  />
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="ccnum"
                  >
                    Credit card number
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="ccnum"
                    type="text"
                    placeholder="1111-2222-3333-4444"
                  />
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="expmonth"
                  >
                    Exp Month
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="expmonth"
                    type="text"
                    placeholder="September"
                  />
                  <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 px-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="expyear"
                      >
                        Exp Year
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="expyear"
                        type="text"
                        placeholder={2018}
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="cvv"
                      >
                        CVV
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="cvv"
                        type="text"
                        placeholder={352}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <label className="block mb-4">
                <input
                  type="checkbox"
                  defaultChecked="checked"
                  name="sameadr"
                />{" "}
                Shipping address same as billing
              </label>
              <input
                type="submit"
                defaultValue="Continue to checkout"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;

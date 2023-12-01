"use client";
import { useRef, useState } from "react";
import { categories } from "@utils/categories";
import styles from "@styles/adminProduct.module.scss";
import { toast } from "react-hot-toast";
import { useAddProductMutation } from "@redux/slices/api";
function AddProductPage() {
  const fileRef = useRef();
  const productObj = {
    product_name: "",
    price: "",
    description: "",
    category: "",
    colors: [],
    image: [],
    quantity: "",
    brand: "",
    discount: "",
    sizes: [],
  };
  const [product, setProduct] = useState(productObj);
  const [addProduct, { isLoading }] = useAddProductMutation();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleColorChange = (index, color) => {
    const newColors = [...product.colors];
    newColors[index] = color;
    setProduct((prevState) => ({ ...prevState, colors: newColors }));
  };

  const handleAddColor = () => {
    setProduct((prevState) => ({
      ...prevState,
      colors: [...prevState.colors, ""],
    }));
  };

  const handleRemoveColor = (index) => {
    const newColors = [...product.colors];
    newColors.splice(index, 1);
    setProduct((prevState) => ({ ...prevState, colors: newColors }));
  };

  const handleImageChange = (e) => {
    const file = Array.from(e.target.files);
    setProduct((prevState) => ({ ...prevState, image: file }));
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    setProduct((prevState) => {
      if (checked) {
        const newSizes = [...prevState.sizes, value];
        return { ...prevState, sizes: newSizes };
      } else {
        const filteredSizes = prevState.sizes.filter((size) => size !== value);
        return { ...prevState, sizes: filteredSizes };
      }
    });
  };

  const formReset = () => {
    setProduct((prev) => productObj);
    fileRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", product.product_name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("discount", product.discount);
    formData.append("sizes", JSON.stringify(product?.sizes));
    formData.append("category", product?.category);
    formData.append("colors", JSON.stringify(product.colors));
    formData.append("stock", product?.quantity);
    formData.append("brand", product?.brand);
    product?.image.map((file) => {
      formData.append("file", file);
    });
    addProduct(formData)
      .unwrap()
      .then((response) => {
        console.log(response);
        toast.success(response?.message);
        formReset();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mx-auto py-8 lg:h-[calc(100vh-100px)] sm:overflow-auto ">
      <h1 className="text-3xl mx-w-lg mx-auto font-bold mb-6">Add Product</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="product_name" className="block mb-2 font-semibold">
            Product Name:
          </label>
          <input
            type="text"
            name="product_name"
            value={product.product_name}
            required
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>

        <div className="flex justify-between gap-2">
          <div className="mb-4">
            <label htmlFor="price" className="block mb-2 font-semibold">
              Price:
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              required
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-2 font-semibold">
              Discount%:
            </label>
            <input
              type="number"
              name="discount"
              value={product.discount}
              required
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 font-semibold">
            Description:
          </label>
          <textarea
            name="description"
            value={product.description}
            rows="4"
            cols="50"
            required
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block mb-2 font-semibold">
            Category:
          </label>
          <select
            id="category"
            value={product.category}
            name="category"
            required
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          >
            {categories.map((categ) => (
              <option key={categ.parent} value={categ.parent}>
                {categ.parent}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="colors" className="block mb-2 font-semibold">
            Colors:
          </label>
          {product.colors.map((color, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="color"
                id={`color_${index}`}
                name={`color_${index}`}
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className="w-8 h-8 rounded-full border border-gray-300 mr-2"
              />
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveColor(index)}
                  className="text-red-500 font-semibold"
                >
                  Remove Color
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddColor}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Add Color
          </button>
        </div>

        <div className="select-sizes">
          <p className="text block mb-2 font-semibold">size available</p>
          <div className="sizes">
            <input
              type="checkbox"
              className={styles.size_checkbox}
              value="xs"
              onChange={handleCheckboxChange}
            />
            <input
              type="checkbox"
              className={styles.size_checkbox}
              value="s"
              onChange={handleCheckboxChange}
            />
            <input
              type="checkbox"
              className={styles.size_checkbox}
              value="m"
              onChange={handleCheckboxChange}
            />
            <input
              type="checkbox"
              className={styles.size_checkbox}
              value="l"
              onChange={handleCheckboxChange}
            />
            <input
              type="checkbox"
              className={styles.size_checkbox}
              value="xl"
              onChange={handleCheckboxChange}
            />
            <input
              type="checkbox"
              className={styles.size_checkbox}
              value="xxl"
              onChange={handleCheckboxChange}
            />
            <input
              type="checkbox"
              className={styles.size_checkbox}
              value="xxxl"
              onChange={handleCheckboxChange}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block mb-2 font-semibold">
            Image:
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            ref={fileRef}
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
            multiple
          />
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="block mb-2 font-semibold">
            Stock:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            required
            value={product.quantity}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="brand" className="block mb-2 font-semibold">
            Brand:
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            onChange={handleInputChange}
            value={product.brand}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>

        <div className="flex gap-2">
          <button
            disabled={isLoading}
            type="submit"
            className={`${
              isLoading ? "cursor-progress" : "cursor-pointer"
            } bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md`}
          >
            Add
          </button>
          <button type="reset" onClick={formReset} px-4 py-2>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductPage;

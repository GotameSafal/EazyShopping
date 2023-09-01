"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { categories } from "@utils/categories";
import styles from "@styles/adminProduct.module.scss";
import { useRouter } from "next/navigation";
function UpdateProduct({ params }) {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${params.id}`
        );
        const data = response.data?.product;
        setProduct({ ...data, product_name: data.name });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [params.id]);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("discount", product.discount);
    formData.append("sizes", product?.sizes);
    formData.append("category", product?.category);
    formData.append("colors", product.colors);
    formData.append("stock", product?.stock);
    formData.append("brand", product?.brand);
    product.image &&
      product?.image.map((file) => {
        formData.append("file", file);
      });
    try {
      const { data } = await axios.put(
        `http://localhost:8000/product/${params.id}`,
        formData,
        { withCredentials: true }
      );
      if (data?.success) {
        toast.success(data?.message);
        router.push("/admin/products");
      } else toast.error(data?.message);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };
  return (
    <div className="container mx-auto py-8 lg:max-h-[calc(100vh-160px)] lg:overflow-auto  sm:overflow-auto">
      <h1 className="text-3xl mx-w-lg mx-3 font-bold mb-6">Update product</h1>
      {product && (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="product_name" className="block mb-2 font-semibold">
              Product Name:
            </label>
            <input
              type="text"
              id="product_name"
              name="name"
              required
              value={product.name}
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
                id="price"
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
                id="discount"
                name="discount"
                required
                value={product.discount}
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
              id="description"
              name="description"
              rows="4"
              cols="50"
              required
              value={product.description}
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
              name="category"
              required
              selected={product.category}
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
                id="xs"
                value="xs"
                checked={product.sizes?.includes("xs")}
                onChange={handleCheckboxChange}
              />
              <input
                type="checkbox"
                className={styles.size_checkbox}
                id="s"
                value="s"
                checked={product.sizes?.includes("s")}
                onChange={handleCheckboxChange}
              />
              <input
                type="checkbox"
                className={styles.size_checkbox}
                id="m"
                value="m"
                checked={product.sizes?.includes("m")}
                onChange={handleCheckboxChange}
              />
              <input
                type="checkbox"
                className={styles.size_checkbox}
                id="l"
                value="l"
                checked={product.sizes?.includes("l")}
                onChange={handleCheckboxChange}
              />
              <input
                type="checkbox"
                className={styles.size_checkbox}
                id="xl"
                value="xl"
                onChange={handleCheckboxChange}
                checked={product.sizes?.includes("xl")}
              />
              <input
                type="checkbox"
                className={styles.size_checkbox}
                id="xxl"
                value="xxl"
                onChange={handleCheckboxChange}
                checked={product.sizes?.includes("xxl")}
              />
              <input
                type="checkbox"
                className={styles.size_checkbox}
                id="xxxl"
                value="xxxl"
                checked={product.sizes?.includes("xxxl")}
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
              id="image"
              name="image"
              accept="image/*"
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
              name="stock"
              required
              value={product.stock}
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
              value={product.brand}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdateProduct;

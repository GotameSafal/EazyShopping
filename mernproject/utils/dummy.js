import {
  TbTruckDelivery,
  FiUsers,
  FiEdit,
  AiOutlineBarChart,
  AiOutlineCalendar,
  AiOutlinePieChart,
  AiOutlineLineChart,
  FaStore,
  AiFillShopping,
  HiUsers,
} from "@utils/iconExport";
export const sideItem = [
  {
    title: "Dashboard",
    items: [
      { icon: <AiFillShopping />, name: "Ecommerce" },
      { icon: <FaStore />, name: "Products" },
    ],
  },
  {
    title: "Pages",
    items: [
      { icon: <TbTruckDelivery />, name: "Orders" },
      { icon: <HiUsers />, name: "Employees" },
      { icon: <FiUsers />, name: "Customers" },
    ],
  },
  {
    title: "Apps",
    items: [
      { icon: <AiOutlineCalendar />, name: "Calendar" },
      { icon: <FiEdit />, name: "Editor" },
    ],
  },
  {
    title: "Charts",
    items: [
      { icon: <AiOutlinePieChart />, name: "Pie" },
      { icon: <AiOutlineLineChart />, name: "Line" },
      { icon: <AiOutlineBarChart />, name: "Bar" },
    ],
  },
];

export const SalesData = [
  {
    name: "Page A",
    uv: 4000,
    sales: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    sales: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    sales: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    sales: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    sales: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    sales: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    sales: 4300,
    amt: 2100,
  },
];

export const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
export const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    filterable: true,
    sortable: true,
  },
  {
    field: "image",
    headerName: "Image",
    width: 130,
    sortable: false,
    filterable: false,
  },
  {
    field: "email",
    headerName: "Email",
    width: 130,
    sortable: true,
    filterable: true,
  },
  {
    field: "status",
    headerName: "Status",
    type: Boolean,
    width: 90,
  },
  {
    field: "orderStatus",
    headerName: "Order Status",
    type: "singleSelect",
    valueOptions: ["processing", "approved", "ordered"],
    editable: true,
    width: 130,
  },
  {
    field: "created at",
    headerName: "Created At",
    sortable: true,
    width: 160,
  },
];

export const filterSection = [
  {
    title: "Brand",
    child: ["numph", "jlwkeri", "deodratn", "leloe", "lolita"],
  },
  { title: "Size", child: ["xs", "sm", "lg", "xl", "2xl", "3xl"] },
  { title: "Rating", child: [4, 3, 2, 1] },
  { title: "Color", child: ["black", "blue", "red", "orange", "green"] },
];

export const ProductRow = [
  {
    id: 1,
    product: "/url/name",
    name: "tshirt",
    price: "discount",
    discount: 20,
    category: "wearings",
    action: <button className="py-1 px-2 bg-red-500">Remove</button>,
  },
];

export const ProductCol = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    filterable: true,
    sortable: true,
  },
  {
    field: "product",
    headerName: "ProductImg",
    width: 200,
    editable: true,
  },
  {
    field: "name",
    headerName: "Name",
    width: 170,
    filterable: true,
    editable: true,
    sortable: true,
  },
  {
    field: "price",
    headerName: "Price",
    width: 70,
    filterable: true,
    sortable: true,
    editable: true,
  },
  {
    field: "discount",
    headerName: "Discount %",
    width: 70,
    filterable: true,
    sortable: true,
    editable: true,
  },
  {
    field: "category",
    headerName: "Category",
    width: 180,
    filterable: true,
    sortable: true,
    editable: true,
  },
  {
    field: "action",
    headerName: "Update",
    width: 130,
  },
];

export const generateMerchantId = () => {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 9000) - 1000;
  const merchantId = `${timestamp}${randomNumber}`;
  return merchantId;
};

export const setFilterPriceParams = (query, queryStr, value) => {
  const hasQuery = query.has(queryStr);
  if (hasQuery && value) query.set(queryStr, value);
  else if (value) query.append(queryStr, value);
  else if (hasQuery) query.delete(queryStr);
  return query;
};

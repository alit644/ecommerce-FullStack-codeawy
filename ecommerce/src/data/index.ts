import type {
  IDashboardLink,
  IDashboardOverview,
  ILoginInput,
  IPricingSectionInputsData,
  IRegisterInput,
  ITableColumn,
} from "../interfaces";
import { BsBoxSeam, BsTruck } from "react-icons/bs";
import { FiRotateCcw, FiShield } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { GoInbox, GoHome } from "react-icons/go";
import { FaDollarSign, FaStore } from "react-icons/fa";

export const tabs = [
  { label: "Featured Products", value: "featured" },
  { label: "Bestseller", value: "bestseller" },
];

export const LOGIN_FORM: ILoginInput[] = [
  {
    id: "identifier",
    name: "identifier",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    validation: {
      required: true,
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    },
  },
  {
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    validation: {
      required: true,
      minLength: 6,
      maxLength: 20,
    },
  },
];

export const REGISTER_FORM: IRegisterInput[] = [
  {
    id: "username",
    name: "username",
    type: "text",
    placeholder: "Enter your username",
    label: "Username",
    validation: {
      required: true,
      minLength: 2,
      maxLength: 15,
    },
  },
  {
    id: "email",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    validation: {
      required: true,
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    },
  },
  {
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    validation: {
      required: true,
      minLength: 6,
      maxLength: 20,
    },
  },
];

export const brands = [
  { name: "Apple", count: 110 },
  { name: "Samsung", count: 125 },
  { name: "Xiaomi", count: 68 },
  { name: "Poco", count: 44 },
  { name: "OPPO", count: 38 },
  { name: "Honor", count: 10 },
  { name: "Motorola", count: 34 },
  { name: "Nokia", count: 22 },
  { name: "Realme", count: 35 },
];

export const price = [
  { name: "Under $100", count: 110 },
  { name: "$100 - $500", count: 125 },
  { name: "$500 - $1000", count: 68 },
  { name: "$1000 - $2000", count: 44 },
  { name: "$2000 - $5000", count: 38 },
  { name: "$5000 - $10000", count: 10 },
];

export const deliveryInfo = [
  { name: "Free delivery", icon: BsTruck, color: "green.400" },
  { name: "Express Shipping", icon: FiRotateCcw, color: "blue.400" },
  { name: "Standard Shipping", icon: FiShield, color: "purple.400" },
];

export const dashboardLinks: IDashboardLink[] = [
  { name: "Dashboard", href: "/dashboard", icon: GoHome },
  { name: "Products", href: "/dashboard/products", icon: GoInbox },
  { name: "Categories", href: "/dashboard/categories", icon: BiCategory },
  { name: "Orders", href: "/dashboard/orders", icon: BsBoxSeam },
  { name: "Store", href: "/", icon: FaStore },
];

export const dashboardOverview: IDashboardOverview[] = [
  {
    name: "Total Products",
    percentage: "+5%",
    description: "increase from last month",
    count: 100,
    icon: GoInbox,
    color: "blue.500",
  },
  {
    name: "Categories",
    percentage: "+10%",
    description: "increase from last month",
    count: 100,
    icon: BiCategory,
    color: "green.500",
  },
  {
    name: "Total Orders",
    percentage: "+15%",
    description: "increase from last month",
    count: 100,
    icon: BsBoxSeam,
    color: "purple.500",
  },
  {
    name: "Total Value",
    percentage: "-20%",
    description: "decrease from last month",
    count: 100,
    icon: FaDollarSign,
    color: "orange.500",
  },
];

export const tableColumns: ITableColumn[] = [
  { label: "Image", key: "thumbanil", type: "image" },
  { label: "ID", key: "id", type: "text" },
  { label: "Name", key: "name", type: "text" },
  { label: "Category", key: "category", type: "text" },
  { label: "Price", key: "price", type: "text" },
  { label: "Stock", key: "stock", type: "text" },
  { label: "Status", key: "status", type: "text" },
  { label: "Actions", key: "actions", type: "actions" },
];

export const tableCategoryColumns: ITableColumn[] = [
  {
    label: "Image",
    key: "thumbanil",
    type: "image",
  },
  {
    label: "ID",
    key: "id",
    type: "text",
  },
  {
    label: "Name",
    key: "title",
    type: "text",
  },
  {
    label: "Actions",
    key: "actions",
    type: "actions",
  },
];

export const tableOrderColumns: ITableColumn[] = [
 { label: "ID", key: "id", type: "text" },
 {label: "Image", key: "image", type: "image"},
 { label: "Created At", key: "createdAt", type: "text" },
 { label: "Status", key: "status", type: "text" },
 { label: "Total", key: "total", type: "text" },
 {label: "Product Count", key: "productCount", type: "text"},
 {label: "User", key: "user", type: "text"},
 { label: "Actions", key: "actions", type: "actions" },
];

export const sortItems = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

export const PricingSectionInputsData: IPricingSectionInputsData[] = [
  {
    id: "price",
    name: "price",
    type: "number",
    placeholder: "Enter Product Price",
    label: "Product Price *",
    validation: {
      required: true,
      min: 1,
      max: 1000000,
    },
  },
  {
    id: "discount",
    name: "discount",
    type: "number",
    placeholder: "Enter Product Discount",
    label: "Product Discount *",
    validation: {
      required: true,
      min: 1,
      max: 100,
    },
  },
  {
    id: "stock",
    name: "stock",
    type: "number",
    placeholder: "Enter Product Stock",
    label: "Product Stock *",
    validation: {
      required: true,
      min: 1,
      max: 100,
    },
  },
];

export const mainInputsData: IPricingSectionInputsData[] = [
  {
    id: "title",
    name: "title",
    type: "text",
    placeholder: "Enter Product Name",
    label: "Product Name *",
    validation: {
      required: true,
      min: 1,
      max: 1000000,
    },
  },
  {
    id: "rating",
    name: "rating",
    type: "number",
    placeholder: "Enter Product Rating",
    label: "Product Rating *",
    validation: {
      required: true,
      min: 1,
      max: 5,
    },
  },
];

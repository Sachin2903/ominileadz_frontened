import { GoHome } from "react-icons/go";
import { MdOutlineAutoAwesomeMosaic } from "react-icons/md";
import { LuFolderMinus } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { AiOutlineCarryOut } from "react-icons/ai";
import {IoStorefrontSharp} from "react-icons/io5";
import { CgWebsite } from "react-icons/cg";
const asideIcons = [
  {
    id: 0,
    icon: <GoHome />,
    path: "/dashboard",
    title: "Dashboard",
    mainCategory: "dashboard",
    children: [],
  },
  {
    id: 1,
    icon: <MdOutlineAutoAwesomeMosaic />,
    path: "/leads",
    mainCategory: "new_leads",
    title: "Leads",
    children: [
      {
        id: 1,
        title: "New Leads",
        value: "new_leads",
        // path of parent 
        parentPath:"/leads",
      },
      {
        id: 2,
        title: "Follow Up",
        value: "follow_up",
        parentPath:"/leads",
      },
      {
        id: 3,
        title: "Send Details",
        value: "send_details",
        parentPath:"/leads",
      },
      {
        id: 4,
        title: "Regretted",
        parentPath: "regretted",
      },
      {
        id: 5,
        title: "Quotation",
        value: "quotation",
        parentPath:"/leads",
      },
      {
        id: 6,
        title: "PO",
        value: "po",
        parentPath:"/leads",
      },
    ],
  },
  {
    id: 2,
    icon: <AiOutlineCarryOut />,
    path: "/company/info",
    title: "Company",
    mainCategory: "leads",
    children: [],
  },
  {
    id: 3,
    icon: <LuFolderMinus />,
    path: "/contact/leadsInfo",
    title: "Contact",
    mainCategory: "leads",
    children: [],
  },{
    id: 4,
    icon: <IoStorefrontSharp/>,
    path: "/store/product",
    title: "Store",
    mainCategory: "store",
    children: [{
      id: 1,
      title: "Product",
      value: "product",
      parentPath:"/store/product",
    },
    {
      id: 2,
      title: "Category",
      value: "category",
      parentPath:"/store/category",
    },
    {
      id: 3,
      title: "Attribute",
      value: "attribute",
      parentPath:"/store/attribute",
    },
    {
      id: 4,
      title: "Coupon",
      value: "coupon",
      parentPath:"/store/coupon",
    }
  ],
  },{
    id: 5,
    icon: <CgWebsite />,
    path: "/website/seo",
    title: "Website",
    mainCategory: "leads",
    children: [{
      id: 1,
      title: "SEO",
      value: "seo",
      parentPath:"/website/seo",
    }],
  },
  {
    id:6,
    icon: <CiSettings />,
    path: "/settings/team",
    title: "Settings",
    mainCategory: "leads",
    children: [],
  },
];

export default asideIcons;

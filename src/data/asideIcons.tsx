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
      },
      {
        id: 2,
        title: "Follow Up",
        value: "follow_up",
      },
      {
        id: 3,
        title: "Send Details",
        value: "send_details",
      },
      {
        id: 4,
        title: "Regretted",
        value: "regretted",
      },
      {
        id: 5,
        title: "Quotation",
        value: "quotation",
      },
      {
        id: 6,
        title: "PO",
        value: "po",
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
    },
    {
      id: 2,
      title: "Category",
      value: "category",
    },
    {
      id: 3,
      title: "Attribute",
      value: "attribute",
    },
    {
      id: 4,
      title: "Coupon",
      value: "coupon",
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
      value: "new_leads",
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

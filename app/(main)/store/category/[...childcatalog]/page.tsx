// "use client"
// import ChildAttributeTopLayer from "@/components/layers/childAttributeTopLayer";
// import { Breadcrumb, message } from "antd";
// import axios from "axios";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function Page({ params }: any) {
//     let id:string=params.childcatalog[1]
//     const [breadcrum, setBreadCrum] = useState([{
//         title: <Link href="/leads/catalog/category">Category</Link>,
//     }])
//     const [allCategories, SetAllCategories] = useState([])
//     const [messageApi, contextHolder] = message.useMessage()
//     const [childCategory, setChildCategory] = useState([])
//     const [parentCategory, setParentCategory] = useState([]);

//     useEffect(() => {
//        let data:any=getAllCategoryNoRelation();
//        if(data){
//         SetAllCategories(data)

//         const parent = data.filter((item:any) => item._id === node.parentId);
//         const children = data.filter((item:any) => item.parentId === node.id);


//        }
      



    
//     }, [])

//     async function getAllCategoryNoRelation() {
//         try {
//             let responce = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/category/getallcategorywithoutrelation`)
//             return responce.data
//         } catch (error) {
//             message.info("Network Issue")
//         }
//     }




//     return (
//         <div className="brmore p-4 pb-10">
//             {contextHolder}
//             <h1 className="semibold text-lg">Category</h1>
//             <Breadcrumb
//                 items={breadcrum}
//             />
//             {/* <p>{params.childcatalog[0].replace(/%20/g, " ").replace(/%26/g, "&")}</p> */}
//             <ChildAttributeTopLayer />
//         </div>
//     );
// }

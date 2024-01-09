"use client"
import AddProductDrawer from "@/components/Drawer/AddProductAndVariant";
import { ProductSearchLayer } from "@/components/layers/productSearchLayer";
import ProductTopLayer from "@/components/layers/productTopLayer";
import axios from "axios";
import { ProductTable } from "@/components/tabel/productTable";
import { useEffect, useState } from "react";
import { DeleteProductModal } from "@/components/storeModal/deleteProductModal";
import BulkActionDrawer from "@/components/Drawer/BulkActionDrawerProduct";
import { message } from "antd";

export default function Page() {
    const [searchText, setSearchText] = useState("")
    const [option1, setOption1] = useState<null | string>(null)
    const [option2, setOption2] = useState<null | string>(null)
    const [searchloading, SetSearchLoading] = useState(false)
    const [loading, setloading] = useState(false)
    const [categoryOption, setCategoryOption] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const [treeData, setTreeData] = useState([])
    const [bulkActionDrawer, setBulkActionDrawer] = useState(false)
    const [openaddProductDrawer, SetOpenAddProductDrawer] = useState(false)
    const [preFilledData, setPreFilledData] = useState("")
    const [tableData, setTableData] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [mainLoader, setMainLoader] = useState(true);
    const [BulkActionArray, setBulkActionArray] = useState([])
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [editProductRefresh,setProductRefresh]=useState(false)
    useEffect(() => {
        async function getProductData() {
            setloading(true)
            let body: {
                searchtext: string;
                price: string | null;
                category: string | null;
            } = {
                "searchtext": searchText.trim(),
                "category": option1 ? option1 : "",
                "price": option2 ? option2 : ""
            }
            try {
                let response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products/getallproductbyfilter`, { params: body })
                setTableData(response.data.products)
            } catch (error) {
                message.info("Network Issue")
                SetSearchLoading(false);
                setloading(false)
            }


            SetSearchLoading(false);

            setloading(false)
        }
        getProductData()
    }, [refresh])

    return (
        <div className="p-4  min-h-full pb-10">
            <h1 className="semibold text-lg">Product</h1>
            <BulkActionDrawer BulkActionArray={BulkActionArray} allCategories={allCategories} setAllCategories={setAllCategories} treeData={treeData} setTreeData={setTreeData} refresh={refresh} setRefresh={setRefresh} bulkActionDrawer={bulkActionDrawer} setBulkActionDrawer={setBulkActionDrawer} />
            <DeleteProductModal deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} refresh={refresh} setRefresh={setRefresh} preFilledData={preFilledData} setPreFilledData={setPreFilledData} BulkActionArray={BulkActionArray} setBulkActionArray={setBulkActionArray} />
            <ProductTopLayer setBulkActionDrawer={setBulkActionDrawer} setDeleteModalOpen={setDeleteModalOpen} BulkActionArray={BulkActionArray} setBulkActionArray={setBulkActionArray} SetOpenAddProductDrawer={SetOpenAddProductDrawer} />
            <ProductSearchLayer searchloading={searchloading} SetSearchLoading={SetSearchLoading} option2={option2} setOption2={setOption2} option1={option1} setOption1={setOption1} searchText={searchText} setSearchText={setSearchText} setTableData={setTableData} categoryOption={categoryOption} refresh={refresh} setRefresh={setRefresh} tableData={tableData} />
            <AddProductDrawer editProductRefresh={editProductRefresh} setProductRefresh={setProductRefresh} setCategoryOption={setCategoryOption} allCategories={allCategories} setAllCategories={setAllCategories} treeData={treeData} setTreeData={setTreeData} refresh={refresh} setRefresh={setRefresh} preFilledData={preFilledData} setPreFilledData={setPreFilledData} openaddProductDrawer={openaddProductDrawer} SetOpenAddProductDrawer={SetOpenAddProductDrawer} />
            <ProductTable editProductRefresh={editProductRefresh} setProductRefresh={setProductRefresh} loading={loading} setloading={setloading} setPreFilledData={setPreFilledData} SetOpenAddProductDrawer={SetOpenAddProductDrawer} BulkActionArray={BulkActionArray} setBulkActionArray={setBulkActionArray} mainLoader={mainLoader} setMainLoader={setMainLoader} refresh={refresh} setRefresh={setRefresh} tableData={tableData} />
        </div>
    )
}
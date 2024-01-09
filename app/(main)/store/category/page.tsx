"use client"
import { AddCategoryDrawer } from "@/components/Drawer/addCategoryDrawer";
import { BulkCategoryActionDrawer } from "@/components/Drawer/bulkCategoryActionDrawer";
import { CategorySearchLayer } from "@/components/layers/categorySearchLayer";
import CategoryTopLayer from "@/components/layers/categoryTopLayer";
import { DeleteChildCatalogModal } from "@/components/storeModal/deleteCategoryModal";
import { CategoryTable } from "@/components/tabel/categoryTable";
import { useState } from "react";

export default function Page() {
    const [fileList, setFileList] = useState([])
    const [openAddCategory, setOpenAddCategory] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [bulkActionDrawer, setBulkActionDrawer] = useState(false)
    const [BulkActionArray, setBulkActionArray] = useState([])
    const [refresh, setRefresh] = useState(false);
    const [tableData, setTableData] = useState([])
    const [preFilledData, setPreFilledData] = useState({})
    const [treeData, setTreeData] = useState([])

    return (
        <div className="overflow-y-auto w-full  h-full p-3">
            <h1 className="semibold text-lg">Category</h1>
            <BulkCategoryActionDrawer setTreeData={setTreeData} BulkActionArra={BulkActionArray} setBulkActionArray={setBulkActionArray} bulkActionDrawer={bulkActionDrawer} setBulkActionDrawer={setBulkActionDrawer} BulkActionArray={BulkActionArray} treeData={treeData} refresh={refresh} setRefresh={setRefresh} />
            <AddCategoryDrawer treeData={treeData} setTreeData={setTreeData} preFilledData={preFilledData} setPreFilledData={setPreFilledData} setTableData={setTableData} refresh={refresh} setRefresh={setRefresh} openAddCategory={openAddCategory} setOpenAddCategory={setOpenAddCategory} />
            <CategoryTopLayer fileList={fileList} setFileList={setFileList} openAddCategory={openAddCategory} setOpenAddCategory={setOpenAddCategory} setDeleteModalOpen={setDeleteModalOpen} setBulkActionDrawer={setBulkActionDrawer} BulkActionArray={BulkActionArray} setBulkActionArray={setBulkActionArray} />
            <CategorySearchLayer tableData={tableData} refresh={refresh} setRefresh={setRefresh} setTableData={setTableData} />
            <CategoryTable BulkActionArray={BulkActionArray} tableData={tableData} setTableData={setTableData} refresh={refresh} setRefresh={setRefresh} setPreFilledData={setPreFilledData} setOpenAddAttribute={setOpenAddCategory} setBulkActionArray={setBulkActionArray} />
            <DeleteChildCatalogModal deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} bulkActionArray={BulkActionArray} refresh={refresh} setRefresh={setRefresh} setPreFilledData={setPreFilledData} />
        </div>
    )
}
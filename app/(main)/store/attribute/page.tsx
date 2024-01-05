"use client"
import { Button, Drawer, Input, Radio, DatePicker, Space, Modal, message, MenuProps, Dropdown, Upload, Switch, UploadProps, UploadFile } from 'antd';
import { useEffect, useState } from 'react';


import moment from 'moment';
import TopLayer from '@/components/layers/topLayer';
import { SearchLayer } from '@/components/layers/searchLayer';
import { AddAttributeDrawer } from '@/components/Drawer/addAttributeDrawer';
import { DeleteModal } from '@/components/storeModal/deleteModal';
import { AttributeBulkActionDrawer } from '@/components/Drawer/attributeBulkActionDrawer';
import { AttributeTable } from '@/components/tabel/attributeTable';
import { AddCategoryDrawer } from '@/components/Drawer/addCategoryDrawer';

const { Search } = Input;

export default function Attribute() {
    const [messageApi, contextHolder] = message.useMessage()
    const [fileList, setFileList] = useState([]);
    const [openAddTribute, setOpenAddAttribute] = useState(false);
    const [deleteModalOpen,setDeleteModalOpen]=useState(false);
    const [bulkActionDrawer,setBulkActionDrawer]=useState(false)
    const [refresh,setRefresh]=useState(true);
    const [prefilledProduct,setPreFilledProduct]=useState<object>({})
    const [BulkActionArray,setBulkActionArray]=useState([])
    const [tableData, setTableData] = useState([])
    return (
        <div className="overflow-y-auto w-full bg-gray-100 h-full p-3">
            {contextHolder}
            <h1 className="semibold text-lg">Attributes </h1>
            <TopLayer fileList={fileList} setFileList={setFileList} openAddTribute={openAddTribute} setOpenAddAttribute={setOpenAddAttribute} setDeleteModalOpen={setDeleteModalOpen} setBulkActionDrawer={setBulkActionDrawer} BulkActionArray={BulkActionArray} setBulkActionArray={setBulkActionArray}/>
            <SearchLayer refresh={refresh} setRefresh={setRefresh} setTableData={setTableData}/>
            <DeleteModal deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} BulkActionArray={BulkActionArray} refresh={refresh} setRefresh={setRefresh} setPreFilledProduct={setPreFilledProduct}/>
            <AttributeBulkActionDrawer bulkActionDrawer={bulkActionDrawer} setBulkActionDrawer={setBulkActionDrawer} refresh={refresh} setRefresh={setRefresh} setPreFilledProduct={setPreFilledProduct} BulkActionArray={BulkActionArray}/>
            <AddAttributeDrawer openAddTribute={openAddTribute} setOpenAddAttribute={setOpenAddAttribute} refresh={refresh} setRefresh={setRefresh} prefilledProduct={prefilledProduct} setPreFilledProduct={setPreFilledProduct}/>
            <div className="px-4   mt-2 bg-white shadow-lg rounded">
                <AttributeTable tableData={tableData} setTableData={setTableData} refresh={refresh} setRefresh={setRefresh} setPreFilledProduct={setPreFilledProduct} setOpenAddAttribute={setOpenAddAttribute} BulkActionArray={BulkActionArray} setBulkActionArray={setBulkActionArray}/>
            </div>
            {/* <AddCategoryDrawer openAddTribute={openAddTribute} setOpenAddAttribute={setOpenAddAttribute} fileList={fileList} setFileList={setFileList} /> */}
        </div>
    )
}
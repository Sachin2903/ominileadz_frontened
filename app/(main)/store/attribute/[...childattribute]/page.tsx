"use client"
import { Breadcrumb } from 'antd';
import Link from "next/link";
import ChildAttributeTopLayer from "@/components/layers/childAttributeTopLayer";
import { ChildAttributeTable } from '@/components/tabel/childAttributeTable';
import { useState } from 'react';
import { DeleteChildAttributeModal } from '@/components/storeModal/deleteChildAttributeModal';
import { AddChildAttributeDrawer } from '@/components/Drawer/addchildAttributeDrawer';


export default function ChildAttribute({ params }: any) {
    const [refresh, setRefresh] = useState(false)
    const [preFilledData, setPreFilledData] = useState({})
    const [bulkActionArray, setBulkActionArray] = useState([])
    const [openAddValue, setOpenAddValue] = useState(false)
    const [deleteModalOpen,setDeleteModalOpen]=useState(false);
    
    return (
        <div className="overflow-y-auto w-full bg-gray-100 h-full p-3">
            <h1 className="semibold text-lg">Attributes Values</h1>
            <Breadcrumb
                items={[
                    {
                        title: 'Home',
                    },
                    {
                        title: <Link href="/leads/catalog/attribute">Attributes</Link>,
                    },
                    {
                        title: <p>{params.childattribute[0]}</p>,
                    },
                ]}
            />
            <ChildAttributeTopLayer setOpenAddValue={setOpenAddValue} setDeleteModalOpen={setDeleteModalOpen} bulkActionArray={bulkActionArray}/>
            <ChildAttributeTable bulkActionArray={bulkActionArray} idMain={params.childattribute[1]} refresh={refresh} setRefresh={setRefresh} setPreFilledData={setPreFilledData} setBulkActionArray={setBulkActionArray} setOpenAddValue={setOpenAddValue} />
            <DeleteChildAttributeModal bulkActionArray={bulkActionArray} idMain={params.childattribute[1]} setPreFilledData={setPreFilledData} refresh={refresh} setRefresh={setRefresh} deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen}/>
            <AddChildAttributeDrawer idMain={params.childattribute[1]} preFilledData={preFilledData} setPreFilledData={setPreFilledData} refresh={refresh} setRefresh={setRefresh} openAddValue={openAddValue} setOpenAddValue={setOpenAddValue}/>
        </div>
    )
}
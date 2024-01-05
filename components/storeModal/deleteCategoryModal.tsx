import { Button, Modal, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export function DeleteChildCatalogModal({deleteModalOpen,setDeleteModalOpen,bulkActionArray,refresh,setRefresh,setPreFilledData}:any){
  const [deleteLoading,setDeleteLoading]=useState(false)
    const handleCancel = () => {
        if(deleteLoading)
        return
        setRefresh(!refresh)
        setDeleteModalOpen(false);
        setPreFilledData([])
    };

   async function handleOk(){
       try {
        setDeleteLoading(true)
        let body:{
            ids:string[],
        }={
            ids:bulkActionArray,
           
        }
        const response=await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/category/deletemanycategories`,{data:body})
        message.success(response.data.message)
        setDeleteLoading(false)
        handleCancel()
        
       } catch (error) {
        message.info("Network Issue")
        setDeleteLoading(false)
        handleCancel()
       }
    }
    return(
        <Modal
        open={deleteModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
            <Button key="cancelButton"  onClick={handleCancel}>
                No, Keep it
            </Button>,
            <Button 
            key="deleteButton"
            loading={deleteLoading}
                danger
                type="primary"
                onClick={handleOk}
            >
                Yes, Delete it
            </Button>,
        ]}
    >
        <div className=' gap-0.5   flex flex-col justify-center items-center '>
            <FaRegTrashAlt className="mb-6 text-red-600 text-2xl " />
            <h3 className=' font-semibold text-lg break-keep '>Are You Sure! Want to Delete <span className='text-red-600'></span>?</h3>
            <p className='text-center'>Do you realy want to delete these records? you can&apos;t view this in your list anymore if you delete!</p>
        </div>
    </Modal>
    )
}
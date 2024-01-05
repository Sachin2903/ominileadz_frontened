"use client"
import { Button } from 'antd';
import { BsPencilSquare } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";

export default function ChildAttributeTopLayer({setDeleteModalOpen,setOpenAddValue,bulkActionArray}:any) {
    return (
        <div className="min-w-0  flex-wrap bg-white flex  justify-between items-center p-2 pt-6 mt-4 shadow-lg  rounded-md  mb-5">
            <section className='sm:w-fit w-full mb-3 flex sm:flex-row flex-col gap-2'>
                <Button onClick={()=>setDeleteModalOpen(true)} disabled={bulkActionArray&&bulkActionArray.length==0} className="sm:w-fit w-full " type="primary" size="large" danger icon={<FaRegTrashAlt />}>
                    Delete
                </Button>
                <Button disabled={bulkActionArray&&bulkActionArray.length==0} className=" hover:bg-gray-500 bg-gray-200" type="text" size="large" icon={<BsPencilSquare />} >
                    Bulk Action
                </Button>
                <Button onClick={()=>setOpenAddValue(true)} type="primary" className="sm:w-fit w-full bg-blue-500 " size="large" >
                    +   Add Value
                </Button>
            </section>
        </div>
    )
}
"use client"
import { Button, message, MenuProps, Dropdown, Upload, UploadProps, UploadFile } from 'antd';
import {  useState } from 'react';
import { BsFiletypeJson, BsPencilSquare } from "react-icons/bs";
import { BiCloudUpload } from "react-icons/bi"
import { CiExport, CiImport } from "react-icons/ci";
import { FaFileCsv } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <p className='flex justify-center gap-2 items-center text-center'><FaFileCsv />Eport to CSV</p>
        ),
    },
    {
        key: '2',
        label: (
            <p className=' flex justify-center items-center gap-1.5 text-center'><BsFiletypeJson /> Eport to JSON</p>
        ),
    }]

export default function CategoryTopLayer({ fileList, setFileList, openAddCategory, setOpenAddCategory, setDeleteModalOpen, setBulkActionDrawer, BulkActionArray, setBulkActionArray }: any) {
    const [importToggle, setImportToggle] = useState(false)
    const [uploading, setUploading] = useState(false);
    const handleImportData = () => {
        console.log("button click", fileList[0])
        setUploading(true);
        setFileList([])
        message.success("done")
    };
    const props: UploadProps<UploadFile<any>> = {
        onRemove: () => {
            setFileList([]);
        },
        beforeUpload: (file) => {
            setFileList([file]);
            return false;
        },
        fileList,
    };
    const truncateFileName = (name: string) => {
        if (name.length > 11) {
            return name.substring(0, 4) + '...' + "json"; // Truncate the file name if it exceeds the maximum length
        }
        return name;
    };

    function emptyFileList() {
        setFileList([])
    }

    return (
        <div className="min-w-0  flex-wrap bg-white flex  justify-between items-center p-2 pt-6 mt-4 shadow-lg  rounded-md  mb-5">
            <div className="flex mb-3 gap-2 flex-wrap justify-start ">
                <Dropdown menu={{ items }} placement="bottomLeft" >
                    <Button className='bg-gray-100 font-medium ' type="dashed" icon={<CiExport />} >
                        Export
                    </Button>
                </Dropdown>

                <Button className='bg-gray-100 font-medium' type="dashed" onClick={() => setImportToggle(!importToggle)} icon={<CiImport />} >
                    Import
                </Button>
                {
                    importToggle && <div className=' px-1 flex-wrap flex justify-center items-center gap-1'>
                        <Upload className='flex justify-center items-center gap-1' maxCount={1} accept=".json" showUploadList={false} {...props}>
                            <Button icon={< BiCloudUpload />}>Select JSON File
                            </Button>
                        </Upload>
                        <span >{fileList.length > 0 ? <div className="justify-center items-center bg-gray-100 flex gap-1">
                            <MdAttachFile clasName="cursor-none" /><p className='text-sm font-light'>{truncateFileName(fileList[0].name)}</p>
                            <FaRegTrashAlt onClick={emptyFileList} className="text-red-500 cursor-pointer" />
                        </div> : null}</span>
                        <Button
                            type="primary"
                            onClick={handleImportData}
                            disabled={fileList.length === 0}
                            loading={uploading}
                            className='bg-blue-400 text-white'
                        >
                            {uploading ? 'Importing' : 'Start Import'}
                        </Button>

                    </div>
                }
            </div>
            <section className='sm:w-fit w-full mb-3 flex sm:flex-row flex-col gap-2'>
                <Button disabled={BulkActionArray.length == 0} onClick={() => setDeleteModalOpen(true)} className="sm:w-fit w-full " type="primary" size="large" danger icon={<FaRegTrashAlt />}>
                    Delete
                </Button>
                <Button disabled={BulkActionArray.length == 0} onClick={() => setBulkActionDrawer(true)} className=" hover:bg-gray-500 bg-gray-200" type="text" size="large" icon={<BsPencilSquare />} >
                    Bulk Action
                </Button>
                <Button onClick={() => setOpenAddCategory(true)} type="primary" className="sm:w-fit w-full bg-blue-500 " size="large" >
                    +   Add Category
                </Button>
            </section>
        </div>
    )
}
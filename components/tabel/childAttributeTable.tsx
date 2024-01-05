import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, message } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { useRouter } from 'next/navigation';

interface DataType {
    _id: string;
    name: {
        value: string
    };
    status: string;
}

export function ChildAttributeTable({ bulkActionArray,idMain, refresh, setRefresh, setPreFilledData, setOpenAddValue, setBulkActionArray }: any) {
    const [tableData, setTableData] = useState({})
    const [variantData, setVariantData] = useState([])
    const [loading, setloading] = useState(false)
    const [optionOfVariant,setOptionOfVariant]=useState("")
    const tableProps: TableProps<DataType> = {
        loading,
    };
    const [reload, setReload] = useState(false);
    const [skeleton, setSkeleton] = useState(true)
    const router = useRouter();
    const columns: ColumnsType<DataType> = [
        {
            title: "ID",
            dataIndex: "_id",
            render: (text: string) => <p className="text-xs">{text.slice(-4)}</p>,
        },
        {
            title: "NAME",
            dataIndex: "name",
            render: (text) => {
                if (text && text.value) {
                    return <p className='font-semibold'>{text.value}</p>;
                } else {
                    return null;
                }
            }
        },
        {
            title: 'TYPE',
            key: 'typecolumn',
            render: () => <span>{optionOfVariant}</span>, // Render the custom value for all rows
        },
        {
            title: "PUBLISHED",
            dataIndex: "status",
            render: (text: string, record) => {
                if (text === "show")
                    return <Switch checked onClick={()=>changeStatusOfVariant(record._id,"hide")}
                        checkedChildren={<CheckOutlined />} />
                return <Switch onClick={()=>changeStatusOfVariant(record._id,"show")} className="bg-red-500" checked={false} unCheckedChildren={<CloseOutlined />}
                />
            }
        },
        {
            title: "ACTIONS",
            render: (record: DataType) => <div className='flex justify-ceter gap-4  items-center'><FaEdit onClick={()=>{openDrawerwithData(record)}} className="text-lg hover:text-blue-500 cursor-pointer" /><FaRegTrashAlt onClick={()=>DeleteCompleteValue(record._id)}className="text-lg text-red-500 cursor-pointer" /></div>
        }
    ];
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            const selectedIDs = selectedRows.map(row => row._id);
            setBulkActionArray(selectedIDs);
        },
    };



    async function changeStatusOfVariant(id: string, status: string) {
        setloading(true)
        let body = {
            status: status
        }
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/attribute/variantsupdatestatus/${id}`, body)
            message.success(response.data.message)
            setRefresh(!refresh)
            setloading(false)

        } catch (error) {
            message.info("Network Issue")
            setloading(false)
        }
    }

    async function DeleteCompleteValue(id: string) {
        if(bulkActionArray.length==0){
        setloading(true)
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/attribute/deletechildattribute/${idMain}/${id}`)
            message.success(response.data)
            setRefresh(!refresh)
            setloading(false)
        } catch (error) {
            message.info("Network Issue")
            console.log(error)
            setloading(false)
        }
    }else{
        message.info("UnSelect Rows")
    }
    }

    function openDrawerwithData(data: object) {
        if(bulkActionArray.length==0){
        setPreFilledData(data)
        setOpenAddValue(true)
        }else{
            message.info("UnSelect Rows")
        }
    }

    useEffect(() => {
        if (!loading)
            setloading(true)
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/attribute/getattributebyid/${idMain}`);
                setOptionOfVariant(response.data.option)
                setTableData(response.data)
                setVariantData(response.data.variants)
            } catch (error) {
                message.info("Network Issue")
            }
            setloading(false);
            setReload(false);
            setSkeleton(false);
        };
        fetchData();
    }, [refresh]);



    return (
        skeleton ? <div className="p-3"><Skeleton className='mb-1 h-6' count={7} /></div> : (<div className=" pt-4 hide-scrollbar w-full overflow-x-auto">
            <Table
                {...tableProps}
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={variantData}
                rowKey="_id"
                pagination={{ total: variantData.length, showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`, }}
                className='hide-scrollbar'
                scroll={{ x: 'max-content' }}
            />
        </div>)
        // : (<div className="h-full  p-7"><Button loading={reload} onClick={() => { setReload(true); setRefresh(!refresh) }} className="bg-blue-500 text-white flex justify-center items-center gap-2" type="primary" size="large">{reload ? null : <LuRefreshCcw />}Refresh</Button></div>)
    )
}
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, message } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import { LuRefreshCcw } from "react-icons/lu";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { useRouter } from 'next/navigation';

interface DataType {
    _id: string;
    title: {
        value:string
    };
    name:{
        value:string
    };
    variants: [Object]
    option: string;
    type: string;
    status: string;
}

export function AttributeTable({BulkActionArray,tableData, setTableData, refresh, setRefresh, setPreFilledProduct, setOpenAddAttribute ,setBulkActionArray}: any) {
    const router = useRouter();
    const columns: ColumnsType<DataType> = [
        {
            title: "ID",
            dataIndex: "_id",
            render: (text: string) => <p className="text-xs">{text.slice(-4)}</p>,
        },
        {
            title: "NAME",
            dataIndex: "title",
            render: (text) => {
                if (text && text.value) {
                    return <p className='font-semibold'>{text.value}</p>;
                } else {
                    return null; // or handle the case appropriately
                }
            }
        },
        {
            title: "DISPLAY NAME",
            dataIndex: "name",
            render: (text) => {
                if (text && text.value) {
                    return <p className='font-semibold'>{text.value}</p>;
                } else {
                    return null;
                }
            }

        }, {
            title: "OPTION",
            dataIndex: "option",
            render: (text: string) => <p className="text-sm">{text}</p>,
        },
        {
            title: "PUBLISHED",
            dataIndex: "status",
            render: (text: string, record) => {
                if (text === "show")
                    return <Switch checked onClick={() => changeStatusOfAttribute(record._id, "hide")}
                        checkedChildren={<CheckOutlined />} />
                return <Switch onClick={() => changeStatusOfAttribute(record._id, "show")} className="bg-red-500" checked={false} unCheckedChildren={<CloseOutlined />}
                />
            }
        },
        {
            title: "VALUE",
            render: (record: DataType) => <FaEdit onClick={() => router.push(`/leads/catalog/attribute/${record.title.value}/${record._id}`)} className="text-lg hover:text-blue-500 cursor-pointer" />
        },
        {
            title: "ACTIONS",
            render: (record: DataType) => <div className='flex justify-ceter gap-4  items-center'><FaEdit onClick={() => openDrawerwithData(record)} className="text-lg hover:text-blue-500 cursor-pointer" /><FaRegTrashAlt onClick={() => DeleteCompleteAttribute(record._id)} className="text-lg text-red-500 cursor-pointer" /></div>
        }
    ];
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            const selectedIDs = selectedRows.map(row => row._id);
        setBulkActionArray(selectedIDs); 
        },
    };

    const [loading, setloading] = useState(false)
    // const [tableData, setTableData] = useState([])
    const tableProps: TableProps<DataType> = {
        loading,
    };
    const [reload, setReload] = useState(false);
    const [skeleton, setSkeleton] = useState(true)

    async function changeStatusOfAttribute(id: string, status: string) {
        setloading(true)
        let body = {
            status: status
        }
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/attribute/updatestatus/${id}`, body)
            message.success(response.data.message)
            setRefresh(!refresh)
            setloading(false)

        } catch (error) {
            message.info("Network Issue")
            setloading(false)
        }

    }
    async function DeleteCompleteAttribute(id: string) {
        if(BulkActionArray.length===0){
        setloading(true)
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/attribute/deleteattribute/${id}`)
            message.success(response.data.message)
            setRefresh(!refresh)
            setloading(false)

        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }else{
        message.info("Unselect Rows")
    }

    }

    function openDrawerwithData(data: object) {
        if(BulkActionArray.length===0){
        setPreFilledProduct(data)
        setOpenAddAttribute(true)
        }else{
            message.info("Unselect Rows")
        }
    }

    useEffect(() => {
        if (!loading)
            setloading(true)
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/attribute/getattributes`);
                setTableData(response.data)
            } catch (error) {
                message.info("Network Issue")
                console.log("error some");
            }
            setloading(false);
            setReload(false);

            setSkeleton(false);
        };
        fetchData();
    }, [refresh]);



    return (
        skeleton ? <div className="p-3"><Skeleton className='mb-1 h-6' count={7} /></div> :(<div className=" pt-4 hide-scrollbar w-full overflow-x-auto">
            <Table
                {...tableProps}
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={tableData}
                rowKey="_id"
                pagination={{ total: tableData.length, showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`, }}
                className='hide-scrollbar'
                scroll={{ x: 'max-content' }}
            />
        </div>) 
        // : (<div className="h-full  p-7"><Button loading={reload} onClick={() => { setReload(true); setRefresh(!refresh) }} className="bg-blue-500 text-white flex justify-center items-center gap-2" type="primary" size="large">{reload ? null : <LuRefreshCcw />}Refresh</Button></div>)
    )
}
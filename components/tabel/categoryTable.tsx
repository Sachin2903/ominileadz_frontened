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
    description: {
        value: string
    };
    name: {
        value: string
    };
    slug: string
    parentId: string
    parentName: string
    icon: string
    status: string;
    modifyChild: []
}

export function CategoryTable({ BulkActionArray, tableData, refresh, setRefresh, setPreFilledData, setOpenAddAttribute, setBulkActionArray }: any) {
    const router = useRouter();
    const [displayChild, setDisplayChild] = useState(false)
    const [manipulatedData, setManipulatedData] = useState([]);



    useEffect(() => {
        const updatedCategories = convertKeys(tableData);
        setManipulatedData(updatedCategories)
    }, [tableData])

    function convertKeys(categories: any) {
        return categories.map((category: any) => {
            const { children: modifyChild, ...rest } = category;
            const updatedCategory = {
                modifyChild: modifyChild && modifyChild.length > 0 ?
                    convertKeys(modifyChild) :
                    [],
                ...rest,
            };
            return updatedCategory;
        });
    }



    const columns: ColumnsType<DataType> = [
        {
            title: "ID",
            dataIndex: "_id",
            render: (text: string) => <p>{text.slice(-4)}</p>

        },
        {
            title: "ICON",
            dataIndex: "icon",
            render: (text: string) => <img className="w-12 h-14 border-4 shadow-xl border-white rounded-lg " src={text} width={10} alt="A" />,
        },
        {
            title: "NAME",
            dataIndex: "name",
            render: (text, record) => {
                if (text && text.value) {

                    return <div>
                        <p className={`font-semibold ${record.modifyChild.length>0?"text-blue-700":""}`}>{text.value}</p>
                        {
                            displayChild ?
                                record.modifyChild.map((e: any, i) => <p onClick={() => { router.push(`/leads/catalog/category/${e.name.value}/${e._id}`) }} className='text-blue-700 cursor-pointer my-1' key={i * 10}>{"->"} {e.name.value}</p>) : null
                        }

                    </div>;
                } else {
                    return null; // or handle the case appropriately
                }
            }
        },
        {
            title: "DESCRIPTION",
            dataIndex: "description",
            render: (text) => {
                if (text && text.value) {
                    return <p className='font-semibold'>{text.value}</p>;
                } else {
                    return null;
                }
            }

        },
        {
            title: "PUBLISHED",
            dataIndex: "status",
            render: (text: string, record) => {
                if (text === "show")
                    return <Switch checked onClick={() => changeStatusOfCategory(record._id, "hide")}
                        checkedChildren={<CheckOutlined />} />
                return <Switch onClick={() => changeStatusOfCategory(record._id, "show")} className="bg-red-500" checked={false} unCheckedChildren={<CloseOutlined />}
                />
            }
        },
        {
            title: "ACTIONS",
            render: (record: DataType) => <div className='flex justify-ceter gap-4  items-center'><FaEdit onClick={() => openDrawerwithData(record)} className="text-lg hover:text-blue-500 cursor-pointer" /><FaRegTrashAlt onClick={() => DeleteCompleteCategory(record._id)} className="text-lg text-red-500 cursor-pointer" /></div>
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

    async function changeStatusOfCategory(id: string, status: string) {
        setloading(true)
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/updatestatus/${id}/${status}`)
            message.success(response.data.message)
            setRefresh(!refresh)
            setloading(false)

        } catch (error) {
            message.info("Network Issue")
            setloading(false)
        }

    }
    async function DeleteCompleteCategory(id: string) {
        if (BulkActionArray.length === 0) {
            setloading(true)
            try {
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/category/deletecategory/${id}`)
                message.success(response.data.message)
                setRefresh(!refresh)
                setloading(false)

            } catch (error) {
                console.log(error)
                setloading(false)
            }
        } else {
            message.info("Unselect Rows")
        }

    }

    function openDrawerwithData(data: object) {
        if (BulkActionArray.length === 0) {
            setPreFilledData(data)
            setOpenAddAttribute(true)
            setRefresh(!refresh)
        } else {
            message.info("Unselect Rows")
        }
    }


    return (
        <>
            <Switch onClick={() => setDisplayChild(!displayChild)} className="bg-blue-500 my-2 text-white" checkedChildren="Parents Only" unCheckedChildren="All" defaultChecked />
            {/* skeleton ? <div className="p-3"><Skeleton className='mb-1 h-6' count={7} /></div> : (<div className=" pt-4 hide-scrollbar w-full overflow-x-auto"> */}
            <Table
                className="transition-all duration-300"
                {...tableProps}
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}

                scroll={{ x: 800 }}
                columns={columns}
                dataSource={manipulatedData}
                rowKey="_id"
                pagination={{ total: manipulatedData.length, showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`, }}
            />
            {/* // </div>) */}
            {/* : (<div className="h-full  p-7"><Button loading={reload} onClick={() => { setReload(true); setRefresh(!refresh) }} className="bg-blue-500 text-white flex justify-center items-center gap-2" type="primary" size="large">{reload ? null : <LuRefreshCcw />}Refresh</Button></div>) */}
        </>
    )
}
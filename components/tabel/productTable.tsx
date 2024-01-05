import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios';
import { Table, message } from "antd";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import type { ColumnsType, TableProps } from "antd/es/table";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";

interface DataType {
    _id: string;
    title: {
        value: string
    },
    description: {
        value: string
    },
    sku?: string;
    barcode?: string;
    slug: string;
    image: string[];
    category: object
    variants?: object[];
    categories: object[];
    tag?: string[];
    stock: number;
    sales: number;
    prices: object;
    isCombination: boolean;
    status: string;
}

export function ProductTable({editProductRefresh,setProductRefresh, loading, setloading,BulkActionArray, tableData, refresh, setRefresh, setPreFilledData, SetOpenAddProductDrawer, setBulkActionArray }: any) {
   
    const tableProps: TableProps<DataType> = {
        loading,
    };
    const columns: ColumnsType<DataType> = [
        {
            title: "ID",
            dataIndex: "_id",
            render: (text: string) => <p>{text.slice(-4)}</p>

        },

        {
            title: "PRODUCT NAME",
            dataIndex: "title",
            render: (text: { value: string }, record) => <div className='flex justify-center lg:justify-start items-center flex-wrap lg:flex-nowrap flex-grow  gap-2 w-fit p-1 '>
                <img className="w-11  h-12 border-4 shadow-xl border-white rounded-lg " src={record.image[0]} width={10} alt="A" />
                <p className='font-semibold break-words lg:mt-0 mt-1'>{text.value}</p>
            </div>,

        },
        {
            title: "CATEGORY",
            dataIndex: "category",
            render: (text) => <p>{text.name.value}</p>
        },
        {
            title: "PRICE",
            dataIndex: "prices",
            render: (text) => <div className='flex justify-start items-center gap-px'><MdOutlineCurrencyRupee className="text-green-600" /><p className='font-semibold'>{text.originalPrice}</p></div>

        },
        {
            title: "SALE Price",
            dataIndex: "prices",
            render: (text) => <div className='flex justify-start items-center gap-px'><MdOutlineCurrencyRupee className="text-green-600" /><p className='font-semibold'>{text.price}</p></div>

        },
        {
            title: "STOCK",
            dataIndex: "stock",
            render: (text: number) => <p>{text}</p>

        },
        {
            title: "STATUS",
            dataIndex: "stock",
            render: (text: number) => <p className={`rounded-lg px-2 py-1 font-medium text-center w-fit ${(text > 0) ? 'bg-green-300 text-green-700' : 'bg-red-300 text-red-600'}`}>{text > 0 ? "Selling" : "Sold out"}</p>
        },
        {
            title: "PUBLISHED",
            dataIndex: "status",
            render: (text: string, record) => {
                if (text === "show")
                    return <Switch checked onClick={() => changeStatusOfProduct(record._id, "hide")}
                        checkedChildren={<CheckOutlined />} />
                return <Switch onClick={() => changeStatusOfProduct(record._id, "show")} className="bg-red-500" checked={false} unCheckedChildren={<CloseOutlined />}
                />
            }
        },
        {
            title: "ACTIONS",
            render: (record: DataType) => <div className='flex justify-ceter gap-4  items-center'><FaEdit onClick={() => openDrawerwithData(record)} className="text-lg hover:text-blue-500 cursor-pointer" /><FaRegTrashAlt onClick={() => DeleteCompleteProduct(record._id)} className="text-lg text-red-500 cursor-pointer" /></div>
        }
    ];
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            const selectedIDs = selectedRows.map(row => row._id);
            setBulkActionArray(selectedIDs);
        },
    };

    async function changeStatusOfProduct(id: string, status: string) {
        setloading(true)
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/updateStatus/${id}/${status}`)
            message.success(response.data.message)
            setRefresh(!refresh)
        } catch (error) {
            message.info("Network Issue")
        }
        setloading(false)
    }
    async function DeleteCompleteProduct(id: string) {
        if (BulkActionArray.length === 0) {
            setloading(true)
            try {
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/products/deleteproductbyid/${id}`)
                message.success(response.data.message)
                setRefresh(!refresh)
                setloading(false)

            } catch (error) {
                setloading(false)
            }
        } else {
            message.info("Unselect Rows")
        }
    }

    function openDrawerwithData(data: any) {
        if (BulkActionArray.length === 0) {
            setPreFilledData(data._id)
            SetOpenAddProductDrawer(true)
            setProductRefresh(!editProductRefresh)
        } else {
            message.info("Unselect Rows")
        }
    }



    return (
        <>
            
            <Table
                className="transition-all duration-300"
                {...tableProps}
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
                scroll={{ x: 800 }}
                columns={columns}
                dataSource={tableData}
                rowKey="_id"
                pagination={{ total: tableData.length, showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,pageSize:7 }}
            />
           </>
    )
}
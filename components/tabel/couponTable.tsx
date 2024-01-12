"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Button, Table, message } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import dayjs from 'dayjs'
import { LuRefreshCcw } from "react-icons/lu";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { AiOutlinePercentage } from "react-icons/ai";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
interface DataType {
    _id: string;
    logo: string;
    title: Object;
    couponCode: string;
    startTime: string;
    endTime: string;
    discountType: Object;
    status: string;
    minimumAmount: string;
}



export function CouponTable({refresh, setRefresh, setPreFilledValue, preFilledValue, bulkActionArray, setBulkActionArray }: any) {
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            const selectedIDs = selectedRows.map(row => row._id);
                setBulkActionArray(selectedIDs);
        },
    
    };
    const columns: ColumnsType<DataType> = [
        {
            title: "CAMPAIGN NAME",
            dataIndex: "title",
            render: (text: { value: string }, record: DataType) => <div className='flex gap-2 justify-ceter items-center'><img className="w-12 h-13 border-4 shadow-xl border-white rounded-lg " src={record.logo} width={10} alt="A" /><p className="font-medium text-base">{text.value}</p></div>,
        },
        {
            title: "CODE",
            dataIndex: "couponCode",
            render: (text: string) => <p className='font-semibold'>{text}</p>
        },
        {
            title: "DISCOUNT",
            dataIndex: "discountType",
            render: (text: { type: string; value: string }) => {
                return text.type == "Percentage" ? (
                    <div className='flex justify-ceter items-center'>{text.value}<AiOutlinePercentage /></div>
                ) : (
                    <div className='flex justify-ceter items-center'><MdOutlineCurrencyRupee />{text.value}</div>
                );
            },
        },
        {
            title: "PUBLISHED",
            dataIndex: "status",
            render: (text: string, record) => {
                if (text === "show")
                    return <Switch checked onClick={() => changeCouponStatusFun(record._id, "hide")}
                        checkedChildren={<CheckOutlined />} />
                return <Switch onClick={() => changeCouponStatusFun(record._id, "show")} className="bg-red-500" checked={false} unCheckedChildren={<CloseOutlined />}
                />
            }
        },
        {
            title: "START DATE",
            dataIndex: "startTime",
            render: (text: string) => <p>{dayjs(text, 'DD-MM-YYYY HH:mm').format('MMM D, YYYY')}</p>,
        },
        {
            title: "END DATE",
            dataIndex: "endTime",
            render: (text: string) => <p>{dayjs(text, 'DD-MM-YYYY HH:mm').format('MMM D, YYYY')}</p>,
        },
        {
            title: "STATUS",
            dataIndex: "status",
            render: (text: string, record: DataType) => {
                const start = dayjs(record.startTime, 'DD-MM-YYYY HH:mm');
                const end = dayjs(record.endTime, 'DD-MM-YYYY HH:mm');
                const duration = end.diff(start, 'second');
                if (duration > 0)
                    return <p className="bg-blue-500 text-xs rounded-lg text-center text-white p-1">Active</p>
                return <p className="bg-red-500 text-xs rounded-lg text-center text-white p-1">Expired</p>
            }
        },
        {
            title: "ACTIONS",
            render: (_, record) => <div className='flex justify-ceter gap-4  items-center'><FaEdit className="text-lg hover:text-blue-500 cursor-pointer" /><FaRegTrashAlt onClick={() => deleteCouponFunction(record._id)} className="text-lg text-red-500 cursor-pointer" /></div>
        }
    ];
    const [loading, setLoading] = useState(false)
    const [tableData, setTableData] = useState([])
    const [loadingSkeleton, setLoadingSkeleton] = useState(true);
    const tableProps: TableProps<DataType> = {
        loading,
    };


    useEffect(() => {
        async function fetchData() {
            try {
                // console.log("targetCome")
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/coupon/getallcoupon`);
                setTableData(response.data)
                setLoadingSkeleton(false)
            } catch (error) {
                message.info("Network Issue")
                setLoadingSkeleton(false)
            }
        };
        fetchData();
    }, [refresh]);

    async function deleteCouponFunction(id: string) {
        if (bulkActionArray.length == 0) {
            setLoading(true)
            try {
                let response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/coupon/deletecoupon/${id}`)
                message.success(response.data.message)
                setRefresh(!refresh)
            } catch (error) {
                message.info("Fail To Delete Coupon Network Issue!")
                setLoading(false)
            }
            setLoading(false)
        }else{
            message.info("UnSelect Rows")
        }
    }
    async function changeCouponStatusFun(id: string, st: string) {
        if (bulkActionArray.length == 0) {
        setLoading(true)
        try {
            let response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/coupon/updatestatus/${id}/${st}`)
            message.success(response.data.message)
            setRefresh(!refresh)
        } catch (error) {
            message.info("Fail To Update Status Network Issue!")
            setLoading(false)
        }
        setLoading(false)
    }else{
        message.info("UnSelect Rows")
    }
}
    return (
        loadingSkeleton ? (<div className="p-5"><Skeleton className='h-7' count={6} /></div>) : tableData.length > 0 ? (<div className=" pt-4 hide-scrollbar w-full overflow-x-auto">
            <Table
                {...tableProps}
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={tableData}
                rowKey="_id"
                className='hide-scrollbar'
                scroll={{ x: 'max-content' }}
            />
        </div>) : (<div className="h-full  p-7"><Button onClick={() => { setRefresh(!refresh); setLoadingSkeleton(true) }} className="bg-blue-500 text-white flex justify-center items-center gap-2" type="primary" size="large"><LuRefreshCcw />Refresh</Button></div>)
    )
}
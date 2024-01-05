"use client"
import ImgCrop from 'antd-img-crop';
import { Button, Drawer, Input, Radio, DatePicker, Space, Modal, message, MenuProps, Dropdown, Upload, Switch } from 'antd';
import { useState } from 'react';
import { AiOutlinePercentage } from "react-icons/ai";
import { BsFiletypeJson, BsPencilSquare } from "react-icons/bs";
import { BiCloudUpload } from "react-icons/bi"
import { CiExport, CiImport } from "react-icons/ci";
import { FaFileCsv } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios';
import { CouponTable } from '@/components/tabel/couponTable';
const { RangePicker } = DatePicker;
const { Search } = Input;
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



type MyFile = UploadFile<any>;
export default function Coupon() {
    const [messageApi, contextHolder] = message.useMessage();
    const [refresh, setRefresh] = useState(true);
    const [imagee, setImagee] = useState("")
    const [toggleType, setToggleType] = useState(true)
    const [importToggle, setImportToggle] = useState(false)
    const [fileList, setFileList] = useState<MyFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openBulk, setOpenBulk] = useState(false);
    const [openAddCoupon, setOpenAddCoupon] = useState(false);
    const [couponBanner, setCouponBanner] = useState([
    ]);
    const [statusAddCoupon, setStatusAddCoupon] = useState("hide")
    const [campaign, setCampaign] = useState("")
    const [code, setCode] = useState("")
    const [dateAddCoupon, setDateAddCoupon] = useState([])
    const [discount, SetDiscount] = useState("");
    const [minValueReq, setMinValueReq] = useState("");
    const [preFilledValue, setPreFilledValue] = useState({});
    const [mainLoader, setMainLoader] = useState(false)
    const [bulkActionArray, setBulkActionArray] = useState([])
    const [deleteLoader, setDeleteLoader] = useState(false)
    function campaignFun(e: any) {
        let value: string = e.target.value;
        let regex = /^[A-Za-z\s]{0,20}$/
        if (!regex.test(value)) {
            messageApi.open({
                type: 'warning',
                content: ' Not Allow! ',
            });
        } else {
            setCampaign(value)
        }
    }
    function codeFun(e: any) {
        let value: string = e.target.value;
        let regex = /^[A-Za-z0-9]{0,15}$/
        if (!regex.test(value)) {
            messageApi.open({
                type: 'warning',
                content: ' Not Allow! ',
            });
        } else {
            setCode(value.toUpperCase())
        }

    }

    function handleDiscount(e: any) {
        let value = e.target.value
        console.log('value', value);
        let regex = /^[1-9][0-9]*$/
        if (value.length == 0) {
            SetDiscount("")
        }
        else if (!regex.test(value)) {
            messageApi.open({
                type: 'warning',
                content: ' Not Allow! ',
            });
        } else {
            SetDiscount(value)
        }
    }
    function handleMinValue(e: any) {
        let value = e.target.value

        let regex = /^[1-9][0-9]{0,8}$/
        if (value.length == 0) {
            setMinValueReq("")
        }
        else if (!regex.test(value)) {
            messageApi.open({
                type: 'warning',
                content: ' Not Allow! ',
            });
        } else {
            setMinValueReq(value)
        }
    }


    //Bulk Drawer Handle function 
    const showDefaultDrawerBulk = () => {
        setOpenBulk(true);
    };
    const onCloseBulk = () => {
        setOpenBulk(false);
    };


    const onChangeDateAddCoupon = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: any,
    ) => {
        setDateAddCoupon(dateString)
    };


    //Image handler
    const onChangeImage: UploadProps['onChange'] = ({ fileList: newFileList }: { fileList: any }) => {
        const file = newFileList[0]

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj as RcFile);
            reader.onload = () => {
                setImagee(reader.result as string);
                setFileList(newFileList);
            };
        }

        setCouponBanner(newFileList);
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };


    //Main Drawer Hnadle Function
    const showDrawer = () => {
        setOpenAddCoupon(true);
    };

    const showDeleteModal = () => {
        setOpenDeleteModal(true);
    };

    const showDeleteModalOKbutton = () => {
        setOpenDeleteModal(true);
    };

    const handelCancelDeleteModal = () => {
        setOpenDeleteModal(false);
    };
    const handleUpload = () => {
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
        },
        fileList,
    };

    function SearchFun() {
        console.log('seach');
    }

    const disabledDate = (current: any) => {
        return current && current < moment().startOf('day');
    };

    async function submitCouponData() {
        let data = {
            "title": {
                "value": campaign
            },
            "logo": "//www.html.am/images/html-codes/links/boracay-white-beach-sunset-300x225.jpg",
            "couponCode": code,
            "startTime": dateAddCoupon[0],
            "endTime": dateAddCoupon[1],
            "discountType": {
                "type": toggleType ? "Fixed" : "Percentage",
                "value": discount
            },
            "minimumAmount": minValueReq,
            "status": statusAddCoupon
        }
        const result = await axios.post("http://localhost:3333/coupon/addcoupon", data)
        console.log(result.data)
    }

    const onClose = () => {
        setOpenAddCoupon(false);
        setCouponBanner([])

    };
    function statusFun(e: boolean) {
        if (e)
            setStatusAddCoupon("show")
        else
            setStatusAddCoupon("hide")
    }


    async function functionToDeleteMany() {
        if (bulkActionArray.length == 0) {
            message.info("Please Select Coupons")
        } else {
            setDeleteLoader(true)
            try {
                let body={
                    ids:bulkActionArray
                }
                let response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/coupon/deletemany`,{data:body})
                message.success(response.data.message)
                setBulkActionArray([])
                setRefresh(!refresh)
            } catch (error) {
                setDeleteLoader(false)
                message.info("Fail To Delete Selected Coupons Network Issue!")
            }
            setDeleteLoader(false)
        }
    }

    
    return (
        <div className="overflow-y-auto  w-full bg-gray-100 h-full p-3">
            {contextHolder}
            <h1 className="semibold text-lg">Coupon </h1>

            <Drawer
                title={
                    <div  >
                        <h5 className="text-xl mb-1">Add Coupon</h5>
                        <p >Add your coupon and necessary information from here</p>
                    </div>
                }
                placement="right"
                width={500}
                closeIcon={false}
                onClose={onClose}
                open={openAddCoupon}
                extra={
                    <Space>
                        <Button size="large" className="bg-gray-100 text-black" onClick={onClose}>Cancel</Button>
                        <Button onClick={submitCouponData} size="large" className="bg-blue-600 hover:bg-blue-600 text-white" type="primary" >
                            Add Coupon
                        </Button>
                    </Space>
                }
            >

                <div className="  w-full h-full ">
                    <table className='h-full w-full'>
                        <tbody className=''>
                            <tr className=''>
                                <td className=' w-[23%] text-semibold text-sm'>Coupon Banner Image</td>
                                <td className=' pl-4'> <ImgCrop rotationSlider>
                                    <Upload
                                        // accept=".jpg .svg"
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        listType="picture-card"
                                        fileList={couponBanner}
                                        onChange={onChangeImage}
                                        onPreview={onPreview}
                                    >

                                        {couponBanner.length < 1 ? (<div className="flex flex-col justify-center items-center gap-1">
                                            <BiCloudUpload className="text-blue-700 text-lg" />
                                            <h3>Drag your images here</h3>

                                        </div>) : null}
                                    </Upload>
                                </ImgCrop>
                                </td>
                            </tr>
                            <tr>
                                <td className=' w-[23%] text-semibold text-sm'>Campaign Name</td>
                                <td className=''><Input value={campaign} onChange={campaignFun} type="text" placeholder="Campaign Name" /></td>
                            </tr>
                            <tr>
                                <td className=' w-[23%] text-semibold text-sm'>Campaign Code</td>
                                <td className=''><Input onChange={codeFun} value={code} placeholder="Campaign Code" /></td>
                            </tr>
                            <tr>
                                <td className=' w-[23%] text-semibold text-sm'>Coupon Validity Time</td>
                                <td className=''> <RangePicker showTime={{ format: 'HH:mm' }}
                                    format="DD-MM-YYYY HH:mm" className="" disabledDate={disabledDate}
                                    onChange={onChangeDateAddCoupon} />
                                </td>
                            </tr>
                            <tr>
                                <td className=' w-[23%] text-semibold text-sm'>Discount Type</td>
                                <td className=''><Switch onClick={() => setToggleType(!toggleType)} className='bg-green-500 ' checkedChildren="Percentage" unCheckedChildren="Fixed" /></td>
                            </tr>
                            <tr>
                                <td className=' w-[23%] text-semibold text-sm'>DISCOUNT</td>
                                <td className=''><Input value={discount} onChange={handleDiscount} type="text" prefix={toggleType ? <MdCurrencyRupee /> : <AiOutlinePercentage />} placeholder={toggleType ? "Fixed Amount" : "Percentage"} /></td>
                            </tr>
                            <tr>
                                <td className=' w-[23%] text-semibold text-sm'>Minimum Amount</td>
                                <td className=''><Input value={minValueReq} onChange={handleMinValue} prefix={<MdCurrencyRupee />} type="text" placeholder="Minimum amount required" /></td>
                            </tr>
                            <tr>
                                <td className=' w-[23%] text-semibold text-sm'>Published</td>
                                <td className=''><Switch onChange={statusFun} className="bg-red-500" checkedChildren="Yes" unCheckedChildren="No" /></td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </Drawer>

            {/* Bulk Action Drawer */}
            <Drawer
                title={
                    <div  >
                        <h5 className="text-xl mb-1">Update Selected Coupons</h5>
                        <p >Apply changes to the selected Coupons from the list</p>
                    </div>
                }

                closeIcon={false}
                placement="top"
                onClose={onCloseBulk}
                open={openBulk}
                extra={
                    <Space>
                        <Button className="bg-gray-100 text-black" onClick={onCloseBulk}>Cancel</Button>
                        <Button className="bg-blue-600 hover:bg-blue-600 text-white" type="primary" onClick={onCloseBulk}>
                            Bulk Update Coupons
                        </Button>
                    </Space>
                }
            >
                <table className='h-[50%] w-full'>
                    <tbody className=''>
                        {/* <tr>
                            <td className=' w-[23%] text-semibold text-sm'>Start Time</td>
                            <td className=''> <DatePicker className="" disabledDate={disabledDate}
                                showTime onChange={onChangeDate} onOk={onOk} /></td>
                        </tr>
                        <tr>
                            <td className=' w-[23%] text-semibold text-sm'>End Time</td>
                            <td className=''> <DatePicker className="" disabledDate={disabledDate}
                                showTime onChange={onChangeDate} onOk={onOk} /></td>
                        </tr>
                        <tr> */}
                        {/* <td className=' w-[23%] text-semibold text-sm'>Published</td>
                            <td className=''><Switch className="bg-red-500" checkedChildren="Yes" unCheckedChildren="No" /></td>
                        </tr> */}
                    </tbody>
                </table>

            </Drawer>





            {/* delete coupon modal   */}
            <Modal
                open={openDeleteModal}
                footer={[
                    <Button onClick={handelCancelDeleteModal}>
                        No, Keep it
                    </Button>,
                    <Button
                        loading={deleteLoader}
                        danger
                        type="primary"
                        onClick={functionToDeleteMany}
                    >
                        Yes, Delete it
                    </Button>,
                ]}
            >
                <div className=' gap-0.5   flex flex-col justify-center items-center '>
                    <FaRegTrashAlt className="mb-6 text-red-600 text-2xl " />
                    <h3 className=' font-semibold text-lg break-keep '>Are You Sure! Want to Delete <span className='text-red-600'>Selected Coupon</span>?</h3>
                    <p className='text-center'>Do you realyy want to dekete these records? you can't view this in your list anymore if you delete!</p>
                </div>
            </Modal>

            {/* first div */}
            <div className="min-w-0 flex-wrap bg-white flex lg:justify-between items-center p-2 py-6 mt-4 shadow-lg  rounded  mb-5">
                <div className="flex  gap-2  justify-start ">
                    <Dropdown menu={{ items }} placement="bottomLeft" >
                        <Button type="dashed" icon={<CiExport />} >
                            Export
                        </Button>
                    </Dropdown>

                    <Button type="dashed" onClick={() => setImportToggle(!importToggle)} icon={<CiImport />} >
                        Import
                    </Button>
                    {
                        importToggle && <div className=' px-1 flex justify-center items-center gap-1'>
                            <Upload className='flex justify-center items-center gap-1' maxCount={1} accept=".json" {...props}>
                                <Button icon={< BiCloudUpload />}>Select JSON Products File

                                </Button>
                            </Upload>
                            <Button
                                type="primary"
                                onClick={handleUpload}
                                disabled={fileList.length === 0}
                                loading={uploading}
                                className='bg-blue-400 text-white'
                            >
                                {uploading ? 'Importing' : 'Start Import'}
                            </Button>

                        </div>
                    }
                </div>
                <section className='flex gap-2'>
                    <Button disabled={bulkActionArray.length == 0} type="primary" size="large" onClick={showDeleteModal} danger icon={<FaRegTrashAlt />}>
                        Delete
                    </Button>
                    <Button disabled={bulkActionArray.length == 0} onClick={showDefaultDrawerBulk} className=" bg-gray-200" type="text" size="large" icon={<BsPencilSquare />} >
                        Bulk Action
                    </Button>
                    <Button onClick={showDrawer} type="primary" className="bg-blue-500 " size="large" >
                        + Add Coupon
                    </Button>
                </section>

            </div >


            <div className="p-3 mb-5 gap-3 flex bg-white justify-between items-center flex-wrap py-6 w-full  rounded">
                <Search
                    className='flex-grow w-[45%]'
                    placeholder="Search by coupon code/name"
                    allowClear
                    enterButton
                    size="large"
                    onSearch={SearchFun}

                />
                <div>
                    <Button type="primary" className="bg-blue-500 w-[250px] px-4 " size="large" >
                        Filter
                    </Button>
                    <Button className="w-[250px] hover:bg-gray-900 bg-gray-200 px-4 ml-4" type="text" size="large"  >
                        Reset
                    </Button>
                </div>
            </div>

            <div className="px-4   mt-2 bg-white shadow-lg rounded">
                <CouponTable refresh={refresh} setRefresh={setRefresh} bulkActionArray={bulkActionArray} setBulkActionArray={setBulkActionArray} preFilledValue={preFilledValue} setPreFilledValue={setPreFilledValue} />
            </div>
        </div>
    )
}

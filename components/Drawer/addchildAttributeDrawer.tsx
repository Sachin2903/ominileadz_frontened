"use client"
import { useEffect, useState } from 'react';
import { Button, Drawer, message, Input, Select, Space, Spin, Switch } from 'antd';
import Search from 'antd/es/input/Search';
import { RxCrossCircled } from "react-icons/rx";
import axios from 'axios';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
const options = [
    {
        value: 'Dropdown',
        label: 'Dropdown',
    },
    {
        value: 'Radio',
        label: 'Radio',
    },
];
type Variant = {
    name: { value: string };
    status: string;
};

export function AddChildAttributeDrawer({idMain, openAddValue, setOpenAddValue, refresh, setRefresh, preFilledData, setPreFilledData }: any) {
    const [messageApi, contextHolder] = message.useMessage()
    const [displayName, setDisplayName] = useState("");
    const [addLoading, setAddLoading] = useState(false);
    const [nameRequire, setNameRequire] = useState(false)
    const [dataAdded, setDataAdded] = useState(false);
    const [mainLoader, setMainLoader] = useState(false)
    const [status, setStatus] = useState("show")

    useEffect(() => {
        if (preFilledData._id) {
            setMainLoader(true)
            setDisplayName(preFilledData.name.value)
            setStatus(preFilledData.name.status)
        }
        let timeoutId = setTimeout(() => {
            setMainLoader(false)
        }, 1000)
        return () => {
            clearTimeout(timeoutId);
        };

    }, [preFilledData])



    const onCloseAddAttributeDrawer = () => {
        if (dataAdded)
            setRefresh(!refresh)
        setOpenAddValue(false);
        setPreFilledData({})
        setDataAdded(false)
        setDisplayName("");
        setStatus("show")
    };


    function changeDisplayNameFun(e: any) {
        if (nameRequire)
            setNameRequire(false)
        let value = e.target.value;
        const regex = /^[a-zA-Z]+$/
        if (value.length == 0)
            setDisplayName("")
        else if (regex.test(value)) {
            setDisplayName(value)
        } else {
            let error = value.slice(-1)
            messageApi.open({
                type: "warning",
                content: `${error} Is Not Allow`
            })
        }
    }


    async function addAttributeDataToBackend() {
        setAddLoading(true)
        let flag = false
        if (true) {
            if (!(displayName.trim().length > 0)) {
                setNameRequire(true)
                flag = true
            }
        }
        if (flag) {
            setAddLoading(false);
        } else {
            let data = {
                name: {
                    value: displayName.trim()
                },
                status:status
            }
            try {
                if (preFilledData._id) {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/attribute/updatemanychildattribute/${preFilledData._id}`, data)
                    message.success(response.data.message)
                } else {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/attribute/addnewchildattribute/${idMain}`, data)
                    message.success(response.data)
                }
                setNameRequire(false)
                setDisplayName("");
                setDataAdded(true)
                setAddLoading(false);
            } catch (error) {
                setAddLoading(false)
                message.info("Network Issue")
            }
        }
    }

    function changeStatusFun(e: boolean) {
        if (e)
            setStatus("show")
        else
            setStatus("hide")
    }




    return (

        <Drawer
            title={
                <div  >
                    <h5 className="text-xl mb-1">{preFilledData._id ? "Update " : "Add "}Value</h5>
                    <p>{preFilledData._id ? "Update " : "Add "} your value and necessary information from here</p>
                </div>
            }
            placement="right"
            width={500}
            destroyOnClose={true}
            closeIcon={false}
            onClose={onCloseAddAttributeDrawer}
            open={openAddValue}
            extra={
                <Space>
                    <Button className="bg-gray-100" onClick={onCloseAddAttributeDrawer}>Cancel</Button>
                    <Button disabled={mainLoader} loading={addLoading} className="bg-blue-700 text-white" type="primary" onClick={addAttributeDataToBackend}>
                        {preFilledData._id ? "Update Value" : "Add Value"}
                    </Button>
                </Space>
            }
        >
            <Spin size="large" spinning={mainLoader}>
                <table className=' w-full h-[30vh]' >
                    <tbody className=' w-full'>
                        <tr >
                            <td className=' w-[25%] text-semibold text-sm'>Display Name</td>
                            <td className=''><Input placeholder="Color , Size , Dimension , Material , Fabric" onChange={changeDisplayNameFun} value={displayName} />{nameRequire ? <p className='text-red-500'>required</p> : null}</td>
                        </tr>
                        <tr>
                            <td className=' w-[25%] text-semibold text-sm'>Published</td>
                            <td>{preFilledData._id?preFilledData.status=="show"?<Switch defaultChecked onChange={changeStatusFun} className="bg-red-500" checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />:<Switch defaultChecked={false} onChange={changeStatusFun} className="bg-red-500" checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />:<Switch defaultChecked onChange={changeStatusFun} className="bg-red-500" checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />}
                            </td>
                        </tr>
                    </tbody>
                </table>
                {contextHolder}
            </Spin>
        </Drawer>

    )
}
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, message, Select, Space, Switch } from "antd";
import axios from "axios";
import { useState } from "react";
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
export function AttributeBulkActionDrawer({ bulkActionDrawer, setBulkActionDrawer, refresh, setRefresh, BulkActionArray }: any) {
    const [optionBulk, setOptionBulk] = useState<null | string>(null);
    const [status, setStatus] = useState("show");
    const [messageApi, contextHolder] = message.useMessage()
    const [bulkLoading, setBulkLoading] = useState(false)
    const [optionError, SetOptionError] = useState(false)
    async function BulkActionDrawer() {
        let flag: boolean = true;
        if (!optionBulk) {
            SetOptionError(true)
            flag = false;
        }
        if (flag) {
            setBulkLoading(true)
            try {
                let data = {
                    ids: BulkActionArray,
                    body: {
                        option: optionBulk,
                        status: status
                    }
                }
                const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/attribute/updatemanyattribute`, data)
                message.success(response.data.message)
                setBulkLoading(false)
                setBulkActionDrawer(false);
                setStatus("show")
                setOptionBulk(null)
                setRefresh(!refresh)
                

            } catch (error) {
                message.success("Network Issue!")
            }
        }
    };


    function onCloseBulkActionDrawer() {
        setBulkActionDrawer(false);
        setStatus("show")
        setOptionBulk(null)
    }
    function changeOptionFun(value: string) {
        if (optionError)
            SetOptionError(false)

        if (value === "Dropdown" || value === "Radio")
            setOptionBulk(value)
        else
            message.info("Network Issue Try Again !")
    }
    function statusFunction(e: boolean) {
        if (e)
            setStatus("show")
        setStatus("hide")

    }

    return (
        <Drawer
            title={
                <div  >
                    <h5 className="text-xl mb-1">Update Selected Attributes</h5>
                    <p>Apply changes to the selected Attributes from the list</p>
                </div>
            }
            closeIcon={false}
            destroyOnClose={true}
            placement="top"
            width={200}
            onClose={onCloseBulkActionDrawer}
            open={bulkActionDrawer}
            extra={
                <Space>
                    <Button onClick={onCloseBulkActionDrawer}>Cancel</Button>
                    <Button loading={bulkLoading} className="bg-blue-700 text-white" type="primary" onClick={BulkActionDrawer}>
                        Bulk Update Attributes
                    </Button>
                </Space>
            }
        >
            <table className=' w-full h-[50%]' >
                <tbody className=' w-full'>
                    <tr >
                        <td className=' w-[25%] text-semibold text-sm'>Options</td>
                        <td className=''><Select onChange={changeOptionFun} placeholder="Select an option" className='w-[50%]' options={options} />{optionError ? <p className="text-red-500">required</p> : null}
                        </td>
                    </tr>
                    <tr >
                        <td className=' w-[25%] text-semibold text-sm'>Published</td>
                        <td className=''> <Switch onChange={statusFunction} className="bg-red-500"
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked
                        /></td>
                    </tr>
                </tbody>
            </table>
            {contextHolder}
        </Drawer>
    )
}
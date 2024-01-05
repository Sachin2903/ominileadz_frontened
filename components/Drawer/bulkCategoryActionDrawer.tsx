"use client"
import { Button, Drawer, Input, Space, message, Switch, Tree, Spin } from 'antd';
import { useEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios';

interface Category {
    title: string;
    key: string,
}
interface addCategoryDataInterface {
    description: {
        value: string
    };
    parentId?: string;
    parentName?: string
    icon?: string
    status: string;
}
const { TextArea } = Input;
interface TreeNode {
    title: string;
    key: string;
    children?: TreeNode[];
    disabled?: boolean;

}
export function BulkCategoryActionDrawer({ setTreeData, treeData, refresh, setRefresh, bulkActionDrawer, setBulkActionDrawer, BulkActionArray, setBulkActionArray }: any) {
    const [mainLoading, setMainLoading] = useState(false);
    const [loading, setLoading] = useState(false)
    const [selectCategoryName, setSelectCategoryName] = useState<Category>({
        title: "Home",
        key: "0-0-0-0-0-0-0-0-0-0"
    });
    const [messageApi, contextHolder] = message.useMessage()
    const [description, setDescription] = useState("");
    const [descriptionRequire, setDescriptionRequire] = useState(false)
    const [status, setStatus] = useState("show")
    const [updated, setUpdated] = useState(false);
    // function related to tree structure

    useEffect(() => {
        const disableNodesRecursively = (data: TreeNode[], disabledKeys: string[]): TreeNode[] => {
            return data.map((node: any) => {
                const disabled = disabledKeys.includes(node.key);
                return {
                    ...node,
                    disabled,
                    children: disabled ? [] : disableNodesRecursively(node.children, disabledKeys)
                    // children: node.children ? disableNodesRecursively(node.children, disabled ? [] : disabledKeys) : undefined,
                };
            });
        };
        let newArray = disableNodesRecursively(treeData, BulkActionArray)
        setTreeData(newArray)
    }, [bulkActionDrawer])



    const updateCategoriesFunction = async () => {
        setLoading(true)
        let flag = true;
        if (description.trim().length == 0) {
            setDescriptionRequire(true);
            flag = false;
        }
        if (flag) {
            try {
                const addCategoryData: addCategoryDataInterface = {
                    description: {
                        value: description
                    },
                    status: status
                }
                if (selectCategoryName.title !== "Home" && selectCategoryName.key !== "0-0-0-0-0-0-0-0-0-0") {
                    addCategoryData.parentId = selectCategoryName.key;
                    addCategoryData.parentName = selectCategoryName.title
                }
                let body={
                    ids:BulkActionArray,
                    updatedData:addCategoryData
                }
                let response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/category/updatemanycategories`, body)
                message.success(response.data.message)
                setRefresh(!refresh)
                setMainLoading(true)
                setTimeout(() => {
                    setMainLoading(false)
                }, 800)
                setDescription("")
                setStatus("show")
                setSelectCategoryName({
                    title: "Home",
                    key: "0-0-0-0-0-0-0-0-0-0"
                })
                setBulkActionArray([])
                
            } catch (error) {
                setLoading(false)
                message.info(`Failed to  Update Category`)
            }
        } else {
            message.info("Please Check All fields")
        }
        setLoading(false);
    }


    const onCloseBulkAction = () => {
        setBulkActionDrawer(false);
        setDescription("")
        setStatus("show")
        setSelectCategoryName({
            title: "Home",
            key: "0-0-0-0-0-0-0-0-0-0"
        })
        setRefresh(!refresh)
    };


    function changeDescriptionFun(e: any) {
        if (descriptionRequire)
            setDescriptionRequire(false)
        let value = e.target.value;
        const regex = /^[a-zA-Z0-9\s&]+$/
        if (value.length == 0)
            setDescription("")
        else if (regex.test(value)) {
            setDescription(value)
        } else {
            let error = value.slice(-1)
            messageApi.open({
                type: "warning",
                content: `${error} Is Not Allow`
            })
        }
    }

    function statusFun(e: boolean) {
        if (e)
            setStatus("show")
        else {
            setStatus("hide")
        }
    }

    return (
        <Drawer
            title={
                <div  >
                    <h5 className="text-xl mb-1">Update Selected Category</h5>
                    <p >Apply changes to the selected Categories from the list</p>
                </div>
            }
            destroyOnClose={true}
            placement="top"
            width={500}
            closeIcon={false}
            onClose={onCloseBulkAction}
            open={bulkActionDrawer}
            extra={
                <Space>
                    <Button disabled={loading} size="large" className="bg-gray-100 text-black" onClick={onCloseBulkAction}>Cancel</Button>
                    <Button disabled={BulkActionArray.length==0} onClick={updateCategoriesFunction} loading={loading} size="large" className="bg-blue-600 hover:bg-blue-600 text-white" type="primary" >
                        Bulk Update Categories                   </Button>
                </Space>
            }
        >
            {contextHolder}
            <Spin size="large" spinning={mainLoading}>
                <table className='w-full'>
                    <tbody >
                        <tr >
                            <td className=' w-[25%] text-semibold text-sm'>Description</td>
                            <td className=''> <TextArea className="mt-4" showCount maxLength={100} onChange={changeDescriptionFun} value={description} placeholder="Category Description" />{descriptionRequire ? <p className='text-red-500'>required</p> : null}
                            </td>
                        </tr>
                        <tr>
                            <td className=' w-[23%] text-semibold text-sm'>Parent Category</td>
                            <td className=''> <Input className="mt-5 mb-1" readOnly value={selectCategoryName.title !== "Home" && selectCategoryName.key !== "0-0-0-0-0-0-0-0-0-0" ? selectCategoryName.title : "Home"} placeholder="ParentCategory"
                                type="text" />
                                <Tree
                                    selectedKeys={[selectCategoryName.key]}
                                    className="hide-scrollbar mb-4 overflow-y-scroll max-h-[260px]"
                                    showLine
                                    treeData={treeData}
                                    onSelect={(i: any, e: any): void => {
                                        let obj: any = {
                                            title: e.node.title,
                                            key: e.node.key
                                        }
                                        if (obj.title != selectCategoryName.title && obj.key != selectCategoryName.key) {
                                            setSelectCategoryName(obj);
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className=' w-[23%] text-semibold text-sm'>Published</td>
                            <td className=''><Switch defaultChecked onChange={statusFun} className="bg-red-500" checkedChildren="Yes" unCheckedChildren="No" /></td>
                        </tr>

                    </tbody>
                </table>
            </Spin>
        </Drawer>
    )
}
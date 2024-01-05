import { useState } from "react";
import { Button, Drawer, Select, Switch, Tree, message } from 'antd';
import axios from "axios";
import { RxCrossCircled } from "react-icons/rx";
import Search from "antd/es/input/Search";

interface multiCategoryInterface {
    title: string,
    key: string,
    value: string,
    label: string
}

export default function BulkActionDrawer({ BulkActionArray, treeData, allCategories, refresh, setRefresh, bulkActionDrawer, setBulkActionDrawer }: any) {
    const [messageApi, contextHolder] = message.useMessage()
    const [selectedLabel, setSelectedLabel] = useState<null | string>(null)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState("show")
    const [multiCategory, setMultiCategory] = useState<multiCategoryInterface[]>([])
    const [multiCategoryRequire, setMultiCategoryRequire] = useState(false)
    const [defaultCategory, setDefaultCategory] = useState("")
    const [defaultCategoryRequire, setDefaultCategoryRequire] = useState(false)
    const [tag, setTag] = useState<string[]>([])
    const [tagText, setTagText] = useState("")
    function functionThatResetAll() {
        setMultiCategory([])
        setDefaultCategory("")
        setTag([])
        setTagText("")
        setSelectedLabel(null)
        setStatus("show")
    }


    async function bulkUpdateProductFunction() {
        setLoading(true)
        let flag = true;
        if (multiCategory.length == 0) {
            setMultiCategoryRequire(true)
            flag = false;
        }
        if (defaultCategory.length == 0) {
            setDefaultCategoryRequire(true)
            flag = false;
        }
        if (flag) {
            try {
                let idMultiCategories = multiCategory.map(e => e.key)
                let body = {
                    ids: BulkActionArray,
                    data: {
                        tag: tag,
                        categories: allCategories.filter((item: any) => {
                            if (idMultiCategories.includes(item._id))
                                return true
                            return false
                        }),
                        category: allCategories.find((item: any) => item._id === defaultCategory),
                        status: status
                    }
                }
                let response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/products/updatemanyproducts`, body)
                setRefresh(!refresh)
                message.success(response.data.message)
                functionThatResetAll()
            } catch (error) {
                message.error("Failed To Add Product Network Issue!")
            }
        }
        setLoading(false)
    }

    const onCloseBulkUpdateProductDrawer = () => {
        setBulkActionDrawer(false);
        functionThatResetAll()
    };
    function statusFun(e: boolean) {
        if (e)
            setStatus("show")
        else {
            setStatus("hide")
        }
    }

    function ToRemoveFromMultiCategory(e: number, value: string) {
        let newArray = multiCategory.filter((item, index) => index !== e)
        setMultiCategory(newArray)
        if (newArray.length == 0) {
            setDefaultCategory("")
            setSelectedLabel(null)
            setDefaultCategoryRequire(true)
        }
        message.success(`Successfully ${value} Deleted`)
    }
    function ToRemoveFromTags(e: number, value: string) {
        let newArray = tag.filter((item, index) => index !== e)
        setTag(newArray)
        message.success(`Successfully ${value} Deleted`)
    }


    function tagChangeFun(e: any) {
        let value = e.target.value;
        const regex = /^[a-zA-Z\s0-9]+$/
        if (value.length == 0)
            setTagText("")
        else if (regex.test(value)) {
            setTagText(value)
        } else {
            let error = value.slice(-1)
            messageApi.open({
                type: "warning",
                content: `${error} Is Not Allow`
            })
        }
    }


    function addTagFun() {
        if (tagText.length > 0) {
            let str = tagText.trim()
            if (tag.length == 20) {
                message.error("Exceed the Limit")
                setTagText("")
            } else {
                setTag([...tag, str])
                setTagText("")
                message.success("Successfully Added")
            }
        }
    }



    return (
        <>
            {contextHolder}
            <Drawer title={<div className=" w-full flex"  >
                <aside className=" flex-grow">
                    <h5 className="text-xl mb-1">Update Selected Products</h5>
                    <p >Apply changes to the selected Products from the list</p>
                </aside>
                <aside className="flex-grow">
                    <Button disabled={loading} size="large" className="m-2 bg-gray-100 text-black" onClick={onCloseBulkUpdateProductDrawer}>Cancel</Button>
                    <Button onClick={bulkUpdateProductFunction} loading={loading} size="large" className="bg-blue-600 m-2 hover:bg-blue-600 text-white" type="primary" >
                       Bulk Update Products
                    </Button>
                </aside>

            </div>} destroyOnClose={true} width={300} placement="top" closable={false} onClose={onCloseBulkUpdateProductDrawer} open={bulkActionDrawer}>

                <table className='w-full'>
                    <tbody>
                        <tr>
                            <td className=' w-[28%] text-semibold text-sm'>Category</td>
                            <td>
                                <div className="bg-gray-50 my-2 p-2 rounded-lg gap-2 flex flex-wrap w-full min-h-[56px]">{multiCategory.map((e: any, i) => <div className='h-fit p-1 px-2 rounded-lg bg-white flex gap-2 font-medium justify-center items-center' key={i * 10}><p >{e.title}</p><RxCrossCircled onClick={() => ToRemoveFromMultiCategory(i, e.title)} className=" rouneded-full cursor-pointer hover:scale-105 text-red-600" /></div>)}</div>
                                {multiCategoryRequire ? <p className='text-red-500'>Minimum 1 Category Required</p> : null}
                                <Tree
                                    className="hide-scrollbar mb-4 overflow-y-scroll max-h-[260px]"
                                    showLine
                                    treeData={treeData}
                                    onSelect={(i: any, e: any): void => {
                                        if (multiCategory)
                                            setMultiCategoryRequire(false)
                                        let obj: multiCategoryInterface = {
                                            title: e.node.title,
                                            value: e.node.title,
                                            label: e.node.title,
                                            key: e.node.key
                                        }
                                        let flag = multiCategory.find((item: any) => item.title == obj.title && item.key == obj.key)
                                        if (flag)
                                            message.info("Already Selected")
                                        else {
                                            setMultiCategory([...multiCategory, obj])
                                        }

                                    }}
                                />


                            </td>
                        </tr>
                        <tr>
                            <td className=' w-[28%] text-semibold text-sm'>Default Category</td>
                            <td>  <Select
                                onSelect={(e, item) => {
                                    if (defaultCategoryRequire)
                                        setDefaultCategoryRequire(false)
                                    if (item.key !== defaultCategory) {
                                        setSelectedLabel(item.label)
                                        setDefaultCategory(item.key)
                                    }
                                }}
                                value={selectedLabel}
                                size="large"
                                placeholder="Category"
                                className="mt-4 w-full"
                                options={multiCategory}
                            />
                                {defaultCategoryRequire ? <p className='text-red-500'>required</p> : null}
                            </td>

                        </tr>
                        <tr>
                            <td className=' w-[28%] text-semibold text-sm'>Product Tags</td>
                            <td>
                                <Search className="bg-blue-700 rounded-lg  mt-4 border-2 border-gray-200" value={tagText} onChange={tagChangeFun} enterButton="Add" onSearch={addTagFun} placeholder="Product Tag" />


                                <aside className="flex gap-3 flex-wrap mt-2  bg-gray-50 min-h-[56px] w-full p-3">
                                    {
                                        tag.map((e, i) => <div className='h-fit p-1 px-2 rounded-lg bg-white flex gap-2 font-medium justify-center items-center' key={i * 10}><p >{e}</p><RxCrossCircled onClick={() => ToRemoveFromTags(i, e)} className=" rouneded-full cursor-pointer hover:scale-105 text-red-600" /></div>)
                                    }
                                </aside>
                            </td>
                        </tr>
                        <tr>
                            <td className=' w-[28%] text-semibold text-sm'>Published</td>
                            <td className=''><Switch defaultChecked onChange={statusFun} className="bg-red-500 mt-4" checkedChildren="Yes" unCheckedChildren="No" /></td>
                        </tr>
                    </tbody>

                </table>
            </Drawer>
        </>
    )
}
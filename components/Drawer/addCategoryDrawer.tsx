"use client"
import ImgCrop from 'antd-img-crop';
import { Button, Drawer, Input, Space, message, Upload, Switch, Tree, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { BiCloudUpload } from "react-icons/bi"
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios';

interface Category {
    title: string;
    key: string,
}
interface addCategoryDataInterface {
    name: {
        value: string
    };
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
type MyFile = UploadFile<any>;
export function AddCategoryDrawer({ treeData, setTreeData, preFilledData, setPreFilledData, setTableData, refresh, setRefresh, fileList, setFileList, setOpenAddCategory, openAddCategory }: any) {
    const [mainLoading, setMainLoading] = useState(false);
    const [loading, setLoading] = useState(false)
    const [selectCategoryName, setSelectCategoryName] = useState<Category>({
        title: "Home",
        key: "0-0-0-0-0-0-0-0-0-0"
    });
    const [messageApi, contextHolder] = message.useMessage()
    const [imagee, setImagee] = useState("")
    const [imageeRequire, setImageeRequiree] = useState(false)
    const [attributeBanner, setAttributeBanner] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [nameRequire, setNameRequire] = useState(false)
    const [descriptionRequire, setDescriptionRequire] = useState(false)
    const [status, setStatus] = useState("show")

    // function related to tree structure
    useEffect(() => {
        async function getCategoryiesData() {
            if (preFilledData._id) {
                setName(preFilledData.name.value)
                setStatus(preFilledData.status)
                setDescription(preFilledData.description.value)
                if (!preFilledData.parentId) {
                    setSelectCategoryName({
                        title: "Home",
                        key: "0-0-0-0-0-0-0-0-0-0"
                    })
                } else {
                    setSelectCategoryName({
                        title: preFilledData.parentName,
                        key: preFilledData.parentId
                    })
                }

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
                let newArray = disableNodesRecursively(treeData, [preFilledData._id])
                setTreeData(newArray)
            } else {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/category/getallcategories`)
                    setTableData(response.data)
                    const renderData = renderCategories(response.data)
                    const obj: any = [{
                        title: "Home",
                        key: "0-0-0-0-0-0-0-0-0-0",
                        children: renderData
                    }]
                    setTreeData(obj)
                } catch (error) {
                    message.info("Network Issue")
                }
            }
        }
        getCategoryiesData()
    }, [refresh])


    const addCategoryFunction = async () => {
        setLoading(true)
        let flag = true;
        if (name.trim().length === 0) {
            setNameRequire(true);
            flag = false;
        }
        if (description.trim().length == 0) {
            setDescriptionRequire(true);
            flag = false;
        }
        if (imagee.length === 0) {
            setImageeRequiree(true)
            flag = false;
        }

        if (flag) {
            try {
                const addCategoryData: addCategoryDataInterface = {
                    name: {
                        value: name
                    }, description: {
                        value: description
                    },
                    icon: "www.html.am/images/html-codes/links/boracay-white-beach-sunset-300x225.jpg",
                    status: status
                }
                if (selectCategoryName.title !== "Home" && selectCategoryName.key !== "0-0-0-0-0-0-0-0-0-0") {
                    addCategoryData.parentId = selectCategoryName.key;
                    addCategoryData.parentName = selectCategoryName.title
                }


                if (preFilledData._id) {

                    let response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/updatecategory/${preFilledData._id}`, addCategoryData)
                    message.success(response.data.message)
                } else {
                    let response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/category/addone`, addCategoryData)
                    message.success(response.data.message)
                }
                setRefresh(!refresh)
                if (preFilledData._id)
                    setPreFilledData({})
                setMainLoading(true)
                setTimeout(() => {
                    setMainLoading(false)
                }, 800)
                setName("")
                setDescription("")
                setStatus("show")
                setAttributeBanner([])
                setImagee("")
                // setFileList([])
                setSelectCategoryName({
                    title: "Home",
                    key: "0-0-0-0-0-0-0-0-0-0"
                })


            } catch (error) {
                setLoading(false)
                message.info(`Failed to ${preFilledData._id ? "Update" : "Create"} category`)
            }
        } else {

            message.info("Please Check All fields")
        }
        setLoading(false)
    }



    function renderCategories(categories: any): any {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push({
                title: category.name.value,
                key: category._id,
                children:
                    category.children.length > 0 ? renderCategories(category.children) : []
            });
        }
        return myCategories;
    };


    const onCloseAddAttribute = () => {
        setOpenAddCategory(false);
        setAttributeBanner([])
        setName("")
        setDescription("")
        setStatus("show")
        setImagee("")
        setPreFilledData({})
        // setFileList([])
        setSelectCategoryName({
            title: "Home",
            key: "0-0-0-0-0-0-0-0-0-0"
        })
    };

    const onChangeImage: UploadProps['onChange'] = ({ fileList: newFileList }: { fileList: any }) => {
        if (imageeRequire)
            setImageeRequiree(false)
        const file = newFileList[0]
        console.log(file)
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj as RcFile);
            reader.onload = () => {
                setImagee(reader.result as string);
                // setFileList(newFileList);
            };
        }
        setAttributeBanner(newFileList);
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

    function changeNameFun(e: any) {
        if (nameRequire)
            setNameRequire(false)

        let value = e.target.value;
        const regex = /^[a-zA-Z\s0-9&]+$/
        if (value.length == 0)
            setName("")
        else if (regex.test(value)) {
            setName(value)
        } else {
            let error = value.slice(-1)
            messageApi.open({
                type: "warning",
                content: `${error} Is Not Allow`
            })
        }
    }

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
                    <h5 className="text-xl mb-1">{preFilledData._id ? "Update" : "Add"} Category</h5>
                    <p >{preFilledData._id ? "Update" : "Add"} Product category and necessary information from here</p>
                </div>
            }
            destroyOnClose={true}
            placement="right"
            width={500}
            closeIcon={false}
            onClose={onCloseAddAttribute}
            open={openAddCategory}
            extra={
                <Space>
                    <Button disabled={loading} size="large" className="bg-gray-100 text-black" onClick={onCloseAddAttribute}>Cancel</Button>
                    <Button onClick={addCategoryFunction} loading={loading} size="large" className="bg-blue-600 hover:bg-blue-600 text-white" type="primary" >
                        {preFilledData._id ? "Update" : "Add"} Category
                    </Button>
                </Space>
            }
        >
            {contextHolder}
            <Spin size="large" spinning={mainLoading}>
                <table className='min-h-[60vh] w-full'>
                    <tbody >
                        <tr >
                            <td className=' w-[23%] text-semibold text-sm'>Category Image</td>
                            <td className=' pl-4'> <ImgCrop rotationSlider>
                                <Upload
                                    // accept=".jpg .svg"
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    listType="picture-card"
                                    fileList={attributeBanner}
                                    onChange={onChangeImage}
                                    onPreview={onPreview}
                                >
                                    {attributeBanner.length < 1 ? (<div className="flex flex-col justify-center items-center gap-1">
                                        <BiCloudUpload className="text-blue-700 text-lg" />
                                        <h3>Drag your images here</h3>

                                    </div>) : null}
                                </Upload>
                            </ImgCrop>
                                {imageeRequire ? <p className='text-red-500'>required</p> : null}

                            </td>
                        </tr>
                        <tr >
                            <td className=' w-[26%] text-semibold text-sm'>Name</td>
                            <td className=''><Input className="mt-4" onChange={changeNameFun} value={name} type="text" placeholder="Color , Size , Dimension , Material , Fabric" />{nameRequire ? <p className='text-red-500'>required</p> : null}</td>
                        </tr>
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
                            <td className=''><Switch defaultChecked={preFilledData.status == "hide" ? false : true} onChange={statusFun} className="bg-red-500" checkedChildren="Yes" unCheckedChildren="No" /></td>
                        </tr>

                    </tbody>
                </table>
            </Spin>
        </Drawer>
    )
}
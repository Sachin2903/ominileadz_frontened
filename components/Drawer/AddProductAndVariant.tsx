import { useEffect, useState } from "react";
import { Button, Drawer, Input, Select, Spin, Switch, Tree, Upload, UploadProps, message } from 'antd';
import axios from "axios";
import ImgCrop from 'antd-img-crop';
import { FaRupeeSign } from "react-icons/fa";
import { BiCloudUpload } from "react-icons/bi";
import { RcFile, UploadFile } from "antd/es/upload";
import { RxCrossCircled } from "react-icons/rx";
import Search from "antd/es/input/Search";

interface multiCategoryInterface {
    title: string,
    key: string,
    value: string,
    label: string
}
interface selectedValue {
    value: string,
    label: string,
    key:string,
}
const { TextArea } = Input;
export default function AddProductDrawer({ editProductRefresh, setProductRefresh, setCategoryOption, treeData, setTreeData, allCategories, setAllCategories, refresh, setRefresh, openaddProductDrawer, SetOpenAddProductDrawer, preFilledData, setPreFilledData }: any) {
    const [selectedAttribute, setSelectedAttribute] = useState<selectedValue[]>([]);
    const [availableAttribute, SetAvailableAttribute] = useState([])
    const [messageApi, contextHolder] = message.useMessage()
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    const [mainLoading, setMainLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [nameRequire, setNameRequire] = useState(false)
    const [description, setDescription] = useState("");
    const [descriptionRequire, setDescriptionRequire] = useState(false);
    const [status, setStatus] = useState("show")
    const [sku, setSku] = useState("")
    const [barcode, setBarcode] = useState("")
    const [imagee, setImagee] = useState("");
    const [imageeRequire, setImageeRequiree] = useState(false)
    const [ProductImage, setProductImage] = useState([])
    const [slug, setSlug] = useState("");
    const [quantity, setQuantity] = useState("");
    const [quantityRequire, setQuantityRequire] = useState(false)
    const [price, setPrice] = useState("")
    const [priceRequire, setPriceRequire] = useState(false)
    const [salePrice, setSalePrice] = useState("");
    const [salePriceRequire, setSalePriceRequire] = useState(false)
    const [multiCategory, setMultiCategory] = useState<multiCategoryInterface[]>([])
    const [multiCategoryRequire, setMultiCategoryRequire] = useState(false)
    const [defaultCategory, setDefaultCategory] = useState("")
    const [defaultCategoryRequire, setDefaultCategoryRequire] = useState(false)
    const [tag, setTag] = useState<string[]>([])
    const [tagText, setTagText] = useState("")
    const [slugRequire, setSlugRequire] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState<null | string>(null)
    const [isCombination, setIsCombination] = useState(false)
    function functionThatResetAll() {
        setSelectedLabel(null)
        if (multiCategoryRequire)
            setMultiCategoryRequire(false)
        if (imageeRequire)
            setImageeRequiree(false)
        if (quantityRequire)
            setQuantityRequire(false)
        if (priceRequire)
            setPriceRequire(false)
        if (salePriceRequire)
            setSalePriceRequire(false)
        if (defaultCategoryRequire)
            setDefaultCategoryRequire(false)
        if (slugRequire)
            setSlugRequire(false)
        if (nameRequire)
            setNameRequire(false)
        if (descriptionRequire)
            setDescriptionRequire(false)
        if (preFilledData.length > 0)
            setPreFilledData("")
        setPreFilledData("")
        setMultiCategory([])
        setDefaultCategory("")
        setTag([])
        setTagText("")
        setSalePrice("")
        setPrice("")
        setQuantity("")
        setSlug("")
        setProductImage([])
        setImagee("")
        setBarcode("")
        setSku("")
        setName("")
        setDescription("")
        setStatus("show")
    }
    const filteredOptions = availableAttribute.filter((o: any) => !changeKeyValueLabelToKeyString(selectedAttribute).includes(o._id));
    function changekeyValueLabelToString(arrayOfObject:any){
       return arrayOfObject.map((item:any) => item.label);
    }
    function changeKeyValueLabelToKeyString(arrayOfObject:any){
        return arrayOfObject.map((item:any) => item.key);
    }
    
    useEffect(() => {

        async function getProductData() {
            if (preFilledData.length > 0) {
                setMainLoading(true);
                try {
                    let response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products/getproductbyid/${preFilledData}`)
                    let Attributeresponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/attribute/showingattributes`)
                    SetAvailableAttribute(Attributeresponse.data)
                    setName(response.data.title.value)
                    setDescription(response.data.description.value);
                    let multiCat = response.data.categories.map((e: any) => {
                        return {
                            title: e.name.value,
                            value: e.name.value,
                            label: e.name.value,
                            key: e._id
                        }
                    })
                    setMultiCategory(multiCat)
                    setSelectedLabel(response.data.category.name.value)
                    setDefaultCategory(response.data.category._id)
                    setIsCombination(response.data.isCombination);
                    setSku(response.data.sku)
                    setBarcode(response.data.barcode)
                    setSlug(response.data.slug)
                    setStatus(response.data.status)
                    setTag(response.data.tag)
                    setQuantity(String(response.data.stock))
                    setSalePrice(String(response.data.prices.price))
                    setPrice(String(response.data.prices.originalPrice))
                } catch (error) {
                    setMainLoading(false);
                }

                setMainLoading(false);
            }
        }
        getProductData()
    }, [editProductRefresh])

    async function addProductFunction() {
        setLoading(true)
        let flag = true;
        if (name.trim().length == 0) {
            setNameRequire(true)
            flag = false;
        }
        if (description.trim().length == 0) {
            setDescriptionRequire(true)
            flag = false;
        }
        if (imagee.length == 0) {
            setImageeRequiree(true)
            flag = false
        }
        if (quantity.length == 0) {
            setQuantityRequire(true)
            flag = false
        }
        if (multiCategory.length == 0) {
            setMultiCategoryRequire(true)
            flag = false;
        }
        if (defaultCategory.length == 0) {
            setDefaultCategoryRequire(true)
            flag = false;
        }
        if (price.length == 0) {
            setPriceRequire(true)
            flag = false;
        }
        if (salePrice.length == 0) {
            setSalePriceRequire(true)
            flag = false;
        }
        if (Number(salePrice) > Number(price)) {
            message.error("SalePrice Should Less Than Product Price")
            flag = false
        }
        if (slug.length == 0) {
            setSlugRequire(true)
            flag = false;
        }
        if (flag) {
            try {
                let idMultiCategories = multiCategory.map(e => e.key)
                let body = {
                    title: {
                        value: name
                    },
                    description: {
                        value: description
                    },
                    isCombination: false,
                    slug: slug,
                    tag: tag,
                    sales: 0,
                    sku: sku,
                    barcode: barcode,
                    stock: Number(quantity),
                    categories: allCategories.filter((item: any) => {
                        if (idMultiCategories.includes(item._id))
                            return true
                        return false
                    }),
                    category: allCategories.find((item: any) => item._id === defaultCategory),
                    image: ["https://img.freepik.com/free-photo/graphic-shirt-trendy-design-mockup_460848-12971.jpg?w=740&t=st=1702375426~exp=1702376026~hmac=4a24e62b528c16690eac309a3dcc890261b724d72c6a7bc2fab9ee22ba3d373e"],
                    prices: {
                        price: Number(salePrice),
                        originalPrice: Number(price)
                    },

                    status: status
                }
                let response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/products/addproduct`, body)
                setRefresh(!refresh)
                message.success(response.data.message)
                functionThatResetAll()


            } catch (error) {
                message.error("Failed To Add Product Network Issue!")
            }
        }
        setLoading(false)
    }
    useEffect(() => {
        async function getCategoryiesData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/category/getallcategories`);
                const sinpleCategories = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/category/getallcategorywithoutrelation`)
                setAllCategories(sinpleCategories.data)
                let categoryData = sinpleCategories.data.map((item: any) => {
                    return { "value": item.name.value, "label": item.name.value, "key": item._id }
                })
                setCategoryOption(categoryData)
                const renderData = renderCategories(response.data)
                setTreeData(renderData)
            } catch (error) {
                message.info("Network Issue")
            }
        }
        getCategoryiesData()
    }, [])


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


    const onCloseAddProductDrawer = () => {
        SetOpenAddProductDrawer(false);
        functionThatResetAll()
    };

    const showChildrenDrawer = () => {
        setChildrenDrawer(true);
    };

    const onChildrenDrawerClose = () => {
        setSelectedAttribute([])
        setChildrenDrawer(false);
    };




    function changeNameFun(e: any) {
        if (nameRequire)
            setNameRequire(false)
        let value = e.target.value;
        const regex = /^[a-zA-Z\s0-9&_-]+$/
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

    function changeSalePriceFun(e: any) {
        if (salePriceRequire)
            setSalePriceRequire(false)
        let value = e.target.value;
        const regex = /^[0-9]+$/
        if (value.length == 0)
            setSalePrice("")
        else if (value.length == 1 && value == 0) {
            messageApi.open({
                type: "warning",
                content: `Minimum value 1`
            })
        }
        else if (regex.test(value)) {
            setSalePrice(value)
        } else {
            let error = value.slice(-1)
            messageApi.open({
                type: "warning",
                content: `${error} Is Not Allow`
            })
        }

    }
    function changePriceFun(e: any) {
        if (priceRequire)
            setPriceRequire(false)
        let value = e.target.value;
        const regex = /^[0-9]+$/
        if (value.length == 0)
            setPrice("")
        else if (value.length == 1 && value == 0) {
            messageApi.open({
                type: "warning",
                content: `Minimum value 1`
            })
        }
        else if (regex.test(value)) {
            setPrice(value)
        } else {
            let error = value.slice(-1)
            messageApi.open({
                type: "warning",
                content: `${error} Is ku Not Allow`
            })
        }
    }
    function changeQuantityFun(e: any) {
        if (quantityRequire)
            setQuantityRequire(false)
        let value = e.target.value;
        const regex = /^[0-9]+$/
        if (value.length == 0)
            setQuantity("")
        else if (value.length == 2 && value == "00") {
            setQuantity("")
            messageApi.open({
                type: "warning",
                content: `Range Should Be In Whole Number`
            })
        }
        else if (value.length == 2 && value[0] == "0" && value[1] > 0) {
            setQuantity("")
            messageApi.open({
                type: "warning",
                content: `Range Should Be In Whole Number`
            })
        }
        else if (regex.test(value)) {
            setQuantity(value)
        } else {
            let error = value.slice(-1)
            messageApi.open({
                type: "warning",
                content: `${error} Is Not Allow`
            })
        }
    }
    function changeSlugFun(e: any) {
        if (slugRequire)
            setSlugRequire(false)
        let value = e.target.value;
        const regex = /^[a-zA-Z0-9_-]+$/
        if (value.length == 0)
            setSlug("")
        else if (regex.test(value)) {
            setSlug(value)
        } else {
            let error = value.slice(-1)
            messageApi.open({
                type: "warning",
                content: `${error} Is Not Allow`
            })
        }
    }
    function changeSkuFun(e: any) {
        let value = e.target.value;
        if (value.length == 0)
            setSku("")
        else {
            setSku(value)
        }
    }
    function changeBarcodeFun(e: any) {
        let value = e.target.value;
        if (value.length == 0)
            setBarcode("")
        else {
            setBarcode(value)
        }
    }
    function changeDescriptionFun(e: any) {
        if (descriptionRequire)
            setDescriptionRequire(false)
        let value = e.target.value;
        const regex = /^[a-zA-Z\s0-9&_-]+$/
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

    const onChangeImage: UploadProps['onChange'] = ({ fileList: newFileList }: { fileList: any }) => {
        if (imageeRequire)
            setImageeRequiree(false)
        const file = newFileList[0]

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj as RcFile);
            reader.onload = () => {
                setImagee(reader.result as string);
            };
        }
        if (file) {
            file.status = "success"
        }
        setProductImage(newFileList);
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
        imgWindow?.document.write(`<img src="${src}" style="width: 500px; height: 500px;" />`);
    };
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

    function changeCombinationFun() {
        if (preFilledData.length > 0) {
            setIsCombination(!isCombination)
        } else {
            messageApi.error("Please Save The Product Before Adding Variants")
        }
    }

    return (
        <>
            {contextHolder}
            <Drawer title={<div className=" w-full flex" >
                <aside className=" flex-grow">
                    <h5 className="text-xl mb-1">{preFilledData && preFilledData.length > 0 ? "Update" : "Add"} Product</h5>
                    <p >{preFilledData && preFilledData.length > 0 ? "Update" : "Add"} Product and necessary information from here</p>
                </aside>
                <aside className="flex-grow">
                    <Button disabled={loading} size="large" className="m-2 bg-gray-100 text-black" onClick={onCloseAddProductDrawer}>Cancel</Button>
                    <Button onClick={addProductFunction} loading={loading} size="large" className="bg-blue-600 m-2 hover:bg-blue-600 text-white" type="primary" >
                        {preFilledData && preFilledData.length > 0 ? "Update" : "Add"} Product
                    </Button>
                </aside>

            </div>} destroyOnClose={true} width={820} closable={false} onClose={onCloseAddProductDrawer} open={openaddProductDrawer}>
                <Spin size="large" spinning={mainLoading}>
                    <div className="flex justify-end items-center flex-wrap gap-2">
                        <Button onClick={() => showChildrenDrawer()} className="bg-blue-600 m-2  text-white" type="primary" size="large" disabled={isCombination == true ? false : true}>Add Variants</Button>
                        <p className="text-red-500">Does This Product Have Variants?</p> <Switch checked={isCombination == true ? true : false} onChange={changeCombinationFun} className="bg-red-500 my-3" checkedChildren="Yes" unCheckedChildren="No" />
                    </div>
                    <table className='min-h-[60vh] w-full'>
                        <tbody>
                            <tr>
                                <td className=' w-[28%] text-semibold text-sm'>Product Title/Name</td>
                                <td><Input className="mt-4" onChange={changeNameFun} value={name} type="text" placeholder="Product Title/Name" />{nameRequire ? <p className='text-red-500'>required</p> : null}</td>
                            </tr>
                            <tr>
                                <td className=' w-[28%] text-semibold text-sm'>Product Description</td>
                                <td> <TextArea className="mt-4" showCount maxLength={100} onChange={changeDescriptionFun} value={description} placeholder="Product Description" />{descriptionRequire ? <p className='text-red-500'>required</p> : null}</td>
                            </tr>
                            <tr>
                                <td className=' w-[28%] text-semibold text-sm'>Product Images</td>
                                <td >
                                    <ImgCrop aspect={1 / 1} rotationSlider>
                                        <Upload
                                            className="mt-4"
                                            action=""
                                            listType="picture-card"
                                            fileList={ProductImage}
                                            onChange={onChangeImage}
                                            onPreview={onPreview}
                                        >
                                            {ProductImage.length < 1 ? (<div className="flex flex-col justify-center items-center gap-1">
                                                <BiCloudUpload className="text-blue-700 text-lg" />
                                                <h3>Drag your images here</h3>

                                            </div>) : null}
                                        </Upload>
                                    </ImgCrop>
                                    {imageeRequire ? <p className='text-red-500'>required</p> : null}
                                </td>
                            </tr>

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
                                <td className=' w-[28%] text-semibold text-sm'>Product Price</td>
                                <td><Input className="mt-4" prefix={<FaRupeeSign />} onChange={changePriceFun} value={price} type="text" placeholder="Original Price" />{priceRequire ? <p className='text-red-500'>required</p> : null}</td>
                            </tr>
                            <tr>
                                <td className=' w-[28%] text-semibold text-sm'>Sale Price</td>
                                <td><Input className="mt-4" prefix={<FaRupeeSign />} onChange={changeSalePriceFun} value={salePrice} type="text" placeholder="Sale Price" />{salePriceRequire ? <p className='text-red-500'>required</p> : null}</td>
                            </tr>
                            <tr>
                                <td className=' w-[28%] text-semibold text-sm'>Product SKU</td>
                                <td><Input className="mt-4" onChange={changeSkuFun} value={sku} type="text" placeholder="Product SKU" /></td>
                            </tr>
                            <tr>
                                <td className=' w-[28%] text-semibold text-sm'>Product Barcode</td>
                                <td><Input className="mt-4" onChange={changeBarcodeFun} value={barcode} type="text" placeholder="Product Barcode" /></td>
                            </tr>
                            <tr>
                                <td className=' w-[28%] text-semibold text-sm'>Product Quantity</td>
                                <td><Input className="mt-4" onChange={changeQuantityFun} value={quantity} type="text" placeholder="Product Quantity" />{quantityRequire ? <p className='text-red-500'>required</p> : null}</td>
                            </tr>
                            <tr>
                                <td className=' w-[28%] text-semibold text-sm'>Product Slug</td>
                                <td><Input className="mt-4" onChange={changeSlugFun} value={slug} type="text" placeholder="Product Slug" />{slugRequire ? <p className='text-red-500'>required</p> : null}</td>
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
                                <td className=''><Switch defaultChecked={status == "hide" ? false : true} onChange={statusFun} className="bg-red-500 mt-4" checkedChildren="Yes" unCheckedChildren="No" /></td>
                            </tr>
                        </tbody>

                    </table>





                </Spin>

                <Drawer
                    title={<div className=" w-full flex" >
                        <aside className=" flex-grow">
                            <h5 className="text-xl mb-1">Update Product Variants</h5>
                            <p >Update Product Variants and necessary information from here</p>
                        </aside>
                        <aside className="flex-grow">
                            <Button size="large" className="m-2 bg-gray-100 text-black" onClick={onChildrenDrawerClose}>Cancel</Button>
                        </aside>

                    </div>}
                    destroyOnClose={true}
                    width={720}
                    closable={false}
                    onClose={onChildrenDrawerClose}
                    open={childrenDrawer}
                >
                    <Select
                        mode="multiple"
                        placeholder="Select Attributes"
                        value={changekeyValueLabelToString(selectedAttribute)}
                        onChange={(e:any,selectedOptions:any) => {
                            // console.log(e,selectedOptions)
                            setSelectedAttribute([...selectedAttribute, selectedOptions.pop()]);
                        }}
                        style={{ width: '100%' }}
                        options={filteredOptions.map((item: any) => ({
                            value: item.title.value,
                            label: item.title.value,
                            key: item._id
                        }))}
                    />

                </Drawer>
            </Drawer>
        </>
    )
}
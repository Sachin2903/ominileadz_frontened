"use client"
import { useEffect, useState } from 'react';
import { Button, Drawer, message, Input, Select, Space, Spin } from 'antd';
import Search from 'antd/es/input/Search';
import {RxCrossCircled } from "react-icons/rx";
import axios from 'axios';
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
export function AddAttributeDrawer({ openAddTribute, setOpenAddAttribute ,refresh,setRefresh,prefilledProduct,setPreFilledProduct}: any) {
  const [messageApi, contextHolder] = message.useMessage()
  const [title, setTitle] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [option, setOption] = useState<null|string>(null);
  const [textVariant, SetTextVartiant] = useState("")
  const [variantsArray, setVariantsArray] = useState<Variant[]>([]);
  const [addLoading, setAddLoading] = useState(false);
  const [titleRequire, setTitleRequire] = useState(false)
  const [nameRequire, setNameRequire] = useState(false)
  const [optionRequire, setOptionRequire] = useState(false)
  const [dataAdded,setDataAdded]=useState(false);
  const [mainLoader,setMainLoader]=useState(false)

useEffect(()=>{
  if(prefilledProduct._id){
    setMainLoader(true)
    setTitle(prefilledProduct.title.value)
    setDisplayName(prefilledProduct.name.value)
    setVariantsArray(prefilledProduct.variants);
    setOption(prefilledProduct.option)
  }
  let timeoutId=setTimeout(()=>{
    setMainLoader(false)
  },1000)
  return () => {
    clearTimeout(timeoutId);
  };

},[prefilledProduct])



  const onCloseAddAttributeDrawer = () => {
    if(dataAdded)
    setRefresh(!refresh)
    setOpenAddAttribute(false);
    setTitle("")
    setDataAdded(false)
    setTitleRequire(false)
    setNameRequire(false)
    setOptionRequire(false)
    setDisplayName("");
    setOption(null)
    SetTextVartiant("")
    setVariantsArray([])
    setPreFilledProduct({})
  };
  function changeTitleFun(e: any) {
    if (titleRequire)
      setTitleRequire(false)

    let value = e.target.value;
    const regex = /^[a-zA-Z\s]+$/
    if (value.length == 0)
      setTitle("")
    else if (regex.test(value)) {
      setTitle(value)
    } else {
      let error = value.slice(-1)
      messageApi.open({
        type: "warning",
        content: `${error} Is Not Allow`
      })
    }
  }
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
  function changeOptionFun(value: string) {
    if (optionRequire)
      setOptionRequire(false)

    if (value === "Dropdown" || value === "Radio")
      setOption(value)
    else
      message.info("Network Issue Try Again !")
  }
  
  function variantChangeFun(e: any) {
    let value = e.target.value;
    const regex = /^[a-zA-Z]+$/
    if (value.length == 0)
      SetTextVartiant("")
    else if (regex.test(value)) {
      SetTextVartiant(value)
    } else {
      let error = value.slice(-1)
      messageApi.open({
        type: "warning",
        content: `${error} Is Not Allow`
      })
    }
  }
  
  function addVariantFun() {
    if (textVariant.length > 0) {
      let newObj: { name: { value: string }, status: string } = {
        name: {
          value: textVariant.trim()
        },
        status: "show"
      }
      setVariantsArray([...variantsArray, newObj])
      SetTextVartiant("")
      message.success("Successfully Added")
    }
  }
  function ToRemoveFromVariant(e: number, value: string) {
    let newArray = variantsArray.filter((item, index) => index !== e)
    setVariantsArray(newArray)
    message.success(`Successfully ${value} Deleted`)
  }
  // sendind data to backend
  async function addAttributeDataToBackend() {
    setAddLoading(true)
    let flag = false
    if (true) {
      if (!(title.trim().length > 0)) {
        setTitleRequire(true)
        flag = true
      }
      if (!(displayName.trim().length > 0)) {
        setNameRequire(true)
        flag = true
      }
      if (!(option)) {
        setOptionRequire(true)
        flag = true;
      }
    }
    if (flag) {
      setAddLoading(false);
    } else {
      let data = {
        title: {
          value: title.trim()
        },
        name: {
          value: displayName.trim()
        },
        variants: variantsArray,
        option: option,
      }
      try {
        if(prefilledProduct._id){
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/attribute/updateattributebyid/${prefilledProduct._id}`, data)
          message.success(response.data.message)
        }else{
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/attribute/addattribute`, data)
          message.success(response.data.message)
        }

       
        setTitle("")
        setTitleRequire(false)
        setNameRequire(false)
        setOptionRequire(false)
        setDisplayName("");
        setOption(null)
        setDataAdded(true)
        SetTextVartiant("")
        setVariantsArray([])
        setAddLoading(false);
      } catch (error) {
        setAddLoading(false)
        message.info("Network Issue")
      }
    }
  }





  return (
   
    <Drawer
      title={
        <div  >
          <h5 className="text-xl mb-1">{prefilledProduct._id?"Update ":"Add "}Attribute</h5>
          <p>{prefilledProduct._id?"Update ":"Add "} your attribute values and necessary information from here</p>
        </div>
      }
      placement="right"
      width={500}
      destroyOnClose={true}
      closeIcon={false}
      onClose={onCloseAddAttributeDrawer}
      open={openAddTribute}
      extra={
        <Space>
          <Button  className="bg-gray-100" onClick={onCloseAddAttributeDrawer}>Cancel</Button>
          <Button disabled={mainLoader} loading={addLoading} className="bg-blue-700 text-white" type="primary" onClick={addAttributeDataToBackend}>
            {prefilledProduct._id?"Update Attribute":"Add Attribute"}
          </Button>
        </Space>
      }
    >
 <Spin size="large" spinning={mainLoader}>
      <table className=' w-full h-[50vh]' >
        <tbody className=' w-full'>
          <tr >
            <td className=' w-[26%] text-semibold text-sm'>Attribute Title</td>
            <td className=''><Input onChange={changeTitleFun} value={title} type="text" placeholder="Color , Size , Dimension , Material , Fabric" />{titleRequire ? <p className='text-red-500'>required</p> : null}</td>
          </tr>
          <tr >
            <td className=' w-[25%] text-semibold text-sm'>Display Name</td>
            <td className=''><Input placeholder="Display Name" onChange={changeDisplayNameFun} value={displayName} />{nameRequire ? <p className='text-red-500'>required</p> : null}</td>
          </tr>
          <tr >
            <td className=' w-[25%] text-semibold text-sm'>Options</td>
            <td className=''><Select value={option} onChange={changeOptionFun} placeholder="Select an option" className='w-[50%]' options={options} />{optionRequire ? <p className='text-red-500'>required</p> : null}
            </td>
          </tr>
          <tr >
            <td className=' w-[25%] text-semibold text-sm'>Variants</td>
            <td className=''><Search className="bg-blue-700 rounded-lg  border-2 border-gray-200" value={textVariant} onChange={variantChangeFun} enterButton="Add" onSearch={addVariantFun} placeholder="Add variants" /></td>
          </tr>
        </tbody>
      </table>
      {contextHolder}
    
      <aside className="flex gap-3 flex-wrap  w-full min-h-[20vh] p-5">
        {
          variantsArray.map((e, i) => <div className='h-fit p-1 px-2 rounded-lg bg-gray-200 flex gap-2 font-medium justify-center items-center' key={i * 10}><p >{e.name.value}</p><RxCrossCircled onClick={() => ToRemoveFromVariant(i, e.name.value)} className=" rouneded-full cursor-pointer hover:scale-105 text-red-600" /></div>)
        }
      </aside>
      </Spin>
    </Drawer>
   
  )
}
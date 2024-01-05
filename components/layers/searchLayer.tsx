"use client"
import { Button } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { message } from "antd"
import axios from "axios";
export function SearchLayer({refresh,setRefresh,setTableData}:any) {
    const [messageApi, contextHolder] = message.useMessage()
    const [searchText, setSearchText] = useState("")
    const [searchloading,SetSearchLoading]=useState(false)
    async function SearchFun() {
        SetSearchLoading(true);
        if(searchText.trim().length>0){
        try {
            let value=searchText.trim()
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/attribute/getallattributewithoption/${value}`)
            setTableData(response.data)
            console.log(response.data);
            SetSearchLoading(false);
        } catch (error) {
            message.info("Network Issue")
            SetSearchLoading(false);
        }
    }else{
        SetSearchLoading(false);
    }

    }

    function changeValueOfSearch(e: any) {
        let value = e.target.value;
        const regex = /^[a-zA-Z\s]+$/
        if (value.length == 0){
            setSearchText("")
            setRefresh(!refresh)
        }else if (regex.test(value)) {
            setSearchText(value)
        } else {
            let error = value.slice(-1)
            messageApi.open({
                type: "warning",
                content: `${error} Is Not Allow`
            })
        }
    }
    return (
        <div className="p-3 mb-5 gap-3 flex-wrap lg:flex-nowrap flex bg-white justify-between items-center py-6 w-full  rounded">
            {contextHolder}
            <Search
                value={searchText}
                className='bg-blue-500  mb-2 rounded-lg border-2 border-gray-200 shrink'
                placeholder="Search by name/display name"
                allowClear
                enterButton
                loading={searchloading}
                onChange={changeValueOfSearch}
                size="large"
                onSearch={SearchFun}

            />
            <div className="flex flex-wrap sm:flex-nowrap lg:w-fit w-full gap-2">
                <Button disabled={searchloading} onClick={SearchFun} type="primary" className="bg-blue-500 w-full lg:w-[200px] mb-2 px-4 " size="large" >
                    Filter
                </Button>
                <Button onClick={()=>{setRefresh(!refresh); setSearchText("")}} disabled={searchloading} className="lg:w-[200px] w-full hover:bg-gray-900 bg-gray-200 mb-2 px-4 " type="text" size="large"  >
                    Reset
                </Button>
            </div>
        </div>
    )
}
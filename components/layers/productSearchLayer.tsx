"use client"
import { Button, Select } from "antd";
import Search from "antd/es/input/Search";
import { message } from "antd"

export function ProductSearchLayer({ searchloading, SetSearchLoading, searchText, setSearchText, option1, setOption1, option2, setOption2, categoryOption, refresh, setRefresh }: any) {
    const [messageApi, contextHolder] = message.useMessage()

    function resetAll() {
        setSearchText("")
        setOption1(null)
        setOption2(null)
        setRefresh(!refresh)
    }

    function SearchFun() {
        if (searchText.trim().length > 0 || option1 != null || option2 != null) {
        SetSearchLoading(true)
        setRefresh(!refresh)
        }
    }

    function changeValueOfSearch(e: any) {
        let value = e.target.value;
        const regex = /^[a-zA-Z\s_\-&]+$/
        if (value.length == 0) {
            setSearchText("")
            setRefresh(!refresh)
        } else if (regex.test(value)) {
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
        <div className="p-3 mb-5 gap-3 flex-wrap flex bg-white justify-between items-center py-6 w-full  rounded">
            {contextHolder}
            <Search
                value={searchText}
                className='bg-blue-500 flex-grow mb-2 rounded-lg border-2 border-gray-200 shrink'
                placeholder="Search Product"
                allowClear
                enterButton
                loading={searchloading}
                onChange={changeValueOfSearch}
                size="large"
                onSearch={SearchFun}
            />

            <Select
                onSelect={(e, i) => {
                    if (e !== option1)
                        setOption1(e)
                }}
                value={option1}
                size="large"
                placeholder="Category"
                className="flex-grow min-w-[190px]"
                options={categoryOption}
            />
            <Select
                value={option2}
                onSelect={(e, i) => {
                    if (e !== option2)
                        setOption2(e)
                }}
                size="large"
                placeholder="Price"
                className="flex-grow min-w-[190px]"
                options={[
                    { value: 'Low to High', label: 'Low to High' },
                    { value: 'High to Low', label: 'High to Low' },
                    { value: 'Published', label: 'Published' },
                    { value: 'Unpublished', label: 'Unpublished' },
                    { value: 'Status-Selling', label: 'Status-Selling ' },
                    { value: 'Status-Out of Stock', label: 'Status-Out of Stock' },
                    { value: 'Date Added (Asc)', label: 'Date Added (Asc)' },
                    { value: 'Date Added (Desc)', label: 'Date Added (Desc)' },
                    { value: 'Date Updated (Asc)', label: 'Date Updated (Asc)' },
                    { value: 'Date Updated (Desc)', label: 'Date Updated (Desc)' }
                ]}
            />
            <Button disabled={searchloading} onClick={SearchFun} type="primary" className="bg-blue-500 flex-grow px-4 " size="large" >
                Filter
            </Button>
            <Button onClick={() => { resetAll() }} disabled={searchloading} className="flex-grow hover:bg-gray-900 bg-gray-200  px-4 " type="text" size="large"  >
                Reset
            </Button>

        </div>
    )
}
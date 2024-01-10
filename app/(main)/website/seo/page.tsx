"use client"
import { Button, Input, Select, Space, Spin, message } from 'antd';
const { Search } = Input;
import { useEffect, useState } from 'react';
import { AddNewWebsiteForSeo } from '@/components/modals/addNewWebsiteForSeo';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

interface website {
        id: string,
        url: string,
        keywords: []
}

export default function SEO() {
        const [messageApi, contextHolder] = message.useMessage();
        const [websiteData, setWebsiteData] = useState<website[] | []>([])
        const [loader, setLoader] = useState<boolean>(true)
        const [urlText, setUrlText] = useState("")
        const [dataToSave, setDataToSave] = useState<boolean>(false)
        const [btnLoader, SetBtnLoader] = useState<boolean>(false)

        useEffect(() => {
                async function getData() {
                        try {
                                let response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/websiteseo/getallwebsitedata`)
                                // let sessionData = sessionStorage.getItem("sKjaD4g")
                                // if (sessionData && sessionData.length > 0) {
                                //         const decodedString = atob(sessionData);
                                //         const decodedData = await JSON.parse(decodedString);
                                //         setWebsiteData(decodedData)
                                // } else {
                                setWebsiteData(response.data)
                                // }

                        } catch (error) {
                                messageApi.open({
                                        type: 'error',
                                        content: '  Network Issue! Try Again  ',
                                });
                        } finally {
                                setLoader(false)
                        }
                }
                getData()
        }, [])

        function AddANewWebsite(e: string) {
                if (urlText.length > 0) {
                        let check = websiteData.find((e, i) => e.url ==`https://${urlText.toLowerCase()}`)
                        if (check) {
                                messageApi.open({
                                        type: 'error',
                                        content: '  You Already Have Added this Url ',
                                });
                                return
                        }
                        let newWebsite: website = {
                                id: uuidv4(),
                                url: `https://${urlText.toLowerCase()}`,
                                keywords: []
                        }
                        setWebsiteData([newWebsite, ...websiteData])
                        // saveEncodeData([newWebsite, ...websiteData])
                        setDataToSave(true)
                        setUrlText("")
                }
        }

        function saveEncodeData(array: website[]) {
                let dataToBeEncoded = JSON.stringify(array)
                dataToBeEncoded = btoa(dataToBeEncoded)
                sessionStorage.setItem("sKjaD4g", dataToBeEncoded)
        }

        function toDeleteCompleteWebsite(deletedId: string) {
                let array: any = websiteData.filter((e, i) => e.id !== deletedId)
                setWebsiteData(array)

                setDataToSave(true)

                // saveEncodeData(array)
        }

        async function SaveDataToBackend() {
                try {
                        SetBtnLoader(true)
                        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/websiteseo/updateallwebsitedata`, websiteData)
                        messageApi.open({
                                type: 'success',
                                content: ' Successfully Updated  ',
                        });
                        setDataToSave(false)
                } catch (error) {
                        messageApi.open({
                                type: 'error',
                                content: '  Network Issue! Try Again  ',
                        });
                } finally {
                        SetBtnLoader(false)

                }


        }


        return (
                <div className="py-3 mt-4">
                        {contextHolder}
                        <Search value={urlText} onChange={(e) => setUrlText(e.target.value.trim())} className=" mb-5" onSearch={AddANewWebsite} addonBefore="https://" placeholder="Type Url" size="large" allowClear enterButton="Add" />
                        <Button onClick={SaveDataToBackend} loading={btnLoader} disabled={!dataToSave} className="text-base w-[130px] h-[40px] mb-6" type="primary">Save</Button>
                        {loader ? (
                                <Spin className="block" size="large" />
                        ) : (
                                websiteData && websiteData.length > 0 ? (
                                        <div>
                                                {websiteData.map((item: any) => (
                                                        <AddNewWebsiteForSeo key={item.id} dataToSave={dataToSave} setDataToSave={setDataToSave} websiteData={websiteData} setWebsiteData={setWebsiteData} deleteFunction={toDeleteCompleteWebsite} item={item} />
                                                ))}
                                        </div>
                                ) : (
                                        <p className="w-full text-center">No data available</p>
                                )
                        )}
                </div>
        )
}
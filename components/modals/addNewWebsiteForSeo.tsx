"use client"
import { useState } from "react";
import { Button, Input, Select } from 'antd';
const { Search } = Input;
import { IoEye } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { BsFillTrash3Fill } from "react-icons/bs";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  id: string;
  parentId: string;
  googleRank: number;
  title: string;
  bingRank: number;
}
export function AddNewWebsiteForSeo({dataToSave, setDataToSave, item, deleteFunction, websiteData, setWebsiteData }: any) {
  const [keyWord, setKeyWord] = useState("")
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'name',
      render: (text) => <p className="text-base font-medium">{text}</p>,
    },
    {
      title: 'Google Rank',
      dataIndex: 'googleRank',
      key: 'googleRank',
      render: (text) => <p className="text-lg font-semibold text-blue-700">{text}</p>,
    },
    {
      title: 'Bing Rank',
      dataIndex: 'bingRank',
      key: 'bingRank',
      render: (text) => <p className="text-lg font-semibold text-blue-700">{text}</p>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => <BsFillTrash3Fill onClick={() => deleteKeywordFunction(record.id, record.parentId)} className="text-base cursor-pointer text-red-500 hover:scale-125" />
    }
  ];
  const [toggleMain, setToggleMain] = useState(false)

  function showChild() {
    setToggleMain(!toggleMain)
  }
  function AddNewKeyWord() {
    if (keyWord.length > 0) {
      let newKeyWord: DataType = {
        id: uuidv4(),
        parentId: item.id,
        title: keyWord,
        googleRank: 0,
        bingRank: 0
      }
      let updateArray = websiteData.map((web: any) => {
        if (web.id === item.id) {
          return {
            ...web,
            keywords: [newKeyWord, ...web.keywords],
          };
        }
        return web;
      });
      setWebsiteData([...updateArray])
      setKeyWord("")
      setDataToSave(true)
    }
  }

  function deleteKeywordFunction(deleteId: string, parentId: string) {
    console.log(deleteId,parentId)
    const updatedArray = websiteData.map((item: any) => {
      if (item.id === parentId) {
        const updatedKeywords = item.keywords.filter((keyword: any) => keyword.id !== deleteId);
        return { ...item, keywords: updatedKeywords }; 
      }
      return item;
    });
    setWebsiteData([...updatedArray]);
      setDataToSave(true)
  }
  

  return (
    <div className="mb-6 bg-gray-100 shadow-lg h-fit relative p-2">
      <p className="text-white cursor-none absolute -top-2 -left-2 flex justify-center items-center text-xs w-[23px] font-semibold h-[23px] rounded-full bg-red-500">{item.keywords.length}</p>
      <RiDeleteBin2Fill onClick={() => deleteFunction(item.id)} className="hover:scale-125 absolute -top-3 cursor-pointer -right-3 flex justify-center items-center text-xs w-[25px] font-semibold h-[26px] rounded-full text-red-500" />

      <section className="flex justify-between items-center"><p className="break-all ml-2 w-full">{item.url}</p><a target="_blank" rel="noopener noreferrer" className="text-blue-600 mx-2 text-xl hover:text-blue-800 hover:scale-125" href={item.url}><IoEye /></a><IoIosArrowForward onClick={() => setToggleMain(!toggleMain)} className={` transition-all duration-200 ${toggleMain ? `rotate-90` : ``} cursor-pointer h-full w-[50px] text-xs p-2.5 mr-2`} /></section>

      <section className={`mb-4 transition-all duration-500 flex flex-col gap-2 ${toggleMain ? `h-auto` : `h-0 overflow-hidden`}`}>
        <Search
          value={keyWord}
          onChange={(e) => setKeyWord(e.target.value.trim())}
          className="w-[50%] self-end mt-4 mb-1"
          onSearch={AddNewKeyWord}
          placeholder="Type Keyword"
          allowClear
          enterButton="Add"
        />
        <Table scroll={{ x: 'max-content' }} rowKey="id" pagination={{ pageSize: 6 }} loading={!true} columns={columns} dataSource={item.keywords} />
      </section>
    </div>
  )
}
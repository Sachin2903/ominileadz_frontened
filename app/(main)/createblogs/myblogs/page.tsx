// import CardList from "@/components/blogComponents/cardList/CardList";
import Card from "./components/card"
import Link from "next/link";

const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;

const Myblogs = () => {
    // const response = await fetch(`${URL}/blog`);
    // const blogcontent = await response.json();
  return (
    <div className="mt-5 flex flex-col justify-center w-full ">
        {/* {blogcontent.map((item:any, key:any) => (
       <Card key={key} item={item}/>
        ))} */}
    </div>
  )
}

export default Myblogs

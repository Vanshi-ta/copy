import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SearchInput({searchPlaceholder}: {searchPlaceholder: string}){
    return (
        <div className="border-2 border-gray-300 bg-neutral-100 flex items-center p-1 w-full rounded-full shadow-[0_10px_15px_-3px] shadow-gray-400">
            <Search className="w-6 h-6 text-gray-500 self-center ml-2"/>
            <Input 
            className=" border-none py-5 font-sans font-normal tracking-tight hover:border-none focus:border-none " 
            placeholder={searchPlaceholder} 
            />
            <Button className="rounded-full py-5 px-8 bg-purple-400 text-black hover:bg-purple-500 hover:cursor-pointer">Search</Button>
        </div>
    )
}
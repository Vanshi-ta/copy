import SearchInput from "@/components/private/search";
import Search from "@/components/private/search";
import LandingTabs from "./LandingTabs";

export default function Hero() {
    return (
        <div className="">
            <div className="flex item-center justify-center py-10 ">
                <span className="text-5xl font-extrabold font-sans tracking-tight">Where to?</span>
            </div>

            <div className="flex item-center justify-center  w-50%">
                {/* add the selector */}
                <LandingTabs/>

            </div>
            <div className="flex item-center justify-center   ">
                <div className="w-2xl">
                <SearchInput searchPlaceholder={"Enter your destination..."}/>
                </div>
                            </div>
        </div>
    );  
}
"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bed, FastForward, Home } from "lucide-react";
import { useState } from "react";

export default function LandingTabs(){
    const [tab, setTab] = useState("Move");
    
    return (
        <div>
            <div className="flex gap-5">
                <div onClick={() => setTab("Move")} className="flex items-center gap-1 py-5 hover:cursor-pointer">
                    <div className={`${tab === "Move" ? "border-b-2 border-foreground pb-2" : ""} flex items-center gap-1`}>
                        <Home className="w-5 h-5"/>
                        <span className="text-xl font-semibold tracking-tight">Move away</span>
                    </div>
                </div>
                <div onClick={() => setTab("Furniture")} className="flex items-center gap-1 py-5 hover:cursor-pointer">
                    <div className={`${tab === "Furniture" ? "border-b-2 border-foreground pb-2" : ""} flex items-center gap-1`}>
                        <Bed className="w-5 h-5"/>
                        <span className="text-xl font-semibold tracking-tight">Furniture</span>
                    </div>
                </div>
                <div onClick={() => setTab("Quick")} className="flex items-center gap-1 py-5 hover:cursor-pointer">
                    <div className={`${tab === "Quick" ? "border-b-2 border-foreground pb-2" : ""} flex items-center gap-1`}>
                        <FastForward className="w-5 h-5"/>
                        <span className="text-xl font-semibold tracking-tight">Quick move</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
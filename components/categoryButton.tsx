"use client"
import { Button } from "@mui/material";
import React from "react";

interface CategoryButtonProps {
    children: React.ReactNode;
    id: string;
}

const CategoryButtonSelected:React.FC<CategoryButtonProps> = (props) => {
    return <Button variant="contained" href={`game/${props.id}`} className="bg-[#FCF5ED] text-[#000000] hover:bg-[#cac0b5]">
        {props.children}
    </Button>
} 

export default CategoryButtonSelected   
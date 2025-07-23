"use client";
import { cn } from "@/lib/utils";

const CustomButton = ({
    disabled,
    isRounded,
}:{
    disabled: boolean;
    isRounded : boolean;
}) =>{


    return(
          /* using next js classname condition
  <button className={`test-sm ${ disabled ? "bg-red-500" : "bg-green-500" }`}>
    Hello
  </button> *
/* using tailwind css cn condition */
<button className={cn("text-sm" , disabled ? "bg-blue" : "bg-green-500", isRounded ? "rounded-full" : "rounded-md")}>
Hello
</button>
    )
}

export default CustomButton;
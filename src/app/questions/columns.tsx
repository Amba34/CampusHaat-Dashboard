"use client"
 
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table"
import { Code} from "lucide-react";
 



export type Questions = {
    id: string;
    difficulty: "Hard" | "Easy" | "Medium" ;
    question: string;
}


export const columns: ColumnDef<Questions>[] = [

    {
        accessorKey: "question",
        header: "Question",
    },
    {
      accessorKey: "difficulty",
      header: "Difficulty",
      cell: ({ row }) => {
        const difficulty = row.getValue("difficulty")
        
        return(
          <div className={cn("p-1 rounded-md w-max text-xs", 
            difficulty === "Medium" && "bg-yellow-500/40",
            difficulty === "Easy" && "bg-green-500/40",
            difficulty === "Hard" && "bg-red-500/40",
          )}>{difficulty as string}</div>
        )
      },
    },
    {
        accessorKey: "solution",
        header: "Solution",
        cell: ({ row }) => {
        const id = row.original.id; 
        
        return(
          <Button variant="ghost" className="p-0 flex items-center gap-1 text-sm font-medium">
            <Code />
            <Link href={`/questions/${id}`}>View</Link>
          </Button>
        )
      },
    },


    
]

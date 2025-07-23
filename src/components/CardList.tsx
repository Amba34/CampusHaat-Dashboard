
import { Card, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "./ui/button";
import { Code } from "lucide-react";
import Link from "next/link";

const resentQuestions = [
  {
    id: "q1",
    difficulty: "Easy",
    question: "Find indices of two numbers that sum to a target"
  },
  {
    id: "q2",
    difficulty: "Medium",
    question: "Add two numbers represented by linked lists"
  },
  {
    id: "q3",
    difficulty: "Hard",
    question: "Find median of two sorted arrays"
  },
  {
    id: "q4",
    difficulty: "Easy",
    question: "Check if parentheses are balanced"
  },
  {
    id: "q5",
    difficulty: "Medium",
    question: "Find the longest palindromic substring"
  },
  {
    id: "q6",
    difficulty: "Hard",
    question: "Solve the N-Queens puzzle"
  },
  {
    id: "q7",
    difficulty: "Easy",
    question: "Check if a string is a palindrome ignoring non-alphanumeric"
  },
  {
    id: "q8",
    difficulty: "Medium",
    question: "Convert string to integer with constraints"
  },
  {
    id: "q9",
    difficulty: "Medium",
    question: "Merge two sorted linked lists"
  },
  {
    id: "q10",
    difficulty: "Easy",
    question: "Find the maximum depth of a binary tree"
  }
];



const CardList = ({ title }: { title: string }) => {
  const list = resentQuestions

  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <div className="flex flex-col gap-2">
        <ScrollArea className="flex h-[50vh] mt-4 overflow-y-auto">
          <div className="flex flex-col gap-4">
            {list.map((item) => (
              <Card key={item.id} className="flex-row items-center justify-between gap-4 p-4">
                <CardContent className="flex-1 p-0">
                  <CardTitle className="text-sm font-medium">{item.question}</CardTitle>

                  <div className="flex items-center justify-start mt-2">
                  <Badge
                    variant="secondary"
                    className={cn(
                      "p-1 mt-1 rounded-md w-max text-xs",
                      item.difficulty === "Medium" && "bg-yellow-500/40",
                      item.difficulty === "Easy" && "bg-green-500/40",
                      item.difficulty === "Hard" && "bg-red-500/40"
                    )}
                  >
                    {item.difficulty}
                  </Badge>

                  {/* Align button to left using flex container */}
                    <Button variant="ghost" className="p-0 flex items-center gap-1 text-sm font-medium">
                      <Code className="w-4 h-4" />
                      <Link href={`/questions/${item.id}`}>Solution</Link>
                    </Button>
                  </div>
                </CardContent>


              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CardList;
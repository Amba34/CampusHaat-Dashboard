import { columns, Questions } from "./columns";
import { DataTable } from "./datatable";

const getData = async (): Promise<Questions[]> => {
  return  [
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
};


const PaymentsPage = async () => {
    const data = await getData();
    return (
        <div className="">
            <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
                <h1 className="font-semibold"> All Payments</h1>
            </div>
            <DataTable columns={columns} data={data}/>
        </div>
    );
};

export default PaymentsPage;
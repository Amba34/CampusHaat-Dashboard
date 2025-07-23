"use client";
import { useState } from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { Calendar1Icon } from "lucide-react";
import { Calendar } from "./ui/calendar";


const TodoList = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [open, setOpen] = useState(false);




    return (
        <div>
            <h1 className="text-lg font-medium mb-6">Todo List</h1>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild >
                    <Button className="w-full text-left" variant="outline">
                        <Calendar1Icon />
                        {date ? format(date, "PPP") : <span>Pick a Date</span>}
                    </Button>

                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => {
                            setDate(date);
                            setOpen(false);
                        }
                        }

                    />
                </PopoverContent>
            </Popover>
            <ScrollArea className="max-h-[600px] mt-4 overflow-y-auto">
                <div className="flex flex-col gap-4">
                    <Card className="p-4">
                        <div className="flex items-center gap-4 ">
                            <Checkbox id="item1" className="" />
                            <label htmlFor="item1" className="text-accent-foreground" >Solve 4 Dsa Question</label>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center gap-4 ">
                            <Checkbox id="item1" className="" />
                            <label htmlFor="item1" className="text-accent-foreground" >Make short notes</label>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center gap-4 ">
                            <Checkbox id="item1" className="" />
                            <label htmlFor="item1" className="text-accent-foreground" >Complete Assignment</label>
                        </div>
                    </Card>
                </div>
            </ScrollArea>
        </div>
    );
}

export default TodoList;
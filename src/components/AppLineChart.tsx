"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { Card, CardContent,  CardHeader, } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

const getDaysInMonth = (month: string): number => {
  const daysByMonth: { [key: string]: number } = {
    January: 31,
    February: 28, // You can add leap year logic if needed
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  }

  return daysByMonth[month] || 30
}

const generateMonthData = (month: string) => {
  const days = getDaysInMonth(month)
  const data = []

  for (let i = 1; i <= days; i++) {
    data.push({ day: i.toString(), question: Math.floor(Math.floor(Math.random() * 7)) })
  }

  return data
}

const chartDataByMonth: Record<string, { day: string; question: number }[]> = {
  January: generateMonthData("January"),
  February: generateMonthData("February"),
  March: generateMonthData("March"),
  April: generateMonthData("April"),
  May: generateMonthData("May"),
  June: generateMonthData("June"),
  July: generateMonthData("July"),
  August: generateMonthData("August"),
  September: generateMonthData("September"),
  October: generateMonthData("October"),
  November: generateMonthData("November"),
  December: generateMonthData("December"),
}


const chartConfig = {
    question: {
        label: "Question",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

const AppLineChart = () => {
    const [selectedMonth, setSelectedMonth] = useState<keyof typeof chartDataByMonth>("January")

    return (
        <Card >
        <CardHeader>


            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold mb-4">Solved Questions</h1>

                <div className="flex gap-2 mb-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" >
                                <span className="text-sm font-medium">{selectedMonth}</span>
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {Object.keys(chartDataByMonth).map((month) => (
                                <DropdownMenuItem
                                    key={month}
                                    onClick={() => setSelectedMonth(month as keyof typeof chartDataByMonth)}
                                >
                                    {month}
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setSelectedMonth("January")}>
                                Reset to January
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} >
                <AreaChart
                    accessibilityLayer
                    data={chartDataByMonth[selectedMonth]}
                    margin={{
                        left: 12,
                        right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis 
                        dataKey="day"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                    />

                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                    <Area
                     dataKey="question" type="natural" fill="var(--chart-1)" fillOpacity={0.4} stroke="var(--chart-1)" stackId="a"/>
                </AreaChart>
            </ChartContainer>
</CardContent>
        </Card>
    )
}

export default AppLineChart

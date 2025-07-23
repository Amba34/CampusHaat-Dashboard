"use client"


import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { difficulty: "Medium", questions: 275, fill: "#facc15AA" },
  { difficulty: "Easy", questions: 200, fill: "#22c55eAA" },
  { difficulty: "Hard", questions: 187, fill: "#ef4444AA" },

]

const chartConfig = {
  questions: {
    label: "Questions",
  },
  Hard: {
    label: "Hard",
    color: "#ef4444AA",
  },
  Easy: {
    label: "Easy",
    color: "#22c55eAA",
  },
  Medium: {
    label: "Medium",
    color: "#facc15AA",
  },

} satisfies ChartConfig

export function AppPaiChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart </CardTitle>
        <CardDescription>Questions Solved</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            
            <Pie
              data={chartData}
              dataKey="questions"
              nameKey="difficulty"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#facc15AA]" />
            <span className="text-sm text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#22c55eAA]" />
            <span className="text-sm text-muted-foreground">Easy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ef4444AA]" />
            <span className="text-sm text-muted-foreground">Hard</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

"use client"

import { useEffect, useState } from "react"
import { TrendingUp, ChevronDown } from "lucide-react"
import { Bar, BarChart as ReBarChart, CartesianGrid, XAxis } from "recharts"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export const description = "A bar chart"

const ENDPOINTS = [
  {
    label: "By Year",
    key: "by-year",
    url: "/api/orders/by-year",
    xKey: "year",
    yKey: "order_delivered",
  },
  {
    label: "By Month",
    key: "by-month",
    url: "/api/orders/by-month",
    xKey: "month",
    yKey: "order_delivered",
  },
  {
    label: "Created By Hour",
    key: "created-by-hour",
    url: "/api/orders/created-by-hour",
    xKey: "hour_24",
    yKey: "order_created",
  },
  {
    label: "Delivered By Hour",
    key: "delivered-by-hour",
    url: "/api/orders/delivered-by-hour",
    xKey: "hour_24",
    yKey: "order_delivered",
  }
]

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartBarDefault() {
  const [selected, setSelected] = useState(ENDPOINTS[0])
  type ChartData = {
    [key: string]: string | number;
    value: number;
  };
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9000"
      const res = await fetch(`${baseUrl}${selected.url}`)
      if (!res.ok) throw new Error("Failed to fetch data")
      const json = await res.json()
      // Handle nested data (e.g., { data: [...] })
      const rawData = Array.isArray(json) ? json : (json.data || [])
      // Normalize data to [{ xKey, value }]
      const chartData = rawData.map((item: Record<string, string | number>) => ({
        [selected.xKey]: item[selected.xKey],
        value: typeof item[selected.yKey] === "number" ? item[selected.yKey] : Number(item[selected.yKey]),
      }))
      setData(chartData)
    } catch (e) {
      if (typeof e === "object" && e !== null && "message" in e) {
        setError((e as { message?: string }).message || "Unknown error");
      } else {
        setError("Unknown error");
      }
      setData([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [selected.key]);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle>Bar Chart</CardTitle>
            <CardDescription>{selected.label}</CardDescription>
          </div>
          <div className="flex gap-2 mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <span className="text-sm font-medium">{selected.label}</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {ENDPOINTS.map((ep) => (
                  <DropdownMenuItem
                    key={ep.key}
                    onClick={() => setSelected(ep)}
                  >
                    {ep.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelected(ENDPOINTS[0])}>
                  Reset to {ENDPOINTS[0].label}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="default"
              onClick={fetchData}
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-red-500 py-8">{error}</div>
        ) : (
          <ChartContainer config={chartConfig}>
            <ReBarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={selected.xKey}
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) =>
                  typeof value === "string" && value.length > 3
                    ? value.slice(0, 3)
                    : value
                }
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar
                dataKey="value"
                fill="var(--color-value)"
                radius={8}
                // animationDuration={1500}
                // animationEasing="ease-in-out"
              />
            </ReBarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing data for: {selected.label}
        </div>
      </CardFooter>
    </Card>
  )
}

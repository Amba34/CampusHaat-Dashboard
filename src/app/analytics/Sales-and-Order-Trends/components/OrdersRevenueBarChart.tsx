"use client"

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart as ReBarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ordersChartConfig = {
  value: {
    label: "Total Orders",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const revenueChartConfig = {
  value: {
    label: "Total Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface OrdersData {
  month: string;
  total_orders: number | null;
}

interface RevenueData {
  month: string;
  total_revenue: number | null;
}

export function OrdersRevenueBarChart() {
  // Orders chart state
  const [ordersData, setOrdersData] = useState<OrdersData[]>([]);
  const [ordersYears, setOrdersYears] = useState<string[]>([]);
  const [ordersSelectedYear, setOrdersSelectedYear] = useState<string>("");
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  // Revenue chart state
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [revenueYears, setRevenueYears] = useState<string[]>([]);
  const [revenueSelectedYear, setRevenueSelectedYear] = useState<string>("");
  const [revenueLoading, setRevenueLoading] = useState(false);
  const [revenueError, setRevenueError] = useState<string | null>(null);

  // Tab state
  const [tab, setTab] = useState("orders");

  useEffect(() => {
    // Orders fetch
    const fetchOrders = async () => {
      setOrdersLoading(true);
      setOrdersError(null);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9000";
        const res = await fetch(`${baseUrl}/api/sales-and-order-trends/total-orders-per-month`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        const rawData: OrdersData[] = Array.isArray(json.data) ? json.data : [];
        setOrdersData(rawData);
        const yearSet = Array.from(new Set(rawData.map(item => item.month.split("-")[0])));
        setOrdersYears(yearSet);
        setOrdersSelectedYear(yearSet[yearSet.length - 1] || "");
      } catch (e) {
          if (typeof e === "object" && e !== null && "message" in e) {
            setOrdersError((e as { message?: string }).message || "Unknown error");
          } else {
            setOrdersError("Unknown error");
          }
        setOrdersData([]);
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchOrders();
    // Revenue fetch
    const fetchRevenue = async () => {
      setRevenueLoading(true);
      setRevenueError(null);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9000";
        const res = await fetch(`${baseUrl}/api/sales-and-order-trends/total-revenue-per-month`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        const rawData: RevenueData[] = Array.isArray(json.data) ? json.data : [];
        setRevenueData(rawData);
        const yearSet = Array.from(new Set(rawData.map(item => item.month.split("-")[0])));
        setRevenueYears(yearSet);
        setRevenueSelectedYear(yearSet[yearSet.length - 1] || "");
      } catch (e) {
          if (typeof e === "object" && e !== null && "message" in e) {
            setRevenueError((e as { message?: string }).message || "Unknown error");
          } else {
            setRevenueError("Unknown error");
          }
        setRevenueData([]);
      } finally {
        setRevenueLoading(false);
      }
    };
    fetchRevenue();
  }, []);

  // Filter data for selected year
  const filteredOrdersData = ordersData.filter(item => item.month.startsWith(ordersSelectedYear));
  const filteredRevenueData = revenueData.filter(item => item.month.startsWith(revenueSelectedYear));

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Sales and Order Trends</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <Tabs value={tab} onValueChange={setTab} className="mt-4 flex-1 flex flex-col">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>
          <TabsContent value="orders" className="flex-1 flex flex-col">
            <div className="flex gap-2 mb-4">
              <Select value={ordersSelectedYear} onValueChange={setOrdersSelectedYear}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {ordersYears.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 flex flex-col">
              {ordersLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : ordersError ? (
                <div className="text-red-500 py-8">{ordersError}</div>
              ) : (
                <ChartContainer config={ordersChartConfig}>
                  <ReBarChart accessibilityLayer data={filteredOrdersData} style={{ height: '100%' }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={value => {
                        const parts = value.split("-");
                        return parts[1] ? `${parts[1]}` : value;
                      }}
                    />
                    <YAxis />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Bar
                      dataKey="total_orders"
                      fill="var(--color-value)"
                      radius={8}
                      animationDuration={1000}
                      animationEasing="ease-in-out"
                    />
                  </ReBarChart>
                </ChartContainer>
              )}
            </div>
          </TabsContent>
          <TabsContent value="revenue" className="flex-1 flex flex-col">
            <div className="flex gap-2 mb-4">
              <Select value={revenueSelectedYear} onValueChange={setRevenueSelectedYear}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {revenueYears.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 flex flex-col">
              {revenueLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : revenueError ? (
                <div className="text-red-500 py-8">{revenueError}</div>
              ) : (
                <ChartContainer config={revenueChartConfig}>
                  <ReBarChart accessibilityLayer data={filteredRevenueData} style={{ height: '100%' }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={value => {
                        const parts = value.split("-");
                        return parts[1] ? `${parts[1]}` : value;
                      }}
                    />
                    <YAxis />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Bar
                      dataKey="total_revenue"
                      fill="var(--color-value)"
                      radius={8}
                      animationDuration={1000}
                      animationEasing="ease-in-out"
                    />
                  </ReBarChart>
                </ChartContainer>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

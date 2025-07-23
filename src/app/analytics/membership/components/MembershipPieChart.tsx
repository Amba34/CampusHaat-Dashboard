"use client";

import React, { useEffect, useState } from "react";
import { Pie, PieChart, Cell } from "recharts";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export default function MembershipPieChart() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  type PieData = {
    membershipValue: number;
    total_memberships: number;
    fill: string;
  };
  const [chartData, setChartData] = useState<PieData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Replace with your actual fetch logic
        const res = await fetch(`${BASE_URL}/api/membership/total-memberships-by-value`);
        const json = await res.json();
        const data = json.data.map((item: { membershipValue: number; total_memberships: number }, idx: number) => ({
          membershipValue: item.membershipValue,
          total_memberships: item.total_memberships,
          fill: COLORS[idx % COLORS.length],
        }));
        setChartData(data);
      } catch (err) {
        setError("Failed to fetch pie chart data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const chartConfig: ChartConfig = {
    total_memberships: {
      label: "Total Memberships",
    },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Memberships by Value</CardTitle>
        <CardDescription>Distribution of memberships by value</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {loading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="total_memberships"
                nameKey="membershipValue"
                label
                outerRadius={100}
                isAnimationActive={false}
              >
                {chartData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
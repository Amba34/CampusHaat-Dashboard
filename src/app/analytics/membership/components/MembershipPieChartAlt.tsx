"use client"
import React from "react";
import { useEffect, useState } from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

export default function MembershipPieChartAlt() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  type RadarData = {
    mode: string;
    num_payments: number;
    total_amount: string;
  };
  const [chartData, setChartData] = useState<RadarData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const chartConfig: ChartConfig = {
    num_payments: {
      label: "Payments",
    },
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${BASE_URL}/api/membership/payment-stats-by-mode`);
        const json = await res.json();
        const data = json.data.map((item: { mode: string; num_payments: number; total_amount: string }) => ({
          mode: item.mode,
          num_payments: item.num_payments,
          total_amount: item.total_amount,
        }));
        setChartData(data);
      } catch (e) {
        console.log(e);
        setError("Failed to fetch pie chart data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  // Custom tooltip content for info card
  interface TooltipProps {
    active?: boolean;
    payload?: Array<{ payload: { mode: string; num_payments: number; total_amount: string } }>;
  }
  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="rounded-lg bg-background p-3 shadow-lg border text-sm">
          <div><strong>Mode:</strong> {d.mode}</div>
          <div><strong>Payments:</strong> {d.num_payments}</div>
          <div><strong>Total Amount:</strong> ₹{d.total_amount}</div>
        </div>
      );
    }
    return null;
  };
  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Payments by Mode (Radar)</CardTitle>
        <CardDescription>
          Showing total payments by mode
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        {loading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadarChart data={chartData} outerRadius={100}>
              <ChartTooltip cursor={false} content={<CustomTooltip />} />
              <PolarAngleAxis dataKey="mode" />
              <PolarGrid />
              <Radar
                dataKey="num_payments"
                fill="var(--chart-1)"
                fillOpacity={0.6}
                dot={{ r: 4, fillOpacity: 1 }}
              />
            </RadarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

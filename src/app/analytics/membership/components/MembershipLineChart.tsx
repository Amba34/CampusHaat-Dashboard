
"use client";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const chartConfig = {
  total_memberships: {
    label: "Total Memberships",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function MembershipLineChart() {
  type MembershipMonthData = {
    year: string | number;
    month: string | number;
    total_memberships: number | null;
    total_value: number | null;
    label: string;
  };
  const [data, setData] = React.useState<MembershipMonthData[]>([]);
  const [years, setYears] = React.useState<string[]>([]);
  const [selectedYear, setSelectedYear] = React.useState<string>("");
  const [showAll, setShowAll] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BASE_URL}/api/membership/total-memberships-and-value-per-month`);
        const json = await res.json();
        // Assume each item has year, month, total_memberships, total_value
        const raw = json.data || [];
        // If year/month not present, generate from index
        const processed: MembershipMonthData[] = raw.map((item: { year: string | number; month: string | number; total_memberships: number; total_value: number }) => {
          // item.month is like "2021-01"
          let year = "";
          let month = "";
          if (item.month && typeof item.month === "string" && item.month.includes("-")) {
            [year, month] = item.month.split("-");
          } else {
            year = item.year ? item.year.toString() : "";
            month = item.month ? item.month.toString() : "";
          }
          return {
            year,
            month,
            total_memberships: item.total_memberships ? Number(item.total_memberships) : null,
            total_value: item.total_value ? Number(item.total_value) : null,
            label: item.month,
          };
        });
        // Get all years as string[]
        const yearSet: string[] = Array.from(new Set(processed.map((d: MembershipMonthData) => d.year.toString())));
        setYears(yearSet);
        setSelectedYear(yearSet[yearSet.length - 1] || "");
        setData(processed);
      } catch (err) {
        console.log(err)
        setError("Failed to fetch chart data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredData = data.filter((item) => item.year.toString() === selectedYear);
  const allData = showAll ? data : filteredData;

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Membership Analysis</CardTitle>
          <CardDescription>
            {showAll ? "Showing all years" : `Showing total memberships and value for ${selectedYear}`}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Select value={selectedYear} onValueChange={setSelectedYear} disabled={showAll}>
            <SelectTrigger
              className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
              aria-label="Select year"
            >
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {years.map((year) => (
                <SelectItem key={year} value={year} className="rounded-lg">
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={showAll ? "all" : "year"} onValueChange={v => setShowAll(v === "all") }>
            <SelectTrigger className="w-[120px] rounded-lg" aria-label="Show all">
              <SelectValue placeholder="Show" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="year" className="rounded-lg">Year Only</SelectItem>
              <SelectItem value="all" className="rounded-lg">All Data</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {loading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={allData}>
              <defs>
                <linearGradient id="fillMemberships" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-total_memberships)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-total_memberships)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-total_value)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-total_value)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  // value is "01", "02", ... or number
                  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                  let idx = -1;
                  if (typeof value === "string" && value.length === 2) {
                    idx = parseInt(value, 10) - 1;
                  } else {
                    idx = Number(value) - 1;
                  }
                  return monthNames[idx] || value;
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(label) => {
                      // Find the data for the hovered month
                      const d = allData.find((item) => item.month === label);
                      if (!d) return label;
                      // Convert month to name
                      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                      let idx = -1;
                      if (typeof d.month === "string" && d.month.length === 2) {
                        idx = parseInt(d.month, 10) - 1;
                      } else {
                        idx = Number(d.month) - 1;
                      }
                      const monthName = monthNames[idx] || d.month;
                      return (
                        <div style={{ whiteSpace: "pre-line" }}>
                          <div><strong>Month:</strong> {monthName}</div>
                          <div><strong>Total Value:</strong> {d.total_value ?? "-"}</div>
                        </div>
                      );
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="total_memberships"
                type="natural"
                fill="url(#fillMemberships)"
                stroke="var(--color-total_memberships)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

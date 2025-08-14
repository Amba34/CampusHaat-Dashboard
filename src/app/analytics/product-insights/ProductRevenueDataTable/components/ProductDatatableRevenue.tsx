"use client"

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface RevenueData {
  categoryName: string;
  total_revenue: string;
}


import { Input } from "@/components/ui/input";

export function ProductDatatableRevenue() {
  const [data, setData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9000";
        const res = await fetch(`${baseUrl}/api/category-and-product-insights/order-by-year`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        const rawData: RevenueData[] = Array.isArray(json.data) ? json.data : [];
        setData(rawData);
      } catch (e) {
        if (typeof e === "object" && e !== null && "message" in e) {
          setError((e as { message?: string }).message || "Unknown error");
        } else {
          setError("Unknown error");
        }
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter data by search (category or revenue), handle nulls
  const filteredData = data.filter(item => {
    const searchLower = search.toLowerCase();
    const category = item.categoryName ? item.categoryName.toLowerCase() : "";
    const revenue = item.total_revenue != null ? item.total_revenue.toString() : "";
    return category.includes(searchLower) || revenue.includes(searchLower);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue by Category (Table View)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4 items-center">
          <Input
            type="text"
            placeholder="Search category or revenue..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="max-w-xs"
          />
        </div>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-red-500 py-8">{error}</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Total Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.categoryName}</TableCell>
                  <TableCell>₹{item.total_revenue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

"use client"

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export function SalesOrderTrendsDataTable() {
  const [tab, setTab] = useState("high-value-buyers");
  type HighValueBuyer = { buyerId: string; lifetime_value: string };
  type TopSellingProduct = { productId: number; productCategory: number; total_quantity_sold: number };
  type AvgOrderValue = { buyerId: string; value: string };
  const [data, setData] = useState<Array<HighValueBuyer | TopSellingProduct | AvgOrderValue>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("2022");

  // Generate years from 2019 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2018 }, (_, i) => (2019 + i).toString());

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      let endpoint = "";
      if (tab === "high-value-buyers") {
        endpoint = "/api/sales-and-order-trends/high-value-buyers";
      } else if (tab === "top-selling-products") {
        endpoint = "/api/sales-and-order-trends/top-10-selling-products-by-quantity";
      } else if (tab === "avg-order-value") {
        endpoint = `/api/sales-and-order-trends/average-order-value-per-buyer?year=${selectedYear}`;
      }
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9000";
        const res = await fetch(`${baseUrl}${endpoint}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        setData(Array.isArray(json.data) ? json.data : []);
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
  }, [tab, selectedYear]);

  // Filter data by search
  const filteredData = (() => {
    if (tab === "high-value-buyers") {
      return (data as HighValueBuyer[]).filter(item =>
        item.buyerId?.toString().includes(search) ||
        item.lifetime_value?.toString().includes(search)
      );
    } else if (tab === "top-selling-products") {
      return (data as TopSellingProduct[]).filter(item =>
        item.productId?.toString().includes(search) ||
        item.productCategory?.toString().includes(search) ||
        item.total_quantity_sold?.toString().includes(search)
      );
    } else if (tab === "avg-order-value") {
      return (data as AvgOrderValue[]).filter(item =>
        item.buyerId?.toString().includes(search) ||
        item.value?.toString().includes(search)
      );
    }
    return [];
  })();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales & Order Trends Data Table</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={setTab} className="mb-4">
          <TabsList>
            <TabsTrigger value="high-value-buyers">High Value Buyers</TabsTrigger>
            <TabsTrigger value="top-selling-products">Top 10 Selling Products</TabsTrigger>
            <TabsTrigger value="avg-order-value">Avg Order Value/Buyer</TabsTrigger>
          </TabsList>
          <TabsContent value="high-value-buyers">
            <Input
              type="text"
              placeholder="Search buyer id or revenue..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="max-w-xs mb-4"
            />
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : error ? (
              <div className="text-red-500 py-8">{error}</div>
            ) : (
              <div className="max-h-[60vh] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Buyer ID</TableHead>
                      <TableHead>Revenue from Buyer</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(filteredData as HighValueBuyer[]).map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{item.buyerId}</TableCell>
                        <TableCell>{item.lifetime_value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          <TabsContent value="top-selling-products">
            <Input
              type="text"
              placeholder="Search product id, category or quantity..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="max-w-xs mb-4"
            />
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : error ? (
              <div className="text-red-500 py-8">{error}</div>
            ) : (
              <div className="max-h-[60vh] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product ID</TableHead>
                      <TableHead>Product Category</TableHead>
                      <TableHead>Total Quantity Sold</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(filteredData as TopSellingProduct[]).map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{item.productId}</TableCell>
                        <TableCell>{item.productCategory}</TableCell>
                        <TableCell>{item.total_quantity_sold}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          <TabsContent value="avg-order-value">
            <div className="flex items-center gap-2 mb-4">
              <Input
                type="text"
                placeholder="Search buyer id or avg order value..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="max-w-xs"
              />
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : error ? (
              <div className="text-red-500 py-8">{error}</div>
            ) : (
              <div className="max-h-[60vh] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Buyer ID</TableHead>
                      <TableHead>Avg Order Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(filteredData as AvgOrderValue[]).map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{item.buyerId}</TableCell>
                        <TableCell>{item.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

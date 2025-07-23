"use client"

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export function CustomerBehaviourDataTable() {
  const [tab, setTab] = useState("repeat-vs-one-time-buyers");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  // Cache for each tab
  const [cache, setCache] = useState<{ [key: string]: any[] }>({});

  // Fetch data and cache it
  const fetchData = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);
    let endpoint = "";
    if (tab === "repeat-vs-one-time-buyers") {
      endpoint = "/api/customer-behaviour/repeat-vs-one-time-buyers";
    } else if (tab === "repeat-buyers-favorite-categories") {
      endpoint = "/api/customer-behaviour/repeat-buyers-favorite-categories";
    }
    // Use cache unless forceRefresh
    if (!forceRefresh && cache[tab]) {
      setData(cache[tab]);
      setLoading(false);
      return;
    }
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9000";
      const res = await fetch(`${baseUrl}${endpoint}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const json = await res.json();
      const newData = Array.isArray(json.data) ? json.data : [];
      setData(newData);
      setCache(prev => ({ ...prev, [tab]: newData }));
    } catch (e: any) {
      setError(e.message || "Unknown error");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  // Filter data by search
  const filteredData = data.filter(item => {
    if (tab === "repeat-vs-one-time-buyers") {
      return (
        item.buyerId?.toString().includes(search) ||
        item.order_count?.toString().includes(search)
      );
    } else if (tab === "repeat-buyers-favorite-categories") {
      return (
        item.buyerId?.toString().includes(search) ||
        item.categoryName?.toLowerCase().includes(search.toLowerCase()) ||
        item.total_orders?.toString().includes(search)
      );
    }
    return true;
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Customer Behaviour Data Table</CardTitle>
        <button
          className="px-3 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/80 transition"
          onClick={() => fetchData(true)}
          disabled={loading}
        >
          Refresh
        </button>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={setTab} className="mb-4">
          <TabsList>
            <TabsTrigger value="repeat-vs-one-time-buyers">Repeat vs One-time Buyers</TabsTrigger>
            <TabsTrigger value="repeat-buyers-favorite-categories">Repeat Buyers Favorite Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="repeat-vs-one-time-buyers">
            <Input
              type="text"
              placeholder="Search buyer id or order count..."
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
                      <TableHead>Order Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{item.buyerId}</TableCell>
                        <TableCell>{item.order_count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          <TabsContent value="repeat-buyers-favorite-categories">
            <Input
              type="text"
              placeholder="Search buyer id, category or total orders..."
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
                      <TableHead>Category Name</TableHead>
                      <TableHead>Total Orders</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{item.buyerId}</TableCell>
                        <TableCell>{item.categoryName}</TableCell>
                        <TableCell>{item.total_orders}</TableCell>
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

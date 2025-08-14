"use client"


interface ProductData {
  categoryName: string;
  productId: number;
  total_quantity: number;
}


import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

interface ProductData {
  categoryName: string;
  productId: number;
  total_quantity: number;
}


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function ProductDatatabelQuantity() {
  const [data, setData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchProductId, setSearchProductId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9000";
        const res = await fetch(`${baseUrl}/api/category-and-product-insights/most-ordered-products-in-each-category`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        const rawData: ProductData[] = Array.isArray(json.data) ? json.data : [];
        setData(rawData);
        if (rawData.length && !selectedCategory) {
          setSelectedCategory(rawData[0].categoryName);
        }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get unique categories
  const categories = Array.from(new Set(data.map(item => item.categoryName)));
  // Filter categories by search
  const filteredCategories = categories.filter(cat => cat.toLowerCase().includes(searchCategory.toLowerCase()));
  // Filter data for selected category and productId
  const filteredData = data.filter(item => {
    const matchCategory = item.categoryName === selectedCategory;
    const matchProductId = searchProductId
      ? item.productId.toString().includes(searchProductId)
      : true;
    return matchCategory && matchProductId;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Most Ordered Products (Table View)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4 items-center">
          <Input
            type="text"
            placeholder="Search category..."
            value={searchCategory}
            onChange={e => setSearchCategory(e.target.value)}
            className="max-w-xs"
          />
              <Input
                type="text"
                placeholder="Search product ID..."
                value={searchProductId}
                onChange={e => setSearchProductId(e.target.value)}
                className="max-w-xs"
              />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {filteredCategories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                <TableHead>Product ID</TableHead>
                <TableHead>Total Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.categoryName}</TableCell>
                  <TableCell>{item.productId}</TableCell>
                  <TableCell>{item.total_quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

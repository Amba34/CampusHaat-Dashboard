"use client"

import { useEffect, useState } from "react";
import { ChartBarDefault } from "./components/BarChart";
import { ChartLineDefault } from "./components/LineChart";
import OrderAvgTimesCard from "./components/OrderAvgTimesCard";


export default function CustomersRegisteredPage() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      setVisible(true);
    }, []);
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2">
        <ChartBarDefault />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2">
        <ChartLineDefault />
      </div>
      <div className="lg:col-span-4">
        <OrderAvgTimesCard />
      </div>
    </div>
  );
} 
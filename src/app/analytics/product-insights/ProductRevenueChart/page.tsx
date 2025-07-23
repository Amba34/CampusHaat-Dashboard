"use client"

// import ProductInsightsCard from "./components/ProductInsightsCard";
import React, { useState, useEffect } from "react";
import {ProductDatatableRevenue} from "./components/ProductDatatableRevenue";

export default function ProductInsightsPage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="lg:col-span-2 ">
       <ProductDatatableRevenue/>
      </div>
    </div>
  );
}

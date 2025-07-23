"use client"

import React, { useState, useEffect } from "react";
import { CustomerBehaviourDataTable } from "./components/CustomerBehaviourDataTable";


export default function CustomersRegisteredPage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-full">
        <CustomerBehaviourDataTable />
      </div>
    </div>
  );
} 
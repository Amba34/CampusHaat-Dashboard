"use client"
import React, { useState, useEffect } from "react";
import MembershipInfoCard from "./components/MembershipInfoCard";
import MembershipLineChart from "./components/MembershipLineChart";
import MembershipPieChart from "./components/MembershipPieChart";
import MembershipPieChartAlt from "./components/MembershipPieChartAlt";


export default function MembershipPage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="lg:col-span-2">
        <MembershipLineChart/>
      </div>
      <div className="lg:col-span-1">
        <MembershipPieChart/>
      </div>
      <div className="lg:col-span-1">
        <MembershipPieChartAlt/>
      </div>
      <div className="lg:col-span-2">
        <MembershipInfoCard/>
      </div>
    </div>
  );
}

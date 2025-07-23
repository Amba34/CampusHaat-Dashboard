"use client"
import React, { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface AvgTimes {
  avgCreateToPickup: number | null;
  avgPickupToDispatch: number | null;
  avgDispatchToDelivery: number | null;
  avgCreateToDelivery: number | null;
  latePickups: number | null;
}

export default function OrderAvgTimesCard() {
  const [data, setData] = useState<AvgTimes>({
    avgCreateToPickup: null,
    avgPickupToDispatch: null,
    avgDispatchToDelivery: null,
    avgCreateToDelivery: null,
    latePickups: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [createToPickup, pickupToDispatch, dispatchToDelivery, createToDelivery, latePickups] = await Promise.all([
        fetch(`${BASE_URL}/api/orders/avg-create-to-pickup`).then(res => res.json()),
        fetch(`${BASE_URL}/api/orders/avg-pickup-to-dispatch`).then(res => res.json()),
        fetch(`${BASE_URL}/api/orders/avg-dispatch-to-delivery`).then(res => res.json()),
        fetch(`${BASE_URL}/api/orders/avg-create-to-delivery`).then(res => res.json()),
        fetch(`${BASE_URL}/api/orders/late-pickups`).then(res => res.json()),
      ]);
      setData({
        avgCreateToPickup: createToPickup?.data?.[0]?.avg_mins_create_to_pickup ? parseFloat(createToPickup.data[0].avg_mins_create_to_pickup) : null,
        avgPickupToDispatch: pickupToDispatch?.data?.[0]?.diff_mins ? parseFloat(pickupToDispatch.data[0].diff_mins) : null,
        avgDispatchToDelivery: dispatchToDelivery?.data?.[0]?.avg_mins_dispatch_to_delivery ? parseFloat(dispatchToDelivery.data[0].avg_mins_dispatch_to_delivery) : null,
        avgCreateToDelivery: createToDelivery?.data?.[0]?.avg_mins_create_to_delivery ? parseFloat(createToDelivery.data[0].avg_mins_create_to_delivery) : null,
        latePickups: latePickups?.data?.[0]?.["count(*)"] ? latePickups.data[0]["count(*)"] : null,
      });
    } catch (err) {
      setError("Failed to fetch order averages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-primary-foreground rounded-lg p-6 shadow mb-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Order Time Averages</h2>
        <button
          className="px-3 py-1 text-sm rounded bg-primary text-primary-foreground hover:bg-primary/80 transition"
          onClick={fetchData}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      {loading ? (
        <div className="text-muted-foreground">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <ul className="space-y-2 text-left">
          <li>
            <span className="font-medium">Avg. Create to Pickup:</span> {data.avgCreateToPickup ?? "-"} min
          </li>
          <li>
            <span className="font-medium">Avg. Pickup to Dispatch:</span> {data.avgPickupToDispatch ?? "-"} min
          </li>
          <li>
            <span className="font-medium">Avg. Dispatch to Delivery:</span> {data.avgDispatchToDelivery ?? "-"} min
          </li>
          <li>
            <span className="font-medium">Avg. Create to Delivery:</span> {data.avgCreateToDelivery ?? "-"} min
          </li>
          <li>
            <span className="font-medium">Late Pickups:</span> {data.latePickups ?? "-"}
          </li>
        </ul>
      )}
    </div>
  );
}

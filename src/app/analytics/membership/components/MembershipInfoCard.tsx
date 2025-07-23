"use client"
import React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function MembershipInfoCard() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [nonMemberPayment, setNonMemberPayment] = useState<string>("");
  const [membershipValue, setMembershipValue] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchInfo() {
      setLoading(true);
      setError("");
      try {
        const [res1, res2] = await Promise.all([
          fetch(`${BASE_URL}/api/membership/total-non-member-payment`),
          fetch(`${BASE_URL}/api/membership/total-membership-value`),
        ]);
        const json1 = await res1.json();
        const json2 = await res2.json();
        setNonMemberPayment(json1.data?.[0]?.total_non_member_payment || "-");
        setMembershipValue(json2.data?.[0]?.total_membership_value || "-");
      } catch (err) {
        setError("Failed to fetch info card data.");
      } finally {
        setLoading(false);
      }
    }
    fetchInfo();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Membership Summary</CardTitle>
        <CardDescription>Key financial metrics</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid gap-3 text-lg">
            <div>
              <span className="font-semibold">Total Non-Member Payment:</span>
              <span className="ml-2">₹{nonMemberPayment}</span>
            </div>
            <div>
              <span className="font-semibold">Total Membership Value:</span>
              <span className="ml-2">₹{membershipValue}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

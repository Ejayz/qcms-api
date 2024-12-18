"use client";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { DateTime } from "luxon";

export default function OrderListView() {
  const [page, setPage] = useState(1);
  const searchInput = useRef<HTMLInputElement>(null);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    data: ordersData,
    isFetching,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get_production", page, search, limit, startDate, endDate],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        search: search || "",
        limit: limit.toString(),
        startDate: startDate || "",
        endDate: endDate || "",
      });

      const response = await fetch(`/api/v1/get_production?${queryParams}`, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch production data");
      }

      return response.json();
    },
  });

  const navigator = useRouter();

  return (
    <div className="overflow-x-auto mt-4 w-11/12 mx-auto text-black">
      <div className="breadcrumbs my-4 text-lg text-slate-600 font-semibold">
        <ul>
          <li>
            <Link href="/"> </Link>
          </li>
          <li>
            <span>Order Fabrication Management</span>
          </li>
        </ul>
      </div>

      <div className="w-11/12 flex flex-col mx-auto gap-y-12 h-full">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex gap-4">
            <label className="input mt-auto pr-0 input-bordered flex flex-row justify-center items-center">
              <input
                type="text"
                ref={searchInput}
                className="grow w-full"
                placeholder="Search OF ID"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearch(searchInput.current?.value || "");
                    setPage(1);
                  }
                }}
              />
              <button
                onClick={() => {
                  setSearch(searchInput.current?.value || "");
                  setPage(1);
                }}
                className="btn btn-sm h-full drop-shadow-2xl flex items-center gap-2"
              >
                <Search color="#000000" /> Search
              </button>
            </label>

            <div className="flex flex-col">
              <label className="text-black">Start Date:</label>
              <input
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                className="input input-bordered"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-black">End Date:</label>
              <input
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                className="input input-bordered"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-black invisible">Add:</label>
              <Link href="/dashboard/addorder" className="btn btn-primary">
                Add Production
              </Link>
            </div>
          </div>
        </div>

        <table className="table text-center">
          <thead>
            <tr>
              <th>OF ID</th>
              <th>Entry Date</th>
              <th>Exit Date</th>
              <th>Created At</th>
              <th>OPTIONS</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || isFetching ? (
              <tr>
                <td colSpan={5}>
                  <span className="loading loading-dots loading-md"></span>
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={5}>Error loading data</td>
              </tr>
            ) : ordersData?.data.length ? (
              ordersData.data.map((order: any, index: number) => (
                <tr key={index}>
                  <td>{order.order_form_id}</td>
                  <td>{DateTime.fromISO(order.entry_date_time).toFormat("dd/MM/yy hh:mm a")}</td>
                  <td>{DateTime.fromISO(order.exit_date_time).toFormat("dd/MM/yy hh:mm a")}</td>
                  <td>
                    {DateTime.fromISO(order.created_at).toFormat(
                      "dd/MM/yy hh:mm a"
                    )}
                  </td>
                  <td>
                    <Link
                      href={`/dashboard/editorder/${order.id}`}
                      className="link flex"
                    >
                      <Pencil className="text-warning" /> Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

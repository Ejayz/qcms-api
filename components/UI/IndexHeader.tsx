"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/UI/Footer";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LayoutDashboard, User } from "lucide-react";
import { usePathname } from "next/navigation";
export default function IndexHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const query = usePathname();
  console.log(query)
  return (
    <QueryClientProvider client={queryClient}>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col bg-white">
          {/* Navbar */}
          <div className="navbar bg-white w-full shadow-md lg:hidden text-black glass">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2">
              <Image
                src="/Img/logo.png"
                className=""
                alt="logo"
                width={214}
                height={85}
              />
            </div>
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal text-black">
                {/* Navbar menu content here */}
                <li>
                  <Link href="/dashboard"> Dashboard </Link>
                </li>
                <li>
                  <Link href="#contactus"> Contact </Link>
                </li>
                <li>
                  <Link href="#services"> Services </Link>
                </li>
                <li>
                  <Link href="#team"> Team </Link>
                </li>
                <li>
                  <Link href="#productgallery"> Product Gallery </Link>
                </li>
              </ul>
            </div>
          </div>
          <Toaster position="top-right" reverseOrder={false} />

          {/* Page content here */}
          {children}
          {/* <Footer /> */}
        </div>
        <div className="drawer-side overflow-auto">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
         
          <ul className="menu bg-base-200 text-black min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <Link
                href="dashboard"
                className={`${
                  query=="/dashboard" ? "bg-primary" : ""
                }`}
              >
                <LayoutDashboard></LayoutDashboard> Dashboard{" "}
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/user_management"
                className={`${
                  query=="/dashboard/user_management"? "bg-primary" : ""
                }`}
              >
                <User></User> User Management
              </Link>
            </li>
            <li>
              <Link href="#services"> Services </Link>
            </li>
            <li>
              <Link href="#team"> Team </Link>
            </li>
            <li>
              <Link href="#productgallery"> Product Gallery </Link>
            </li>
          </ul>
        </div>
      </div>
    </QueryClientProvider>
  );
}

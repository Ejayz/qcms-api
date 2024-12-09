"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/UI/Footer";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {                                                                                                                                                           
  BookText,
  BookUser,
  Boxes,
  FileChartColumnIncreasing,
  LayoutDashboard,
  Microscope,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import IndexHeader from "./IndexHeader";

export default function Sidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const query = usePathname();
  console.log(query);

  const router = useRouter();
  const supabase = createClient(); // Create the Supabase client instance

  const [useremail, setUseremail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserEmail = async () => {
      const { data } = await supabase.auth.getUser();
      setUseremail(data.user?.user_metadata.email || null);
      setUserRole(data.user?.user_metadata.role || null);
      setUserID(data.user?.user_metadata.sub || null);
    };

    fetchUserEmail();
  }, []);
  // console.log("User Email:", useremail);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error during logout:", error.message);
    } else {
      // Clear additional client-side data if needed
      localStorage.removeItem("customUserData"); // Example for custom storage
      // Redirect to the login page or another route
      router.push("/login");
    }
  };
  return (
    <QueryClientProvider client={queryClient}>
      {/* <div
        className="navbar border-b-2 border-black text-black lg:hidden "
        style={{
          backgroundImage: "url('/Img/4.png')",

          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex-1">
          <div className="flex-none lg:hidden ">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                className="inline-block h-20 w-20 stroke-current"
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
          <Image
            src="/Img/logo1.png"
            className=""
            alt="logo"
            width={214}
            height={85}
          />
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-slate-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <span className="text-black">{useremail}</span>
              </li>
              <li>
                <a className="text-black" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div> */}

      {/* <IndexHeader></IndexHeader> */}
      <div className="drawer lg:drawer-open bg-white">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col ">
          {/* Navbar */}

          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: "",
              duration: 5000,
              style: {
                background: "#fff",
                color: "#363636",
              },
            }}
          />

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

          <ul className="menu bg-white text-black min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <Link
                href="dashboard"
                className={`${query == "/dashboard" ? "bg-primary" : ""}`}
              >
                <LayoutDashboard></LayoutDashboard> Dashboard{" "}
              </Link>
            </li>
            {userRole === "Super Admin" ? (
              <li className="rounded collapse collapse-arrow">
                <details
                  open={
                    query === "/dashboard/user_management" ||
                    query === "/dashboard/customer_management"
                  }
                >
                  <summary
                    className={`${
                      query == "/dashboard/user_management" ? "bg-primary" : ""
                    } ${
                      query == "/dashboard/customer_management"
                        ? "bg-primary"
                        : ""
                    }`}
                  >
                    <BookUser />
                    User Management
                  </summary>
                  <ul>
                    <li>
                      <Link
                        href="/dashboard/user_management"
                        className={`${
                          query == "/dashboard/user_management"
                            ? "bg-orange-700"
                            : ""
                        }`}
                      >
                        Manage Users
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/customer_management"
                        className={`${
                          query == "/dashboard/customer_management"
                            ? "bg-orange-700"
                            : ""
                        }`}
                      >
                        Manage Customer
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
            ) : (
              <li>
                <Link
                  href="/dashboard/user_management"
                  className={`${
                    query == "/dashboard/user_management" ? "bg-primary" : ""
                  }`}
                >
                  <Microscope color="#000000" />
                  User Management
                </Link>
              </li>
            )}

            <li className="rounded collapse collapse-arrow">
              <details>
                <summary>
                  <BookText />
                  Article Management
                </summary>
                <ul>
                  <li>
                    <Link
                      href="/dashboard/article_management"
                      className={`${
                        query == "/dashboard/article_management"
                          ? "bg-primary"
                          : ""
                      }`}
                    >
                      Manage Article
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/article_nominal_management"
                      className={`${
                        query == "/dashboard/article_nominal_management"
                          ? "bg-primary"
                          : ""
                      }`}
                    >
                      Manage Article Nominal
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/article_min_management"
                      className={`${
                        query == "/dashboard/article_min_management"
                          ? "bg-primary"
                          : ""
                      }`}
                    >
                      Manage Article Min
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/article_max_management"
                      className={`${
                        query == "/dashboard/article_max_management"
                          ? "bg-primary"
                          : ""
                      }`}
                    >
                      Manage Article Max
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li className="rounded collapse collapse-arrow">
              <details>
                <summary>
                  <BookText />
                  Order Form Management
                </summary>
                <ul>
                  <li>
                    <Link
                      href="/dashboard/order_management"
                      className={`${
                        query == "/dashboard/order_management"
                          ? "bg-primary"
                          : ""
                      }`}
                    >
                      Manage Order
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/production_management"
                      className={`${
                        query == "/dashboard/production_management"
                          ? "bg-primary"
                          : ""
                      }`}
                    >
                      Manage Production
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/proofing_management"
                      className={`${
                        query == "/dashboard/profing_management"
                          ? "bg-primary"
                          : ""
                      }`}
                    >
                      Manage Proofing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/measurement_management"
                      className={`${
                        query == "/dashboard/measurement_management"
                          ? "bg-primary"
                          : ""
                      }`}
                    >
                      Manage Measurement
                    </Link>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <Link
                href="/dashboard/laboratory_management"
                className={`${
                  query == "/dashboard/laboratory_management"
                    ? "bg-primary"
                    : ""
                }`}
              >
                <Microscope color="#000000" />
                Laboratory Management
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/production_management"
                className={`${
                  query == "/dashboard/production_management"
                    ? "bg-primary"
                    : ""
                }`}
              >
                <Boxes color="#000000" />
                Production Management
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/analytical_management"
                className={`${
                  query == "/dashboard/analytical_management"
                    ? "bg-primary"
                    : ""
                }`}
              >
                <FileChartColumnIncreasing color="#000000" />
                Analytical Report
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/report_management"
                className={`${
                  query == "/dashboard/report_management" ? "bg-primary" : ""
                }`}
              >
                <FileChartColumnIncreasing color="#000000" />
                Report
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </QueryClientProvider>
  );
}

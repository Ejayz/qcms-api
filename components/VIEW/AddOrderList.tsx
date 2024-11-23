"use client";

import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { CircleCheckBig, CircleHelp, Plus, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FormSelect } from "../UI/FormInput";
export default function AddOrderList() {
  const navigator = useRouter();

  const Add_Order_Validator = Yup.object().shape({
    customerName: Yup.string().required("Customer Name is required"),
    articleName: Yup.string().required("Article Name is required"),
    palleteCount: Yup.string().required("Pallete Count is required"),
    
  });

  const mutateNewSite = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/v1/ops/createsite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onError: (error) => { 
      toast.error("Failed to add site");
    },
    onSuccess: (data) => {
      toast.success("Site Added Successfully");
      navigator.push("/dashboard/sites");
    },
    onMutate: (data) => {
      return data;
    },
  });

  return (
    <div className="flex flex-col w-11/12 mx-auto text-black">
       <div className="breadcrumbs my-4 text-lg text-slate-600 font-semibold">
        <ul>
          <li>
            <Link href="/dashboard/order_management">Order Management</Link>
          </li>
          <li>
            <span>Add Order</span>
          </li>
        </ul>
      </div>
      <Formik
        initialValues={{
          CustomerName: "",
          ArticleName: "",
          PalleteCount: "",
        }}
        validationSchema={Add_Order_Validator}
        onSubmit={async (e, actions) => {
          mutateNewSite.mutate({
            customer_id: e.CustomerName,
            article_id: e.ArticleName,
            palletecount: e.PalleteCount,
          });
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <div className="flex flex-col gap-y-6">
              <div className="border p-12 rounded-md bg-white">
                <h1 className="text-xl font-bold py-4">Order Details</h1>
                <div className="grid grid-cols-2 gap-6 w-full">
                 <div>
                 <FormSelect
       
        tooltip="Select the customer's name from the dropdown"
        name="customerName"
        placeholder="Choose a customer"
        label="Customer Name"
        options={[
          { value: "1", label: "Customer 1" },
          { value: "2", label: "Customer 2" },
          { value: "3", label: "Customer 3" },
        ]}
        errors={errors.CustomerName ? errors.CustomerName : ""}
        touched={touched.CustomerName ? "true" : ""}
      />
                  </div>
                <div>
                 <FormSelect
       
        tooltip="Select the articles name from the dropdown"
        name="articleName"
        placeholder="Choose a Article"
        label="Article Name"
        options={[
          { value: "1", label: "article 1" },
          { value: "2", label: "article 2" },
          { value: "3", label: "article 3" },
        ]}
        errors={errors.ArticleName ? errors.ArticleName : ""}
        touched={touched.ArticleName ? "true" : ""}
      />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6 w-full">
                  <div>
                    <label className="form-control w-96 max-w-lg">
                      <div className="label">
                        <span className="label-text font-bold gap-x-2 flex flex-row">
                          Pallete Count
                          <span
                            className="tooltip tooltip-right"
                            data-tip="Name of the site. This is required."
                          >
                            <CircleHelp
                              className=" my-auto"
                              size={20}
                              strokeWidth={0.75}
                            />
                          </span>
                        </span>
                      </div>
                      <Field
                        type="text"
                        placeholder="Site Name: Example: EzMiner"
                        name="site_name"
                        className={`input input-bordered w-full max-w-md ${
                          errors.PalleteCount && touched.PalleteCount
                            ? "input-error"
                            : ""
                        }`}
                      />
                    </label>

                    {errors.PalleteCount && touched.PalleteCount ? (
                      <span className="text-error  flex flex-row">
                        {errors.PalleteCount}
                      </span>
                    ) : null}
                  </div>
                
                
              </div>
            
            </div>
            </div>
            <div className="modal-action p-6">
              <button
                type="submit"
                className={`btn btn-outline ${
                  mutateNewSite.isPending ? "btn-disabled" : "btn-primary"
                } btn-md`}
              >
                {mutateNewSite.isPending ? (
                  <>
                    <span className="loading loading-dots loading-sm"></span>{" "}
                    Adding Site...
                  </>
                ) : (
                  <>
                    <Plus /> Add Order
                  </>
                )}
              </button>
              <Link className="btn btn-ghost btn-md " href="/dashboard/order_management">
                BACK
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
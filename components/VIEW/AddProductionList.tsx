"use client";

import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { CircleCheckBig, CircleHelp, Plus, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";
export default function AddProductioList() {
  const navigator = useRouter();

  const Add_Site_Validator = Yup.object().shape({
    site_name: Yup.string().required("Site Name is required"),
    site_link: Yup.string()
      .required("Site Link is required")
      .url("Invalid URL"),
    description: Yup.string(),
    faucetpay_api_key: Yup.string().required("FaucetPay API Key is required"),
    auto_payment: Yup.string(),
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
      <div className="breadcrumbs my-12 text-xl font-bold">
        <ul>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/sites">Order Management</Link>
          </li>
          <li>
            <Link href="/sites/new">Add Order</Link>
          </li>
        </ul>
      </div>
      <Formik
        initialValues={{
          site_link: "",
          site_name: "",
          description: "",
          faucetpay_api_key: "",
          auto_payment: "true",
        }}
        validationSchema={Add_Site_Validator}
        onSubmit={async (e, actions) => {
          mutateNewSite.mutate({
            site_name: e.site_name,
            site_link: e.site_link,
            description: e.description,
            faucetpay_api_key: e.faucetpay_api_key,
            auto_payment: e.auto_payment,
          });
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <div className="flex flex-col gap-y-6">
              <div className="border p-12 rounded-md bg-white">
                <h1 className="text-xl font-bold py-4">Order Details</h1>
                <div className="grid grid-cols-3 gap-6 w-full">
                  <div>
                    <label className="form-control w-96 max-w-lg">
                      <div className="label">
                        <span className="label-text font-bold gap-x-2 flex flex-row">
                          Customer Name
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
                          errors.site_name && touched.site_name
                            ? "input-error"
                            : ""
                        }`}
                      />
                    </label>

                    {errors.site_name && touched.site_name ? (
                      <span className="text-error  flex flex-row">
                        {errors.site_name}
                      </span>
                    ) : null}
                  </div>
                
                  <div>
                    <label className="form-control w-96 max-w-lg">
                      <div className="label">
                        <span className="label-text font-bold gap-x-2 flex flex-row">
                          Customer Number
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
                          errors.site_name && touched.site_name
                            ? "input-error"
                            : ""
                        }`}
                      />
                    </label>

                    {errors.site_name && touched.site_name ? (
                      <span className="text-error  flex flex-row">
                        {errors.site_name}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <label className="form-control w-96 max-w-lg">
                      <div className="label">
                        <span className="label-text font-bold gap-x-2 flex flex-row">
                          Order Number
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
                          errors.site_name && touched.site_name
                            ? "input-error"
                            : ""
                        }`}
                      />
                    </label>

                    {errors.site_name && touched.site_name ? (
                      <span className="text-error  flex flex-row">
                        {errors.site_name}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 w-full">
                  <div>
                    <label className="form-control w-96 max-w-lg">
                      <div className="label">
                        <span className="label-text font-bold gap-x-2 flex flex-row">
                          Date and Time of Entry
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
                          errors.site_name && touched.site_name
                            ? "input-error"
                            : ""
                        }`}
                      />
                    </label>

                    {errors.site_name && touched.site_name ? (
                      <span className="text-error  flex flex-row">
                        {errors.site_name}
                      </span>
                    ) : null}
                  </div>
                
                  <div>
                    <label className="form-control w-96 max-w-lg">
                      <div className="label">
                        <span className="label-text font-bold gap-x-2 flex flex-row">
                          Date and Time of Exit
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
                          errors.site_name && touched.site_name
                            ? "input-error"
                            : ""
                        }`}
                      />
                    </label>

                    {errors.site_name && touched.site_name ? (
                      <span className="text-error  flex flex-row">
                        {errors.site_name}
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
                    <Plus /> Add Production
                  </>
                )}
              </button>
              <Link className="btn btn-ghost btn-md " href="/dashboard/production_management">
                BACK
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
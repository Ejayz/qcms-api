"use client";

import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { CircleCheckBig, CircleHelp, Plus, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FormSelect } from "../UI/FormInput";
export default function AddUserList() {


  const navigator = useRouter();

  const Add_User_Validator = Yup.object().shape({
    firstname: Yup.string().required("First Name is required"),
    middlename: Yup.string().required("Middle Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    suffix: Yup.string().required("Suffix is required"),
    role: Yup.string().required("Role is required"),
    password: Yup.string().required("Password is required"),

    
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
            <Link href="/dashbaord/user_management">User Management</Link>
          </li>
          <li>
            <span>Add User</span>
          </li>
        </ul>
      </div>
      <Formik
        initialValues={{
            firstname: "",
            middlename: "",
            lastname: "",
            suffix: "",
            role: "",
            password: "",
        }}
        validationSchema={Add_User_Validator}
        onSubmit={async (e, actions) => {
          mutateNewSite.mutate({
            firstname: e.firstname,
            middlename: e.middlename,
            lastname: e.lastname,
            suffix: e.suffix,
            role: e.role,
            password: e.password,
          });
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <div className="flex flex-col gap-y-6">
              <div className="border p-12 rounded-md bg-white">
                <h1 className="text-xl font-bold py-4">User Details</h1>
                <div className="grid grid-cols-3 gap-6 w-full">
                  <div>
                    <label className="form-control w-96 max-w-lg">
                      <div className="label">
                        <span className="label-text font-bold gap-x-2 flex flex-row">
                          First Name
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
                        name="firstname"
                        className={`input input-bordered w-full max-w-md ${
                          errors.firstname && touched.firstname
                            ? "input-error"
                            : ""
                        }`}
                      />
                    </label>

                    {errors.firstname && touched.firstname ? (
                      <span className="text-error  flex flex-row">
                        {errors.firstname}
                      </span>
                    ) : null}
                  </div>
                
                  <div>
                    <label className="form-control w-96 max-w-lg">
                      <div className="label">
                        <span className="label-text font-bold gap-x-2 flex flex-row">
                          Middle Name
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
                        name="middlename"
                        className={`input input-bordered w-full max-w-md ${
                          errors.middlename && touched.middlename
                            ? "input-error"
                            : ""
                        }`}
                      />
                    </label>

                    {errors.middlename && touched.middlename ? (
                      <span className="text-error  flex flex-row">
                        {errors.middlename}
                      </span>
                    ) : null}
                  </div>

                  <div>
                    <label className="form-control w-96 max-w-lg">
                      <div className="label">
                        <span className="label-text font-bold gap-x-2 flex flex-row">
                          Last Name
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
                        name="lastname"
                        className={`input input-bordered w-full max-w-md ${
                          errors.lastname && touched.lastname
                            ? "input-error"
                            : ""
                        }`}
                      />
                    </label>

                    {errors.lastname && touched.lastname ? (
                      <span className="text-error  flex flex-row">
                        {errors.lastname}
                      </span>
                    ) : null}
                  </div>

                  <div>
                    <label className="form-control w-96 max-w-lg">
                      <div className="label">
                        <span className="label-text font-bold gap-x-2 flex flex-row">
                            Suffix
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
                        name="suffix"
                        className={`input input-bordered w-full max-w-md ${
                          errors.suffix && touched.suffix
                            ? "input-error"
                            : ""
                        }`}
                      />
                    </label>

                    {errors.suffix && touched.suffix ? (
                      <span className="text-error  flex flex-row">
                        {errors.suffix}
                      </span>
                    ) : null}
                  </div>

                  <div>
                    <label className="form-control w-96 max-w-lg">
                      <FormSelect
       
       tooltip="Select the Role name from the dropdown"
       name="role"
       placeholder="Choose a Role"
       label="Role Name"
       options={[
         { value: "Admin", label: "Admin" },
       ]}
       errors={errors.role ? errors.role : ""}
       touched={touched.role ? "true" : ""}
     />
                    </label>
                  </div>

                </div>
              </div>
           
            <div className="grid grid-cols-3 gap-6 w-full">
                  <div>
                    <label className="form-control w-96 max-w-lg">
                      <div className="label">
                        <span className="label-text font-bold gap-x-2 flex flex-row">
                          First Name
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
                        name="firstname"
                        className={`input input-bordered w-full max-w-md ${
                          errors.firstname && touched.firstname
                            ? "input-error"
                            : ""
                        }`}
                      />
                    </label>

                    {errors.firstname && touched.firstname ? (
                      <span className="text-error  flex flex-row">
                        {errors.firstname}
                      </span>
                    ) : null}
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
};
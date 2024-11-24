"use client";

import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { CircleCheckBig, CircleHelp, Plus, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FormSelect } from "../UI/FormInput";
import { useState } from "react";
export default function EditUserList() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);
  
  const navigator = useRouter();

  const Add_User_Validator = Yup.object().shape({
    firstname: Yup.string().required("First Name is required"),
    middlename: Yup.string().required("Middle Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    suffix: Yup.string().required("Suffix is required"),
    role: Yup.string().required("Role is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter'),
    confirmpassword: Yup.string()
  .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
  .required("Confirm Password is required"),


    
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
            <span>Edit User</span>
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
            username: "",
            password: "",
            confirmpassword: "",
        }}
        validationSchema={Add_User_Validator}
         onSubmit={(values) => {
        console.log(values);
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
                            data-tip="Input of the First Name. This is required."
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
                        placeholder=""
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
                            data-tip="Input of the Middle Name. This is required."
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
                        placeholder=""
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
                            data-tip="Input of the Last Name. This is required."
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
                        placeholder=""
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
                            data-tip="Input of the Suffix. This is required."
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
                        placeholder=""
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
                <div className="grid grid-cols-3 gap-6 w-full">
                  <div>
                    <label className="form-control w-96 max-w-lg">
                      <div className="label">
                        <span className="label-text font-bold gap-x-2 flex flex-row">
                          Username
                          <span
                            className="tooltip tooltip-right"
                            data-tip="Input of the username. This is required."
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
                        name="username"
                        className={`input input-bordered w-full max-w-md ${
                          errors.username && touched.username
                            ? "input-error"
                            : ""
                        }`}
                      />
                    </label>

                    {errors.username && touched.username ? (
                      <span className="text-error  flex flex-row">
                        {errors.username}
                      </span>
                    ) : null}
                  </div>

                  <div>
                    <label className="form-control w-96 max-w-lg">
                      <div className="label">
                        <span className="label-text font-bold gap-x-2 flex flex-row">
                          Password
                          <span
                            className="tooltip tooltip-right"
                            data-tip="Input of the Password. This is required."
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
                        type="password"
                        name="password"
                        className={`input input-bordered w-full max-w-md ${
                          errors.password && touched.password
                            ? "input-error"
                            : ""
                        }`}
                      />
                    </label>

                    {errors.password && touched.password ? (
                      <span className="text-error  flex flex-row">
                        {errors.password}
                      </span>
                    ) : null}
                  </div>
                  <div>
  <label className="form-control w-96 max-w-lg">
    <div className="label">
      <span className="label-text font-bold gap-x-2 flex flex-row">
        Confirm Password
        <span
          className="tooltip tooltip-right"
          data-tip="Input of the Confirm Password. This is required."
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
      type="password"
      name="confirmpassword"
      className={`input input-bordered w-full max-w-md ${
        errors.confirmpassword && touched.confirmpassword
          ? 'input-error'
          : ''
      }`}
    />
  </label>
  {errors.confirmpassword && touched.confirmpassword ? (
    <span className="text-error flex flex-row">
      {errors.confirmpassword}
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
                    <Plus /> Edit User
                  </>
                )}
              </button>
              <Link className="btn btn-ghost btn-md " href="/dashboard/user_management">
                BACK
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>

    );
};


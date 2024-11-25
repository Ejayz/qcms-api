"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { CircleHelp, Link, Pencil, Plus } from "lucide-react";
import { FormSelect } from "../UI/FormInput";

export default function EditUserList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");

  const [initialValues, setInitialValues] = useState({
    uuid:"",
    firstname: "",
    middlename: "",
    lastname: "",
    suffix: "",
    role: "",
    email: "",
    // password: "",
    // confirmpassword: "",
  });

  const {
    data: userData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", uuid],
    queryFn: async () => {
      const response = await fetch(`/api/v1/getoneuser/?uuid=${uuid}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.status}`);
      }
      return response.json(); // Expecting an array
    },
    enabled: !!uuid, // Only fetch data if UUID exists
  });
  console.log("Gatherd data:",userData);
  useEffect(() => {
    if (isSuccess && userData && userData.length > 0) {
      const user = userData[0]; // Get the first user object
      setInitialValues((prev) => ({
        ...prev,
        uuid:user.uuid||"",
        firstname: user.first_name || "",
        middlename: user.middle_name || "",
        lastname: user.last_name || "",
        suffix: user.suffix || "",
        role: user.role || "",
        email: user.email || "",
        // password: "",
        // confirmpassword: "",
      }));
    }
  }, [isSuccess, userData]);

  const updateUserMutation = useMutation({
    mutationFn: async (data: any) => {
      console.log("Data to be updated:", data);
      const response = await fetch(`/api/v1/edit_user/${uuid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error("Failed to update user");
      return response.json();
    },
    onError: () => {
      toast.error("Failed to update user");
    },
    onSuccess: () => {
      toast.success("User updated successfully");
      router.push("/dashboard/user_management");
    },
  });

  const Add_User_Validator = Yup.object().shape({
    firstname: Yup.string().required("First Name is required"),
    middlename: Yup.string().required("Middle Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    suffix: Yup.string().required("Suffix is required"),
    role: Yup.string().required("Role is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    // password: Yup.string()
    //   .min(8, 'Password must be 8 characters long')
    //   .matches(/[0-9]/, 'Password requires a number')
    //   .matches(/[a-z]/, 'Password requires a lowercase letter')
    //   .matches(/[A-Z]/, 'Password requires an uppercase letter'),
    //   confirmpassword: Yup.string()
    // .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    // .required("Confirm Password is required"),
   
  });

  if (!uuid || uuid.length !== 36) {
    return <div>Error: Invalid UUID format</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={Add_User_Validator}
      onSubmit={(values) => {
        updateUserMutation.mutate(values);
      }}
    >
      {({ errors, touched, values }) => (
            <Form>
              <div className="flex flex-col gap-y-6 bg-white">
                <div className="border p-12 rounded-md bg-white text-black">
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
                        <FormSelect
        
        tooltip="Select the Suffix name from the dropdown"
        name="suffix"
        placeholder="Choose a Suffix"
        label="Suffix Name"
        options={[
          { value: "Jr", label: "Jr" },
          { value: "Sr", label: "Sr" },
          { value: "II", label: "II" },
          { value: "III", label: "III" },
          { value: "IV", label: "IV" },
          { value: "N/A", label: "N/A" },
        ]}
        errors={errors.role ? errors.role : ""}
        touched={touched.role ? "true" : ""}
      />
                      </label>
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
                            Email
                            <span
                              className="tooltip tooltip-right"
                              data-tip="Input of the email. This is required."
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
                          name="email"
                          className={`input input-bordered w-full max-w-md ${
                            errors.email && touched.email
                              ? "input-error"
                              : ""
                          }`}
                        />
                      </label>

                      {errors.email && touched.email ? (
                        <span className="text-error  flex flex-row">
                          {errors.email}
                        </span>
                      ) : null}
                    </div>
{/* 
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
  </div> */}

                    
              </div>
                </div>
            
                        <div className="modal-action p-6">
                <button
                  type="submit"
                  className={`btn btn-outline ${
                    updateUserMutation.isPending ? "btn-disabled" : "btn-primary"
                  } btn-md`}
                >
                  {updateUserMutation.isPending ? (
                    <>
                      <span className="loading loading-dots loading-sm"></span>{" "}
                      Editing Site...
                    </>
                  ) : (
                    <>
                      <Pencil /> Edit User
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/dashboard/user_management")}
                  className="btn btn-outline btn-md"
                >Back
                  
                </button>
              </div>
              </div>

            </Form>
          )}
    </Formik>
  );
}

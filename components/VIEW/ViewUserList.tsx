"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { CircleHelp, Pencil, Trash2 } from "lucide-react";
import { FormInput, FormSelect } from "../UI/FormInput";
import Link from "next/link";

export default function ViewUserList(params: any) {
  const navigator = useRouter();
  const uuid = params.params;

  const [initialValues, setInitialValues] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    suffix: "",
    role: "",
    email: "",
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
      return response.json();
    },
    enabled: !!uuid,
  });

  useEffect(() => {
    if (isSuccess && userData && userData.length > 0) {
      const user = userData[0];
      setInitialValues({
        firstname: user.first_name || "",
        middlename: user.middle_name || "",
        lastname: user.last_name || "",
        suffix: user.suffix || "",
        role: user.role || "",
        email: user.email || "",
      });
    }
  }, [isSuccess, userData]);

  

  const Add_User_Validator = Yup.object().shape({
    firstname: Yup.string()
        .required("First Name is required")
        .matches(/^[a-zA-Z ]*$/, 'First Name cannot contain special characters or any numbers'), // Regex for no special characters
    
      middlename: Yup.string()
        .required("Middle Name is required")
        .matches(/^[a-zA-Z ]*$/, 'Middle Name cannot contain special characters'), // Regex for no special characters
    
      lastname: Yup.string()
        .required("Last Name is required")
        .matches(/^[a-zA-Z ]*$/, 'Last Name cannot contain special characters'), // Regex for no special characters
    
      suffix: Yup.string()
        .required("Suffix is required"),
    
      role: Yup.string().required("Role is required"),
    
      email: Yup.string().email("Invalid email").required("Email is required"),
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col w-11/12 mx-auto text-black">
      {/* Breadcrumbs */}
      <div className="breadcrumbs my-4 text-lg text-slate-600 font-semibold">
        <ul>
          <li>
            <Link href="/dashboard/user_management">User Management</Link>
          </li>
          <li>
            <span>View User</span>
          </li>
        </ul>
      </div>
     
      {/* Edit User Form */}
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={Add_User_Validator}
        onSubmit={async (values, { setSubmitting }) => {
        }}
      >
        {({ errors, touched }) => (
      <Form>
      <div className="flex flex-col gap-y-6 bg-base-200">
       
        <div className="border p-12 rounded-md bg-white text-black">
        <div className="flex flex-row justify-end items-center">
      
        
        </div>
          <h1 className="text-xl font-bold py-4">User Details</h1>
          <div className="grid lg:grid-cols-3 gap-6 w-full place-items-center grid-cols-1">
            
            <div>
            <label className="form-control w-96 max-w-lg">
              <FormInput
                tooltip="Input of the First Name. This is required."
                name="firstname"
                placeholder="First Name"
                label="First Name"
                errors={errors.firstname ? errors.firstname : ""}
                touched={touched.firstname ? "true" : ""}
                readonly={true} 
              />
            </label>
            </div>

            <div>
            <label className="form-control w-96 max-w-lg">
              <FormInput
                tooltip="Input of the Middle Name. This is required."
                name="middlename"
                placeholder="Middle Name"
                label="Middle Name"
                errors={errors.middlename ? errors.middlename : ""}
                touched={touched.middlename ? "true" : ""}
                readonly={true}
              />
            </label>
            </div>

            <div>
            <label className="form-control w-96 max-w-lg">
              <FormInput
                tooltip="Input of the Last Name. This is required."
                name="lastname"
                placeholder="Last Name"
                label="Last Name"
                errors={errors.lastname ? errors.lastname : ""}
                touched={touched.lastname ? "true" : ""}
                readonly={true}
              />
            </label>
            </div>

            <div>
              <label className="form-control w-96 max-w-lg">
                <FormSelect
                  tooltip="Select the Suffix name from the dropdown"
                  name="suffix"
                  placeholder="Choose a Suffix"
                  label="Suffix Name"
                  readonly={true}   
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
                  readonly={true}
                  options={[{ value: "Admin", label: "Admin" }]}
                  errors={errors.role ? errors.role : ""}
                  touched={touched.role ? "true" : ""}
                />
              </label>
            </div>
            <div>
              <label className="form-control w-96 max-w-lg">
                <FormInput
                  tooltip="Input of the Email. This is required."
                  name="email"
                  placeholder="Email"
                  label="Email"
                  errors={errors.email ? errors.email : ""}
                  touched={touched.email ? "true" : ""}
                  readonly={true}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="modal-action p-6">
          
          <button
            type="button"
            onClick={() => navigator.push("/dashboard/user_management")}
            className="btn btn-accent btn-md"
          >
            BACK
          </button>
        </div>
      </div>
    </Form>
        )}
      </Formik>


    </div>
  );
}

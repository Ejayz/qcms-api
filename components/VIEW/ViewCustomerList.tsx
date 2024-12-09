"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { CircleCheckBig, CircleHelp, Pencil, Plus, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FormInput, FormSelect } from "../UI/FormInput";
import { useEffect, useState } from "react";
import { create } from "domain";
export default function EditCustomerList(params:any) {
  const router = useRouter();
const id=params.params;
  const [initialValues, setInitialValues] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    data: userData,
    isLoading: isUserLoading,
    isSuccess,
    isError,
    error: userError,
  } = useQuery({
    queryKey: ["customer", id],
    queryFn: async () => {
      const response = await fetch(`/api/v1/getonecustomer/?id=${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.status}`);
      }
      return response.json(); // Expecting an array
    },
    enabled: !!id, // Only fetch data if id exists
  });
  console.log("Gatherd data:",userData);
  useEffect(() => {
    if (isSuccess && userData && userData.length > 0) {
      const user = userData[0]; // Get the first user object
      setInitialValues((prev) => ({
        ...prev,
        firstname: user.first_name || "",
        middlename: user.middle_name || "",
        lastname: user.last_name || "",
        email: user.email || "",
      }));
    }
  }, [isSuccess, userData]);

  const updateCustomerMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/v1/edit_customer?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          first_name: data.firstname,
          middle_name: data.middlename,
          last_name: data.lastname,
      }),
    });
      return response.json();
    },
    onError: (error) => { 
      toast.error("Failed to edit customer");
    },
    onSuccess: (data) => {
      toast.success("Customer edited successfully");
      router.push("/dashboard/customer_management");
    },
    onMutate: (data) => {
      return data;
    },
  });

  const Add_Customer_Validator = Yup.object().shape({
    firstname: Yup.string().required("First Name is required").matches(/^[A-Za-z]+$/, "Only alphabets are allowed"),
    middlename: Yup.string().required("Middle Name is required").matches(/^[A-Za-z]+$/, "Only alphabets are allowed"),
    lastname: Yup.string().required("Last Name is required").matches(/^[A-Za-z]+$/, "Only alphabets are allowed"),
    email: Yup.string().email("Invalid email").required("Email is required"),
});

 
  
  return (
    <div className="flex flex-col w-11/12 mx-auto bg-base-200 text-black">
      <div className="breadcrumbs my-4 text-lg text-slate-600 font-semibold">
        <ul>
          <li>
            <Link href="/dashbaord/user_management">Customer Management</Link>
          </li>
          <li>
            <span>View Customer</span>
          </li>
        </ul>
      </div>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={Add_Customer_Validator}
        onSubmit={(values) => {
          updateCustomerMutation.mutate(values);
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <div className="flex flex-col gap-y-6">
              <div className="border p-12 rounded-md bg-white">
                <h1 className="text-xl font-bold py-4">Customer Details</h1>
                <div className="grid lg:grid-cols-2 gap-6 w-full place-content-center grid-cols-1">
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
                
  <div>
                  
            </div>
              </div>
          
        
        
            </div>
            <div className="modal-action p-6">
        
          <button
            type="button"
            onClick={() => router.push("/dashboard/customer_management")}
            className="btn btn-accent btn-md"
          >
            BACK
          </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>

    );
};

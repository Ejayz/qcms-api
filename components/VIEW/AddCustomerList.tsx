  "use client";

  import { useMutation } from "@tanstack/react-query";
  import { Field, Form, Formik } from "formik";
  import { CircleCheckBig, CircleHelp, Plus, TriangleAlert } from "lucide-react";
  import Link from "next/link";
  import { useRouter } from "next/navigation";
  import toast from "react-hot-toast";
  import * as Yup from "yup";
  import { FormSelect } from "../UI/FormInput";
  import { useEffect, useState } from "react";
import { create } from "domain";
  export default function AddUserList() {
    

    const navigator = useRouter();

    const Add_Customer_Validator = Yup.object().shape({
      firstname: Yup.string().required("First Name is required"),
      middlename: Yup.string().required("Middle Name is required"),
      lastname: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      user: Yup.string().required("Created By is required"),

      
  });

    const AddCustomerMutaion = useMutation({
      mutationFn: async (data: any) => {
        const response = await fetch("/api/v1/create_customer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        console.log("the data are",data);
        return response.json();
        
      },
      onError: (error) => { 
        toast.error("Failed to add customer");
      },
      onSuccess: (data) => {
        toast.success("Customer Added Successfully");
        navigator.push("/dashboard/customer_management");
      },
      onMutate: (data) => {
        return data;
      },
      
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [createdby, setcreatedby] = useState([]);

    useEffect(() => {
      const fetchuser = async () => {
        try {
          const response = await fetch(`/api/v1/get_user_select?page=1&limit=10`); // Adjust endpoint URL
          const data = await response.json();
          if (response.ok) {
            const options = data.map((createdby:any) => ({
              value: createdby.uuid,
              label: `${createdby.first_name} ${createdby.last_name}`,
            }));
            setcreatedby(options);
          } else {
            setError(data.error);
          }
        } catch (err) {
          setError("Failed to fetch customers.");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchuser();
    }, []);
  
    return (
      <div className="flex flex-col w-11/12 mx-auto bg-white text-black">
        <div className="breadcrumbs my-4 text-lg text-slate-600 font-semibold">
          <ul>
            <li>
              <Link href="/dashbaord/user_management">User Management</Link>
            </li>
            <li>
              <span>Add Customer</span>
            </li>
          </ul>
        </div>
        <Formik
          initialValues={{
              firstname: "",
              middlename: "",
              lastname: "",
              email: "",
              user: "",
          }}
          validationSchema={Add_Customer_Validator}
          onSubmit={async (e, actions) => {
            AddCustomerMutaion.mutate({
              first_name: e.firstname,
              middle_name: e.middlename,
              last_name: e.lastname,
              email: e.email,
              user_id: e.user,
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
                    <FormSelect
        tooltip="Select the created by name from the dropdown"
        name="user"
        placeholder="Choose a Created By"
        label="Created By"
        options={createdby}
        errors={error ? error : ""}
        touched="true" // Adjust as needed
      />
      {isLoading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
    <div>
                    
              </div>
                </div>
            
          
          
              </div>
              <div className="modal-action p-6">
                <button
                  type="submit"
                  className={`btn btn-outline ${
                    AddCustomerMutaion.isPending ? "btn-disabled" : "btn-primary"
                  } btn-md`}
                >
                  {AddCustomerMutaion.isPending ? (
                    <>
                      <span className="loading loading-dots loading-sm"></span>{" "}
                      Adding Site...
                    </>
                  ) : (
                    <>
                      <Plus /> Add Customer
                    </>
                  )}
                </button>
                <Link className="btn btn-ghost btn-md " href="/dashboard/customer_management">
                  BACK
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      );
  };

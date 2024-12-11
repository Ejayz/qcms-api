"use client";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { Eye, Pencil, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function OrderListView() {
  const [page, setPage] = useState(1);
  const searchInput = useRef<HTMLInputElement>(null);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  
  const { data: ordersData, isFetching, isLoading, isError } = useQuery({
    queryKey: ["get_customer", page, search, limit],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/get_order?page=${page}&search=${search}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            Accept: "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
          },
        }
      );
      const result = await response.json();

      if (response.ok) {
        return result;
      } else {
        throw new Error("Something went wrong while fetching site list.");
      }
    },
    retry: 1,
  });

  const navigator = useRouter();
  const supabase = createClient();
  const [useremail, setUseremail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null);
  const [orderid, setOrderid] = useState<string | null>(null);

  const [editableRow, setEditableRow] = useState<number | null>(null);
  const [editproductionID, setEditproductionID] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const { data } = await supabase.auth.getUser();
      setUseremail(data.user?.user_metadata.email || null);
      setUserRole(data.user?.user_metadata.role || null);
      setUserID(data.user?.id || null);
    };

    fetchUserEmail();
  }, []);

  const { data: customersData } = useQuery({
    queryKey: ["get_customer"],
    queryFn: async () => {
      const response = await fetch(`/api/v1/get_customer`, {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      });
      const result = await response.json();
      if (response.ok) {
        return result;
      } else {
        throw new Error("Something went wrong while fetching customers.");
      }
    },
    retry: 1,
    enabled: !!ordersData,
  });

  const ordersWithCustomerNames = ordersData?.map((order: any) => {
    const customerName = customersData?.find(
      (customer: any) => customer.id === order.customer_id
    )?.name;
    return { ...order, customer_name: customerName || "Unknown" };
  }) || [];



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({
    rows: [
      {
        production_order_form_id: "",
        production_entry_date_time: "",
        production_exit_date_time: "",
        proofing_order_form_id: "",
        proofing_entry_date_time: "",
        proofing_exit_date_time: "",
        proofing_num_pallete: "",
        proofing_program_name: "",
        pallete_count: "",
        number_of_control: "",
        length: "",
        inside_diameter: "",
        outside_diameter: "",
        flat_crush: "",
        h20: "",
        radial: "",
        remarks: "",
      },
    ],
    rows2: [
      {
        production_id: "",
        production_order_form_id: "",
        production_entry_date_time: "",
        production_exit_date_time: "",
        proofing_id: "",
        proofing_order_form_id: "",
        proofing_entry_date_time: "",
        proofing_exit_date_time: "",
        proofing_num_pallete: "",
        proofing_program_name: "",
        pallete_count: "",
        number_of_control: "",
        length: "",
        inside_diameter: "",
        outside_diameter: "",
        flat_crush: "",
        h20: "",
        radial: "",
        remarks: "",
      },
    ],
  });

  const validationSchema = Yup.object({
    rows: Yup.array().of(
      Yup.object().shape({
        production_entry_date_time: Yup.date()
          .required("Entry Date & Time is required")
          .typeError("Invalid date format"),
        proofing_entry_date_time: Yup.date()
          .required("Entry Date & Time is required")
          .typeError("Invalid date format"),
        number_pallete: Yup.number()
          .required("Number of Pallete is required")
          .typeError("Invalid number format"),
        program_name: Yup.string()
          .required("Program Name is required")
          .typeError("Invalid program name format"),
      })
    ),
  });

  const AddOrderMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/v1/create_production", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onError: (error) => {
      toast.error("Failed to add production");
      console.error(error);
    },
    onSuccess: (data) => {
      toast.success("Production Added Successfully");
      navigator.push("/dashboard/order_management");
      refetchProductionData();
    },
  });

  const { data: fetchedProductionData, refetch: refetchProductionData } = useQuery({
    queryKey: ["production", orderid],
    queryFn: async () => {
      const response = await fetch(`/api/v1/getoneproduction/?id=${orderid}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch production data: ${response.status}`);
      }
      return response.json();
    },
    enabled: !!orderid,
  });

  useEffect(() => {
    if (fetchedProductionData?.length > 0) {
      const productionData = fetchedProductionData[0];
      //setEditproductionID(productionData.id);
      setInitialValues((prev) => ({
        ...prev,
        rows2: fetchedProductionData.map((data: any) => ({
          production_id: data.id,
          production_order_form_id: data.order_form_id,
          production_entry_date_time: data.entry_date_time,
          production_exit_date_time: data.exit_date_time,
        })),
      }));
    }
  }, [fetchedProductionData]);

const updateProductionMutation = useMutation({
  mutationFn: async (updatedData: any) => {
    const response = await fetch(`/api/v1/edit_production?id=${updatedData.production_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        entry_date_time: updatedData.production_entry_date_time,
        exit_date_time: updatedData.production_exit_date_time,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update production data");
    }

    return response.json();
  },
  onError: (error) => {
    toast.error("Failed to update production data");
    console.error(error);
  },
  onSuccess: (data) => {
    toast.success("Production data updated successfully");
    refetchProductionData();
    
    // You can do additional logic here, e.g., close the modal or refresh data
  },
});

// proofing 
const AddProofingMutation = useMutation({
  mutationFn: async (data: any) => {
    const response = await fetch("/api/v1/create_proofing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  onError: (error) => {
    toast.error("Failed to add proofing");
    console.error(error);
  },
  onSuccess: (data) => {
    toast.success("Proofing Added Successfully");
    navigator.push("/dashboard/order_management");
    refetchProductionData();
  },
});

const { data: fetchedProofingData, refetch: refetchProofingData } = useQuery({
  queryKey: ["production", orderid],
  queryFn: async () => {
    const response = await fetch(`/api/v1/getoneproofing/?id=${orderid}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch production data: ${response.status}`);
    }
    return response.json();
  },
  enabled: !!orderid,
});

useEffect(() => {
  if (fetchedProofingData?.length > 0) {
    const productionData = fetchedProofingData[0];
    //setEditproductionID(productionData.id);
    setInitialValues((prev) => ({
      ...prev,
      rows2: fetchedProofingData.map((data: any) => ({
        proofing_id: data.id,
        proofing_order_form_id: data.order_form_id,
        proofing_entry_date_time: data.entry_date_time,
        proofing_exit_date_time: data.exit_date_time,
        proofing_num_pallete: data.num_pallete,
        proofing_program_name: data.program_name,

      })),
    }));
  }
}, [fetchedProofingData]);

const updateProofingMutation = useMutation({
mutationFn: async (updatedData: any) => {
  const response = await fetch(`/api/v1/edit_proofing?id=${updatedData.proofing_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      entry_date_time: updatedData.production_entry_date_time,
      exit_date_time: updatedData.production_exit_date_time,
      num_pallets: updatedData.proofing_num_pallete,
      program_name: updatedData.proofing_program_name,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update production data");
  }

  return response.json();
},
onError: (error) => {
  toast.error("Failed to update production data");
  console.error(error);
},
onSuccess: (data) => {
  toast.success("Production data updated successfully");
  refetchProductionData();
  
  // You can do additional logic here, e.g., close the modal or refresh data
},
});

  return (
    
    <div className="overflow-x-auto mt-4 w-11/12 mx-auto text-black">
      <div className="breadcrumbs my-4 text-lg text-slate-600 font-semibold">
        <ul>
          <li>
            <Link href="/"> </Link>
          </li>
          <li>
            <span>Order Management</span>
          </li>
        </ul>
      </div>
      <div className="w-11/12 flex flex-col mx-auto gap-y-12 h-full">
        <div className="w-full flex flex-row justify-between items-center">
          <label className="input pr-0 input-bordered flex flex-row justify-center items-center">
            <input
              type="text"
              ref={searchInput}
              className="grow w-full"
              placeholder="Search"
            />
            <button
              onClick={() => {
                setSearch(searchInput.current?.value || "");
                setPage(1);
              }}
              className="btn btn-sm h-full drop-shadow-2xl flex items-center gap-2"
            >
              <Search color="#000000" /> Search
            </button>
          </label>

          <Link
            href="/dashboard/addorder"
            className="btn btn-primary"
          >
            Add Order
          </Link>
        </div>

        <table className="table text-center">
          <thead>
            <tr>
              <th>OF ID</th>
              <th>Product Name</th>
              <th>Customer Name</th>
              <th>Article Name</th>
              <th>Pallete Count</th>
              <th>OPTIONS</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || isFetching ? (
              <tr>
                <td colSpan={7}>
                  <span className="loading loading-dots loading-md"></span>
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td className="text-error font-bold" colSpan={7}>
                  Something went wrong while fetching orders list.
                </td>
              </tr>
            ) : ordersWithCustomerNames.length > 0 ? (
              ordersWithCustomerNames.map((order: any, index: number) => (
                <tr key={index}>
                  {/* <th>{index + 1}</th> */}
                  <td
  className="text-xs"
  onClick={() => {
    setIsModalOpen(true);
    setOrderid(order.id); 
  }}
>
  {order.id}
</td>
                  <td></td>
                  <td className="text-xs">
                    {order.tbl_customer.last_name}{" "}
                    {order.tbl_customer.suffix ? order.tbl_customer.suffix : ""}{" "}
                    , {order.tbl_customer.first_name}{" "}
                    {order.tbl_customer.middle_name}
                  </td>
                  <td>{order.tbl_article.article_name}</td>
                 
                  <td>{order.pallete_count}</td> 
                 
                  <td className="justify-center items-center flex gap-4">
                   {userRole==="Super Admin" && (
                    <Link
                      href={`/dashboard/assignorder/${order.id}`}
                      className="flex flex-row gap-x-2 link"
                    >
                      {/* <Pencil className="text-warning" /> */}
                       Assign
                    </Link>
                    )}  
                  <Link href={`/dashboard/edit_measurementCopy/${order.id}`}
                    className="link">
                    Measurement
                    </Link>
                    <Link
                      href={`/dashboard/editorder/${order.id}`}
                      className="link flex" 
                    >
                      <Pencil className="text-warning" /> Edit
                    </Link>
                    
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="font-bold" colSpan={7}>
                  NO DATA FOUND.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="join mx-auto">
          <button
            onClick={() => {
              if (page !== 1) {
                setPage(page - 1);
              }
            }}
            className="join-item btn"
          >
            «
          </button>
          <button className="join-item btn">Page {page}</button>
          <button
            onClick={() => {
              if (!isLoading && !isFetching && ordersData?.length === limit) {
                setPage(page + 1);
              }
            }}
            className={`join-item btn ${
              !isLoading && !isFetching && ordersData?.length < limit
                ? "disabled"
                : ""
            }`}
            disabled={!isLoading && !isFetching && ordersData?.length < limit}
          >
            »
          </button>
        </div>

        {isModalOpen && (
  <div className="modal modal-open">
   
    <div className="modal-box w-11/12 max-w-full">
    <div className="flex place-content-end">
</div>
<div role="tablist" className="tabs tabs-lifted">
  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Production" />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
  <Formik
  initialValues={initialValues}
  enableReinitialize={true}
  // validationSchema={validationSchema}
  onSubmit={async (values) => {
    try {
     
        for (const row of values.rows) {
          await AddOrderMutation.mutateAsync({
            //order_form_id: orderid,
            entry_date_time: row.production_entry_date_time,
            exit_date_time: row.production_exit_date_time,
            //user_id: userID,
          });
        }
    } catch (error) {
      toast.error("Failed to complete operation");
      console.error("Error in mutation:", error);
    } 
    
  }}
>

        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <div className="">
              <FieldArray
                name="rows"
                render={(arrayHelpers) => (
                  <div>
                    <div className="flex place-content-end gap-3">
                      <button
                        className="btn btn-info"
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            production_order_form_id: "",
                            production_entry_date_time: "",
                            production_exit_date_time: "",
                          })
                        }
                      >
                        Add Row
                      </button>
                       <button className="btn btn-primary" type="submit"
                        // onClick={() => setSubmitContext('rows')}
                        >
                        Add Production
                      </button>
                      <button
                      className="btn btn-accent"
                         onClick={() => setIsModalOpen(false)}
                         >Cancel</button>
                    </div>
                    <div className="text-black overflow-auto">
                      <table className="table relative text-center overflow-auto">
                        <thead className="text-black text-sm">
                          <tr>
                            {/* <th>Article Name</th> */}
                            {/* <td></td> */}
                            <th>OF_ID</th>
                            <th>Entry Date & Time</th>
                            <th>Exit Date & Time</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        {/* tbody for length */}  
                         {values.rows.map((row, index) => (
                            <React.Fragment key={index}>
                        <tbody>
                       
                              <tr>
                                <td>
                                  <Field
                                    readOnly
                                    value={orderid}
                                    name={`rows.${index}.production_order_form_id`}
                                    type="number"
                                    className="input input-bordered"
                                  />
                                </td>
                                <td>
                                  <Field
                                    name={`rows.${index}.production_entry_date_time`}
                                    type="date"
                                    className={`input input-bordered ${
                                      typeof errors.rows?.[index] === 'object' && errors.rows?.[index]?.production_entry_date_time &&
                                      touched.rows?.[index]?.production_entry_date_time
                                        ? "border-red-500"
                                        : ""
                                    }`}
                                  />
                                  <ErrorMessage
                                    name={`rows.${index}.production_entry_date_time`}
                                    component="div"
                                    className="text-red-500 text-sm"
                                  />
                                </td>
                                <td>
                                  <Field
                                    name={`rows.${index}.production_exit_date_time`}
                                    type="date"
                                    className="input input-bordered"
                                  />
                                </td>

                                <td>
                                  <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                              </tbody>
                          
                          </React.Fragment>
                          ))}

                          {/* second FieldArray */}
                          <FieldArray
  name="rows2"
  render={(arrayHelpers) => (
    <tbody>
      {values.rows2.map((row, index) => (
        <tr key={index}>
          {/* <td>
            <Field
              name={`rows2.${index}.production_id`}
              type="text"
              className="input input-bordered"
              readOnly
            />
          </td> */}
          <td>
            <Field
              name={`rows2.${index}.production_order_form_id`}
              type="text"
              className="input input-bordered"
              readOnly
            />
          </td>
          <td>
            <Field
              name={`rows2.${index}.production_entry_date_time`}
              type="date"
              className="input input-bordered"
              value={
                new Date(values.rows2[index].production_entry_date_time)
                  .toLocaleDateString('en-CA') // Format the initial value
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = e.target.value;
                setFieldValue(
                  `rows2.${index}.production_entry_date_time`,
                  new Date(newValue).toISOString()
                );
              }}
              readOnly={editableRow !== index} // Read-only unless the row is being edited
            />
          </td>
          <td>
            <Field
              name={`rows2.${index}.production_exit_date_time`}
              type="date"
              className="input input-bordered"
              value={
                new Date(values.rows2[index].production_exit_date_time)
                  .toLocaleDateString('en-CA')
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = e.target.value;
                setFieldValue(
                  `rows2.${index}.production_exit_date_time`,
                  new Date(newValue).toISOString()
                );
              }}
              readOnly={editableRow !== index} // Read-only unless the row is being edited
            />
          </td>
          <td>
            {editableRow === index ? (
              <>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={async () => {
                    try {
                      // Trigger the mutation with updated values
                      await updateProductionMutation.mutateAsync({
                        production_id: values.rows2[index].production_id,
                        production_entry_date_time: values.rows2[index].production_entry_date_time,
                        production_exit_date_time: values.rows2[index].production_exit_date_time,
                      });
                    } catch (error) {
                      console.error("Error in mutation:", error);
                    }
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setEditableRow(index)}
              >
                Edit
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  )}
/>


                      </table>
                      
                    </div>
                  </div>
                )}
              />
            </div>
          </Form>
        )}
      </Formik>
  </div>

  <input
    type="radio"
    name="my_tabs_2"
    role="tab"
    className="tab"
    aria-label="Proofing"
    defaultChecked />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
  <Formik
  initialValues={initialValues}
  enableReinitialize={true}
  validationSchema={validationSchema}
  onSubmit={async (values) => {
    try {
     
        for (const row of values.rows) {
          await AddProofingMutation.mutateAsync({
            //order_form_id: orderid,
            entry_date_time: row.proofing_entry_date_time,
            exit_date_time: row.proofing_exit_date_time,
            number_pallets: row.proofing_num_pallete,
            program_name: row.proofing_program_name,  

            //user_id: userID,
          });
        }
    } catch (error) {
      toast.error("Failed to complete operation");
      console.error("Error in mutation:", error);
    } 
    
  }}
>

        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <div className="">
              <FieldArray
                name="rows"
                render={(arrayHelpers) => (
                  <div>
                    <div className="flex place-content-end gap-3">
                      <button
                        className="btn btn-info"
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            proofing_order_form_id: "",
                            proofing_entry_date_time: "",
                            proofing_exit_date_time: "",
                            proofing_num_pallete: "",
                            proofing_program_name: "",

                          })
                        }
                      >
                        Add Row
                      </button>
                       <button className="btn btn-primary" type="submit"
                        // onClick={() => setSubmitContext('rows')}
                        >
                        Add Production
                      </button>
                      <button
                      className="btn btn-accent"
                         onClick={() => setIsModalOpen(false)}
                         >Cancel</button>
                    </div>
                    <div className="text-black overflow-auto">
                      <table className="table relative text-center overflow-auto">
                        <thead className="text-black text-sm">
                          <tr>
                            {/* <th>Article Name</th> */}
                            {/* <td></td> */}
                            <th>OF_ID</th>
                            <th>Entry Date & Time</th>
                            <th>Exit Date & Time</th>
                            <th>Number Of Pallets</th>
                            <th>Program Name</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        {/* tbody for length */}  
                         {values.rows.map((row, index) => (
                            <React.Fragment key={index}>
                        <tbody>
                       
                              <tr>
                                <td>
                                  <Field
                                    readOnly
                                    value={orderid}
                                    name={`rows.${index}.proofing_order_form_id`}
                                    type="number"
                                    className="input input-bordered"
                                  />
                                </td>
                                <td>
                                  <Field
                                    name={`rows.${index}.proofing_entry_date_time`}
                                    type="date"
                                    className={`input input-bordered ${
                                      typeof errors.rows?.[index] === 'object' && errors.rows?.[index]?.production_entry_date_time &&
                                      touched.rows?.[index]?.production_entry_date_time
                                        ? "border-red-500"
                                        : ""
                                    }`}
                                  />
                                  <ErrorMessage
                                    name={`rows.${index}.proofing_entry_date_time`}
                                    component="div"
                                    className="text-red-500 text-sm"
                                  />
                                </td>
                                <td>
                                  <Field
                                    name={`rows.${index}.proofing_exit_date_time`}
                                    type="date"
                                    className="input input-bordered"
                                  />
                                </td>
                                <td>
                                  <Field
                                    name={`rows.${index}.proofing_num_pallete`}
                                    type="number"
                                    className="input input-bordered"
                                  />
                                </td>
                                <td>
                                  <Field
                                    name={`rows.${index}.proofing_program_name`}
                                    type="text"
                                    className="input input-bordered"
                                  />
                                </td>
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                              </tbody>
                          
                          </React.Fragment>
                          ))}

                          {/* second FieldArray */}
                          <FieldArray
  name="rows2"
  render={(arrayHelpers) => (
    <tbody>
      {values.rows2.map((row, index) => (
        <tr key={index}>
          {/* <td>
            <Field
              name={`rows2.${index}.production_id`}
              type="text"
              className="input input-bordered"
              readOnly
            />
          </td> */}
          <td>
            <Field
              name={`rows2.${index}.production_order_form_id`}
              type="text"
              className="input input-bordered"
              readOnly
            />
          </td>
          <td>
            <Field
              name={`rows2.${index}.production_entry_date_time`}
              type="date"
              className="input input-bordered"
              value={
                new Date(values.rows2[index].production_entry_date_time)
                  .toLocaleDateString('en-CA') // Format the initial value
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = e.target.value;
                setFieldValue(
                  `rows2.${index}.production_entry_date_time`,
                  new Date(newValue).toISOString()
                );
              }}
              readOnly={editableRow !== index} // Read-only unless the row is being edited
            />
          </td>
          <td>
            <Field
              name={`rows2.${index}.production_exit_date_time`}
              type="date"
              className="input input-bordered"
              value={
                new Date(values.rows2[index].production_exit_date_time)
                  .toLocaleDateString('en-CA')
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = e.target.value;
                setFieldValue(
                  `rows2.${index}.production_exit_date_time`,
                  new Date(newValue).toISOString()
                );
              }}
              readOnly={editableRow !== index} // Read-only unless the row is being edited
            />
          </td>
          <td>
            {editableRow === index ? (
              <>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={async () => {
                    try {
                      // Trigger the mutation with updated values
                      await updateProductionMutation.mutateAsync({
                        production_id: values.rows2[index].production_id,
                        production_entry_date_time: values.rows2[index].production_entry_date_time,
                        production_exit_date_time: values.rows2[index].production_exit_date_time,
                      });
                    } catch (error) {
                      console.error("Error in mutation:", error);
                    }
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setEditableRow(index)}
              >
                Edit
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  )}
/>


                      </table>
                      
                    </div>
                  </div>
                )}
              />
            </div>
          </Form>
        )}
      </Formik>
  </div>

  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 3" />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
    Tab content 3
  </div>
</div>
    </div>
  </div>
)}
      </div>
    </div>
  );
}

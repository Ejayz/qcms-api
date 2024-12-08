"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Field, FieldArray, Form, Formik } from "formik";
import { CircleHelp, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FormSelect } from "../UI/FormInput";
import { useState, useEffect, use } from "react";
export default function AddArticleList() {
  const navigator = useRouter();
  const [userid, setuserid] = useState<string | null>(null);
  useEffect(() => {
    const userid = localStorage.getItem("userid");
    setuserid(userid);
  }, []);

  console.log("the current user:", userid);

  const router = useRouter();

  const Add_Article_Validator = Yup.object().shape({
    ArticleNominal: Yup.string().required("Article Nominal is required"),
    ArticleMin: Yup.string().required("Article Min is required"),
    ArticleMax: Yup.string().required("Article Max is required"),
    NumberControl: Yup.string().required("Number Control is required"),
  });

  const [initialValues, setInitialValues] = useState({
    ArticleNominal: "",
    ArticleMin: "",
    ArticleMax: "",
    NumberControl: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const AddArticleMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/v1/create_article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onError: (error) => {
      toast.error("Failed to add article");
      console.error(error);
    },
    onSuccess: (data) => {
      toast.success("Article Added Successfully");
      navigator.push("/dashboard/article_management");
    },
    onMutate: (data) => {
      return data;
    },
  });

  const [articlenominal, setarticlenominal] = useState([]);
  const [articlemin, setarticlemin] = useState([]);
  const [articlemax, setarticlemax] = useState([]);

  useEffect(() => {
    const fetcharticlenominal = async () => {
      try {
        const response = await fetch(
          `/api/v1/get_article_nominal?page=1&limit=10`
        ); // Adjust endpoint URL
        const data = await response.json();
        if (response.ok) {
          const options = data.map((nominal: any) => ({
            value: nominal.id,
            label: `${nominal.id}`,
          }));
          setarticlenominal(options);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError("Failed to fetch Nominal.");
      } finally {
        setIsLoading(false);
      }
    };

    fetcharticlenominal();
  }, []);

  useEffect(() => {
    const fetcharticlemin = async () => {
      try {
        const response = await fetch(`/api/v1/get_article_min?page=1&limit=10`); // Adjust endpoint URL
        const data = await response.json();
        if (response.ok) {
          const options = data.map((min: any) => ({
            value: min.id,
            label: `${min.id}`,
          }));
          setarticlemin(options);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError("Failed to fetch Min.");
      } finally {
        setIsLoading(false);
      }
    };

    fetcharticlemin();
  }, []);

  useEffect(() => {
    const fetcharticlemax = async () => {
      try {
        const response = await fetch(`/api/v1/get_article_max?page=1&limit=10`); // Adjust endpoint URL
        const data = await response.json();
        if (response.ok) {
          const options = data.map((max: any) => ({
            value: max.id,
            label: `${max.id}`,
          }));
          setarticlemax(options);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError("Failed to fetch Max.");
      } finally {
        setIsLoading(false);
      }
    };

    fetcharticlemax();
  }, []);

  return (
    <div className="flex flex-col w-11/12 mx-auto text-black">
      <div className="breadcrumbs my-4 text-lg text-slate-600 font-semibold">
        <ul>
          <li>
            <Link href="/dashboard/article_management">Article Management</Link>
          </li>
          <li>
            <span>Add Article</span>
          </li>
        </ul>
      </div>
      <Formik
        initialValues={{
          LengthNominal: [],
          LengthMin: [],
          LengthMax: [],
          InsideDiameterNominal: [],
          InsideDiameterMin: [],
          InsideDiameterMax: [],
          OutsideDiameterNominal: [],
          OutsideDiameterMin: [],
          OutsideDiameterMax: [],
          FlatCrushNominal: [],
          FlatCrushMin: [],
          FlatCrushMax: [],
          H20Nominal: [],
          H20Min: [],
          H20Max: [],
          NumberControl: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
        render={({ values }) => (
          <Form>
            <div className="flex flex-col gap-y-2">
<div className="lg:opacity-100 opacity-0">
                <div className="grid grid-cols-4 gap-2 w-full">
                  <label></label>
                  <label className="text-md font-bold gap-x-2 flex flex-row">
                    Scoll Nominal
                  </label>
                  <label className="text-md font-bold gap-x-2 flex flex-row">
                    Min
                  </label>
                  <label className="text-md font-bold gap-x-2 flex flex-row">
                    Max
                  </label>
                </div>
              </div>
              {/* Length */}
              <div className="border p-6 rounded-md bg-white">
                <div className="grid lg:grid-cols-4 grid-cols-1 gap-6 w-full">
                  
                  <label className="text-lg font-bold">Length</label>
                  <label> <label className="text-md font-bold gap-x-2 flex flex-row lg:hidden ">
                    Scoll Nominal
                  </label>
                    <FieldArray
                      name="LengthNominal"
                      render={(arrayHelpers) => (
                        <div>
                          {values.LengthNominal &&
                          values.LengthNominal.length > 0 ? (
                            values.LengthNominal.map((LengthNominal, index) => (
                              <div key={index}>
                                <Field
                                  name={`LengthNominal.${index}`}
                                  placeholder="Length"
                                  type="text"
                                  className="input text-md input-bordered"
                                />
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                  className="btn bg-transparent" // remove a friend from the list
                                >
                                  -
                                </button>
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.insert(index, "")}
                                  className="btn bg-transparent" // insert an empty string at a position
                                >
                                  +
                                </button>
                              </div>
                            ))
                          ) : (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                              className="btn btn-info"
                            >
                              {/* show this when user has removed all friends from the list */}
                              Add a Nominal
                            </button>
                          )}
                          <div>
                            <button type="submit">Submit</button>
                          </div>
                        </div>
                      )}
                    />
                    
                  </label>

                  <label>
                  <label className="text-md font-bold gap-x-2 flex flex-row lg:hidden ">
                    Min
                  </label>
                    <FieldArray
                      name="LengthMin"
                      render={(arrayHelpers) => (
                        <div>
                          {values.LengthMin && values.LengthMin.length > 0 ? (
                            values.LengthMin.map((LengthMin, index) => (
                              <div key={index}>
                                <Field
                                  name={`LengthMin.${index}`}
                                  placeholder="Length"
                                  type="text"
                                  className="input text-md input-bordered"
                                />
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                  className="btn bg-transparent" // remove a friend from the list
                                >
                                  -
                                </button>
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.insert(index, "")}
                                  className="btn bg-transparent" // insert an empty string at a position
                                >
                                  +
                                </button>
                              </div>
                            ))
                          ) : (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                              className="btn btn-info"
                            >
                              {/* show this when user has removed all friends from the list */}
                              Add a Min
                            </button>
                          )}
                          <div>
                            <button type="submit">Submit</button>
                          </div>
                        </div>
                      )}
                    />
                  </label>
                  <label>
                  <label className="text-md font-bold gap-x-2 flex flex-row lg:hidden ">
                    Max
                  </label>
                    <FieldArray
                      name="LengthMax"
                      render={(arrayHelpers) => (
                        <div>
                          {values.LengthMax && values.LengthMax.length > 0 ? (
                            values.LengthMax.map((LengthMax, index) => (
                              <div key={index}>
                                <Field
                                  name={`LengthMax.${index}`}
                                  placeholder="Length"
                                  type="text"
                                  className="input text-md input-bordered"
                                />
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                  className="btn bg-transparent" // remove a friend from the list
                                >
                                  -
                                </button>
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.insert(index, "")}
                                  className="btn bg-transparent" // insert an empty string at a position
                                >
                                  +
                                </button>
                              </div>
                            ))
                          ) : (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                              className="btn btn-info"
                            >
                              {/* show this when user has removed all friends from the list */}
                              Add a Max
                            </button>
                          )}
                          <div>
                            <button type="submit">Submit</button>
                          </div>
                        </div>
                      )}
                    />
                  </label>
                </div>
              </div>
              {/* insideDiameter */}
              <div className="border p-6 rounded-md bg-white">
                <div className="grid lg:grid-cols-4 grid-cols-1 gap-6 w-full">
                  <label className="text-lg font-bold">Inside Diameter</label>
                  <label>
                  <label className="text-md font-bold gap-x-2 flex flex-row lg:hidden ">
                    Scoll Nominal
                  </label>
                    <FieldArray
                      name="InsideDiameterNominal"
                      render={(arrayHelpers) => (
                        <div>
                          {values.InsideDiameterNominal &&
                          values.InsideDiameterNominal.length > 0 ? (
                            values.InsideDiameterNominal.map(
                              (InsideDiameterNominal, index) => (
                                <div key={index}>
                                  <Field
                                    name={`InsideDiameterNominal.${index}`}
                                    placeholder="Inside Diameter"
                                    type="text"
                                    className="input text-md input-bordered"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                    className="btn bg-transparent" // remove a friend from the list
                                  >
                                    -
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      arrayHelpers.insert(index, "")
                                    }
                                    className="btn bg-transparent" // insert an empty string at a position
                                  >
                                    +
                                  </button>
                                </div>
                              )
                            )
                          ) : (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                              className="btn btn-info"
                            >
                              {/* show this when user has removed all friends from the list */}
                              Add a Nominal
                            </button>
                          )}
                          <div>
                            <button type="submit">Submit</button>
                          </div>
                        </div>
                      )}
                    />
                  </label>

                  <label>
                  <label className="text-md font-bold gap-x-2 flex flex-row lg:hidden ">
                    Min
                  </label>
                    <FieldArray
                      name="InsideDiameterMin"
                      render={(arrayHelpers) => (
                        <div>
                          {values.InsideDiameterMin &&
                          values.InsideDiameterMin.length > 0 ? (
                            values.InsideDiameterMin.map(
                              (InsideDiameterMin, index) => (
                                <div key={index}>
                                  <Field
                                    name={`InsideDiameterMin.${index}`}
                                    placeholder="Inside Diameter"
                                    type="text"
                                    className="input text-md input-bordered"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                    className="btn bg-transparent" // remove a friend from the list
                                  >
                                    -
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      arrayHelpers.insert(index, "")
                                    }
                                    className="btn bg-transparent" // insert an empty string at a position
                                  >
                                    +
                                  </button>
                                </div>
                              )
                            )
                          ) : (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                              className="btn btn-info"
                            >
                              {/* show this when user has removed all friends from the list */}
                              Add a Min
                            </button>
                          )}
                          <div>
                            <button type="submit">Submit</button>
                          </div>
                        </div>
                      )}
                    />
                  </label>
                  <label>
                  <label className="text-md font-bold gap-x-2 flex flex-row lg:hidden ">
                    Max
                  </label>
                    <FieldArray
                      name="InsideDiameterMax"
                      render={(arrayHelpers) => (
                        <div>
                          {values.InsideDiameterMax &&
                          values.InsideDiameterMax.length > 0 ? (
                            values.InsideDiameterMax.map(
                              (InsideDiameterMax, index) => (
                                <div key={index}>
                                  <Field
                                    name={`InsideDiameterMax.${index}`}
                                    placeholder="Inside Diameter"
                                    type="text"
                                    className="input text-md input-bordered"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                    className="btn bg-transparent" // remove a friend from the list
                                  >
                                    -
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      arrayHelpers.insert(index, "")
                                    }
                                    className="btn bg-transparent" // insert an empty string at a position
                                  >
                                    +
                                  </button>
                                </div>
                              )
                            )
                          ) : (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                              className="btn btn-info"
                            >
                              {/* show this when user has removed all friends from the list */}
                              Add a Max
                            </button>
                          )}
                          <div>
                            <button type="submit">Submit</button>
                          </div>
                        </div>
                      )}
                    />
                  </label>
                </div>
              </div>
              {/* outsideDiameter */}
              <div className="border p-6 rounded-md bg-white">
                <div className="grid lg:grid-cols-4 grid-cols-1 gap-6 w-full">
                  <label className="text-lg font-bold">Outside Diameter</label>
                  <label>
                  <label className="text-md font-bold gap-x-2 flex flex-row lg:hidden ">
                    Scoll Nominal
                  </label>
                    <FieldArray
                      name="OutsideDiameterNominal"
                      render={(arrayHelpers) => (
                        <div>
                          {values.OutsideDiameterNominal &&
                          values.OutsideDiameterNominal.length > 0 ? (
                            values.OutsideDiameterNominal.map(
                              (OutsideDiameterNominal, index) => (
                                <div key={index}>
                                  <Field
                                    name={`OutsideDiameterNominal.${index}`}
                                    placeholder="Outside Diameter"
                                    type="text"
                                    className="input text-md input-bordered"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                    className="btn bg-transparent" // remove a friend from the list
                                  >
                                    -
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      arrayHelpers.insert(index, "")
                                    }
                                    className="btn bg-transparent" // insert an empty string at a position
                                  >
                                    +
                                  </button>
                                </div>
                              )
                            )
                          ) : (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                              className="btn btn-info"
                            >
                              {/* show this when user has removed all friends from the list */}
                              Add a Nominal
                            </button>
                          )}
                          <div>
                            <button type="submit">Submit</button>
                          </div>
                        </div>
                      )}
                    />
                  </label>

                  <label>
                  <label className="text-md font-bold gap-x-2 flex flex-row lg:hidden ">
                    Min
                  </label>
                    <FieldArray
                      name="OutsideDiameterMin"
                      render={(arrayHelpers) => (
                        <div>
                          {values.OutsideDiameterMin &&
                          values.OutsideDiameterMin.length > 0 ? (
                            values.OutsideDiameterMin.map(
                              (OutsideDiameterMin, index) => (
                                <div key={index}>
                                  <Field
                                    name={`OutsideDiameterMin.${index}`}
                                    placeholder="Outside Diameter"
                                    type="text"
                                    className="input text-md input-bordered"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                    className="btn bg-transparent" // remove a friend from the list
                                  >
                                    -
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      arrayHelpers.insert(index, "")
                                    }
                                    className="btn bg-transparent" // insert an empty string at a position
                                  >
                                    +
                                  </button>
                                </div>
                              )
                            )
                          ) : (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                              className="btn btn-info"
                            >
                              {/* show this when user has removed all friends from the list */}
                              Add a Min
                            </button>
                          )}
                          <div>
                            <button type="submit">Submit</button>
                          </div>
                        </div>
                      )}
                    />
                  </label>
                  <label>
                  <label className="text-md font-bold gap-x-2 flex flex-row lg:hidden ">
                    Max
                  </label>
                    <FieldArray
                      name="OutsideDiameterMax"
                      render={(arrayHelpers) => (
                        <div>
                          {values.OutsideDiameterMax &&
                          values.OutsideDiameterMax.length > 0 ? (
                            values.OutsideDiameterMax.map(
                              (OutsideDiameterMax, index) => (
                                <div key={index}>
                                  <Field
                                    name={`OutsideDiameterMax.${index}`}
                                    placeholder="Outside Diameter"
                                    type="text"
                                    className="input text-md input-bordered"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                    className="btn bg-transparent" // remove a friend from the list
                                  >
                                    -
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      arrayHelpers.insert(index, "")
                                    }
                                    className="btn bg-transparent" // insert an empty string at a position
                                  >
                                    +
                                  </button>
                                </div>
                              )
                            )
                          ) : (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                              className="btn btn-info"
                            >
                              {/* show this when user has removed all friends from the list */}
                              Add a Max
                            </button>
                          )}
                          <div>
                            <button type="submit">Submit</button>
                          </div>
                        </div>
                      )}
                    />
                  </label>
                </div>
              </div>
              {/* flat crush */}
              <div className="border p-6 rounded-md bg-white">
                <div className="grid lg:grid-cols-4 grid-cols-1 gap-6 w-full">
                  <label className="text-lg font-bold">Flat Crush</label>
                  <label>
                    <label className="text-md font-bold gap-x-2 flex flex-row lg:hidden ">
                      Scoll Nominal
                    </label>
                    <FieldArray
                      name="FlatCrushNominal"
                      render={(arrayHelpers) => (
                        <div>
                          {values.FlatCrushNominal &&
                          values.FlatCrushNominal.length > 0 ? (
                            values.FlatCrushNominal.map(
                              (FlatCrushNominal, index) => (
                                <div key={index}>
                                  <Field
                                    name={`FlatCrushNominal.${index}`}
                                    placeholder="Flat Crush"
                                    type="text"
                                    className="input text-md input-bordered"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                    className="btn bg-transparent" // remove a friend from the list
                                  >
                                    -
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      arrayHelpers.insert(index, "")
                                    }
                                    className="btn bg-transparent" // insert an empty string at a position
                                  >
                                    +
                                  </button>
                                </div>
                              )
                            )
                          ) : (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                              className="btn btn-info"
                            >
                              {/* show this when user has removed all friends from the list */}
                              Add a Nominal
                            </button>
                          )}
                          <div>
                            <button type="submit">Submit</button>
                          </div>
                        </div>
                      )}
                    />
                  </label>

                  <label>
                    <label className="text-md font-bold gap-x-2 flex flex-row lg:hidden ">
                      Min
                    </label>
                    <FieldArray
                      name="FlatCrushMin"
                      render={(arrayHelpers) => (
                        <div>
                          {values.FlatCrushMin &&
                          values.FlatCrushMin.length > 0 ? (
                            values.FlatCrushMin.map((FlatCrushMin, index) => (
                              <div key={index}>
                                <Field
                                  name={`FlatCrushMin.${index}`}
                                  placeholder="Flat Crush"
                                  type="text"
                                  className="input text-md input-bordered"
                                />
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                  className="btn bg-transparent" // remove a friend from the list
                                >
                                  -
                                </button>
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.insert(index, "")}
                                  className="btn bg-transparent"
                                >
                                  +
                                </button>
                              </div>
                            ))
                          ) : (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                              className="btn btn-info"
                            >
                              {/* show this when user has removed all friends from the list */}
                              Add a Min
                            </button>
                          )}
                          <div>
                            <button type="submit">Submit</button>
                          </div>
                        </div>
                      )}
                    />
                  </label>
                  <label>
                    <label className="text-md font-bold gap-x-2 flex flex-row lg:hidden ">
                      Max
                    </label>
                    <FieldArray
                      name="FlatCrushMax"
                      render={(arrayHelpers) => (
                        <div>
                          {values.FlatCrushMax &&
                          values.FlatCrushMax.length > 0 ? (
                            values.FlatCrushMax.map((FlatCrushMax, index) => (
                              <div key={index}>
                                <Field
                                  name={`FlatCrushMax.${index}`}
                                  placeholder="Flat Crush"
                                  type="text"
                                  className="input text-md input-bordered"
                                />
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                  className="btn bg-transparent" // remove a friend from the list
                                >
                                  -
                                </button>
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.insert(index, "")}
                                  className="btn bg-transparent" // insert an empty string at a position
                                >
                                  +
                                </button>
                              </div>
                            ))
                          ) : (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                              className="btn btn-info"
                            >
                              {/* show this when user has removed all friends from the list */}
                              Add a Max
                            </button>
                          )}
                          <div>
                            <button type="submit">Submit</button>
                          </div>
                        </div>
                      )}
                    />
                  </label>
                </div>
              </div>
              {/* H20 */}
              <div className="border p-6 rounded-md bg-white">
                <div className="grid lg:grid-cols-4 grid-cols-1 gap-6 w-full">
                  <label className="text-lg font-bold">H20</label>
                  <label>
                    <label className="text-md font-bold gap-x-2 flex flex-row lg:hidden ">
                      Scoll Nominal
                    </label>
                    <FieldArray
                      name="H20Nominal"
                      render={(arrayHelpers) => (
                        <div>
                          {values.H20Nominal && values.H20Nominal.length > 0 ? (
                            values.H20Nominal.map((H20Nominal, index) => (
                              <div key={index}>
                                <Field
                                  name={`H20Nominal.${index}`}
                                  placeholder="H20"
                                  type="text"
                                  className="input text-md input-bordered"
                                />
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                  className="btn bg-transparent" // remove a friend from the list
                                >
                                  -
                                </button>
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.insert(index, "")}
                                  className="btn bg-transparent" // insert an empty string at a position
                                >
                                  +
                                </button>
                              </div>
                            ))
                          ) : (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                              className="btn btn-info"
                            >
                              {/* show this when user has removed all friends from the list */}
                              Add a Nominal
                            </button>
                          )}
                          <div>
                            <button type="submit">Submit</button>
                          </div>
                        </div>
                      )}
                    />
                  </label>

                  <label>
                    <label className="text-md font-bold gap-x-2 flex flex-row lg:hidden ">
                      Min
                    </label>
                    <FieldArray
                      name="H20Min"
                      render={(arrayHelpers) => (
                        <div>
                          {values.H20Min && values.H20Min.length > 0 ? (
                            values.H20Min.map((H20Min, index) => (
                              <div key={index}>
                                <Field
                                  name={`H20Min.${index}`}
                                  placeholder="H20"
                                  type="text"
                                  className="input text-md input-bordered"
                                />
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                  className="btn bg-transparent" // remove a friend from the list
                                >
                                  -
                                </button>
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.insert(index, "")}
                                  className="btn bg-transparent" // insert an empty string at a position
                                >
                                  +
                                </button>
                                </div>
                            ))
                          ) : (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                              className="btn btn-info"
                            >
                              {/* show this when user has removed all friends from the list */}
                              Add a Min
                            </button>
                          )}
                          <div>
                            <button type="submit">Submit</button>
                            </div>
                            </div>
                      )}
                    />
                  </label>
                  <label>
                  <label className="text-md font-bold gap-x-2 flex flex-row lg:hidden ">
                    Max
                  </label>
                    <FieldArray
                      name="H20Max"
                      render={(arrayHelpers) => (
                        <div>
                          {values.H20Max && values.H20Max.length > 0 ? (
                            values.H20Max.map((H20Max, index) => (
                              <div key={index}>
                                <Field
                                  name={`H20Max.${index}`}
                                  placeholder="H20"
                                  type="text"
                                  className="input text-md input-bordered"
                                />
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                  className="btn bg-transparent" // remove a friend from the list
                                >
                                  -
                                </button>
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.insert(index, "")}
                                  className="btn bg-transparent" // insert an empty string at a position
                                >
                                  +
                                </button>
                              </div>
                            ))
                          ) : (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                              className="btn btn-info"
                            >
                              {/* show this when user has removed all friends from the list */}
                              Add a Max
                            </button>
                          )}
                          <div>
                            <button type="submit">Submit</button>
                          </div>
                        </div>
                      )}
                    />
                  </label>
                  </div>
                  </div>
                  <div className="border p-6 rounded-md bg-white">
                    <div className="grid grid-cols-4 gap-6 w-full">
                      <label className="text-lg font-bold">Number Control</label>
                      <Field
                        name="NumberControl"
                        type="text"
                        className="input text-md input-bordered"
                      />
                    </div>
                    </div>
                    <div className="flex flex-row p-6 justify-end">
                      <button
                        type="submit"
                        className="btn btn-primary"
                      >
                        Add Article
                      </button>
                      <button
                        type="submit"
                        className="btn btn-accent"
                      >
                        <Link href="/dashboard/article_management">
                        Back
                        </Link>
                      </button>
                      </div>
            </div>
          </Form>
        )}
      />
    </div>
  );
}

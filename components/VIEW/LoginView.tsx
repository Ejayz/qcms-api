"use client";

import { Form, Formik } from "formik";
import { FormInput } from "../UI/FormInput";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function LoginView() {
  const route = useRouter();
  const loginSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email address.")
      .required("Email Address is required."),
    password: Yup.string().required("Password is required."),
  });

  const mutateManangementLogin = useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      const response = await fetch("/api/authentication/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        // You can handle specific error status codes here
        const errorData = await response.json();
        throw new Error(errorData?.message || "An error occurred while logging in");
      }
  
      return response.json();
    },
    onError: (error) => {
      console.log("Login error:", error);  // Inspect the error structure
      toast.error("Invalid email or password");
      //toast.error(error?.message || "An unknown error occurred");
    },
    onSuccess: () => {
      toast.success("Login Successful");
      route.push("/dashboard");
    },
  });
  

  return (
    <div className="w-full h-screen flex min-h-screen text-black ">
      <div className="card lg:card-side bg-base-100  my-auto mx-auto shadow-xl ">
        <figure className="flex flex-col">
          <Image
            src="/Img/logo.png"
            className=""
            alt="logo"
            width={1074}
            height={429}
          />

          <div className="card-actions lg:justify-start indent-0 justify-center lg:indent-10">
            <h2 className="card-title">Need assistance ?</h2>
            <p className="w-auto text-center">
              For password reset,account creation and other concern please
              contact system administrator.
            </p>
          </div>
        </figure>
        <div className="card-body flex lg:w-1/2 w-full flex-col">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            validateOnBlur={true}
            validateOnChange={true}
            onSubmit={(values, actions) => {
              mutateManangementLogin.mutate(values, {
                onSuccess: () => {
                  actions.resetForm();
                },
              });
            }}
          >
            {({ errors, touched }) => (
              <Form className="w-full justify-evenly gap-y-2flex flex-col p-4 mx-auto my-auto">
                <h1 className="text-2xl indent-4 text-primary-content font-bold">
                  Log In
                </h1>
                <FormInput
                  errors={errors.email}
                  touched={touched.email?.toString()}
                  tooltip="Enter your email address"
                  name="email"
                  placeholder="youremail@mail.domain"
                  label="Email Address"
                />
                <FormInput
                  errors={errors.password}
                  touched={touched.password?.toString()}
                  tooltip="Enter your password."
                  name="password"
                  placeholder="Enter your password."
                  label="Password"
                  type="password"
                />

                <div className="mx-auto w-3/4 flex">
                  <button
                    type="submit"
                    className={`btn w-full  bg-gradient-to-r ${
                      mutateManangementLogin.isPending
                        ? "btn-disabled"
                        : "btn-primary"
                    }`}
                  >
                    {mutateManangementLogin.isPending ? (
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>{" "}
                        Authenticating...
                      </div>
                    ) : (
                      "Log In"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

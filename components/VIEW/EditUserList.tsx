"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useEffect, useState } from "react";

export default function EditUserList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");

  const [initialValues, setInitialValues] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    suffix: "",
    role: "",
    username: "",
    password: "",
    confirmpassword: "",
  });

  const {
    data: userData,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["user", uuid],
    queryFn: async () => {
      const response = await fetch(`/api/v1/getoneuser/?uuid=${uuid}`);
      if (!response.ok) {
        console.error("Fetch failed:", response.status, response.statusText);
        throw new Error(
          `Failed to fetch user data. Status: ${response.status}`
        );
      }
      return response.json();
    },
  });
  useEffect(() => {
    if (isSuccess && userData) {
      setInitialValues({
        firstname: userData.firstname || "",
        middlename: userData.middlename || "",
        lastname: userData.lastname || "",
        suffix: userData.suffix || "",
        role: userData.role || "",
        username: userData.username || "",
        password: "",
        confirmpassword: "",
      });
    }
  }, [isSuccess, userData]);

  const updateUserMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/v1/update_user/${uuid}`, {
        method: "PUT",
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
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });
  if (!uuid || uuid.length !== 36) {
    console.error("Invalid UUID:", uuid);
    return <div>Error: Invalid UUID format</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
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
      {({ errors, touched }) => (
        <Form>
          <div>
            <label>
              First Name
              <Field name="firstname" />
              {errors.firstname && touched.firstname && (
                <div>{errors.firstname}</div>
              )}
            </label>
          </div>
          {/* Add other fields similar to the one above */}
          <button type="submit">Update User</button>
        </Form>
      )}
    </Formik>
  );
}

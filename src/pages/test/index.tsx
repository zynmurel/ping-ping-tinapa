import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import { allBarangay } from "../user/utils/barangaydatas";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

const YourComponent = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { data, isLoading, isError, refetch } = api.queries.getUser.useQuery({
    id: user ? user.id : "",
  });
  const [refetchs, setRefetch] = useState("");
  const [form] = Form.useForm();
  const [submitAble, setSubmitAble] = useState(false);
  const barangay = allBarangay.barangays;

  useEffect(() => {
    // Get the current value of the "barangay" field from the form
    const formValues = form.getFieldsValue();
    const formBarangayValue = formValues.barangay;

    // Check if the form's "barangay" field value matches the "data" object's "barangay" value
    if (formBarangayValue === data?.barangay) {
      setSubmitAble(true);
    } else {
      setSubmitAble(false);
    }
    console.log("sean");
  }, [form, data?.barangay]); // Include "form" and "data?.barangay" in the dependency array

  // Other code in your component...

  return (
    <div>
      <Form form={form} onChange={(e) => console.log(e)}>
        {/* Your Form.Item components */}
        <Form.Item name="barangay">
          <Input />
        </Form.Item>
        {/* Other Form.Item components */}
      </Form>
    </div>
  );
};

export default YourComponent;

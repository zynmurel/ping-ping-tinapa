import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "~/server/uploadthing";
// You need to import our styles for the button to look right. Best to import in the root /_app.tsx but this is fine
import "@uploadthing/react/styles.css";
import { useState } from "react";
import { UploadFileResponse } from "uploadthing/client";
import React from "react";
import { Button, Form, Input } from "antd";
import { api } from "~/utils/api";

export default function UploadButtonPage() {
  const [images, setImages] = useState<UploadFileResponse[]>([]);
  const { mutate } = api.mutations.addProduct.useMutation();

  const image = images.length ? images[0]?.fileUrl : "";
  const onFinish = (values: any) => {
    console.log("Success:", values, image);
    mutate({
      ...values,
      image: image,
      price: +values.price,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    alert("Failed");
  };

  type FieldType = {
    name?: string;
    description?: string;
    price?: number;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res) {
            setImages(res);
            const json = JSON.stringify(res);
            console.log("JSON", json);
          }
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType> label="Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="Title" name="description">
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="Price" name="price">
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </main>
  );
}

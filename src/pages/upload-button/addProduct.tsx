import React from "react";
import { Button, Form, Input } from "antd";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  alert("Failed");
};

type FieldType = {
  name?: string;
  title?: string;
  price?: number;
};

const AddProductForm = ({ images }: { images: string }) => (
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

    <Form.Item<FieldType> label="Title" name="title">
      <Input.Password />
    </Form.Item>

    <Form.Item<FieldType> label="Price" name="price">
      <Input.Password />
    </Form.Item>

    <Button type="primary" htmlType="submit">
      Submit
    </Button>
  </Form>
);

export default AddProductForm;

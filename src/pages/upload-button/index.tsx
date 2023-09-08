import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "~/server/uploadthing";
// You need to import our styles for the button to look right. Best to import in the root /_app.tsx but this is fine
import "@uploadthing/react/styles.css";
import { useContext, useState } from "react";
import { UploadFileResponse } from "uploadthing/client";
import React from "react";
import { Button, Form, Input } from "antd";
import { api } from "~/utils/api";
import { NotificationContext } from "../user/context/contextProvider";

export default function UploadButtonComponent({ imageUrl, setImageUrl }: any) {
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const [images, setImages] = useState<UploadFileResponse[]>([]);

  return (
    <UploadButton<OurFileRouter>
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        if (res) {
          const image = res.length ? res[0]?.fileUrl : "";
          setImages(res);
          const json = JSON.stringify(res);
          console.log("JSON", json);
          setImageUrl(image);
        }
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        setImageUrl("");
        openNotificationWithIcon(
          "error",
          "Uploading Image Failed",
          "Please check your internet connection"
        );
      }}
    />
  );
}

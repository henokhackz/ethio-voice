"use client";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";

const FileUpload = ({
  setPreviewUrl,
}: {
  setPreviewUrl: (url: unknown) => void;
}) => {
  return (
    <CldUploadWidget
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={(result) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setPreviewUrl(result?.info?.secure_url);
      }}
      onQueuesEnd={(result, { widget }) => {
        widget.close();
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          setPreviewUrl("");
          open();
        }

        return (
          <Button
            onClick={handleOnClick}
            className="hover:bg-gray-100 border border-gray-800/10 w-full"
            variant={"outline"}
          >
            Upload an Image
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};

export default FileUpload;

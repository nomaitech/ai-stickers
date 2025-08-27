import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  setImageFileHandler: (file: File) => void;
};

const ImageUploader = ({ setImageFileHandler }: Props) => {
  const onUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageFileHandler(file);
    setPreviewUrl(url);
  };

  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      if (items.length > 1) {
        toast.error("You may only upload singular images");
      }
      if (items[0].type.indexOf("image") !== -1) {
        const item = items[0];
        const file = item.getAsFile();
        const url = URL.createObjectURL(file);
        setImageFileHandler(file);
        setPreviewUrl(url);
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    multiple: false,
    onDrop: (files) => {
      onUpload(files[0]);
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex-1 h-auto p-4 border border-dashed border-blue-400 mt-2 text-center font-bold cursor-pointer flex items-center gap-2 justify-center"
    >
      <input {...getInputProps()} />
      {previewUrl ? (
        <>
          <img src={previewUrl} alt="Thumbnail" className="max-h-10" />
          <span>Drag another image or click to replace</span>
        </>
      ) : (
        <span>"Drag and drop your image here or click to select"</span>
      )}
    </div>
  );
};

export default ImageUploader;

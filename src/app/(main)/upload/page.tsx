"use client";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineFileUpload } from "react-icons/md";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { useRouter } from "next/navigation";
import BASE_URL from "../../../../config";

export default function UploadArtworkPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [watermark, setWatermark] = useState("");
  const [category, setCategory] = useState("");
  const [license, setLicense] = useState("");
  const [price, setPrice] = useState("");

  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setPreview(acceptedFiles.map((file) => URL.createObjectURL(file)));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": ["image/jpeg", "image/png", "image/jpg"],
    },
    multiple: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !watermark ||
      !category ||
      !license ||
      files.length === 0
    ) {
      alert("Please complete all fields and upload an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("watermark_creator_message", watermark);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("license_type", license);

      if (files[0]) {
        formData.append("image", files[0]);
      } else {
        alert("Image file missing.");
        return;
      }

      const res = await fetch(`${BASE_URL}/api/artwork/uploads`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` || "",
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to upload: ${errorText}`);
      }

      alert("Artwork uploaded successfully!");

      setTitle("");
      setDescription("");
      setWatermark("");
      setCategory("");
      setLicense("");
      setPrice("");
      setFiles([]);

      router.push("/profile");
    } catch (error: any) {
      console.error("Upload error:", error);
      alert(`Upload failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-1/2 space-y-8">
        <title title="Upload New Artwork" />

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4 px-6 py-8">
            <Input
              id="title"
              label="Title"
              type="text"
              placeholder="Abstract City"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Input
              id="description"
              label="Description"
              type="text"
              placeholder="Describe your artwork here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <Input
              id="watermark"
              label="Watermark Message"
              type="text"
              placeholder="This artwork is protected..."
              value={watermark}
              onChange={(e) => setWatermark(e.target.value)}
              required
            />

            <Select
              id="category"
              label="Category"
              options={[
                { value: "landscape", label: "Landscape" },
                { value: "portrait", label: "Portrait" },
                { value: "abstract", label: "Abstract" },
              ]}
              placeholder="Select Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />

            <Select
              id="license"
              label="License Type"
              options={[
                { value: "free", label: "Free" },
                { value: "paid", label: "Paid" },
              ]}
              placeholder="Select License"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              required
            />

            {license === "paid" && (
              <Input
                id="price"
                label="Price (Rupiah)"
                type="number"
                placeholder="e.g. Rp.800000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            )}

            <div
              {...getRootProps()}
              className="border-dashed border-2 border-gray-300 p-4 rounded-md flex flex-col items-center justify-center space-y-2 cursor-pointer"
            >
              <p>Drag and drop your image here or click to upload</p>
              <MdOutlineFileUpload className="w-10 h-10 text-gray-400 rounded-full bg-gray-100 p-2" />
              <input {...getInputProps()} />
              {preview.map((path) => (
                <Image
                  key={path}
                  src={path}
                  width={600}
                  height={600}
                  alt="Uploaded artwork preview"
                />
              ))}
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="ghost">
                Close
              </Button>
              <Button type="button" variant="ghost">
                Save as Draft
              </Button>
              <Button type="submit">Next</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

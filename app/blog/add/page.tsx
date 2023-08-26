"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, Fragment, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Editor from "../../components/Editor";
import Image from "next/image";

const postBlog = async ({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) => {
  const res = fetch("http://localhost:3000/api/blog", {
    method: "POST",
    body: JSON.stringify({ image, title, description }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

const AddBlog = () => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [base64Data, setBase64Data] = useState<string>("");
  const titleRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && content && base64Data) {
      toast.loading("Sending Request 🚀", { id: "1" });
      await postBlog({
        image: base64Data,
        title: titleRef.current?.value,
        description: content,
      });
      toast.success("Blog Posted Successfully", { id: "1" });
      router.push("/");
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setBase64Data(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Fragment>
      <Toaster />
      <div className="w-[80%] m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            Add A Wonderful Blog 🚀
          </p>
          {imageFile && (
            <div className="flex justify-center">
              <Image
                src={base64Data}
                alt="Uploaded"
                style={{ maxHeight: "300px" }}
                width={500}
                height={500}
              />
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <input accept="image/*" type="file" onChange={handleImageChange} />
            <input
              ref={titleRef}
              placeholder="Enter Title"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2 text-black"
            />
            <Editor value={content} onChange={setContent} />
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddBlog;

"use client";

import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Editor from "@/app/components/Editor";
type UpdateBlogParams = {
  image: string;
  title: string;
  description: string;
  id: string;
};
const updateBlog = async (data: UpdateBlogParams) => {
  const res = fetch(`http://localhost:3000/api/blog/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({
      image: data.image,
      title: data.title,
      description: data.description,
    }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

const deleteBlog = async (id: string) => {
  const res = fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "DELETE",
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

const getBlogById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  const data = await res.json();
  console.log("DATA", data);
  return data.post;
};

const EditBlog = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    toast.loading("Fetching Blog Details 🚀", { id: "1" });
    getBlogById(params.id)
      .then((data) => {
        setImage(data.image);
        setTitle(data.title);
        setContent(data.description);
        console.log("COMPLETED");
        toast.success("Fetching Complete", { id: "1" });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching blog", { id: "1" });
      });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (title && content && image) {
      toast.loading("Sending Request 🚀", { id: "1" });
      await updateBlog({
        image: image,
        title: title,
        description: content,
        id: params.id,
      });
      toast.success("Blog Posted Successfully", { id: "1" });
      await router.push("/");
    }
  };
  const handleDelete = async () => {
    toast.loading("Deleting Blog", { id: "2" });
    await deleteBlog(params.id);
    toast.success("Blog Deleted", { id: "2" });
    router.push("/");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Fragment>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            Edit A Wonderful Blog 🚀
          </p>
          {image && (
            <div>
              <p>Selected Image:</p>
              <img src={image} alt="Uploaded" style={{ maxHeight: "300px" }} />
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <input accept="image/*" type="file" onChange={handleImageChange} />
            <input
              placeholder="Enter Title"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2 text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Editor value={content} onChange={setContent} />
            <div className="flex justify-between">
              <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                Update
              </button>
            </div>
          </form>
          <button
            onClick={handleDelete}
            className="font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg  m-auto mt-2 hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default EditBlog;

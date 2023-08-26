import Image from "next/image";
import Link from "next/link";

async function fetchBlogs() {
  const res = await fetch(`${process.env.API_URL}/api/blog`, {
    next: {
      revalidate: 10,
    },
  });
  const data = await res.json();
  return data.posts;
}

export default async function Home() {
  const posts = await fetchBlogs();

  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-slate-800 drop-shadow-xl">
        <h1 className="text-slate-200 text-center text-2xl font-extrabold font-[verdana]">
          My FULL STACK Blog App With Next.js
        </h1>
      </div>
      {/* Link */}
      <div className="flex my-5">
        <Link
          href={"/blog/add"}
          className=" md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-200 font-semibold"
        >
          Add New Blog 🚀
        </Link>
      </div>
      {/* Blogs */}
      <div className="grid grid-cols-2">
        {posts?.map((post: any, index: number) => (
          <div
            key={index}
            className="p-4 h-64 rounded-md overflow-auto mx-3 mb-2 bg-red-300 flex flex-col justify-between"
          >
            {/* Image */}
            <div className="flex max-h-[70%] justify-center">
              <Image
                src={post.image}
                alt={post.title}
                width={250}
                height={250}
              />
            </div>
            {/* Title and Action */}
            <div className="flex items-center my-3">
              <div className="mr-auto">
                <h2 className="mr-auto font-semibold">{post.title}</h2>
              </div>
              <Link
                href={`/blog/edit/${post.id}`}
                className="px-4 py-1  text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200"
              >
                Edit
              </Link>
            </div>
            {/* Date & Description */}
            <div className="mr-auto my-1">
              <blockquote className="font-bold text-slate-700">
                {new Date(post.date).toDateString()}
              </blockquote>
            </div>
            <div className="mr-auto my-1">
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: post.description }}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

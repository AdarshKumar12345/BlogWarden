import Image from "next/image";
import dateFormat from "@/utils/dateFormat";
import { Calendar } from "lucide-react";



export default async function Page({ params }) {
  const { slug } =await params;
  if( !slug){
    return <div className="text-center text-red-500">Slug is required.</div>;
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/get/${slug}`)

  const post = await res.json()
  console.log(post, "post");
  if ( !post || Object.keys(post).length === 0) {
    return <div className="text-center text-red-500">Post not found.</div>;
  }

  if (!post.title || !post.content) {
    return <div className="text-center text-red-500">Post content is not available.</div>;
  }

  const tempTags = post.keywords 

  return (
    <div className="px-4 py-6 sm:px-8">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={post.thumbnail || "/default-thumbnail.jpg"}
          alt={post.title || "Blog Post Thumbnail"}
          width={700}
          height={400}
          className="rounded-lg w-full h-auto max-w-3xl object-cover"
        />
      </div>

      <div className="max-w-3xl text-sm mx-auto text-center mt-6">
        <h1 className="text-3xl font-bold text-gray-50">{post.title}</h1>
      </div>

      <div className="max-w-3xl mx-auto p-5 sm:p-8 rounded-lg shadow-md mt-6 bg-gray-800/30">
        <div className="flex items-center mb-4 text-sm text-gray-400">
          <Calendar className="text-gray-500 inline mr-2" />
          <p>Published on: {dateFormat(new Date(post.createdAt))}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <p className="text-gray-300 font-medium">Category:</p>
          <span className="text-gray-400 bg-gray-700 px-3 py-1 rounded-md text-sm">
            {post.catSlug || "Uncategorized"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-6">
          <p className="text-gray-300 font-medium">Tags:</p>
          {tempTags.split(",").map((tag, index) => (
            <span
              key={index}
              className="text-gray-400 bg-gray-700 px-3 py-1 rounded-md text-sm"
            >
              {tag.trim()}
            </span>
          ))}
        </div>

        <div className="text-gray-200 leading-relaxed text-sm sm:text-lg space-y-4">
          {post.content
            ? post.content.split("\n").map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))
            : "No content available."}
        </div>
      </div>
    </div>
  );
}

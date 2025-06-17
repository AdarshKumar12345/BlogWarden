"use client";

import Editor from "@/components/Editor";
import { toast } from "@/hooks/use-toast";
import { use, useEffect, useState } from "react";

export default function EditPostPage(props) {
  const { slug } = use(props.params);
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/update/${slug}` , {next : {tags: [slug]}});

        if (!res.ok) {
          if (res.status === 404) {
            toast({
              title: "Error",
              description: "Post not found",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Error",
              description: "You are not authorized to edit this post",
              variant: "destructive",
            });
          }
          return;
        }

        const data = await res.json();
        console.log("Fetched post data:", data);
        setPost(data);
      } catch (err) {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    };

    fetchPost();
  }, [slug]);

  const savePost = async ({ title, ogImage, content, excerpt, metaDescription, keywords, status }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/update/${slug}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, ogImage, content, excerpt, metaDescription, keywords, status }),
      });

      if (!res.ok) {
        throw new Error("Post updating failed");
      }

      toast({
        title: "Success",
        description: "Post updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to update post",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-8">
      <h1 className="font-bold text-2xl pb-3">Edit Post</h1>
        <Editor onSave={savePost} initialData={post} />

    </div>
  );
}

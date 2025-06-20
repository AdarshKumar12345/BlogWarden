"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { slugify } from "slugmaster";
import ImageUpload from "./ImageUpload";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "./ui/button";
import ReactMarkdown from "react-markdown";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";
import AIContent from "@/utils/ai-content"

const schema = z.object({
  title: z.string().min(10, { message: 'Title must contain 10 or more characters' }).min(1, { message: "Title must not be empty" }),
  excerpt: z.string().min(10, { message: "Please add some details in the excerpt" }),
  category: z.string().min(1, { message: "Please add a category" }),
  metaDescription: z.string().optional(),
  keywords: z.string().min(1, { message: "Keywords should be there for SEO benefits" }),
  status: z.enum(["DRAFT", "PUBLISHED"])
});

export default function Editor({ onSave, initialData }) {
  const { register, handleSubmit, setValue } = useForm();
  const [content, setContent] = useState("");
  const [ogImage, setOgImage] = useState("");
  const router = useRouter();

  const ideaRef = useRef(null);
  const closeDialogRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setContent(initialData.content);
      setOgImage(initialData.thumbnail);
      setValue("keywords", initialData.keywords || "");
      setValue("category", initialData.catSlug || "");
      setValue("excerpt", initialData.excerpt || "");
      setValue("metaDescription", initialData.desc || "");
      setValue("status", initialData.status);
    }
  }, [initialData]);

  const handleForm = (data) => {
    try {
      const generatedSlug = initialData ? initialData.slug : slugify(data.title);
      onSave({ ...data, slug: generatedSlug, ogImage, content });
      toast({
        title: "Success",
        description: initialData ? "Your blog was updated" : "Your blog page was published",
      });
      if (data.status === "PUBLISHED") router.push(`/blog/${generatedSlug}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <section>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(async (data) => {
          try {
            await schema.parseAsync(data);
            await handleForm(data);
          } catch (error) {
            if (error instanceof z.ZodError) {
              error.errors.forEach((err) => {
                toast({ title: "Error", description: err.message, variant: "destructive" });
              });
            }
          }
        })}
      >
        <input
          {...register("title")}
          placeholder="Enter the post title"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />

        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" className="flex items-center gap-2">
                Generate with AI <Sparkles className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate Blog Content</DialogTitle>
                <DialogDescription>
                  Enter a topic, and AI will generate markdown content for your blog.
                </DialogDescription>
              </DialogHeader>

              <textarea
                ref={ideaRef}
                className="w-full mt-4 p-3 h-32 rounded bg-zinc-800 text-white outline-none resize-none"
                placeholder="e.g. The impact of AI on climate change"
              />

              <DialogFooter className="mt-4">
                <Button
                  onClick={async () => {
                    console.log("Generating content with AI...");
                    try {
                      const response = await AIContent({
                        text: ideaRef.current.value,
                        customInstructions:
                          "Write a structured blog post using markdown. Include headings, facts, and use a professional tone.",
                        contentGen: true,
                      });
                      console.log("AI Response:", response);
                      setContent(response);
                      toast({
                        title: "AI Content Generated",
                        description: "You can now edit or publish it.",
                      });
                      closeDialogRef.current?.click();
                    } catch (error) {
                      console.error("AI Content Generation Error:", error);
                      toast({
                        title: "Generation Failed",
                        description: "Something went wrong while generating content.",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  Generate
                </Button>
                <DialogClose asChild ref={closeDialogRef}>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your markdown content here..."
            className="bg-zinc-700 text-white p-3 h-64 rounded resize-none outline-none"
          />
          <div className="bg-zinc-900 text-white p-3 h-64 rounded overflow-auto">
            <h2 className="text-lg font-semibold mb-2">Live Preview</h2>
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        </div>

        <input
          {...register("excerpt")}
          placeholder="Enter an excerpt"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />
        <input
          {...register("category")}
          placeholder="Enter a category"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />
        <h2 className="text-xl font-bold">SEO Data</h2>
        <ImageUpload returnImage={setOgImage} preloadedImage={ogImage} />
        <input
          {...register("keywords")}
          placeholder="Enter Keywords"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />
        <input
          {...register("metaDescription")}
          placeholder="Enter Meta Description"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />
        <div className="flex gap-2">
          <select
            {...register("status")}
            className="font-bold text-lg bg-zinc-600 px-3 py-1 rounded-sm outline-none"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Publish</option>
          </select>
          <button type="submit" className="bg-zinc-800 px-3 py-2 rounded cursor-pointer">
            Save
          </button>
        </div>
      </form>
    </section>
  );
}

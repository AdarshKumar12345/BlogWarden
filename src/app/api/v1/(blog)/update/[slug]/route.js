import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { revalidateTag } from "next/cache";
import isAdmin from "@/utils/isAdmin";

// PUT Method — Update Post
export async function PUT(request, context) {
  const { slug } = await context.params;

  if (!slug) {
    return NextResponse.json({ message: "Slug is required" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "You must be logged in to update a post" },
      { status: 401 }
    );
  }

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  const admin = isAdmin(session);
  const isAuthor = post.authorId === session.user.id;

  if (!admin && !isAuthor) {
    return NextResponse.json(
      { message: "You are not authorized to update this post" },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { title, content, keywords, catSlug, excerpt, thumbnail } = body;

    const updatedPost = await prisma.post.update({
      where: { slug },
      data: { title, content, keywords, catSlug, excerpt, thumbnail },
    });

    revalidateTag(slug); // revalidate any pages tagged with this slug
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET Method — Get a Post by Slug
export async function GET(request, context) {
  const { slug } = await context.params;

  if (!slug) {
    return NextResponse.json({ message: "Slug is required" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "You must be logged in to view this post" },
      { status: 401 }
    );
  }

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  const admin = isAdmin(session);
  const isAuthor = post.authorId === session.user.id;

  if (!admin && !isAuthor) {
    return NextResponse.json(
      { message: "You are not authorized to view this post" },
      { status: 403 }
    );
  }

  return NextResponse.json(post, { status: 200 });
}

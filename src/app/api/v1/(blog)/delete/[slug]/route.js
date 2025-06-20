import { getAuthSession } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import isAdmin from "@/utils/isAdmin";

export async function DELETE(request, { params }) {
  const { slug } = params;
  const session = await getAuthSession();
  const admin = isAdmin(session);

  if (!admin || !session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await prisma.post.delete({
      where: {
        slug: slug,
      },
    });

    return new Response(
      JSON.stringify({ message: "Blog deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return new Response("Failed to delete blog", { status: 500 });
  }
}

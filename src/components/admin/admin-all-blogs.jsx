
import { getBlogs } from "@/app/actions/getBlogs";
import DleteBlogButton from "../delete-blog-button";


import Pagination from "../pagination";
import config from "@/static/config";
import CategoryFilter from "../categire-filter";

export default async function AdminBlogsPage({ page, category }) {
    const { posts, count } = await getBlogs({ page, category });

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <header className="border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-300">Admin Blogs Page</h1>
                <p className="text-sm text-gray-500">{count} blog{count !== 1 && 's'} found</p>
            </header>
            <CategoryFilter category={category} />

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                    <article
                        key={post.id}
                        className="bg-gray-600/20 shadow-sm border rounded-lg overflow-hidden transition hover:shadow-md flex flex-col"
                    >
                        {post.thumbnail && (
                            <img
                                src={post.thumbnail}
                                alt={post.title}
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <div className="p-5 flex flex-col justify-between flex-1">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-200">{post.title}</h2>
                                <p className="text-gray-500 mt-2 line-clamp-3">{post.excerpt}</p>
                            </div>
                            <div className="mt-4 text-sm text-gray-300 space-y-1">
                                <p><span className="font-medium">Category:</span> {post.catSlug}</p>
                                <p><span className="font-medium">Author:</span> {post.authorId}</p>
                                <p><span className="font-medium">Created:</span> {new Date(post.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex justify-between p-4 border-t">
                            <a
                                href={`/draft/${post.slug}`}
                                className="text-gray-400 hover:underline"
                            >
                                Edit
                            </a>
                            <a
                                href={`/blog/${post.slug}`}
                                className="text-gray-400 hover:underline"
                            >
                                view
                            </a>
                            <DleteBlogButton slug={post.slug} />
                        </div>
                    </article>

                ))}

            </section>
            <div className="w-full bottom left-1/2 p-1 flex justify-center">
                <Pagination
                    currentPage={page}
                    totalItem={count}
                    perPage={config.perPage}
                />
            </div>
            
        </div>
    );
}

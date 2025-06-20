"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPost = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/search?query=${encodeURIComponent(query)}`);
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await res.json();
            setResults(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setError("Something went wrong while fetching posts.");
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex flex-col items-center justify-start py-10 min-h-screen bg-gray-950 px-4">
            <Input
                type="text"
                placeholder="Search blog posts..."
                className="w-full max-w-xl mb-4"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button onClick={fetchPost}>Search</Button>

            <div className="w-full max-w-4xl mt-8">
                {loading && <p className="text-gray-400">Loading...</p>}

                {error && <p className="text-red-400">{error}</p>}

                {!loading && results.length === 0 && query && !error && (
                    <p className="text-gray-400">No results found.</p>
                )}

                <ul className="flex flex-col gap-4">
                    {results.map((post) => (
                        <li
                            key={post.slug}
                            className="bg-gray-400/10 p-5 rounded border border-transparent hover:border-white hover:scale-[1.01] transition-all duration-200"

                        >
                            <Link href={`/blog/${post.slug}`}>
                                <h3 className="text-gray-100 text-xl font-semibold">{post.title}</h3>
                                <p className="text-gray-400 text-sm mt-1">
                                    {post.excerpt.substring(0, 100)}...
                                </p>
                                <div className="flex items-center gap-2 text-xs mt-3">
                                    <span className="text-gray-400">Written by:</span>
                                    <Image
                                        src={post.author.image}
                                        width={24}
                                        height={24}
                                        alt={post.author.name}
                                        className="rounded-full"
                                    />
                                    <p className="text-gray-300">{post.author.name}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

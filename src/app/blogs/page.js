
import Image from "next/image";
import Link from "next/link";



const fetchData = async () =>{
    const res  = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/get`)
    const data = res.json()
    return data

}

export default async function Page() {
    const blogs = await fetchData()
    console.log(blogs)
  return (
    <div className= "w-full min-h-screen grid grid-cols-1 sm:grid-cols-3 p-4 gap-8">
        {
            blogs.map((blog, index) => (
                <BlogCard 
                    key={index}
                    title={blog.title} 
                    discription={blog.excerpt} 
                    image={blog.thumbnail} 
                    url ={blog.slug}
                />
            ))  

        }
        
    </div>
  );
}

function BlogCard({title , discription , image , url} ) {
    
return (
  <div className="w-full max-w-sm bg-gray-300/10 text-gray-50 p-4 rounded-lg hover:scale-[1.03] transition-all duration-300 flex flex-col items-center shadow-lg">
    <Image
      className="rounded-md w-full object-cover"
      src={image}
      alt={title}
      width={300}
      height={200}
    />
    <div className="flex flex-col gap-3 mt-4 w-full">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-sm text-gray-400 leading-relaxed">{discription}</p>
      <Link
        href={`/blog/${url}`}
        className="mt-2 bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded self-start transition-colors"
      >
        Read More...
      </Link>
    </div>
  </div>
);

}
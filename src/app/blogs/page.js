
import Image from "next/image";
import Link from "next/link";

const blogs = [
    {
        title: "Pollution Growth",
        discription: "Pollution is a growing concern worldwide, affecting air quality, water sources, and overall health.",
        image: "/pollution.png",
        url: "/pollution"
    },
    {
        title: "Future of AI",
        discription: "The future of AI holds immense potential, with advancements...",
        image: "/ai.png",
        url: "/ai"
    },
    {
        title: "Javascript the Ultimate Coding Language",
        discription: "JavaScript continues to evolve...",
        image: "/javascript.png",
        url: "/javascript"  
    },
    {
        title: "Growth Tourism in India",
        discription: "India's tourism industry is experiencing significant growth...",
        image: "/tourism.png",
        url: "/tourism" 
    }
]

export default function Page() {
  return (
    <div className= "w-full min-h-screen grid grid-cols-1 sm:grid-cols-3 p-4 gap-8">
        {
            blogs.map((blog, index) => (
                <BlogCard 
                    key={index}
                    title={blog.title} 
                    discription={blog.discription} 
                    image={blog.image} 
                    url ={blog.url}
                />
            ))  

        }
        
    </div>
  );
}

function BlogCard({title , discription , image , url} ) {
    return(
        <div className = "w-full bg-gray-900 text-gray-50 gap-3 p-2 rounded hover:scale-[1.03] transition-all duration-300 flex flex-col items-center rounded">
            <Image  className ="rounded" src={image} alt={title} width={500} height={300} />
           <div className = "flex flex-col gap-2">
            <h2 className ="text-xl font-bold mt-8">{title}</h2>
            <p className = "text-sm text-gray-400">{discription}</p> 
            <Link href ={`/blog/${url}`} className ="bg-gray-500 rounded w-fit p-1">Read More...</Link>
           </div>
        </div>
    )
}
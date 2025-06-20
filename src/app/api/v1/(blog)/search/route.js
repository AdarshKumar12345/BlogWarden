export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    if (!query) {
        return new Response(JSON.stringify({ error: 'Query parameter is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    try{
        const posts = await prisma.post.findMany({
            where:{
                status: "PUBLISHED",
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { content: { contains: query, mode: 'insensitive' } }
                ]
            },
            include:{
                author: {
                    select: {
                        name: true,
                        image: true
                    }
                },
            }
        })
        if (posts.length === 0) {
            return new Response(JSON.stringify({ message: 'No posts found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }
            return new Response(JSON.stringify(posts), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });

        
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

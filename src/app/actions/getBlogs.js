// import { prisma } from "@/lib/prisma";
// import config from "@/static/config";

import { prisma } from "@/lib/prisma";
import config from "@/static/config";

// export async function getBlogs({ page = 1, category = null } = {}) {
//     const pageToShow = config.perPage || 5;

//     const where = category
//         ? {
//             catslug: {
//                 equals: category.trim(),
//                 mode: 'insensitive'
//             }
//         }
//         : {};

//     const [posts, count] = await prisma.$transaction([
//         prisma.posts.findMany({
//             take: pageToShow,
//             skip: Math.max((page - 1) * pageToShow, 0),
//             orderBy: { createdAt: 'desc' },
//             where
//         }),
//         prisma.posts.count({ where })
//     ]);

//     return { posts, count };
// }


export async function getBlogs({page , category} = {}) {
    const pageToSHow = config.perPage || 5;
    const query = {
        take : pageToSHow,
        skip: Math.max((page - 1) * pageToSHow, 0),
        orderBy: { createdAt: 'desc' },
        where :{
            ...(category && {
                catSlug: {
                    equals: category,
                    mode: 'insensitive'
                }
            })
        }

    }
    const [posts , count] = await prisma.$transaction([
        prisma.post.findMany(query),
        prisma.post.count({
            where:{
                ...(category && {
                    catSlug: {
                        equals: category,
                        mode: 'insensitive'
                    }
                })
            }
        })
    ])
    return { posts, count };

}
import AdminBlogsPage from "@/components/admin/admin-all-blogs";
import { getAuthSession } from "@/lib/authOptions";
import isAdmin from "@/utils/isAdmin";


export default async function AdminPostsPage(props){
    const { searchParams } = await props;
    const page =  searchParams.page ? parseInt(searchParams.page) : 1;
    const category = searchParams.cat || null;

    const session = await getAuthSession();

    const admin = isAdmin(session);

    if (!session || !admin) {
        return (
            <div>
                <h1>Unauthorized</h1>
                <p>You do not have permission to access this page.</p>
            </div>
        );
    }
    return(
        <div>
            <AdminBlogsPage page={page} category={category} />

        </div>
    )
}
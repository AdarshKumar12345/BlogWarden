"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function Pagination({ currentPage, totalItem, perPage, ...props }) {
    const router = useRouter();

    if (totalItem === 0 || perPage <= 0) {
        return null;
    }

    const totalPages = Math.ceil(totalItem / perPage);
    if (currentPage < 1 || currentPage > totalPages) {
        return null;
    }

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        router.push(`?page=${page}`);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    return (
        <div>
            <Button className="mr-2" onClick={handlePrevious} disabled={currentPage <= 1}>
                Previous
            </Button>
            <span className="mx-2">
                Page {currentPage} of {totalPages}
            </span>
            <Button className="ml-2" onClick={handleNext} disabled={currentPage >= totalPages}>
                Next
            </Button>
        </div>
    );
}

import { useState } from 'react'

import {PageInfo} from "../types/userInfo-data-type";

export default function UsePagination() {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState<number>(0)
    const [showPageNums, setShowPageNums] = useState<number[]>([])
    const pageCount = 5

    const loadPageInfo = (totalPageNum: number) => {
        setTotalPage(totalPageNum)
        updatePageNumbers(totalPageNum, currentPage)
    }
    const handlePageChange = (page: number) => {
        if (totalPage && (page < 1 || page > totalPage)) return
        if (totalPage) updatePageNumbers(totalPage, page)
        setCurrentPage(page)
    }

    const updatePageNumbers = (totalPages: number, currentPage: number) => {
        const startPage = Math.floor((currentPage - 1) / pageCount) * pageCount + 1
        const endPage = Math.min(startPage + pageCount - 1, totalPages)

        setShowPageNums(Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i))
    }

    const nextPage = () => handlePageChange(currentPage + 1)
    const prevPage = () => handlePageChange(currentPage - 1)

    return {
        currentPage,
        totalPage,
        showPageNums,
        loadPageInfo,
        handlePageChange,
        nextPage,
        prevPage,
    }
}

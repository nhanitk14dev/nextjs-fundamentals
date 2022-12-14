/* 
  Recommend: https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
  we are using the useMemo hook to compute our core logic. 
  The useMemo callback will run when any value in its dependency array changes.
 */

export type IPagination = {
  totalCount: number
  pageSize: number
  siblingCount?: number
  currentPage: number
  onPageChange: (page: number) => void
  className?: string
}

export const PagingPropDefault = {
  totalCount: 0,
  pageSize: 1,
  siblingCount: 0,
  currentPage: 1,
  onPageChange: {},
  className: ''
}

import { useMemo } from 'react'
export const DOTS = -1
export const PER_PAGE = 4
export const PAGE_DEFAULT = 1

const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

// Get numbers of length ex: 1,2,3...10
export const usePagination = (props: IPagination): number[] => {
  const {
    totalCount = PagingPropDefault.totalCount,
    pageSize = PagingPropDefault.pageSize,
    siblingCount = PagingPropDefault.siblingCount,
    currentPage = PagingPropDefault.currentPage
  } = props

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5

    /*
        If the number of pages is less than the page numbers we want to show in our
        paginationComponent, we return the range [1..totalPageCount]
      */

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    )

    /*
        We do not want to show dots if there is only one position left 
        after/before the left/right page count as that would lead to a change if our Pagination
        component size which we do not want
      */
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      )
      return [firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, '...', ...middleRange, DOTS, lastPageIndex]
    }
  }, [totalCount, pageSize, siblingCount, currentPage])

  return paginationRange as number[]
}

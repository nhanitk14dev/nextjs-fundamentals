import type { IPagination } from '../../libs/use-pagination'
import { usePagination, DOTS } from '../../libs/use-pagination'
import styles from './Pagination.module.scss'

const Pagination = (props: IPagination) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props

 
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    className,
    onPageChange
  })

  // Display pagination when the total of record > default: 4
  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const lastPage: number = paginationRange[paginationRange.length - 1]

  return (
    <div className={className}>
      <ul className={styles.paginationContainer}>
        <li
          className={`${styles.paginationItem} ${
            currentPage === 1 ? styles.disabled : ''
          }`}
          onClick={onPrevious}
        >
          <div className={`${styles.arrow} ${styles.left}`} />
        </li>
        {paginationRange.map((page: number) => {
          if (page === DOTS) {
            return (
              <li key={page} className={`${styles.paginationItem} dots`}>
                &#8230;
              </li>
            )
          }

          return (
            <li
              key={page}
              className={`${styles.paginationItem} ${
                currentPage === page ? styles.selected : ''
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </li>
          )
        })}

        <li
          className={`${styles.paginationItem} ${
            currentPage === lastPage ? styles.disabled : ''
          }`}
          onClick={onNext}
        >
          <div className={`${styles.arrow} ${styles.right}`} />
        </li>
      </ul>
    </div>
  )
}

export default Pagination

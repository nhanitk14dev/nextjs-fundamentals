import type { GetStaticProps } from 'next'
import type { IUser } from './../../models/user.model'
import tableStyles from '../../components/Table.module.scss'
import Pagination from '../../components/pagination'
import { useState, useMemo } from 'react'
import { PAGE_DEFAULT, PER_PAGE } from '../../libs/use-pagination'
import Link from 'next/link'
import { userRepository } from './../../libs/user-repository';

type UserListProps = {
  users: IUser[]
}

export default function UserComponent({ users }: UserListProps) {
  const [currentPage, setCurrentPage] = useState<number>(PAGE_DEFAULT)

  // Use memo to re-calculate data trigger change when currentPage change
  const dataTable = useMemo(() => {
    const firstIndex = (currentPage - 1) * PER_PAGE
    const lastIndex = firstIndex + PER_PAGE
    return users.slice(firstIndex, lastIndex)
  }, [currentPage, users])

  return (
    <div className="container">
      <div className={tableStyles.table}>
        <h1>Users List</h1>
        <table>
          <thead>
            <tr>
              <th>#No</th>
              <th>Email</th>
              <th>Name</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {dataTable.length > 0 &&
              dataTable.map(user => (
                <tr key={user.id}>
                  <td>
                    <Link href={`/users/${user.id}`}>{user.id}</Link>
                  </td>
                  <td>
                    <Link href={`/users/${user.id}`}>{user.email}</Link>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.address}</td>
                </tr>
              ))}
          </tbody>
          {users.length < 0 && <div>Data not found</div>}
        </table>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={users.length}
          pageSize={PER_PAGE}
          onPageChange={page => setCurrentPage(page)}
        ></Pagination>
      </div>
    </div>
  )
}

// https://nextjs.org/docs/basic-features/data-fetching/get-static-props
// This function gets called at build time on server-side
// It won't be called on client-side, so you can even do
// direct database queries

export const getStaticProps: GetStaticProps = async () => {
  const users = userRepository.getAll()
  return {
    props: {
      users
    }
  }
}

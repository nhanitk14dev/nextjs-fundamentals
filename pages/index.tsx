import Image from 'next/image'
import mountainImg from '../public/mountains.jpg'
import type { GetStaticProps } from 'next'
import { userRepository } from './../libs/user-repository'

type HomeProps = {
  totalUsers: number
}

export default function Home({ totalUsers }: HomeProps) {
  return (
    <>
      <h1>Welcome to Homepage</h1>
      <section className="card">
        <strong>Total Users In System: {totalUsers}</strong>
      </section>
      <Image src={mountainImg} alt="Mountain" width={500} height={500} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const users = userRepository.getAll()
  const totalUsers = users.length
  return {
    props: {
      totalUsers: totalUsers
    },
    revalidate: 10 // refresh data after 10 seconds
  }
}

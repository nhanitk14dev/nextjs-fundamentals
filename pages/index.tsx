import Image from 'next/image'
import mountainImg from '../public/mountains.jpg'

export default function Home() {
  return (
    <>
      <h1>Welcome to Homepage</h1>
      <Image
        src={mountainImg}
        alt="Mountain"
        width={500}
        height={500}
      />
    </>
  )
}

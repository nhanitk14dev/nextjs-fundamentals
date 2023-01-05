import type { GetStaticProps } from 'next'
import { postRepository } from './../../libs/post-repository'
import type { PostDataListProps } from './../../models/posts.model'
import Link from 'next/link'

export const getStaticProps: GetStaticProps = async () => {
  const posts = await postRepository.getAll()
  return {
    props: {
      postDataList: posts
    }
  }
}

export default function PostPage({ postDataList }: PostDataListProps) {
  return (
    <div>
      <h1>Latest Post In 2022</h1>
      <div className="post-list">
        {postDataList.map(post => (
          <div className="card" key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

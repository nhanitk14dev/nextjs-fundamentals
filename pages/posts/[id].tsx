import type { GetStaticPaths, GetStaticProps } from 'next'
import { postRepository } from '../../libs/post-repository'
import type { ParsedUrlQuery } from 'querystring'
import type { PostDataProps } from './../../models/posts.model'
import NextLink from '../../components/Link'
import btnStyles from '../../components/Button.module.scss'

interface Params extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postList = await postRepository.getAll()
  return {
    paths: postList.map(post => {
      return {
        params: {
          id: post.id.toString()
        }
      }
    }),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { id } = context.params as Params
  const postData = await postRepository.find(id)

  return {
    props: {
      postData
    }
  }
}

export default function Post({ postData }: PostDataProps) {
  return (
    <>
      <div className="card">
        <h1>{postData.title}</h1>
        <p>{postData.body}</p>
      </div>
      <div>
        <NextLink href="/posts">
          <a className={btnStyles.primary}>Back To List</a>
        </NextLink>
      </div>
    </>
  )
}

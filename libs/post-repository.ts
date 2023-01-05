import type { IPostData } from '../models/posts.model'

export const postRepository = {
  getAll,
  find
}

async function getAll() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=1`
  )

  return (await response.json()) as IPostData[]
}

async function find(id: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  )
  return (await response.json()) as IPostData
}

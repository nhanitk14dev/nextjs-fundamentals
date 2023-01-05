export interface IPostData {
  userId: number
  id: number
  title: string
  body: string
}

export interface PostDataProps {
  postData: IPostData
}

export interface PostDataListProps {
  postDataList: IPostData[]
}
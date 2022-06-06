import { useEffect, useState } from "react";
import { IPost } from "../models/IPost";
import { postAPI } from "../services/PostService";
import PostItem from "./PostItem";

// Тут реализовываю логику и вывожу список постов
// refetch - служит когда нам нужно что0то перезаписать 
// pollingInterval - это когда в определённый промежуток времени мы получаем ОБНОВЛЁННЫЕ ДАННЫЕ
const PostContainer = () => {
  const [limit, setLimit] = useState(100);
  const {
    data: posts,
    error,
    isLoading,
    refetch
  } = postAPI.useFetchAllPostsQuery(limit);
  const [createPost, {}] = postAPI.useCreatePostMutation()
  const [updatePost, {}] = postAPI.useUpdatePostMutation()
  const [deletePost, {}] = postAPI.useDeletePostMutation()

  useEffect(() => {
    // setTimeout(() => {
    //   setLimit(3);
    // }, 2000);
  }, []);

  const handleCreate = async () => {
      const title = prompt()
      await createPost({title,body: title} as IPost)
  }
  const handleRemove = (post: IPost) => {
    deletePost(post)
}

const handleUpdate = (post: IPost) => {
    updatePost(post)
}

  return (
    <div>
      <div className="post__list">
          <button onClick={handleCreate}>Add new post</button>
          {/* <button onClick={() => refetch()}>REFETCH</button> */}
        {isLoading && <h1>Идёт загрузка...</h1>}
        {error && <h1>Произошла ошибка при загрузке</h1>}
        {posts && posts.map((post) => <PostItem post={post} key={post.id} />)}
      </div>
    </div>
  );
};

export default PostContainer;

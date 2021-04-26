import { useSelector } from "react-redux";
import {
  loadingPostSelector,
  newPostSelector,
  postSelector,
} from "../../../store/selector/post.selector";
import { CardItem } from "./partials/CardItem";

export function PostCard({ posts }) {
  return posts.map((post) => <CardItem key={post._id} post={post}></CardItem>);
}
export function SkeletonLoader() {
  return (
    <div className=" flex">
      <div className="w-full my-4">
        <div className=" bg-white mx-8 shadow rounded-lg  ">
          <div className="flex items-start"></div>
          <div class=" shadow rounded-md p-4 w-full ">
            <div class="animate-pulse  space-x-4">
              <div class="flex-1 mx-4 space-y-4 py-1">
                <div class="h-4 bg-blue-400 rounded w-3/4"></div>
                <div class="space-y-2">
                  <div class="h-4 bg-blue-400 rounded"></div>
                  <div class="h-4 bg-blue-400 rounded w-5/6"></div>
                </div>
              </div>
              <div class="flex items-center py-1">
                <div class="rounded-full bg-blue-400 h-12 w-12"></div>
                <div class="h-4 bg-blue-400 mx-4  rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function PostCardStore() {
  const posts = useSelector(postSelector);
  // const newPosts = useSelector(newPostSelector);
  const loading = useSelector(loadingPostSelector);
  return (
    <>
      {!loading ? (
        <PostCard posts={posts} />
      ) : (
        [1, 2, 3].map((k) => <SkeletonLoader key={k} />)
      )}
    </>
  );
}

// export const PostCardStore = connect((state) => ({
//   posts: state.getPosts,
// }))(PostCard);

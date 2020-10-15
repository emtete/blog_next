import PostList from "../components/user/PostList";

import wrapper from "../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";

// import AppLayout from "../components/AppLayout";

const Post = () => {
  return <PostList />;
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   async (context) => {
//     const cookie = context.req ? context.req.headers.cookie : "";
//     axios.defaults.headers.Cookie = "";

//     if (context.req && cookie) {
//       axios.defaults.headers.Cookie = cookie;
//     }

//     const cookieArr = cookie && cookie.split("; ");
//     let cookieObj = {};
//     for (let i in cookieArr) {
//       cookieObj[cookieArr[i].split("=")[0]] = cookieArr[i].split("=")[1];
//     }

//     const data = {
//       userId: cookieObj.id || 1,
//       CategoryId: context.query.categoryId,
//       includeContent: true,
//     };

//     // 글 목록 호출
//     context.store.dispatch({
//       type: "GET_POST_LIST_REQUEST",
//       data,
//     });

//     context.store.dispatch({ type: "LOAD_MY_INFO_REQUEST" });

//     context.store.dispatch(END);
//     await context.store.sagaTask.toPromise();
//   }
// );

export default Post;

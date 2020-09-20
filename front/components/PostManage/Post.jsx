import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const Post = ({ post, handleCheckbox, checkboxGroup }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const orgPost = useSelector((state) => state.post.orgPost);

  const deleteLoading = useSelector((state) => state.post.deleteLoading);
  const deleteDone = useSelector((state) => state.post.deleteDone);
  const deleteError = useSelector((state) => state.post.deleteError);

  const onClickUpdate = () => {
    dispatch({ type: "GET_POST_ONE_REQUEST", data: { id: post.id } });
  };

  const onClickDelete = () => {
    dispatch({ type: "DELETE_POST_REQUEST", data: { id: post.id } });
  };

  // 수정 버튼 클릭 후
  useEffect(() => {
    // GET_POST_ONE_REQUEST를 통해 orgPost값이 호출된 후 수정페이지로 이동
    if (orgPost.title !== "") router.push("/board");
  }, [orgPost]);

  // 삭제 버튼 클릭 후
  useEffect(() => {
    // 삭제 성공시, post list 재호출
    if (deleteDone) {
      dispatch({ type: "GET_POST_LIST_REQUEST" });
      dispatch({ type: "DELETE_POST_RESET" });
    }
  }, [deleteDone]);

  console.log("Post rendering");
  return (
    <>
      <div className='check_blog'>
        <input
          type='checkbox'
          id='inpCheck36'
          className='inp_check'
          onChange={handleCheckbox}
          checked={checkboxGroup[post.id]}
          value={post.id}
        />
        <label htmlFor='inpCheck36' className='ico_blog ico_checkbox'>
          선택 안됨
        </label>
      </div>
      <div className='post_cont'>
        <strong className='tit_post tit_ellip'>
          <a
            // href='https://emtete.tistory.com/36'
            title={post.title}
            className='link_cont'
            target='_blank'
          >
            {post.title}
          </a>
        </strong>
        <a //href='/manage/posts?category=758257'
        >
          <span className='txt_cate txt_ellip'>{post.categoryName}</span>
        </a>
        <span className='txt_info txt_ellip'>{post.author}</span>
        <span className='txt_info'>{post.published}</span>
      </div>
      <div className='post_btn'>
        <div className='info_btn'>
          <div>
            <span className='btn_post' onClick={onClickUpdate}>
              수정
            </span>
            <span className='btn_post' onClick={onClickDelete}>
              샥제
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;

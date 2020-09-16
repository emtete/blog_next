import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const Post = ({ item }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const orgPost = useSelector((state) => state.post.orgPost);

  const onClickUpdate = () => {
    dispatch({ type: "GET_POST_ONE_REQUEST", data: { id: item.id } });
  };

  // 수정 버튼 클릭 후, dispatch를 통해 orgPost값이 호출된 후 수정페이지로 이동
  useEffect(() => {
    if (orgPost.title !== "") router.push("/board");
  }, [orgPost]);

  return (
    <>
      <div className='check_blog'>
        <input type='checkbox' id='inpCheck36' className='inp_check' />
        <label htmlFor='inpCheck36' className='ico_blog ico_checkbox'>
          선택 안됨
        </label>
      </div>
      <div className='post_cont'>
        <strong className='tit_post tit_ellip'>
          <a
            // href='https://emtete.tistory.com/36'
            title={item.title}
            className='link_cont'
            target='_blank'
          >
            {item.title}
          </a>
        </strong>
        <a //href='/manage/posts?category=758257'
        >
          <span className='txt_cate txt_ellip'>{item.category}</span>
        </a>
        <span className='txt_info txt_ellip'>{item.author}</span>
        <span className='txt_info'>{item.published}</span>
      </div>
      <div className='post_btn'>
        <div className='info_btn'>
          <div>
            <span className='btn_post' onClick={onClickUpdate}>
              수정
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;

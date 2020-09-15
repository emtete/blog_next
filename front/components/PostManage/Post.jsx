import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const Post = ({ item }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const onClickUpdate = () => {
    dispatch(getPostOneAction({ id: item.id }));
    router.push("/board");
  };

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

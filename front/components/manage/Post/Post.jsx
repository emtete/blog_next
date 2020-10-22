import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

const changeDateFormat = (dateStr) => {
  const date = new Date(dateStr);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y} / ${m} / ${d}`;
};

const Post = ({ post, handleCheckbox, checkboxGroup, setRerender }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // const [isNotice, setIsNotice] = useState(false);

  const orgPost = useSelector((state) => state.post.orgPost);
  const deleteLoading = useSelector((state) => state.post.deleteLoading);
  const deleteDone = useSelector((state) => state.post.deleteDone);
  const deleteError = useSelector((state) => state.post.deleteError);
  const me = useSelector((state) => state.user.me);

  const onClickDelete = () => {
    axios
      .delete(`/post/${post.id}`, { withCredentials: true })
      .then((result) => {
        setRerender(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const onClickNotice = (id) => {
    // setIsNotice((prev) => !prev);
    console.log(post.isNotice);
    const data = { isNotice: !post.isNotice, id };
    axios
      .post(`/post/setNotice`, { data }, { withCredentials: true })
      .then((result) => {
        setRerender(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <div className='check_blog'>
        <input
          type='checkbox'
          id={`inpCheck${post.id}`}
          className='inp_check'
          onChange={handleCheckbox}
          checked={
            checkboxGroup[post.id] !== undefined
              ? checkboxGroup[post.id]
              : false
          }
          value={post.id}
        />
        <label htmlFor={`inpCheck${post.id}`} className='ico_blog ico_checkbox'>
          선택 안됨
        </label>
      </div>
      <div className='post_cont'>
        <strong className='tit_post tit_ellip'>
          <span //title={post.title}
            className='link_cont'
            target='_blank'
          >
            {post.title}
          </span>
        </strong>
        <a>
          <span className='txt_cate txt_ellip'>{post.categoryName}</span>
        </a>
        <span className='txt_info txt_ellip'>{post.author}</span>
        <span className='txt_info'>{changeDateFormat(post.createdAt)}</span>
      </div>
      <div className='post_btn'>
        <div className='info_btn'>
          <div>
            <span
              className={`btn_post ${!post.isNotice && "disabled"}`}
              onClick={() => onClickNotice(post.id)}
            >
              공지
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

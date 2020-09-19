import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Post from "./Post";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "#f3f5f7",
  },
}));

const PostManage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.post.item.items);

  const getListLoading = useSelector((state) => state.post.getListLoading);
  const getListDone = useSelector((state) => state.post.getListDone);
  const getListError = useSelector((state) => state.post.getListError);

  // 글 목록 호출
  useEffect(() => {
    dispatch({ type: "GET_POST_LIST_REQUEST" });
  }, []);

  // 글 목록 호출 성공
  useEffect(() => {
    if (getListDone) dispatch({ type: "GET_POST_LIST_RESET" });
  }, [getListDone]);

  // 글 목록 호출 실패
  useEffect(() => {
    if (getListError) alert(getListError);
  }, [getListError]);

  console.log("PostManage rendering");
  return (
    <main className={classes.content}>
      <div id='mArticle'>
        <div className='inner_article contents_article'>
          <h3 className='tit_cont'>
            글 관리
            <span className='txt_count'> 15</span>
          </h3>
          <div className='wrap_search'>
            <div className='check_blog'>
              <input type='checkbox' id='inpAllCheck' className='inp_check' />
              <label htmlFor='inpAllCheck' className='ico_blog ico_checkbox'>
                선택 됨
              </label>
            </div>
            <div className='opt_blog'>
              <select
                name='abc1'
                className='opt_category'
                // onChange={onChangeSelect1}
                // ref={selectRef1}
                // value={selectValue1}
              >
                <option value=''>선택되지 않음</option>
                <option value='1'>선택되지 않음1</option>
                {/* {treeDataCopied.map((node) => (
                  <option key={node.id + node.title} value={node.id}>
                    {node.title}
                  </option>
                ))} */}
              </select>
            </div>
          </div>
          <div className='wrap_list'>
            <ul className='list_post list_post_type2'>
              {items.map((item) => (
                <li key={item.id + item.published}>
                  <Post item={item} />
                </li>
              ))}
            </ul>
          </div>

          <div className='wrap_paging'>
            <strong className='screen_out'>현재 1페이지</strong>
            <a className='link_paging'>
              <span className='ico_blog ico_prev'>이전 페이지 없음</span>
            </a>
            <ul className='list_paging'>
              <li className='on'>
                <a
                  className='link_num' //href="/manage/posts?category=-3&amp;page=1&amp;searchKeyword=&amp;searchType=title&amp;visibility=all"
                >
                  1
                </a>
              </li>
            </ul>
            <a className='link_paging'>
              <span className='ico_blog ico_next'>다음 페이지 없음</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};
export default PostManage;

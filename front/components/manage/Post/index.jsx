import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";

import Post from "./Post";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    paddingTop: "48px",
    paddingLeft: "30px",
    paddingRight: "30px",
    backgroundColor: "#f3f5f7",
  },
}));

const initCheckboxGroup = (items) => {
  const object = {};

  object["all"] = false;
  items.map((item) => {
    object[item.id] = false;
  });

  return object;
};

const checkAll = (items, check) => {
  const object = {};

  object["all"] = check;
  items.map((item) => {
    object[item.id] = check;
  });

  return object;
};

const getChecked = (checkboxGroup) => {
  const checked = [];

  for (let id in checkboxGroup) {
    if (checkboxGroup[id] && id != "all") checked.push(id);
  }

  return checked;
};

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

const PostManage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const [searchCategoryId, setSearchCategoryId] = useState("");
  const [changeCategoryId, setChangeCategoryId] = useState("");
  const [checkboxGroup, setCheckboxGroup] = useState({ all: false });
  const [posts, setPosts] = useState([]);

  const { me, items, flatTreeData } = useSelector(
    (state) => ({
      me: state.user.me,
      items: state.post.item.items,
      flatTreeData: state.category.flatTreeData,
    }),
    (prev, next) => {
      return (
        prev.me === next.me &&
        prev.items === next.items &&
        prev.flatTreeData === next.flatTreeData
      );
    }
  );

  const { getListLoading, getListDone, getListError } = useSelector(
    (state) => ({
      getListLoading: state.post.getListLoading,
      getListDone: state.post.getListDone,
      getListError: state.post.getListError,
    }),
    (prev, next) => {
      return (
        prev.getListLoading === next.getListLoading &&
        prev.getListDone === next.getListDone &&
        prev.getListError === next.getListError
      );
    }
  );

  const { loadMyInfoLoading, loadMyInfoDone, loadMyInfoError } = useSelector(
    (state) => ({
      loadMyInfoLoading: state.user.loadMyInfoLoading,
      loadMyInfoDone: state.user.loadMyInfoDone,
      loadMyInfoError: state.user.loadMyInfoError,
    }),
    (prev, next) => {
      return (
        prev.loadMyInfoLoading === next.loadMyInfoLoading &&
        prev.loadMyInfoDone === next.loadMyInfoDone &&
        prev.loadMyInfoError === next.loadMyInfoError
      );
    }
  );

  const {
    getCategoryListLoading,
    getCategoryListDone,
    getCategoryListError,
  } = useSelector(
    (state) => ({
      getListLoading: state.category.getListLoading,
      getListDone: state.category.getListDone,
      getListError: state.category.getListError,
    }),
    (prev, next) => {
      return (
        prev.getListLoading === next.getListLoading &&
        prev.getListDone === next.getListDone &&
        prev.getListError === next.getListError
      );
    }
  );

  const { changeCategoryDone, changeCategoryError } = useSelector(
    (state) => ({
      changeCategoryDone: state.post.changeCategoryDone,
      changeCategoryError: state.post.changeCategoryError,
    }),
    (prev, next) => {
      return (
        prev.changeCategoryDone === next.changeCategoryDone &&
        prev.changeCategoryError === next.changeCategoryError
      );
    }
  );

  // 글 목록 호출
  useEffect(() => {
    if (me) {
      const data = { userId: me.id };
      dispatch({ type: "GET_POST_LIST_REQUEST" });
      dispatch({ type: "GET_CATEGORY_LIST_REQUEST", data });
    }
  }, [me]);

  // 글 목록 호출
  useEffect(() => {
    if (changeCategoryDone) {
      dispatch({ type: "GET_POST_LIST_REQUEST" });
    }
    dispatch({ type: "CHANGE_CATEGORY_IN_POST_RESET" });
  }, [changeCategoryDone]);

  useEffect(() => {
    // 글 목록 호출 성공
    if (getListDone) {
      setPosts(items);
      setCheckboxGroup(initCheckboxGroup(items));
      dispatch({ type: "GET_POST_LIST_RESET" });
    }
    // 글 목록 호출 실패
    if (getListError) {
      alert(getListError);
    }
  }, [getListDone, getListError]);

  useEffect(() => {
    // 카테고리 리스트 호출 성공.
    // if (changeCategoryDone) {
    if (getCategoryListDone) {
      dispatch({ type: "GET_CATEGORY_LIST_RESET" });
      dispatch({ type: "RESET_INDEX_PATH_ACTION" });
    }
    // 카테고리 리스트 호출 중 에러.
    if (getCategoryListError) {
      alert(getCategoryListError);
      dispatch({ type: "GET_CATEGORY_LIST_RESET" });
    }
  }, [getCategoryListDone, getCategoryListError]);

  const onChangeSelect1 = useCallback(
    (e) => {
      const selectedIndex = e.target.selectedIndex;
      const categoryName = e.target[selectedIndex].text;
      const postIdArr = getChecked(checkboxGroup);
      if (postIdArr.length === 0) {
        alert("선택된 글이 없습니다.");
        return;
      }
      const data = { CategoryId: e.target.value, categoryName, postIdArr };
      dispatch({ type: "CHANGE_CATEGORY_IN_POST_REQUEST", data });
    },
    [changeCategoryId, checkboxGroup]
  );

  const onChangeSelect2 = useCallback(
    (e) => {
      setSearchCategoryId(e.target.value);
      const data = { CategoryId: e.target.value };
      dispatch({ type: "GET_POST_LIST_REQUEST", data });
    },
    [searchCategoryId]
  );

  const handleCheckbox = useCallback(
    (e) => {
      if (e.target.value == "all") {
        setCheckboxGroup(checkAll(items, e.target.checked));
      } else {
        let clone = deepCopy(checkboxGroup);
        clone[e.target.value] = e.target.checked; // true
        console.log(e.target.value);
        setCheckboxGroup(clone);
      }
    },
    [checkboxGroup]
  );
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
              <input
                type='checkbox'
                id='inpAllCheck'
                className='inp_check'
                onChange={handleCheckbox}
                checked={checkboxGroup["all"]}
                value='all'
              />

              <label htmlFor='inpAllCheck' className='ico_blog ico_checkbox'>
                선택 됨
              </label>
            </div>
            <form className='search_blog' />
            <div className='opt_blog'>
              <select
                name='abc2'
                className='opt_category'
                onChange={onChangeSelect1}
                value={changeCategoryId}
              >
                <option value=''>카테고리 바꾸기</option>
                {flatTreeData.map((node) => (
                  <option key={node.id + node.title} value={node.id}>
                    {node.title}
                  </option>
                ))}
              </select>
            </div>
            <div className='opt_blog'>
              <select
                name='abc1'
                className='opt_category'
                onChange={onChangeSelect2}
                value={searchCategoryId}
              >
                <option value=''>모든 카테고리</option>
                {flatTreeData.map((node) => (
                  <option key={node.id + node.title} value={node.id}>
                    {node.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='wrap_list'>
            <ul className='list_post list_post_type2'>
              {posts.map((post) => (
                <li key={post.id + post.published}>
                  <Post
                    post={post}
                    handleCheckbox={handleCheckbox}
                    checkboxGroup={checkboxGroup}
                  />
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

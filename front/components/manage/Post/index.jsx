import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

import { backUrl } from "../../../config/config";
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

const exceptHaveChildren = (flatTreeData) => {
  const excepted = [];
  flatTreeData.map((node) => {
    if (!getIsArray(node.children)) excepted.push(node);
  });

  return excepted;
};

const getIsArray = (e) => {
  return Array.isArray(e) && e.length > 0;
};

const PostManage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const [searchCategoryId, setSearchCategoryId] = useState("");
  const [changeCategoryId, setChangeCategoryId] = useState("");
  const [checkboxGroup, setCheckboxGroup] = useState({ all: false });
  const [posts, setPosts] = useState([]);
  const [flatTreeData, setFlatTreeData] = useState([]);
  const [rerender, setRerender] = useState(false);

  const query = router.query;

  const me = useSelector((state) => state.user.me);

  // post list
  useEffect(() => {
    me &&
      axios
        .get(`${backUrl}post/getList?userId=${me.id}`, {
          withCredentials: true,
        })
        .then((result) => {
          setPosts(result.data);
          setCheckboxGroup(initCheckboxGroup(result.data));
        })
        .catch((err) => {
          alert(err);
        });
    setRerender(false);
  }, [query, me, rerender]);

  // category list
  useEffect(() => {
    me &&
      axios
        .get(`${backUrl}category/getList?userId=${me.id}`, {
          withCredentials: true,
        })
        .then((result) => {
          setFlatTreeData(exceptHaveChildren(result.data));
        })
        .catch((err) => {
          alert(err);
        });
    setRerender(false);
  }, [query, me, rerender]);

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

      axios
        .post(
          `${backUrl}post/changeCategory`,
          { data },
          {
            withCredentials: true,
          }
        )
        .then((result) => {
          setRerender(true);
        })
        .catch((err) => {
          alert(err);
        });
    },
    [changeCategoryId, checkboxGroup]
  );

  const onChangeSelect2 = useCallback(
    (e) => {
      setSearchCategoryId(e.target.value);
      const data = { CategoryId: e.target.value, userId: me.id };

      me &&
        axios
          .get(
            `${backUrl}post/getList?userId=${me.id}&CategoryId=${e.target.value}`,
            {
              withCredentials: true,
            }
          )
          .then((result) => {
            setPosts(result.data);
            // setCheckboxGroup(initCheckboxGroup(result.data));
          })
          .catch((err) => {
            alert(err);
          });
    },
    [me, searchCategoryId]
  );

  const handleCheckbox = useCallback(
    (e) => {
      if (e.target.value == "all") {
        setCheckboxGroup(checkAll(posts, e.target.checked));
      } else {
        let clone = deepCopy(checkboxGroup);
        clone[e.target.value] = e.target.checked; // true
        setCheckboxGroup(clone);
      }
    },
    [checkboxGroup]
  );

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
                <li key={post.id + post.createdAt}>
                  <Post
                    post={post}
                    handleCheckbox={handleCheckbox}
                    checkboxGroup={checkboxGroup}
                    setRerender={setRerender}
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

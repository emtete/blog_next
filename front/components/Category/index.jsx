import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import CategoryAll from "./CategoryAll";
import CategoryOne from "./CategoryOne";
import CategoryInclude from "./CategoryInclude";
import CategoryAddBtn from "./CategoryAddBtn";
import CategoryAddComp from "./CategoryAddComp";
import CategoryWrap from "./CategoryWrap";
import CategoryModal from "./CategoryModal";

const getIsArray = (e) => {
  return Array.isArray(e) && e.length > 0;
};

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

const getNode = (treeData, indexPath, idArr) => {
  // const clone = deepCopy(treeData);
  const result = [];

  idArr.map((id) => {
    if (indexPath[id].length === 1) {
      const path = indexPath[id][0];
      const node = deepCopy(treeData[path]);
      delete node.children;
      result.push(node);
    } //
    else if (indexPath[id].length === 2) {
      const path1 = indexPath[id][0];
      const path2 = indexPath[id][1];
      const node = deepCopy(treeData[path1].children[path2]);
      // delete node.children;
      result.push(node);
    }
  });

  return result;
};

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "#f3f5f7",
  },
}));

const Category = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const me = useSelector((state) => state.user.me);
  const treeData = useSelector((state) => state.category.treeData);
  const treeHelper = useSelector((state) => state.category.treeHelper);
  const isMoveMode = useSelector((state) => state.category.isMoveMode);
  const newComponent = useSelector((state) => state.category.newComponent);

  const appended = useSelector((state) => state.category.appendedCategories);
  const updated = useSelector((state) => state.category.updatedCategories);
  const deleted = useSelector((state) => state.category.deletedCategories);

  const applyLoading = useSelector((state) => state.category.applyLoading);
  const applyDone = useSelector((state) => state.category.applyDone);
  const applyError = useSelector((state) => state.category.applyError);

  const getListLoading = useSelector((state) => state.category.getListLoading);
  const getListDone = useSelector((state) => state.category.getListDone);
  const getListError = useSelector((state) => state.category.getListError);

  const onClickSave = useCallback(
    (e) => {
      const data = {};

      const appendedNode = getNode(treeData, treeHelper.indexPath, appended);
      const updatedNode = getNode(treeData, treeHelper.indexPath, updated);
      const deletedNode = getNode(treeData, treeHelper.indexPath, deleted);

      if (getIsArray(appended)) data["appended"] = appendedNode;
      if (getIsArray(updated)) data["updated"] = updatedNode;
      if (getIsArray(deleted)) data["deleted"] = deletedNode;
      data["userId"] = me.id;

      if (Object.keys(data).length > 0) {
        dispatch({ type: "APPLY_CATEGORY_REQUEST", data });
      } else {
        alert("변경사항이 없습니다.");
      }
    },
    [appended, updated, deleted]
  );

  //
  useEffect(() => {
    dispatch({ type: "GET_CATEGORY_LIST_REQUEST" });
  }, []);

  // 변경사항 적용 성공.
  useEffect(() => {
    if (applyDone) {
      alert("적용되었습니다.");
      dispatch({ type: "APPLY_CATEGORY_RESET" });
      dispatch({ type: "GET_CATEGORY_LIST_REQUEST" });
    }
  }, [applyDone]);

  // 변경사항 적용 중 에러
  useEffect(() => {
    if (applyError) {
      alert(applyError);
      dispatch({ type: "APPLY_CATEGORY_RESET" });
    }
  }, [applyError]);

  // 카테고리 리스트 호출 성공.
  useEffect(() => {
    if (getListDone) {
      dispatch({ type: "GET_CATEGORY_LIST_RESET" });
      dispatch({ type: "RESET_INDEX_PATH_ACTION" });
    }
  }, [getListDone]);

  // 카테고리 리스트 호출 중 에러.
  useEffect(() => {
    if (getListError) {
      alert(getListError);
      dispatch({ type: "GET_CATEGORY_LIST_RESET" });
    }
  }, [getListError]);

  console.log("Category Index rendering");
  return (
    <main className={classes.content}>
      <div id='mArticle'>
        <div className='blog_category'>
          <h3 className='tit_cont'>카테고리 관리</h3>
          <div className='wrap_set'>
            <strong className='tit_set'>
              카테고리 순서를 변경하고 주제 연결을 설정할 수 있습니다.
            </strong>
            <p className='desc_info'>
              드래그 앤 드롭으로 카테고리 순서를 변경할 수 있습니다.
            </p>
            <div className='bundle_group'>
              <span className='count_total'>3 / 500</span>
              <label className='lab_btn btn_group'>전체 펼치기</label>
              <label className='lab_btn btn_group'>전체 접기</label>
            </div>
            <div className='set_order' id='category-app'>
              <div className='wrap_order'>
                <div className='list_order'>
                  <CategoryAll />

                  {treeData.map((data) => (
                    <CategoryInclude key={data.title + data.id} data={data} />
                  ))}
                </div>

                <CategoryAddBtn />
              </div>
            </div>
            <div className='set_btn'>
              <button type='button' className='btn_save' onClick={onClickSave}>
                변경사항 저장
              </button>
            </div>
          </div>
        </div>

        {isMoveMode && <CategoryModal />}
      </div>
    </main>
  );
};

export default Category;

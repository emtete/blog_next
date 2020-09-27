import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useRouter } from "next/router";
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
    console.log("id : ", id);
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
    // padding: theme.spacing(3),
    paddingTop: "48px",
    paddingLeft: "30px",
    paddingRight: "30px",
    backgroundColor: "#f3f5f7",
  },
}));

const Category = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const { me, treeData, treeHelper, isMoveMode, newComponent } = useSelector(
    (state) => ({
      me: state.user.me,
      treeData: state.category.treeData,
      treeHelper: state.category.treeHelper,
      isMoveMode: state.category.isMoveMode,
      newComponent: state.category.newComponent,
    }),
    (prev, next) => {
      return (
        prev.me === next.me &&
        prev.treeData === next.treeData &&
        prev.treeHelper === next.treeHelper &&
        prev.isMoveMode === next.isMoveMode &&
        prev.newComponent === next.newComponent
      );
    }
  );

  const { appended, updated, deleted } = useSelector(
    (state) => ({
      appended: state.category.appendedCategories,
      updated: state.category.updatedCategories,
      deleted: state.category.deletedCategories,
    }),
    (prev, next) => {
      return (
        prev.appended === next.appended &&
        prev.updated === next.updated &&
        prev.deleted === next.deleted
      );
    }
  );

  const { applyLoading, applyDone, applyError } = useSelector(
    (state) => ({
      applyLoading: state.category.applyLoading,
      applyDone: state.category.applyDone,
      applyError: state.category.applyError,
    }),
    (prev, next) => {
      return (
        prev.applyLoading === next.applyLoading &&
        prev.applyDone === next.applyDone &&
        prev.applyError === next.applyError
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

  const { getListLoading, getListDone, getListError } = useSelector(
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

  // 카테고리 목록 호출
  useEffect(() => {
    if (me) {
      dispatch({ type: "GET_CATEGORY_LIST_REQUEST" });
    }
  }, [me]);

  useEffect(() => {
    // 변경사항 적용 성공.
    if (applyDone) {
      alert("적용되었습니다.");
      dispatch({ type: "APPLY_CATEGORY_RESET" });
      dispatch({ type: "GET_CATEGORY_LIST_REQUEST" });
      dispatch({ type: "RESET_CATEGORY_MANAGER_ACTION" });
    }
    // 변경사항 적용 중 에러
    if (applyError) {
      alert(applyError);
      dispatch({ type: "APPLY_CATEGORY_RESET" });
    }
  }, [applyDone, applyError]);

  useEffect(() => {
    // 카테고리 리스트 호출 성공.
    if (getListDone) {
      dispatch({ type: "GET_CATEGORY_LIST_RESET" });
      dispatch({ type: "RESET_INDEX_PATH_ACTION" });
    }
    // 카테고리 리스트 호출 중 에러.
    if (getListError) {
      alert(getListError);
      dispatch({ type: "GET_CATEGORY_LIST_RESET" });
    }
  }, [getListDone, getListError]);

  const onClickSave = useCallback(
    (e) => {
      const data = {};

      const appendedNode = getNode(treeData, treeHelper.indexPath, appended);
      const updatedNode = getNode(treeData, treeHelper.indexPath, updated);
      // const deletedNode = getNode(treeData, treeHelper.indexPath, deleted);

      if (getIsArray(appended)) data["appended"] = appendedNode;
      if (getIsArray(updated)) data["updated"] = updatedNode;
      if (getIsArray(deleted)) data["deleted"] = deleted;

      if (Object.keys(data).length > 0) {
        data["userId"] = me.id;
        dispatch({ type: "APPLY_CATEGORY_REQUEST", data });
      } else {
        alert("변경사항이 없습니다.");
      }
    },
    [appended, updated, deleted]
  );

  const onClickOpen = useCallback(
    (e) => {
      dispatch({ type: "OPEN_ALL_CATEGORY_ACTION" });
    },
    [treeData]
  );

  const onClickClose = useCallback(
    (e) => {
      dispatch({ type: "CLOSE_ALL_CATEGORY_ACTION" });
    },
    [treeData]
  );

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
              <label className='lab_btn btn_group' onClick={onClickOpen}>
                전체 펼치기
              </label>
              <label className='lab_btn btn_group' onClick={onClickClose}>
                전체 접기
              </label>
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

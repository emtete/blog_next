import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CategorySub from "./CategorySub";
import CategoryAddComp from "./CategoryAddComp";
import {
  toggleIsMoveModeAction,
  setSelectedNodeAction,
  deleteNodeAction,
  setUpdateModeAction,
} from "../../reducers/category";

const inline = { display: "inline" };

const CategoryInclude = ({ data }) => {
  const title = data.title;
  const entries = data.entries;
  const children = data.children;
  const id = data.id;

  const dispatch = useDispatch();
  const bundelRef = useRef();
  const itemOrderRef = useRef();
  const itemRef = useRef();

  const { categoryInEditMode } = useSelector((state) => state.category);
  const isEditMode = categoryInEditMode.findIndex((eid) => eid === id) !== -1;
  const isChildren = Array.isArray(children) && children.length > 0;

  const onClickDel = () => {
    dispatch(deleteNodeAction({ id }));
  };

  useEffect(() => {
    if (isEditMode) {
      itemOrderRef.current.classList.add("item_edit");
    } //
    else {
      itemOrderRef.current.classList.remove("item_edit");
    }
  }, [categoryInEditMode]);

  const onClickUpdate = () => {
    dispatch(setUpdateModeAction({ id, isEditMode: true }));
  };

  const onClickMove = () => {
    dispatch(toggleIsMoveModeAction({ isMoveMode: true }));
    dispatch(setSelectedNodeAction({ selectedNode: data }));
  };

  const onClickArrow = () => {
    bundelRef.current.classList.toggle("open_subcate");
  };

  return (
    <div className='bundle_item' ref={bundelRef}>
      <div className='item_order' ref={itemOrderRef}>
        <label className={`lab_btn lab_cate ${isChildren && "lab_fold"}`}>
          <span className='wrap_arr'>
            <span className='ico_blog'></span>
          </span>
          <input
            type='button'
            className='btn_g'
            value='open sub category'
            onClick={onClickArrow}
          ></input>
        </label>
        {!isEditMode && (
          <div className='basic_item' ref={itemRef}>
            <div className='wrap_drag'>
              <span className='ico_blog ico_drag'></span>
            </div>
            <div style={inline}>
              <div className='wrap_name'>
                <div className='txt_name'>{title}</div>
                <div className='txt_count'>({entries})</div>
              </div>
              <div className='info_btn'>
                {/* <span className='btn_post'>추가</span> */}
                <span className='btn_post' onClick={onClickUpdate}>
                  수정
                </span>
                <span className='btn_post' onClick={onClickMove}>
                  이동
                </span>
                <span className='btn_post disabled' onClick={onClickDel}>
                  삭제
                </span>
              </div>
            </div>
          </div>
        )}
        <CategoryAddComp data={data} />
      </div>
      <div className='list_sub'>
        {isChildren &&
          children.map((child) => (
            <CategorySub key={child.title + child.entries} data={child} />
          ))}
      </div>
    </div>
  );
};

export default CategoryInclude;

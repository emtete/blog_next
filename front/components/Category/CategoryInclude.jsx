import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CategorySub from "./CategorySub";
import CategoryAddComp from "./CategoryAddComp";

const inline = { display: "inline" };

const CategoryInclude = ({ data }) => {
  const title = data.title;
  const entries = data.entries;
  const children = data.children;
  const id = data.id;
  const isOpened = data.isOpened;
  const isCard = data.isCard;

  const dispatch = useDispatch();
  const bundelRef = useRef();
  const itemOrderRef = useRef();
  const itemRef = useRef();

  const { categoryInEditMode } = useSelector((state) => state.category);
  const isEditMode = categoryInEditMode.findIndex((eid) => eid === id) !== -1;
  const isChildren = Array.isArray(children) && children.length > 0;

  useEffect(() => {
    if (isEditMode) {
      itemOrderRef.current.classList.add("item_edit");
    } //
    else {
      itemOrderRef.current.classList.remove("item_edit");
    }
  }, [categoryInEditMode]);

  const onClickCard = (e) => {
    const isCard = !e.target.classList.toggle("disabled");
    dispatch({ type: "TOGGLE_IS_CARD_ACTION", data: { id, isCard } });
  };

  const onClickDel = () => {
    dispatch({ type: "DELETE_NODE_ACTION", data: { id } });
  };

  const onClickUpdate = () => {
    dispatch({
      type: "SET_UPDATE_MODE_ACTION",
      data: { id, isEditMode: true },
    });
  };

  const onClickMove = () => {
    dispatch({
      type: "TOGGLE_IS_MOVE_MODE_ACTION",
      data: { isMoveMode: true },
    });
    dispatch({
      type: "SET_SELECTED_NODE_ACTION",
      data: { selectedNode: data },
    });
  };

  const onClickArrow = () => {
    if (isOpened) {
      dispatch({
        type: "CLOSE_ONE_CATEGORY_ACTION",
        data: { id },
      });
    } else {
      dispatch({
        type: "OPEN_ONE_CATEGORY_ACTION",
        data: { id },
      });
    }
  };

  console.log("CategoryInclude Rendering");
  return (
    <div
      className={`bundle_item ${isOpened && "open_subcate"}`}
      ref={bundelRef}
    >
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
                <span
                  className={`btn_post ${!isCard && "disabled"}`}
                  onClick={onClickCard}
                >
                  카드
                </span>
                <span className='btn_post' onClick={onClickUpdate}>
                  수정
                </span>
                <span className='btn_post' onClick={onClickMove}>
                  이동
                </span>
                <span className='btn_post' onClick={onClickDel}>
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

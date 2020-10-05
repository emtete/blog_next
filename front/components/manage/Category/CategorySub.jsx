import { useRef, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import CategoryAddComp from "./CategoryAddComp";

const CategorySub = ({ data }) => {
  const id = data.id;
  const title = data.title;
  const entries = data.entries;
  const isCard = data.isCard;

  const dispatch = useDispatch();
  const itemOrderRef = useRef();

  const { categoryInEditMode } = useSelector((state) => state.category);
  const isEditMode = categoryInEditMode.findIndex((eid) => eid === id) !== -1;

  useEffect(() => {
    if (isEditMode) {
      itemOrderRef.current.classList.add("item_edit");
    } //
    else {
      itemOrderRef.current.classList.remove("item_edit");
    }
  }, [categoryInEditMode]);

  const onClickCard = useCallback(
    (e) => {
      const isCard = !e.target.classList.toggle("disabled");
      dispatch({ type: "TOGGLE_IS_CARD_ACTION", data: { id, isCard } });
    },
    [id]
  );

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

  const onClickDel = () => {
    dispatch({ type: "DELETE_NODE_ACTION", data: { id } });
  };

  return (
    <div className='bundle_item open_subcate'>
      <div className='item_order' ref={itemOrderRef}>
        {!isEditMode && (
          <div className='basic_item'>
            <div className='wrap_drag'>
              <span className='ico_blog ico_drag'></span>
            </div>
            <div style={{ display: "inline" }}>
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
    </div>
  );
};

export default CategorySub;

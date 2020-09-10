import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import CategoryAddComp from "./CategoryAddComp";
import {
  toggleIsMoveModeAction,
  setSelectedNodeAction,
} from "../../reducers/category";

const CategorySub = ({ data }) => {
  const title = data.title;
  const entries = data.entries;

  const dispatch = useDispatch();
  const itemOrderRef = useRef();
  const [visibleBasicItem, setVisibleBasicItem] = useState(true);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const onClickUpdate = () => {
    itemOrderRef.current.classList.toggle("item_edit");
    setVisibleBasicItem((prev) => !prev);
    setIsUpdateMode((prev) => !prev);
  };

  const onClickMove = () => {
    dispatch(toggleIsMoveModeAction({ isMoveMode: true }));
    dispatch(setSelectedNodeAction({ selectedNode: data }));
  };

  return (
    <div className='bundle_item open_subcate'>
      <div className='item_order' ref={itemOrderRef}>
        {visibleBasicItem && (
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
                {/* <span className='btn_post'>추가</span> */}
                <span className='btn_post' onClick={onClickUpdate}>
                  수정
                </span>
                <span className='btn_post' onClick={onClickMove}>
                  이동
                </span>
                <span className='btn_post'>삭제</span>
              </div>
            </div>
          </div>
        )}

        <CategoryAddComp
          onClickUpdate={onClickUpdate}
          data={data}
          isUpdateMode={isUpdateMode}
        />
      </div>
    </div>
  );
};

export default CategorySub;

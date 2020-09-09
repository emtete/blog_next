import { useRef, useState } from "react";

import CategoryAddComp from "./CategoryAddComp";

const CategorySub = ({ data }) => {
  const title = data.title;
  const entries = data.entries;

  const itemOrderRef = useRef();
  const [visibleBasicItem, setVisibleBasicItem] = useState(true);

  const onClickUpdate = () => {
    itemOrderRef.current.classList.toggle("item_edit");
    setVisibleBasicItem((prev) => !prev);
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
                <span className='btn_post'>추가</span>
                <span className='btn_post' onClick={onClickUpdate}>
                  수정
                </span>
                <span className='btn_post'>삭제</span>
              </div>
            </div>
          </div>
        )}

        <CategoryAddComp onClickUpdate={onClickUpdate} data={data} />
      </div>
    </div>
  );
};

export default CategorySub;

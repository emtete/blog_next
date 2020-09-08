import { useRef } from "react";

import CategorySub from "./CategorySub";

const CategoryInclude = ({ title, numberOfContents, children }) => {
  const bundelRef = useRef();
  const listSubRef = useRef();

  const onClickArw = (e) => {
    bundelRef.current.classList.toggle("open_subcate");
  };

  return (
    <div className='bundle_item open_subcate' ref={bundelRef}>
      <div className='item_order'>
        <label className='lab_btn lab_cate lab_fold'>
          <span className='wrap_arr'>
            <span className='ico_blog'></span>
          </span>
          <input
            type='button'
            className='btn_g'
            value='open sub category'
            onClick={onClickArw}
          ></input>
        </label>
        <div className='basic_item'>
          <div className='wrap_drag'>
            <span className='ico_blog ico_drag'></span>
          </div>
          <div style={{ display: "inline" }}>
            <div className='wrap_name'>
              <div className='txt_name'>{title}</div>
              <div className='txt_count'>({numberOfContents})</div>
            </div>
            <div className='info_btn'>
              <span className='btn_post'>추가</span>
              <span className='btn_post'>수정</span>
              <span className='btn_post disabled'>삭제</span>
            </div>
          </div>
        </div>
      </div>
      <div className='list_sub' ref={listSubRef}>
        {children.map((child) => (
          <CategorySub
            key={child.title + child.numberOfContents}
            title={child.title}
            numberOfContents={child.numberOfContents}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryInclude;

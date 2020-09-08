import { useRef, useState } from "react";
import { useSelector } from "react-redux";

import CategorySub from "./CategorySub";
import CategoryAddComp from "./CategoryAddComp";

const CategoryInclude = ({ title, entries, children, data }) => {
  const bundelRef = useRef();
  const itemOrderRef = useRef();
  const itemRef = useRef();
  const [visibleBasicItem, setVisibleBasicItem] = useState(true);
  const { treeData } = useSelector((state) => state.category);
  const isChildren = Array.isArray(children) && children.length > 0;

  const onClickUpdate = () => {
    itemOrderRef.current.classList.toggle("item_edit");
    setVisibleBasicItem((prev) => !prev);
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

        {visibleBasicItem && (
          <div className='basic_item' ref={itemRef}>
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
                <span className='btn_post disabled'>삭제</span>
              </div>
            </div>
          </div>
        )}
        <CategoryAddComp onClickUpdate={onClickUpdate} data={data} />
      </div>
      <div className='list_sub'>
        {isChildren &&
          children.map((child) => (
            <CategorySub
              key={child.title + child.entries}
              title={child.title}
              entries={child.entries}
              data={child}
            />
          ))}
      </div>
    </div>
  );
};

export default CategoryInclude;

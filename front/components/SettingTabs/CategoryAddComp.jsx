import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  appendChildToRootAction,
  updateCategoryNameAction,
} from "../../reducers/category";

const CategoryAddComp = ({ onClickUpdate, data, isUpdateMode }) => {
  const submitBtnRef = useRef();
  const textRef = useRef();
  const dispatch = useDispatch();

  isUpdateMode && textRef.current.focus();

  const onChangeText = (e) => {
    if (e.target.value.length > 0) {
      submitBtnRef.current.disabled = "";
      submitBtnRef.current.classList.remove("btn_off");
    } else {
      submitBtnRef.current.disabled = "disabled";
      submitBtnRef.current.classList.add("btn_off");
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (data) {
      dispatch(
        updateCategoryNameAction({
          title: textRef.current.value,
          priority: data.priority,
          parent: data.parent,
        })
      );
    } else {
      dispatch(appendChildToRootAction({ title: textRef.current.value }));
    }
  };

  return (
    <form className='edit_item' onSubmit={onSubmitForm}>
      <label className='lab_tf'>
        <strong className='screen_out'>카테고리 Label</strong>
        <input
          ref={textRef}
          type='text'
          className='tf_blog'
          maxLength='40'
          // value='tf_blog'
          onChange={onChangeText}
        />
      </label>

      <div className='order_btn'>
        <button type='reset' className='btn_cancel' onClick={onClickUpdate}>
          취소
        </button>
        <button
          ref={submitBtnRef}
          type='submit'
          disabled='disabled'
          className='btn_default btn_off'
        >
          확인
        </button>
      </div>
    </form>
  );
};

export default CategoryAddComp;

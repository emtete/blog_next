import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  updateCategoryNameAction,
  setUpdateModeAction,
  deleteNodeAction,
} from "../../reducers/category";

const CategoryAddComp = ({ data }) => {
  const id = data.id;

  const submitBtnRef = useRef();
  const textRef = useRef();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  // const { categoryInEditMode } = useSelector((state) => state.category);
  // const editLength = categoryInEditMode.length;
  // const isFocus = categoryInEditMode[editLength - 1] === id;

  // useEffect(() => {
  //   console.log(textRef.current.focus());
  //   textRef.current.focus();
  // if (isFocus) {
  // }
  // }, [textRef.current, categoryInEditMode]);

  const onClickCancel = () => {
    if (data.title === "") {
      dispatch(deleteNodeAction({ id }));
    } else {
      dispatch(setUpdateModeAction({ id, isEditMode: false }));
    }
  };

  const onChangeText = (e) => {
    setTitle(e.target.value);
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
    dispatch(
      updateCategoryNameAction({
        id,
        title,
      })
    );
    dispatch(setUpdateModeAction({ id, isEditMode: false }));
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
          value={title}
          onChange={onChangeText}
          autoFocus={true}
        />
      </label>

      <div className='order_btn'>
        <button type='reset' className='btn_cancel' onClick={onClickCancel}>
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

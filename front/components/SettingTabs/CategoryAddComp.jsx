import { useRef } from "react";

const CategoryAddComp = () => {
  const submitBtnRef = useRef();
  const onChangeText = (e) => {
    if (e.target.value.length > 0) {
      submitBtnRef.current.disabled = "";
      submitBtnRef.current.classList.remove("btn_off");
    } else {
      submitBtnRef.current.disabled = "disabled";
      submitBtnRef.current.classList.add("btn_off");
    }
  };

  // const onSubmitForm = () => {

  // }
  return (
    <div className='bundle_item open_subcate'>
      <div className='item_order item_edit'>
        <label className='lab_btn lab_cate'>
          <span className='wrap_arr'>
            <span className='ico_blog'></span>
          </span>
          <input type='button' className='btn_g' value='open sub category' />
        </label>
        <form
          className='edit_item'
          // onSubmit={onSubmitForm}
        >
          <label className='lab_tf'>
            <strong className='screen_out'>카테고리 Label</strong>
            <input
              type='text'
              className='tf_blog'
              maxLength='40'
              // value='tf_blog'
              onChange={onChangeText}
            />
          </label>

          <div className='order_btn'>
            <button type='reset' className='btn_cancel'>
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
      </div>
    </div>
  );
};

export default CategoryAddComp;

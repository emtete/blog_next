const CategoryAddComp = () => {
  return (
    <div className='bundle_item open_subcate'>
      <div className='item_order item_edit'>
        <label class='lab_btn lab_cate'>
          <span class='wrap_arr'>
            <span class='ico_blog'></span>
          </span>
          <input type='button' class='btn_g' value='open sub category' />
        </label>
        <form className='edit_item'>
          <label class='lab_tf'>
            <strong class='screen_out'>카테고리 Label</strong>
            <input type='text' class='tf_blog' maxlength='40' value='' />
          </label>

          <div class='order_btn'>
            <button type='reset' class='btn_cancel'>
              취소
            </button>
            <button type='submit' disabled='' class='btn_default btn_off'>
              확인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryAddComp;

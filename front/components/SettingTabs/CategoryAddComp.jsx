const CategoryAddComp = () => {
  return (
    <div className='bundle_item open_subcate'>
      <div className='item_order item_edit'>
        <label className='lab_btn lab_cate'>
          <span className='wrap_arr'>
            <span className='ico_blog'></span>
          </span>
          <input type='button' className='btn_g' value='open sub category' />
        </label>
        <form className='edit_item'>
          <label className='lab_tf'>
            <strong className='screen_out'>카테고리 Label</strong>
            <input
              type='text'
              className='tf_blog'
              maxLength='40'
              // value='tf_blog'
            />
          </label>

          <div className='order_btn'>
            <button type='reset' className='btn_cancel'>
              취소
            </button>
            <button type='submit' disabled='' className='btn_default btn_off'>
              확인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryAddComp;

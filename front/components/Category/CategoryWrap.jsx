const CategoryWrap = ({ children }) => {
  return (
    <div className='bundle_item open_subcate'>
      <div className='item_order item_edit'>
        <label className='lab_btn lab_cate'>
          <span className='wrap_arr'>
            <span className='ico_blog'></span>
          </span>
          <input type='button' className='btn_g' value='open sub category' />
        </label>
        {children}
      </div>
    </div>
  );
};

export default CategoryWrap;

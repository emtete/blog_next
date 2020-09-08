const CategorySub = ({ title, numberOfContents }) => {
  return (
    <div className='bundle_item open_subcate'>
      <div className='item_order'>
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
              <span className='btn_post'>삭제</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySub;

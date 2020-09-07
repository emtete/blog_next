const CategoryInclude = () => {
  return (
    <div className='bundle_item open_subcate'>
      <div className='item_order'>
        <label className='lab_btn lab_cate lab_fold'>
          <span className='wrap_arr'>
            <span className='ico_blog'></span>
          </span>
          <input type='button' class='btn_g' value='open sub category'></input>
        </label>
        <div className='basic_item'>
          <div className='wrap_drag'>
            <span className='ico_blog ico_drag'></span>
          </div>
          <div style={{ display: "inline" }}>
            <div className='wrap_name'>
              <div className='txt_name'>프로그래밍</div>
              <div className='txt_count'>(11)</div>
            </div>
            <div className='info_btn'>
              <span className='btn_post'>추가</span>
              <span className='btn_post'>수정</span>
              <span className='btn_post disabled'>삭제</span>
            </div>
          </div>
        </div>
      </div>
      <div className='list_sub'>
        <div className='bundle_item open_subcate'>
          <div className='item_order'>
            <div className='basic_item'>
              <div className='wrap_drag'>
                <span className='ico_blog ico_drag'></span>
              </div>
              <div style={{ display: "inline" }}>
                <div className='wrap_name'>
                  <div className='txt_name'>test</div>
                  <div className='txt_count'>(0)</div>
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
      </div>
    </div>
  );
};

export default CategoryInclude;

import { useSelector } from "react-redux";

const CategorySelect = ({ identifier }) => {
  const { treeData } = useSelector((state) => state.category);

  return (
    <div className='item_set item_sub'>
      상위
      <div
        className='opt_set opt_category'
        // ref={optRef1}
      >
        <button type='button' className='btn_opt'>
          <span
            className='txt_ellip'
            // ref={txtRef1}
          >
            선택되지 않음
          </span>
          <span className='ico_blog ico_open'></span>
        </button>
        <div className='layer_opt'>
          <label className='lab_set on'>
            <input
              type='radio'
              className='inp_set'
              value=''
              // onClick={onClickRadio}
            />
            <span className='txt_set txt_ellip'>선택되지 않음</span>
          </label>

          {treeData.map((node) => (
            <label key={node.id + node.title} className='lab_set'>
              <input
                type='radio'
                className='inp_set'
                value={node.id}
                // onClick={onClickRadio}
              />
              <span className='txt_set txt_ellip'>{node.title}</span>
            </label>
          ))}

          <button type='button' className='btn_close'>
            <span className='ico_blog'></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelect;

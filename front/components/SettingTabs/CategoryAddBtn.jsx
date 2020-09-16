import { useDispatch } from "react-redux";
import debounce from "lodash/debounce";

// import { createNewComponentAction } from "../../reducers/category";

const CategoryAddBtn = () => {
  const dispatch = useDispatch();

  const onClickAddBtn = () => {
    // dispatch(createNewComponentAction());
    dispatch({ type: "CREATE_NEW_COMPONENT_ACTION" });
  };

  const clickAddBtnThrottled = debounce(onClickAddBtn, 250);

  return (
    <div className='wrap_add'>
      <label className='lab_btn lab_add' onClick={clickAddBtnThrottled}>
        <span className='ico_blog ico_add'></span>
        카테고리 추가
        <input type='button' className='btn_g' value='카테고리 추가'></input>
      </label>
    </div>
  );
};

export default CategoryAddBtn;

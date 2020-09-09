import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  toggleIsMoveModeAction,
  setSelectedNodeAction,
} from "../../reducers/category";

const CategoryModal = () => {
  const dispatch = useDispatch();
  const { node } = useSelector((state) => state.category);

  const onClickCancel = () => {
    dispatch(toggleIsMoveModeAction({ isMoveMode: false }));
    dispatch(setSelectedNodeAction({ node: {} }));
  };

  const clickEvent = (e) => {
    if (e.target.className === "container_layer") onClickCancel();
  };

  useEffect(() => {
    document.addEventListener("click", clickEvent);
    return () => {
      document.removeEventListener("click", clickEvent);
    };
  }, []);

  return (
    <div className='container_layer'>
      <div
        className='blog_layer'
        style={{
          position: "fixed",
          top: "50%",
          marginTop: "-227px",
          zIndex: 10,
        }}
      >
        <div className='inner_blog_layer inner_blog_layer5'>
          <form>
            <div className='cont_layer'>
              <strong className='tit_popup'>'{node.title}' 이동</strong>
              <p className='txt_popup'>
                카테고리를 옮길 기준이 되는 카테고리를 선택하세요.
              </p>
              <div className='wrap_set'>
                <div className='item_set item_sub'>
                  <div className='opt_set opt_category'>
                    <button type='button' className='btn_opt'>
                      <span className='txt_ellip'>선택되지 않음</span>
                      <span className='ico_blog ico_open'></span>
                    </button>
                    <div className='layer_opt'>
                      <label className='lab_set on'>
                        <input type='radio' className='inp_set' value='' />
                        <span className='txt_set txt_ellip'>선택되지 않음</span>
                      </label>

                      <label className='lab_set'>
                        <input type='radio' className='inp_set' value='' />
                        <span className='txt_set txt_ellip'>개발일지</span>
                      </label>

                      <label className='lab_set'>
                        <input type='radio' className='inp_set' value='' />
                        <span className='txt_set txt_ellip'>ttt</span>
                      </label>

                      <button type='button' className='btn_close'>
                        <span className='ico_blog'></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className='radio_blog radio_cate'>
                <label className='lab_set'>
                  <input
                    type='radio'
                    name='moveCate'
                    className='inp_set'
                    disabled=''
                  />
                  <span className='txt_set'>
                    <span className='ico_addcate ico_addcate1'></span>
                    선택한 카테고리 위로 카테고리를 옮깁니다.
                  </span>
                </label>

                <label className='lab_set'>
                  <input
                    type='radio'
                    name='moveCate'
                    className='inp_set'
                    disabled=''
                  />
                  <span className='txt_set'>
                    <span className='ico_addcate ico_addcate2'></span>
                    선택한 카테고리 아래로 카테고리를 옮깁니다.
                  </span>
                </label>
              </div>
            </div>
            <div className='fld_btn'>
              <button
                type='reset'
                className='btn_cancel'
                onClick={onClickCancel}
              >
                취소
              </button>
              <button type='submit' className='btn_default btn_off' disabled=''>
                확인
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;

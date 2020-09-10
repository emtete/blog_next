import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  toggleIsMoveModeAction,
  setSelectedNodeAction,
} from "../../reducers/category";
import CategorySelect from "./CategorySelect";

const CategoryModal = () => {
  const optRef1 = useRef();
  const optRef2 = useRef();
  const txtRef1 = useRef();

  const dispatch = useDispatch();
  const { selectedNode, treeData } = useSelector((state) => state.category);
  const haveChildren =
    Array.isArray(selectedNode.children) && selectedNode.children.length > 0;

  const onClickCancel = () => {
    dispatch(toggleIsMoveModeAction({ isMoveMode: false }));
    dispatch(setSelectedNodeAction({ selectedNode: null }));
  };

  // 모달 바깥 클릭시, 창 닫기
  const clickOutSideEvent = (e) => {
    if (e.target.className === "container_layer") onClickCancel();
  };

  useEffect(() => {
    document.addEventListener("click", clickOutSideEvent);

    return () => {
      document.removeEventListener("click", clickOutSideEvent);
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
              <strong className='tit_popup'>'{selectedNode.title}' 이동</strong>
              <p className='txt_popup'>
                카테고리를 옮길 기준이 되는 카테고리를 선택하세요.
              </p>
              <div className='wrap_set'>
                {/*  */}
                <div className='item_set item_sub'>
                  상위
                  <select name='abc1' className='opt_category'>
                    <option value>선택되지 않음</option>
                    {treeData.map((node) => (
                      <option value={node.id}>{node.title}</option>
                    ))}
                  </select>
                </div>

                {!haveChildren && (
                  <div className='item_set item_sub'>
                    하위
                    {/* opt_set */}
                    <select name='abc2' className='opt_category'>
                      <option value>선택되지 않음</option>
                      {treeData.map((node) => (
                        <option value={node.id}>{node.title}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className='radio_blog radio_cate'>
                <label className='lab_set'>
                  <input
                    type='radio'
                    name='moveCate'
                    className='inp_set'
                    // disabled={true}
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

                {!haveChildren && (
                  <label className='lab_set'>
                    <input
                      type='radio'
                      name='moveCate'
                      className='inp_set'
                      disabled=''
                    />
                    <span className='txt_set'>
                      <span className='ico_addcate ico_addcate3'></span>
                      선택한 카테고리의 하위 카테고리로 옮깁니다.
                    </span>
                  </label>
                )}
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

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  toggleIsMoveModeAction,
  setSelectedNodeAction,
} from "../../reducers/category";
import CategorySelect from "./CategorySelect";

// 두번째 셀렉트 박스의 컨텐츠를 가져온다.
const getSelectContents2 = (treeData, upperId, modalId) => {
  for (let i = 0; i < treeData.length; i++) {
    if (upperId == treeData[i].id) {
      // 모달 띄울 때, 선택된 노드는 제외시킨다.
      if (treeData[i.children]) {
        const index = treeData[i].children.findIndex((e) => e.id == modalId);
        treeData[i].children.splice(index, 1);
      }
      return treeData[i].children;
    }
  }
};

// 자식노드가 있는지 여부를 반환한다.
// node만 넣을 수도 있고 id로 확인하려 한다면
// node 에 null을 넣고 2,3번째 args를 넣는다.
const getHaveChildren = (node, treeNode, id) => {
  let targetNode;

  if (node) {
    targetNode = node;
  } else if (id) {
    const targetIndex = treeNode.findIndex((n) => n.id == id);
    if (targetIndex !== -1) {
      targetNode = treeNode[targetIndex];
    }
  }

  return Array.isArray(targetNode.children) && targetNode.children.length > 0;
};

const CategoryModal = () => {
  const [selectContents2, setSelectContents2] = useState();
  const [disabledSelect2, setDisabledSelect2] = useState(true);
  const [disabledRadio1, setDisabledRadio1] = useState(true);
  const [disabledRadio2, setDisabledRadio2] = useState(true);
  const [disabledRadio3, setDisabledRadio3] = useState(true);

  const dispatch = useDispatch();
  const { selectedNode, treeData } = useSelector((state) => state.category);
  const haveChildren = getHaveChildren(selectedNode);

  const onChangeSelect1 = (e) => {
    if (e.target.value !== "") {
      setDisabledRadio1(false);
      setDisabledRadio2(false);
      setDisabledRadio3(false);

      const selectedHaveChildren = getHaveChildren(
        null,
        treeData,
        e.target.value
      );
      setDisabledSelect2(!selectedHaveChildren);
      setSelectContents2(
        getSelectContents2(treeData, e.target.value, selectedNode.id)
      );
    } else {
      setDisabledRadio1(true);
      setDisabledRadio2(true);
      setDisabledRadio3(true);

      setDisabledSelect2(true);
      setSelectContents2(undefined);
    }
  };

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
                  <select
                    name='abc1'
                    className='opt_category'
                    onChange={onChangeSelect1}
                  >
                    <option value=''>선택되지 않음</option>
                    {treeData.map((node) => (
                      <option key={node.id + node.title} value={node.id}>
                        {node.title}
                      </option>
                    ))}
                  </select>
                </div>

                {!haveChildren && (
                  <div className='item_set item_sub'>
                    하위
                    {/* opt_set */}
                    <select
                      name='abc2'
                      className='opt_category'
                      disabled={disabledSelect2}
                    >
                      <option value>선택되지 않음</option>
                      {selectContents2 &&
                        selectContents2.map((node) => (
                          <option key={node.id + node.title} value={node.id}>
                            {node.title}
                          </option>
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
                    disabled={disabledRadio1}
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
                    disabled={disabledRadio2}
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
                      disabled={disabledRadio3}
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

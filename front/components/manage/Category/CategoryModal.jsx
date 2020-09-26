import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CategorySelect from "./CategorySelect";

// 두번째 셀렉트 박스의 컨텐츠를 가져온다.
const getSelectContents2 = (treeDataCopied, upperId) => {
  for (let i = 0; i < treeDataCopied.length; i++) {
    if (upperId == treeDataCopied[i].id) {
      return treeDataCopied[i].children;
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

// 모달 띄울 때, 선택된 노드를 제외시키다.
const excludeOwnNode = (treeData, modalNode) => {
  if (modalNode.depth == 1) {
    const index = treeData.findIndex((e) => e.id == modalNode.id);
    treeData.splice(index, 1);
  } //
  else if (modalNode.depth == 2) {
    const parentIndex = treeData.findIndex((e) => e.id === modalNode.parent);
    treeData[parentIndex].children.splice(modalNode.priority, 1);
  }
};

const getParent = (id, treeData, indexPath) => {
  const path = indexPath[id];
  let parentId;

  if (path.length === 1) {
    parentId = treeData[path[0]].parent;
  } else if (path.length === 2) {
    parentId = treeData[path[0]].children[path[1]].parent;
  }
  return parentId;
};

const CategoryModal = () => {
  // const selectRef1 = useRef();
  const [selectContents2, setSelectContents2] = useState();
  const [disabledSelect2, setDisabledSelect2] = useState(true);

  const [selectValue1, setSelectValue1] = useState();
  const [selectValue2, setSelectValue2] = useState();

  const [disabledRadio1, setDisabledRadio1] = useState(true);
  const [disabledRadio2, setDisabledRadio2] = useState(true);
  const [disabledRadio3, setDisabledRadio3] = useState(true);
  const [selectedRadio, setSelectedRadio] = useState();
  const [radioGroup, setRadioGroup] = useState({
    radio1: false,
    radio2: false,
    radio3: false,
  });

  const dispatch = useDispatch();
  const { selectedNode, treeData, treeHelper } = useSelector(
    (state) => state.category
  );
  const modalNode = selectedNode;
  const haveChildren = getHaveChildren(modalNode);

  // deep copy
  const treeDataCopied = JSON.parse(JSON.stringify(treeData));

  // 모달 띄울 때, 선택된 노드를 제외시키다.
  excludeOwnNode(treeDataCopied, modalNode);

  const onChangeSelect1 = (e) => {
    const id = e.target.value;
    const selectedPriority = parseInt(treeHelper.indexPath[id][0]);
    const modalNodePriority = parseInt(modalNode.priority);
    const isModalNodeDepth1 = 0 == modalNode.parent; // modalNode의 depth가 1인지의 여부
    const isMoveInSameCategory = id == modalNode.parent; // 같은 폴더에서의 이동인지 여부
    // getParent(id, treeDataCopied, treeHelper.indexPath) == modalNode.parent; // 같은 폴더에서의 이동인지 여부
    setSelectValue1(id);

    // 선택되지 않음 선택시
    if (id === "") {
      setDisabledRadio1(true);
      setDisabledRadio2(true);
      setDisabledRadio3(true);
      changeAllRadioToFalse();

      setDisabledSelect2(true);
      setSelectContents2(undefined);
    } // 선택되지 않음 이외의 값 선택시
    else {
      // 같은 카테고리에서의 이동이 아니라면
      if (!isMoveInSameCategory) {
        // if (id != modalNode.parent) {
        setDisabledRadio3(false);
      } else {
        setDisabledRadio3(true);
      }
      // 위 두 경우는 modalNode와 selectedNode가 서로 인접한 경우.
      if (isModalNodeDepth1 && modalNodePriority === selectedPriority - 1) {
        setDisabledRadio1(true);
        setDisabledRadio2(false);
      } //
      else if (
        isModalNodeDepth1 &&
        modalNodePriority === selectedPriority + 1
      ) {
        setDisabledRadio1(false);
        setDisabledRadio2(true);
      } //
      else {
        setDisabledRadio1(false);
        setDisabledRadio2(false);
      }

      const selectedHaveChildren = getHaveChildren(null, treeDataCopied, id);
      setDisabledSelect2(!selectedHaveChildren);
      setSelectContents2(getSelectContents2(treeDataCopied, id, modalNode.id));
    }
  };

  const onChangeSelect2 = (e) => {
    const id = e.target.value;
    const selectedPriority = parseInt(treeHelper.indexPath[id][1]);
    const modalNodePriority = parseInt(modalNode.priority);
    const isEqModalAndSelectedParent = selectValue1 == modalNode.parent; // modalNode와 selectedNode의 parent가 같은지의 여부
    const isMoveInSameCategory =
      getParent(id, treeDataCopied, treeHelper.indexPath) == modalNode.parent; // 같은 폴더에서의 이동인지 여부
    setSelectValue2(id);

    // 선택되지 않음 선택시
    if (id === "") {
      // 같은 카테고리에서의 이동이 아니라면
      if (!isMoveInSameCategory) {
        setDisabledRadio3(false);
      }
    } // 선택되지 않음 이외의 값 선택시
    else {
      setDisabledRadio3(true);

      // 위 두 경우는 modalNode와 selectedNode가 서로 인접한 경우.
      if (
        isEqModalAndSelectedParent &&
        modalNodePriority === selectedPriority - 1
      ) {
        setDisabledRadio1(true);
        setDisabledRadio2(false);
      } //
      else if (
        isEqModalAndSelectedParent &&
        modalNodePriority === selectedPriority + 1
      ) {
        setDisabledRadio1(false);
        setDisabledRadio2(true);
      } //
      else {
        setDisabledRadio1(false);
        setDisabledRadio2(false);
      }
    }
  };

  const onChangeRadio = (e) => {
    let obj = {};

    for (let key in radioGroup) {
      if (e.target.value == key) {
        obj[key] = true;
        setSelectedRadio(key);
      } else {
        obj[key] = false;
      }
    }
    setRadioGroup({ ...obj });
  };

  const changeAllRadioToFalse = () => {
    let obj = {};

    for (let key in radioGroup) {
      obj[key] = false;
    }

    setRadioGroup({ ...obj });
    setSelectedRadio(undefined);
  };

  const onClickCancel = () => {
    dispatch({
      type: "TOGGLE_IS_MOVE_MODE_ACTION",
      data: { isMoveMode: false },
    });
    dispatch({
      type: "SET_SELECTED_NODE_ACTION",
      data: { selectedNode: null },
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    const selectedId = selectValue2 ? selectValue2 : selectValue1;
    const selectedIndex = [...treeHelper.indexPath[selectedId]];
    const isMoveInSameCategory =
      getParent(selectedId, treeDataCopied, treeHelper.indexPath) ==
      modalNode.parent; // 같은 폴더에서의 이동인지 여부
    let targetIndex;

    switch (selectedRadio) {
      // 같은 parent 내에서 이동시
      // 현재보다 아래로 이동시 targetIndex - 1 해야한다.
      // 자기 자신을 먼저 삭제한 후 이동하기 때문이다.
      // 그렇게 계산하지 말고, 일단 삭제한 후 targetIndex를 구한다면 괜찮을 것 같다.??

      case "radio1": // 삭제 후 append 후 같은 depth의 priority 수정
        targetIndex =
          selectedIndex.length === 1
            ? [selectedIndex[0]]
            : [selectedIndex[0], selectedIndex[1]];
        break;

      case "radio2":
        targetIndex =
          selectedIndex.length === 1
            ? [selectedIndex[0] + 1]
            : [selectedIndex[0], selectedIndex[1] + 1];
        break;

      case "radio3": // 삭제 후 마지막(targetIndex)에 append..
        const children = treeDataCopied[selectedIndex].children;
        targetIndex = [
          selectedIndex[0],
          children ? children[children.length - 1].priority + 1 : 0,
        ];
        break;
    }
    dispatch({
      type: "SPLICE_NODE_ACTION",
      data: { targetIndex },
    });
    onClickCancel();
  };

  // 모달 바깥 클릭시, 창 닫기
  const clickOutSideEvent = (e) => {
    if (e.target.className === "container_layer") onClickCancel();
  };

  // 이벤트 바인딩
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
          <form onSubmit={onSubmitForm}>
            <div className='cont_layer'>
              <strong className='tit_popup'>'{modalNode.title}' 이동</strong>
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
                    // ref={selectRef1}
                    value={selectValue1}
                  >
                    <option value=''>선택되지 않음</option>
                    {treeDataCopied.map((node) => (
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
                      onChange={onChangeSelect2}
                      value={selectValue2}
                    >
                      <option value=''>선택되지 않음</option>
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
                    onClick={onChangeRadio}
                    value='radio1'
                    checked={radioGroup["radio1"]}
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
                    onClick={onChangeRadio}
                    value='radio2'
                    checked={radioGroup["radio2"]}
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
                      onClick={onChangeRadio}
                      value='radio3'
                      checked={radioGroup["radio3"]}
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
              <button
                type='submit'
                className={`btn_default ${!selectedRadio && "btn_off"}`}
                disabled={!selectedRadio}
              >
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

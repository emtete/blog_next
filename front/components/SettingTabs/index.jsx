import React, { Component, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import debounce from "lodash/debounce";

import MenuIcon from "@material-ui/icons/Menu";

import CategoryAll from "./CategoryAll";
import CategoryOne from "./CategoryOne";
import CategoryInclude from "./CategoryInclude";
import CategoryAddBtn from "./CategoryAddBtn";
import CategoryAddComp from "./CategoryAddComp";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "#f3f5f7",
  },
}));

const SettingTabs = () => {
  const classes = useStyles();
  const listOrderRef = useRef();
  const { treeData } = useSelector((state) => state.category);
  // const [treeData, setTreeData] = useState(initData);

  const [newData, setNewData] = useState([{}]);
  const [categoryAddCompArr, setCategoryAddCompArr] = useState([]);

  const onClickAddBtn = () => {
    setCategoryAddCompArr([...categoryAddCompArr, { title: "" }]);
  };

  const clickAddBtnThrottled = debounce(onClickAddBtn, 250);

  return (
    <main className={classes.content}>
      <div id='mArticle'>
        <div className='blog_category'>
          <h3 className='tit_category'>카테고리 관리</h3>
          <div className='wrap_set'>
            <strong className='tit_set'>
              카테고리 순서를 변경하고 주제 연결을 설정할 수 있습니다.
            </strong>
            <p className='desc_info'>
              드래그 앤 드롭으로 카테고리 순서를 변경할 수 있습니다.
            </p>
            <div className='bundle_group'>
              <span className='count_total'>3 / 500</span>
              <label className='lab_btn btn_group'>전체 펼치기</label>
              <label className='lab_btn btn_group'>전체 접기</label>
            </div>
            <div className='set_order' id='category-app'>
              <div className='wrap_order'>
                <div className='list_order' ref={listOrderRef}>
                  <CategoryAll />

                  {treeData.map((data) =>
                    Array.isArray(data.children) && data.children.length > 0 ? (
                      <CategoryInclude
                        key={data.title + data.numberOfContents}
                        title={data.title}
                        numberOfContents={data.numberOfContents}
                        children={data.children}
                      />
                    ) : (
                      <CategoryOne
                        key={data.title + data.numberOfContents}
                        title={data.title}
                        numberOfContents={data.numberOfContents}
                      />
                    )
                  )}
                  {/* <CategoryAddComp /> */}
                  {categoryAddCompArr.length > 0 &&
                    categoryAddCompArr.map((e, i) => (
                      <CategoryAddComp
                        key={i}
                        // treeData={treeData}
                        // setTreeData={setTreeData}
                      />
                    ))}
                </div>

                <CategoryAddBtn clickAddBtnThrottled={clickAddBtnThrottled} />
              </div>
            </div>
            <div className='set_btn'>
              <button type='button' className='btn_save'>
                변경사항 저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingTabs;

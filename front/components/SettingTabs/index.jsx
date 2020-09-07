import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "#f3f5f7",
  },
}));

const SettingTabs = () => {
  const classes = useStyles();

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
                <div className='list_order'>
                  <div className='bundle_item'>
                    <div className='item_order'>
                      <div className='basic_item'>
                        <div className='wrap_drag wrap_all'>
                          <span className='ico_blog ico_drag ico_all'></span>
                        </div>
                        <div className='txt_name'>분류 전체보기</div>
                        <div className='info_btn'>
                          <span className='btn_post'>추가</span>
                          <span className='btn_post'>수정</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='bundle_item'>
                    <div className='item_order'>
                      <label className='lab_btn lab_cate'>
                        <span className='wrap_arr'>
                          <span className='ico_blog'></span>
                        </span>
                        {/* <input
                          type='button'
                          class='btn_g'
                          value='open sub category'
                        ></input> */}
                      </label>
                      <div className='basic_item'>
                        <div className='wrap_drag'>
                          <span className='ico_blog ico_drag'></span>
                        </div>
                        <div style={{ display: "inline" }}>
                          <div className='wrap_name'>
                            <div className='txt_name'>개발일지</div>
                            <div className='txt_count'>(4)</div>
                          </div>
                          <div className='info_btn'>
                            <span className='btn_post'>추가</span>
                            <span className='btn_post'>수정</span>
                            <span className='btn_post disabled'>삭제</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='bundle_item open_subcate'>
                    <div className='item_order'>
                      <label className='lab_btn lab_cate lab_fold'>
                        <span className='wrap_arr'>
                          <span className='ico_blog'></span>
                        </span>
                        {/* <input
                          type='button'
                          class='btn_g'
                          value='open sub category'
                        ></input> */}
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
                </div>
                <div className='wrap_add'>
                  <label className='lab_btn lab_add'>
                    <span className='ico_blog ico_add'></span>
                    카테고리 추가
                    <input
                      type='button'
                      class='btn_g'
                      value='카테고리 추가'
                    ></input>
                  </label>
                </div>
              </div>
            </div>
            <div class='set_btn'>
              <button type='button' class='btn_save'>
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

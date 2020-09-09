import { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import CategoryAll from "./CategoryAll";
import CategoryOne from "./CategoryOne";
import CategoryInclude from "./CategoryInclude";
import CategoryAddBtn from "./CategoryAddBtn";
import CategoryAddComp from "./CategoryAddComp";
import CategoryWrap from "./CategoryWrap";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "#f3f5f7",
  },
}));

const SettingTabs = () => {
  const classes = useStyles();
  const { treeData, newComponent } = useSelector((state) => state.category);

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
                  <CategoryAll />

                  {treeData.map((data) => (
                    <CategoryInclude
                      key={data.title + data.entries}
                      data={data}
                    />
                  ))}

                  {Array.isArray(newComponent) &&
                    newComponent.length > 0 &&
                    newComponent.map((e, i) => (
                      <CategoryWrap key={i} children={<CategoryAddComp />} />
                    ))}
                </div>

                <CategoryAddBtn />
              </div>
            </div>
            <div className='set_btn'>
              <button type='button' className='btn_save'>
                변경사항 저장
              </button>
            </div>
          </div>
        </div>
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
                  <strong class='tit_popup'>'프로그래밍111' 이동</strong>
                  <p class='txt_popup'>
                    카테고리를 옮길 기준이 되는 카테고리를 선택하세요.
                  </p>
                  <div className='wrap_set'>
                    <div className='item_set item_sub'>
                      <div className='opt_set opt_category'>
                        <button type='button' class='btn_opt'>
                          <span class='txt_ellip'>선택되지 않음</span>
                          <span class='ico_blog ico_open'></span>
                        </button>
                        <div className='layer_opt'>
                          <label class='lab_set on'>
                            <input type='radio' class='inp_set' value='' />
                            <span class='txt_set txt_ellip'>선택되지 않음</span>
                          </label>

                          <label class='lab_set'>
                            <input type='radio' class='inp_set' value='' />
                            <span class='txt_set txt_ellip'>개발일지</span>
                          </label>

                          <label class='lab_set'>
                            <input type='radio' class='inp_set' value='' />
                            <span class='txt_set txt_ellip'>ttt</span>
                          </label>

                          <button type='button' class='btn_close'>
                            <span class='ico_blog'></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='radio_blog radio_cate'>
                    <label class='lab_set'>
                      <input
                        type='radio'
                        name='moveCate'
                        class='inp_set'
                        disabled=''
                      />
                      <span class='txt_set'>
                        <span class='ico_addcate ico_addcate1'></span>
                        선택한 카테고리 위로 카테고리를 옮깁니다.
                      </span>
                    </label>

                    <label class='lab_set'>
                      <input
                        type='radio'
                        name='moveCate'
                        class='inp_set'
                        disabled=''
                      />
                      <span class='txt_set'>
                        <span class='ico_addcate ico_addcate2'></span>
                        선택한 카테고리 아래로 카테고리를 옮깁니다.
                      </span>
                    </label>
                  </div>
                </div>
                {/*  */}
                <div class='fld_btn'>
                  <button type='reset' class='btn_cancel'>
                    취소
                  </button>
                  <button type='submit' class='btn_default btn_off' disabled=''>
                    확인
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingTabs;

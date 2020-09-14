import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "#f3f5f7",
  },
}));

const PostManage = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div id='mArticle'>
        <div className='inner_article contents_article'>
          <h3 className='tit_cont'>
            글 관리
            <span className='txt_count'> 15</span>
            {/* <a //href='/manage/post/?returnURL=/manage/posts'
              class='link_write'
            >
              글 쓰기<span class='ico_blog'></span>
            </a> */}
          </h3>
          <div className='wrap_search'>
            <div className='check_blog'>
              <input type='checkbox' id='inpAllCheck' className='inp_check' />
              <label htmlFor='inpAllCheck' className='ico_blog ico_checkbox'>
                선택 됨
              </label>
            </div>
          </div>
          <div className='wrap_list'>
            <ul className='list_post list_post_type2'>
              <li>
                <div className='check_blog'>
                  <input
                    type='checkbox'
                    id='inpCheck36'
                    className='inp_check'
                  />
                  <label for='inpCheck36' className='ico_blog ico_checkbox'>
                    선택 안됨
                  </label>
                </div>
                <div className='post_cont'>
                  <strong className='tit_post tit_ellip'>
                    <a
                      // href='https://emtete.tistory.com/36'
                      title='material-ui, CSS Baseline api'
                      className='link_cont'
                      target='_blank'
                    >
                      material-ui, CSS Baseline api
                    </a>
                  </strong>
                  <a //href='/manage/posts?category=758257'
                  >
                    <span className='txt_cate txt_ellip'>프로그래밍</span>
                  </a>
                  <span className='txt_info txt_ellip'>victor_77</span>
                  <span className='txt_info'>2020-09-03 14:00</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};
export default PostManage;

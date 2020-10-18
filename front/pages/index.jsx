// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/router";
import Head from "next/head";
// import AppLayout from "../components/AppLayout";

// const getIsArray = (element) => {
//   return Array.isArray(element) && element.length > 0;
// };

const Home = () => {
  // const router = useRouter();
  // const treeData = useSelector((state) => state.category.treeData);

  // useEffect(() => {
  //   if (treeData[0] && !getIsArray(treeData[0].children)) {
  //     router.push(
  //       `/${treeData[0].isCard ? "cards" : "posts"}?categoryId=${
  //         treeData[0].id
  //       }&categoryName=${treeData[0].title}`
  //     );
  //   } else if (treeData[0] && getIsArray(treeData[0].children)) {
  //     router.push(
  //       `/${treeData[0].children[0].isCard ? "cards" : "posts"}?categoryId=${
  //         treeData[0].children[0].id
  //       }&categoryName=${treeData[0].children[0].title}`
  //     );
  //   }
  // }, [treeData]);

  // return <AppLayout></AppLayout>;
  return (
    <>
      <Head>
        <title>DEV LIFE</title>
        <meta name='description' content={"웹 개발 블로그입니다."} />
        <meta property='og:title' content={"DEV LIFE"} />
        <meta property='og:description' content={"웹 개발 블로그입니다."} />
        <meta property='og:image' content={"https://i.imgur.com/OCGRjWh.png"} />
        <meta property='og:url' content={"https://dev-life.kr"} />
      </Head>
    </>
  );
};

export default Home;

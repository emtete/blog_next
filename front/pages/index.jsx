import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import AppLayout from "../components/AppLayout";

const getIsArray = (element) => {
  return Array.isArray(element) && element.length > 0;
};

const Home = () => {
  const router = useRouter();
  const treeData = useSelector((state) => state.category.treeData);

  useEffect(() => {
    if (treeData[0] && !getIsArray(treeData[0].children)) {
      router.push(
        `/${treeData[0].isCard ? "cards" : "posts"}?categoryId=${
          treeData[0].id
        }&categoryName=${treeData[0].title}`
      );
    } else if (treeData[0] && getIsArray(treeData[0].children)) {
      router.push(
        `/${treeData[0].children[0].isCard ? "cards" : "posts"}?categoryId=${
          treeData[0].children[0].id
        }&categoryName=${treeData[0].children[0].title}`
      );
    }
  }, [treeData]);

  // return <AppLayout></AppLayout>;
  return <></>;
};

export default Home;

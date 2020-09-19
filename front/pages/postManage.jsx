import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import PostManage from "../components/PostManage";

const postManage = () => {
  const me = useSelector((state) => state.user.me);
  const router = useRouter();

  useEffect(() => {
    if (!me) {
      router.push("/");
    }
  }, [me]);

  return <PostManage></PostManage>;
};

export default postManage;

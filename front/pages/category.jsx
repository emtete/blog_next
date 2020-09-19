import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import Category from "../components/Category";

const category = () => {
  const me = useSelector((state) => state.user.me);
  const router = useRouter();

  useEffect(() => {
    if (!me) {
      router.push("/");
    }
  }, [me]);
  return <Category></Category>;
};

export default category;

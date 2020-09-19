import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import Wyzywig from "../components/wyzywig";

const Board = () => {
  const me = useSelector((state) => state.user.me);
  const router = useRouter();

  useEffect(() => {
    if (!me) {
      router.push("/");
    }
  }, [me]);
  return <Wyzywig />;
};

export default Board;

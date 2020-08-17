import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dependency Component
import AppLayout from "../components/AppLayout";
import Wyzywig from "../components/wyzywig";

const Board = () => {
  // const [Wyzysig, setWyzysig] = useState();
  // useEffect(() => {
  //   setWyzysig(import("../components/Wyzywig"));
  // });
  return <AppLayout>{Wyzywig ? <Wyzywig /> : <div>loading</div>}</AppLayout>;
};

export default Board;

import "jquery";
import dynamic from "next/dynamic";
// import ReactSummernoteLite from "@easylogic/react-summernote";
const ReactSummernoteLite = dynamic(
  () => import("@easylogic/react-summernote").then((mod) => mod.Editor),
  { ssr: false }
);

// Dependency Component
import AppLayout from "../components/AppLayout";

const Board = () => {
  return (
    <AppLayout>
      <ReactSummernoteLite
        id='sample'
        initInvoke={(invoke) => {
          invoke(
            "pasteHTML",
            '<span style="font-size:30px">Hello, world for 30px</span>'
          );
        }}
      />
    </AppLayout>
  );
};

export default Board;

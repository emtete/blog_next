import "jquery";
import ReactSummernoteLite from "@easylogic/react-summernote";

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

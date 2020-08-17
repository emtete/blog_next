import AppLayout from "../components/AppLayout";
import WysiwygEditor from "../components/WysiwygEditor";

const Board = () => {
  return (
    <AppLayout>
      <WysiwygEditor onChange={(value) => console.log(value)} />
    </AppLayout>
  );
};

export default Board;

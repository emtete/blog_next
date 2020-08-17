import { useState, useEffect, useRef } from "react";

import AppLayout from "../components/AppLayout";

const Board = () => {
  const [value, setValue] = useState();
  const ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;

  const handleEditor = (value) => {
    setValue(value);
  };

  return (
    <AppLayout>
      <div>Board</div>
      <ReactQuill value={value} onChange={handleEditor} theme={"snow"} />
    </AppLayout>
  );
};

export default Board;

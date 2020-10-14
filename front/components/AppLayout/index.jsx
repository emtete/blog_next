import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import UserPage from "./UserPage";
import ManagerPage from "./ManagerPage";

const AppLayout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const [isManage, setIsManage] = useState(false);
  const treeData = useSelector((state) => state.category.treeData);

  const isAdminMode = useSelector((state) => state.user.isAdminMode);

  React.useEffect(() => {
    // setIsManage(router.pathname.split("/")[1] === "manage");
    if (router.pathname.split("/")[1] === "manage") {
      dispatch({ type: "START_ADMIN_MODE_ACTION" });
    } else {
      dispatch({ type: "END_ADMIN_MODE_ACTION" });
    }
  }, [router.pathname]);

  return (
    <>
      {isAdminMode ? (
        <ManagerPage>{children}</ManagerPage>
      ) : (
        <UserPage treeData={treeData}>{children}</UserPage>
      )}
    </>
  );
};

export default AppLayout;

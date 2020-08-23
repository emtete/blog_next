import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@material-ui/core/Modal";
import { FormControl, TextField, Button } from "@material-ui/core";

import { menuStyles } from "./layout/styles";
import {
  closeLoginModalAction,
  openedLoginModalAction,
} from "../reducers/modal";
import { modalStyles, getModalStyle } from "./layout/LoginStyles";
import useInput from "../hooks/useInput";

const LoginModal = () => {
  const classes = menuStyles();
  const modalClasses = modalStyles();
  const dispatch = useDispatch();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  // const open = false;
  const openProcess = useSelector((state) => state.modal.isLoginModalOpenning);
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  if (openProcess) {
    console.log("shit...inside");
    setOpen(true);
    dispatch(openedLoginModalAction());
  } else {
    return <div></div>;
  }
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  console.log("shit");

  const handleClose = () => {
    // setOpen(false);
    dispatch(closeLoginModalAction());
    setOpen(false);
  };

  // const handleHandle = () => {
  //   if (isLoggedIn) {
  //     dispatch(logoutAction());
  //   } else {
  //     handleOpen();
  //   }
  // };

  const onSubmitForm = () => {
    dispatch(loginAction());
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div style={modalStyle} className={modalClasses.paper}>
          <h2 id='simple-modal-title'>로그인</h2>
          <form
            onSubmit={onSubmitForm}
            className={classes.root}
            noValidate
            autoComplete='off'
          >
            <FormControl>
              <TextField id='id' label='id' onChange={onChangeId} />
              <TextField id='id' label='password' onChange={onChangePassword} />
              <br />
              <Button variant='contained' color='primary' type='submit'>
                로그인
              </Button>
            </FormControl>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;

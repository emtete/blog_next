import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import AppLayout from "../components/AppLayout";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function LoginModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id='simple-modal-title'>Text in a modal</h2>
      <p id='simple-modal-description'>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      {/* <LoginModal /> */}
    </div>
  );

  return (
    <AppLayout>
      <div>
        <button type='button' onClick={handleOpen}>
          Open Modal
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
        >
          {body}
        </Modal>
      </div>
    </AppLayout>
  );
}

// import { TextField, FormControl } from "@material-ui/core";
// import PersonIcon from "@material-ui/icons/Person";
// import Grid from "@material-ui/core/Grid";
// import styled from "styled-components";

// import AppLayout from "../components/AppLayout";
// import { useStyles } from "../components/AppLayout";

// const Login = () => {
//   const classes = useStyles();

//   return <AppLayout></AppLayout>;
// };

// export default Login;
{
  /* 
  const WrapperForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
  
  <WrapperForm>
        <form className={classes.root} noValidate autoComplete='off'>
          <FormControl>
            <TextField id='id' label='id' />
            <TextField id='password' label='password' />
          </FormControl>
        </form>
      </WrapperForm> */
}

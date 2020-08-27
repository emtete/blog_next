import { makeStyles } from "@material-ui/core/styles";

export function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
}

export const modalStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

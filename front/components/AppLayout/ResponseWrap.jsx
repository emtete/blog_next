import Hidden from "@material-ui/core/Hidden";

const ResponseWrap = ({ children, size }) => {
  return (
    <>
      {size === "xsDown" && (
        <Hidden xsDown implementation='css'>
          {children}
        </Hidden>
      )}
      {size === "smUp" && (
        <Hidden smUp implementation='css'>
          {children}
        </Hidden>
      )}
    </>
  );
};

export default ResponseWrap;

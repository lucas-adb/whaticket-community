import React, { useContext } from "react";

import { Card, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TicketHeaderSkeleton from "../TicketHeaderSkeleton";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import { useHistory } from "react-router-dom";
import { ColorModeContext } from "../../context/ColorMode/ColorModeContext";

const useStyles = makeStyles((theme) => ({
  ticketHeader: {
    display: "flex",
    // backgroundColor: "#111",
    flex: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },
  },
}));

// const useStyles = makeStyles((theme) => ({
//   ticketHeader: (props) => ({
//     display: "flex",
//     backgroundColor: props.mode === "dark" ? "#111" : "#fff",
//     flex: "none",
//     borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
//     [theme.breakpoints.down("sm")]: {
//       flexWrap: "wrap",
//     },
//   }),
// }));

const TicketHeader = ({ loading, children }) => {
  // const { colorMode } = useContext(ColorModeContext);
  // const classes = useStyles({ colorMode });
  const classes = useStyles();
  const history = useHistory();
  const handleBack = () => {
    history.push("/tickets");
  };

  return (
    <>
      {loading ? (
        <TicketHeaderSkeleton />
      ) : (
        <Card square className={classes.ticketHeader}>
          <Button color="primary" onClick={handleBack}>
            <ArrowBackIos />
          </Button>
          {children}
        </Card>
      )}
    </>
  );
};

export default TicketHeader;

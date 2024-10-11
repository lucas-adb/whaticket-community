import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import useTickets from "../../hooks/useTickets";
import { AuthContext } from "../../context/Auth/AuthContext";
import { i18n } from "../../translate/i18n";
import Chart from "./Chart";
import BasicDatePicker from "../../components/BasicDatePicker";
import api from "../../services/api";
import toastError from "../../errors/toastError";
import { WhatsAppsContext } from "../../context/WhatsApp/WhatsAppsContext";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  fixedHeightPaper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 240,
  },
  customFixedHeightPaper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 120,
  },
  customFixedHeightPaperLg: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "100%",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  // const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedWhatsApp, setSelectedWhatsApp] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("/users/");
        setUsers(data.users);
      } catch (err) {
        toastError(err);
      }
    };
    fetchUsers();
  }, []);

  const { whatsApps, loading } = useContext(WhatsAppsContext);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleConnectionChange = (event) => {
    setSelectedWhatsApp(event.target.value);
  };

  var userQueueIds = [];
  if (user.queues && user.queues.length > 0) {
    userQueueIds = user.queues.map((q) => q.id);
  }

  const GetTickets = (status, showAll, withUnreadMessages) => {
    const { count } = useTickets({
      status: status,
      showAll: showAll,
      withUnreadMessages: withUnreadMessages,
      queueIds: JSON.stringify(userQueueIds),
    });
    return count;
  };

  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.customFixedHeightPaper} style={{ overflow: "hidden" }}>
              <Typography component="h3" variant="h6" color="primary" paragraph>
                {i18n.t("dashboard.messages.inAttendance.title")}
              </Typography>
              <Grid item>
                <Typography component="h1" variant="h4">
                  {GetTickets("open", "true", "false")}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.customFixedHeightPaper} style={{ overflow: "hidden" }}>
              <Typography component="h3" variant="h6" color="primary" paragraph>
                {i18n.t("dashboard.messages.waiting.title")}
              </Typography>
              <Grid item>
                <Typography component="h1" variant="h4">
                  {GetTickets("pending", "true", "false")}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.customFixedHeightPaper} style={{ overflow: "hidden" }}>
              <Typography component="h3" variant="h6" color="primary" paragraph>
                {i18n.t("dashboard.messages.closed.title")}
              </Typography>
              <Grid item>
                <Typography component="h1" variant="h4">
                  {GetTickets("closed", "true", "false")}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.fixedHeightPaper}>
              <Chart selectedDate={selectedDate} selectedUser={selectedUser} selectedConnection={selectedWhatsApp} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.fixedHeightPaper}>
              <BasicDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
              <Select value={selectedUser} onChange={handleUserChange} displayEmpty fullWidth>
                <MenuItem value="">
                  Selecione um usuário
                </MenuItem>
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
              <Select value={selectedWhatsApp} onChange={handleConnectionChange} displayEmpty fullWidth>
                <MenuItem value="">
                  Selecione uma conexão
                </MenuItem>
                {whatsApps.map((wpp) => (
                  <MenuItem key={wpp.id} value={wpp.id}>
                    {wpp.name}
                  </MenuItem>
                ))}
              </Select>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
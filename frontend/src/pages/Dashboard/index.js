import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";

import useTickets from "../../hooks/useTickets";
import { AuthContext } from "../../context/Auth/AuthContext";
import { i18n } from "../../translate/i18n";
import Chart from "./Chart";
import CustomPieChart from "../../components/PieChart";
// import BasicDatePicker from "../../components/BasicDatePicker";
import api from "../../services/api";
import toastError from "../../errors/toastError";
import { WhatsAppsContext } from "../../context/WhatsApp/WhatsAppsContext";
// import { set } from "date-fns";
// import { InputLabel } from "@material-ui/core";
import { FilterForm } from "../../components/FilterForm";

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
    // height: 240,
    height: 360,
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
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedWhatsApp, setSelectedWhatsApp] = useState("");
  const [queues, setQueues] = useState([]);
  const [selectedQueue, setSelectedQueue] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState("");

  const { tickets } = useTickets({ date: selectedDate });

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

  useEffect(() => {
    const fetchQueues = async () => {
      try {
        const { data } = await api.get("/queue");
        setQueues(data);
      } catch (err) {
        toastError(err);
      }
    };
    fetchQueues();
  }, []);

  const { whatsApps } = useContext(WhatsAppsContext);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleConnectionChange = (event) => {
    setSelectedWhatsApp(event.target.value);
  };

  const handleQueueChange = (event) => {
    setSelectedQueue(event.target.value);
  };

  const handleContactChange = (event) => {
    setSelectedContact(event.target.value);
  };

  var userQueueIds = [];
  if (user.queues && user.queues.length > 0) {
    userQueueIds = user.queues.map((q) => q.id);
  }

  const GetTickets = (status, showAll, withUnreadMessages, date) => {
    const { count } = useTickets({
      status: status,
      showAll: showAll,
      withUnreadMessages: withUnreadMessages,
      queueIds: JSON.stringify(userQueueIds),
      date: date,
    });
    return count;
  };

  const getTicketsContact = (tickets) => {
    const contacts = [];
    tickets.forEach((ticket) => {
      if (ticket.contact) {
        contacts.push(ticket.contact);
      }
    });
    console.log("contacts", contacts);
    setContacts(contacts);
  };

  useEffect(() => {
    if (tickets.length > 0) {
      getTicketsContact(tickets);
    }
  }, [tickets]);

  const pieChartData = [
    { name: "Em Atendimento", value: GetTickets("open", "true", "false") },
    { name: "Aguardando", value: GetTickets("pending", "true", "false") },
    { name: "Finalizados", value: GetTickets("closed", "true", "false") },
  ];

  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper
              className={classes.customFixedHeightPaper}
              style={{ overflow: "hidden" }}
            >
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
            <Paper
              className={classes.customFixedHeightPaper}
              style={{ overflow: "hidden" }}
            >
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
            <Paper
              className={classes.customFixedHeightPaper}
              style={{ overflow: "hidden" }}
            >
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
              <CustomPieChart data={pieChartData} />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.fixedHeightPaper}>
              <Chart
                tickets={tickets}
                selectedDate={selectedDate}
                selectedUser={selectedUser}
                selectedConnection={selectedWhatsApp}
                selectedQueue={selectedQueue}
                selectedContact={selectedContact}
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <FilterForm
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedUser={selectedUser}
              handleUserChange={handleUserChange}
              users={users}
              selectedWhatsApp={selectedWhatsApp}
              handleConnectionChange={handleConnectionChange}
              whatsApps={whatsApps}
              selectedQueue={selectedQueue}
              handleQueueChange={handleQueueChange}
              queues={queues}
              selectedContact={selectedContact}
              handleContactChange={handleContactChange}
              contacts={contacts}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;

{
  /* <Grid item xs={4}>
            <Paper
              className={classes.customFixedHeightPaper}
              style={{ overflow: "hidden" }}
            >
              <Typography component="h3" variant="h6" color="primary" paragraph>
                Total de Tickets
              </Typography>
              <Grid item>
                <Typography component="h1" variant="h4">
                  {GetTickets()}
                </Typography>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper
              className={classes.customFixedHeightPaper}
              style={{ overflow: "hidden" }}
            >
              <Typography component="h3" variant="h6" color="primary" paragraph>
                Tickets criados no dia
              </Typography>
              <Grid item>
                <Typography component="h1" variant="h4">
                  {GetTickets("", "", "", selectedDate)}
                </Typography>
              </Grid>
            </Paper>
          </Grid> */
}

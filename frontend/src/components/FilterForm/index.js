import React from "react";
import { FilterFormSelect } from "../FilterFormSelect";
import { Input } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   labelStatic: {
//     position: "static",
//     transform: "none",
//   },
// }));

export function FilterForm({
  selectedUser,
  handleUserChange,
  users,
  selectedWhatsApp,
  handleConnectionChange,
  whatsApps,
  selectedQueue,
  handleQueueChange,
  queues,
  selectedContact,
  handleContactChange,
  contacts,
}) {
  // const classes = useStyles();

  if (!users || !whatsApps || !queues || !contacts) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Input type="date" />
      <FilterFormSelect
        id="user-select"
        label="Usuário"
        selectedValue={selectedUser}
        handleValueChange={handleUserChange}
        options={users}
      />
      <FilterFormSelect
        id="connection-select"
        label="Conexão"
        selectedValue={selectedWhatsApp}
        handleValueChange={handleConnectionChange}
        options={whatsApps}
      />
      <FilterFormSelect
        id="queue-select"
        label="Fila"
        selectedValue={selectedQueue}
        handleValueChange={handleQueueChange}
        options={queues}
      />
      <FilterFormSelect
        id="contact-select"
        label="Contato"
        selectedValue={selectedContact}
        handleValueChange={handleContactChange}
        options={contacts}
      />
    </>
  );
}

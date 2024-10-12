import React from "react";
import { FilterFormSelect } from "../FilterFormSelect";
import { Box, Input, Typography } from "@material-ui/core";
import BasicDatePicker from "../BasicDatePicker";

export function FilterForm({
  selectedDate,
  setSelectedDate,
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
  if (!users || !whatsApps || !queues || !contacts) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Typography component="h3" variant="h6" color="primary">
        Filtros
      </Typography>
      <Box sx={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <BasicDatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
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
      </Box>
    </>
  );
}

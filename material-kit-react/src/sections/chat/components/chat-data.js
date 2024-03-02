import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { Card, InputAdornment, OutlinedInput, Typography, SvgIcon, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getClient } from "src/api/apiClients";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import UpdateClientModal from "src/sections/clients/modal-client";
import CreateClientModal from "src/sections/clients/modal-cliente-register";
import CreateLeadModal from "src/sections/clients/modal-lead-create";
import { getLead } from "src/api/apiLeads";
import SeeNoteModal from "src/sections/clients/modal-see-note";

export const ChatData = ({
  setVisibleArea,
  visibleArea,
  imgUser,
  nameUser,
  chatActive,
  session,
}) => {
  const handleAreaRead = () => {
    setVisibleArea(!visibleArea);
  };

  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState(
    parsePhoneNumberFromString("573009139769")
  );

  const [client, setClient] = useState([]);
  const [lead, setLead] = useState(null);

  const fetchClient = async () => {
    try {
      const response = await getClient(chatActive);
      //console.log(response);
      if (response.success) {
        setClient(response.body);
      } else {
        setClient([]);
        const responseLead = await getLead(chatActive);
        //console.log(responseLead);
        if (responseLead.success) {
          setLead(responseLead.body);
        } else {
          setLead(null);
        }
      }
    } catch (error) {
      toast.error("Error en el servidor.");
    }
  };

  useEffect(() => {
    if (chatActive != "") {
      fetchClient();
    }
    setFormattedPhoneNumber(parsePhoneNumberFromString("+" + chatActive));
  }, [chatActive]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const handleOpenModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleCloseModal2 = () => {
    setIsModalOpen2(false);
  };

  const handleRegisterLead = () => {};

  const handleRegisterClient = () => {};

  return (
    <div>
      <Typography style={{ textAlign: "center", marginTop: 10 }} variant="h6">
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingLeft: 20,
            marginBottom: -15,
            top: 10,
          }}
          onClick={handleAreaRead}
          className="iconAreaRead"
        >
          <SvgIcon color="action" fontSize="small">
            <ArrowLeftIcon />
          </SvgIcon>
        </div>
        Área de lectura
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
          marginBottom: -25,
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          width={80}
          style={{ borderRadius: 40 }}
          src={
            imgUser != null
              ? imgUser
              : "https://is2-ssl.mzstatic.com/image/thumb/Purple114/v4/78/ca/3b/78ca3b54-3aac-a766-ce9c-26232ae1c66f/source/512x512bb.jpg"
          }
        />
        <h3>{nameUser}</h3>
      </div>
      <div>
        <div style={{ paddingLeft: 10, paddingRight: 10 }}>
          <p style={{ borderTop: "1px solid #000", paddingTop: 5 }}>
            <b>Numero celular:</b>{" "}
            {formattedPhoneNumber ? formattedPhoneNumber.formatInternational() : "Número inválido"}
          </p>
          <p>
            <b>Estado:</b> {client.length != 0 ? "🔵 Registrado" : "🔴 No registrado"}
          </p>
          {client.length != 0 ? (
            <>
              <p>
                <b>ID: </b>
                {client.client.cli_id}
              </p>
              <p>
                <b>Codigo: </b> {client.client.tbl_branch.bra_name.slice(0, 3)}CLI
                {client.client.cli_id.toString().padStart(6, "0")}
              </p>
              <p>
                <b>Nombre:</b> {client.client.cli_fullname.slice(0, 20)}
              </p>
              <p>
                <b>Metodo de pago: </b>{" "}
                {client.client.cli_payment == 1
                  ? "Efectivo"
                  : client.client.cli_payment == 2
                  ? "Tarjeta"
                  : "Transferencia"}
              </p>
              <p>
                <b>Metodo de envio: </b> {client.client.cli_method == 1 ? "Domicilio" : "Pickup"}
              </p>
              <p style={{ borderBottom: "1px solid #000", paddingBottom: 5 }}>
                <b>Sucursal registrado: </b> {client.client.tbl_branch.bra_name}
              </p>
              {client.locations.map((location, index) =>
                location.loc_default == 1 ? (
                  <div key={index}>
                    <p>
                      <b>Direccion:</b> {location.loc_address}
                    </p>
                    <p>
                      <b>Zona:</b> {location.loc_zone}
                    </p>
                    <p>
                      <b>Link:</b>{" "}
                      <a target="__blank" href={location.loc_link}>
                        Abrir ubicacion
                      </a>
                    </p>
                  </div>
                ) : null
              )}
              <UpdateClientModal
                fetchClients={fetchClient}
                open={isModalOpen}
                onClose={handleCloseModal}
                client={client.client}
              />
              <SeeNoteModal
                open={isModalOpen2}
                onClose={handleCloseModal2}
                note={client.client.cli_note}
              />
              <Button onClick={handleOpenModal} variant="contained">
                Actualizar
              </Button>
              <Button style={{ marginLeft: 10 }} onClick={handleOpenModal2} variant="contained">
                Ver nota
              </Button>
            </>
          ) : (
            <>
              {chatActive != "" ? (
                <>
                  <CreateClientModal
                    fetchClients={fetchClient}
                    open={isModalOpen}
                    session={session}
                    chatActive={chatActive}
                    onClose={handleCloseModal}
                  />
                  <CreateLeadModal
                    fetchClients={fetchClient}
                    open={isModalOpen2}
                    chatActive={chatActive}
                    nameUser={nameUser}
                    session={session}
                    onClose={handleCloseModal2}
                  />
                  <div style={{ borderTop: "1px solid #000", paddingTop: 10 }}>
                    <Button onClick={handleOpenModal} variant="contained">
                      Registrar como cliente
                    </Button>
                  </div>
                  {lead == null ? (
                    <div style={{ marginTop: 10 }}>
                      <Button onClick={handleOpenModal2} variant="contained">
                        Registrar como lead
                      </Button>
                    </div>
                  ) : lead != null ? (
                    <div style={{ borderTop: "1px solid #000", paddingTop: 0, marginTop: 10 }}>
                      <p>
                        <b>🔵 REGISTRADO COMO LEAD</b>
                      </p>
                      <p>
                        <b>ID: </b>
                        {lead.lea_id}
                      </p>
                      <p>
                        <b>Tipo de lead: </b>
                        {lead.lea_type == 1
                          ? "Spam"
                          : lead.lea_type == 2
                          ? "Contenido"
                          : "Misceláneo"}
                      </p>
                      <p>
                        <b>Nick: </b>
                        {lead.lea_nickname ? lead.lea_nickname : "No se registro un nick."}
                      </p>
                      <p>
                        <b>Codigo: </b> {lead.tbl_branch.bra_name.slice(0, 3)}LEA
                        {lead.lea_id.toString().padStart(6, "0")}
                      </p>
                      <p>
                        <b>Sucursal: </b>
                        {lead.tbl_branch.bra_name}
                      </p>
                    </div>
                  ) : null}
                </>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

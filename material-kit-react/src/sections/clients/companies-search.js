import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

export const CompaniesSearch = (props) => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      value={props.searchTerm}
      onChange={props.handleInputChange}
      fullWidth
      placeholder="Buscar cliente Numero/Nombre"
      startAdornment={
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      }
      sx={{ maxWidth: 500 }}
    />
    <br></br>
    <small style={{ color: "red" }}>
      *Para crear un usuario debes hacerlo desde el panel del chat, selección el chat(usuario) para
      convertir a cliente; o en su defecto, desde leads conviértelos en clientes con un clic.
    </small>
  </Card>
);

import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

export const CompaniesSearch = (props) => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      value={props.searchTerm}
      onChange={props.handleInputChange}
      fullWidth
      placeholder="Buscar leads Numero/Nombre"
      startAdornment={
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      }
      sx={{ maxWidth: 500 }}
    />
  </Card>
);

import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, Grid, Button, SvgIcon } from "@mui/material";

export const ButtonSession = () => (
  <Grid
    style={{ display: "flex", flexDirection: "row", marginTop: -60, paddingLeft: 50, width: "100%" }}
    container
    spacing={2}
  >
    <Grid style={{ display: "contents", justifyContent: "center" }} item xs={6}>
      <Button style={{ marginRight: 10 }} variant="contained" className="bg-orange">
        Sucursal A
      </Button>
      <Button variant="contained" className="bg-orange">
        Sucursal B
      </Button>
    </Grid>
  </Grid>
);

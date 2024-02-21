import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, Grid, Button, SvgIcon } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllBranchs } from "src/api/apiBranch";

export const ButtonSession = () => {
  const fetchBranch = async () => {
    try {
      const response = await getAllBranchs();
      if (!response.success) {
        toast.error("Ocurrio un error interno.");
      } else {
        console.log(response.body);
        setBranch(response.body);
      }
    } catch (error) {
      console.log(error);
      toast.error("Ocurrio un error interno.");
    }
  };

  const [branch, setBranch] = useState([]);

  useEffect(() => {
    if (branch.length == 0) {
      fetchBranch();
    }
  }, []);

  return (
    <Grid
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: -60,
        paddingLeft: 50,
        width: "100%",
      }}
      container
      spacing={2}
    >
      <Grid style={{ display: "contents", justifyContent: "center" }} item xs={6}>
        {branch.map((bra) => (
          <Button
            key={bra.bra_id}
            style={{ marginRight: 10 }}
            variant="contained"
            className="bg-orange"
          >
            {bra.bra_name}
          </Button>
        ))}
      </Grid>
    </Grid>
  );
};

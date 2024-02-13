import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { Card, InputAdornment, OutlinedInput, Typography, SvgIcon } from "@mui/material";

export const ChatData = ({ setVisibleArea, visibleArea }) => {
  const handleAreaRead = () => {
    setVisibleArea(!visibleArea);
  };

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
    </div>
  );
};

import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

interface CustomTextFieldProps {
  isWhiteBorder?: boolean;
}

export const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "isWhiteBorder",
})<CustomTextFieldProps>(({ isWhiteBorder }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: isWhiteBorder ? "white" : "#ccc",
    },
    "& input::placeholder": {
      color: isWhiteBorder ? "white" : undefined,
    },
    "& input": {
      color: isWhiteBorder ? "white" : undefined,
    },
  },
}));

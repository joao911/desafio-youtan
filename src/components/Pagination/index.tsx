import React, { ChangeEvent } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Stack, PaginationItem, Pagination } from "@mui/material";

interface IPaginationProps {
  numberOfPages: number;
  page: number;
  setPage: (value: number) => void;
}
export const PaginationComponent: React.FC<IPaginationProps> = ({
  numberOfPages,
  page,
  setPage,
}) => {
  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={numberOfPages}
        page={page}
        onChange={handleChange}
        hidePrevButton
        hideNextButton
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
};

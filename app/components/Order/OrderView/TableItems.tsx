"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosFastforward,
} from "react-icons/io";
import Image from "next/image";
import { truncateText } from "@/app/utils";
interface DisplayProductsProps {
  products: any[];
}
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}
interface Column {
  id: "name" | "price" | "quantity" | "total";
  label: string;
  width?: string;
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Product Name", width: "40%" },
  { id: "price", label: "Price", width: "20%" },
  {
    id: "quantity",
    label: "Quantity",
    width: "20%",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "total",
    label: "Total",
    width: "20%",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, mr: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <IoIosFastforward /> : <IoIosArrowBack />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? <IoIosArrowForward /> : <IoIosArrowBack />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? <IoIosArrowBack /> : <IoIosArrowForward />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? (
          <IoIosArrowForward />
        ) : (
          <IoIosFastforward />
        )}
      </IconButton>
    </Box>
  );
}

export const DisplayProducts: React.FC<DisplayProductsProps> = ({
  products,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const rows = [...products].concat([...products]).concat([...products]);

  // const rows:any[]=[]
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer className=" border">
      <Table
        sx={{ width: "100%" }}
        aria-label="custom pagination  mx-auto table"
        stickyHeader
      >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align="left"
                className="bg-slate-200"
                style={{ width: column.width }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.name} className="">
              <TableCell style={{ width: "40%" }}>
                <div className="flex items-center gap-2  ">
                  <div className="relative w-[30px] aspect-square">
                    <Image
                      src={row.selectedImage.url}
                      alt={row.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>{truncateText(row.name)}</div>
                </div>
              </TableCell>
              <TableCell style={{ width: "20%" }} align="left">
                {row.price}
              </TableCell>
              <TableCell style={{ width: "20%" }} align="left">
                {row.quantity}
              </TableCell>
              <TableCell style={{ width: "20%" }} align="left">
                {row.quantity * row.price}
              </TableCell>
            </TableRow>
          ))}
          {/* {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }} className="text-red-300">
              <TableCell colSpan={6} />
            </TableRow>
          )} */}

          {/* <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="left">any</TableCell>
          </TableRow> */}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[3]}
              colSpan={4}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

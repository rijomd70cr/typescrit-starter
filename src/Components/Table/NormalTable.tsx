import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

import { capitalizingData } from "../../Utils/Methods";

type Props = {
  headers: string[];
  headerStyle: { [x: string]: string };
  capitalizingHeaders: boolean;
  columns: any[];
  extraColumn: any[];
};

export const NormalTable = ({
  headers,
  headerStyle,
  columns,
  capitalizingHeaders,
  extraColumn = [],
}: Props) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: headerStyle.backgroundColor,
      color: headerStyle.color,
      ...headerStyle,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <div>
      {" "}
      <TableContainer style={{ marginTop: "1rem" }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {headers.map((item: string, key: number) => (
                <StyledTableCell key={key}>
                  {capitalizingHeaders ? capitalizingData(item) : item}
                </StyledTableCell>
              ))}
              {extraColumn.length > 0 &&
                extraColumn.map((item: any, key: number) => (
                  <StyledTableCell key={key}>
                    {item.headerName ? (
                      capitalizingData(item.headerName)
                    ) : (
                      <></>
                    )}
                  </StyledTableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {columns.map((columnItem: any, columnKey: number) => (
              <TableRow key={columnKey}>
                {headers.map((headerItem: string, headerKey: number) => {
                  return (
                    <TableCell key={headerKey}>
                      {columnItem[headerItem]}
                    </TableCell>
                  );
                })}
                {extraColumn.length > 0 &&
                  extraColumn.map((item: any, key: number) => (
                    <TableCell key={key}>
                      {item.content ? (
                        <div onClick={() => item.onClick(columnItem)}>
                          {item.content}
                        </div>
                      ) : (
                        <div>-</div>
                      )}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

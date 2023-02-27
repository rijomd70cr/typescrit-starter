import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

import { changDataContent } from "./TableMethods";
import { capitalizingData } from "../../Utils/HelperFunctions";

type Props = {
  headers: any[];
  headerStyle: { [x: string]: string };
  capitalizingHeaders: boolean;
  tableData: any[];
  extraColumn: any[];
  changeColumnData: any[];
};

export const NormalTable = ({
  headers,
  headerStyle,
  tableData,
  capitalizingHeaders,
  extraColumn = [],
  changeColumnData = [],
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
  const [normalTableData, setNormalTableData] = useState<any[]>([]);

  useEffect(() => {
    setNormalTableData(tableData);
    if (tableData?.length > 0 && changeColumnData?.length > 0) {
      let newArray: any[] = changDataContent(tableData, changeColumnData);
      setNormalTableData(newArray);
    }
    return () => {};
  }, [changeColumnData, tableData]);

  return (
    <div>
      <TableContainer style={{ marginTop: "1rem" }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {headers.map(
                (
                  item: {
                    name: string;
                    headerName: string;
                    renderDataContent: () => {};
                  },
                  key: number
                ) => (
                  <StyledTableCell key={key}>
                    {capitalizingHeaders
                      ? capitalizingData(item.headerName)
                      : item.headerName}
                  </StyledTableCell>
                )
              )}
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
            {normalTableData.map((columnItem: any, columnKey: number) => (
              <TableRow key={columnKey}>
                {headers.map(
                  (
                    headerItem: {
                      name: string;
                      headerName: string;
                      renderDataContent: (data: any) => {};
                    },
                    headerKey: number
                  ) => {
                    return (
                      // {item.renderDataContent<div></div>}
                      <TableCell key={headerKey}>
                        {typeof headerItem.renderDataContent === "function"
                          ? headerItem.renderDataContent(
                              columnItem[headerItem.name]
                            )
                          : columnItem[headerItem.name]}
                      </TableCell>
                    );
                  }
                )}
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

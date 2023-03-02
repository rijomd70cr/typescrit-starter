import { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Checkbox,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

import { changDataContent } from "./TableMethods";
import { capitalizingData } from "../../Utils/HelperFunctions";
import {
  stableSort,
  getComparator,
  selectFromCheckBox,
  filterByHeaders,
} from "./TableMethods";

type Order = "asc" | "desc";
type headersInterface = {
  name: string;
  headerName: string;
  renderDataContent: (data: any) => {};
  isFilterEnabled: boolean;
  FilterComponent: any;
};
type Props = {
  headers: any[];
  headerStyle: { [x: string]: string };
  capitalizingHeaders: boolean;
  tableData: any[];
  extraColumn: any[];
  changeColumnData: any[];
  pagination: boolean;
  footerStyle: { [x: string]: string };
  sortBy: string;
  onRowClick: any;
  onRowSelected: boolean;
};

export const NormalTable = ({
  headers = [],
  headerStyle,
  tableData,
  capitalizingHeaders,
  extraColumn = [],
  changeColumnData = [],
  pagination = false,
  footerStyle = {},
  onRowClick,
  sortBy,
  onRowSelected = false,
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
  const footer = { ...footerStyle, borderBottom: "1px solid #ccc" };
  const [normalTableData, setNormalTableData] = useState<any[]>([]);
  const [headerValues, setHeaderValues] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>(sortBy ? sortBy : "id");
  const [selected, setSelected] = useState<any[]>([]);

  const [forceUpdate, setForceUpdate] = useState(0);
  const [values, setValues] = useState<any>({});

  useEffect(() => {
    setNormalTableData(tableData);
    if (tableData?.length > 0 && changeColumnData?.length > 0) {
      let newArray: any[] = changDataContent(tableData, changeColumnData);
      setNormalTableData(newArray);
      setHeaderValues(headers);
    }

    return () => {};
  }, [changeColumnData, tableData]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleRequestSort = (property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const isSelected = (data: any) => {
    if (selected?.length > 0) {
      let exist = selected?.find(
        (item: any) => JSON.stringify(item) === JSON.stringify(data)
      );
      return exist ? true : false;
    } else {
      return false;
    }
  };

  const handleClick = (data: any) => {
    let newSelected = selectFromCheckBox(selected, data);
    setSelected(newSelected);
    setForceUpdate(forceUpdate + 1);
  };
  const onSelectAllClick = (data: boolean) => {
    data ? setSelected([]) : setSelected([...normalTableData]);
    setForceUpdate(forceUpdate + 1);
  };
  const tableHeadCheckBox = useCallback(() => {
    if (normalTableData?.length > 0 && selected?.length > 0) {
      let isSelectedAll: boolean = selected.length === normalTableData.length;
      return (
        <StyledTableCell>
          <Checkbox
            color="primary"
            checked={isSelectedAll}
            onClick={() => onSelectAllClick(isSelectedAll)}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </StyledTableCell>
      );
    }
  }, [forceUpdate]);

  const handleFilter = (value: string, filterType: string) => {
    let filterObject;
    if (!value) {
      delete values[filterType];
      filterObject = {
        ...values,
      };
    } else {
      filterObject = {
        ...values,
        [filterType]: value.toString(),
      };
    }
    setValues(filterObject);

    if (Object.keys(filterObject)?.length > 0) {
      let filteredArray = filterByHeaders(tableData, filterObject);
      setNormalTableData(filteredArray);
    } else {
      setNormalTableData(tableData);
    }
  };

  return (
    <div>
      <TableContainer style={{ marginTop: "1rem" }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {onRowSelected && (
                <StyledTableCell>{tableHeadCheckBox()}</StyledTableCell>
              )}
              {headerValues.map((item: headersInterface, key: number) => {
                const { FilterComponent } = item;
                return (
                  <StyledTableCell key={key}>
                    <TableSortLabel
                      style={{ padding: "0px 5px" }}
                      active={orderBy === item.name}
                      direction={orderBy === item.name ? order : "asc"}
                      onClick={() => handleRequestSort(item.name)}
                    >
                      {capitalizingHeaders
                        ? capitalizingData(item.headerName)
                        : item.headerName}
                    </TableSortLabel>
                    {item.isFilterEnabled && (
                      <div>
                        {FilterComponent ? (
                          <FilterComponent
                            onchangeSelectBox={(data: any) =>
                              handleFilter(data, item.name)
                            }
                          />
                        ) : (
                          <input
                            placeholder={item.headerName}
                            style={{
                              backgroundColor: "#fff",
                              margin: "5px 0px",
                              outline: "none",
                              border: "none",
                              height: "30px",
                              width: "100%",
                              padding: "5px",
                            }}
                            onChange={(e) =>
                              handleFilter(e?.target.value, item.name)
                            }
                            value={values[item.name]}
                          />
                        )}
                      </div>
                    )}
                  </StyledTableCell>
                );
              })}
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
            {stableSort(normalTableData, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((columnItem: any, columnKey: number) => {
                const isItemSelected = isSelected(columnItem);
                return (
                  <TableRow
                    hover={typeof onRowClick === "function" ? true : false}
                    style={{
                      cursor:
                        typeof onRowClick === "function"
                          ? "pointer"
                          : "default",
                    }}
                    key={columnKey}
                    onClick={
                      typeof onRowClick === "function"
                        ? () => onRowClick(columnItem)
                        : () => {}
                    }
                    selected={isItemSelected}
                  >
                    {onRowSelected && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={() => handleClick(columnItem)}
                        />
                      </TableCell>
                    )}
                    {headerValues.map(
                      (headerItem: headersInterface, headerKey: number) => {
                        return (
                          <TableCell key={headerKey} style={{ lineHeight: 0 }}>
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
                        <TableCell key={key} style={{ lineHeight: 0 }}>
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
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {normalTableData?.length === 0 && (
        <div style={{ width: "100%", textAlign: "center", margin: "1rem 0px" }}>
          No records found
        </div>
      )}

      {pagination && (
        <TablePagination
          style={footer}
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={normalTableData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
};

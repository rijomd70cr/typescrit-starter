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
  Collapse,
  IconButton,
  Box,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

import { changDataContent } from "./Methods/TableMethods";
import { capitalizingData } from "../../Utils/HelperFunctions";
import {
  stableSort,
  getComparator,
  selectFromCheckBox,
  filterByHeaders,
} from "./Methods/TableMethods";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
  tableData: any[];
  extraColumn: any[];
  changeColumnData: any[];
  pagination: boolean;
  footerStyle: { [x: string]: string };
  sortBy: string;
  onRowClick: any;
  onRowSelected: boolean;
  onChangeRowSelected: (data: any[]) => void;
  onRowCollapsable: boolean;
};

export const NormalTable = ({
  headers = [],
  headerStyle,
  tableData,
  extraColumn = [],
  changeColumnData = [],
  pagination = false,
  footerStyle = {},
  onRowClick,
  sortBy,
  onRowSelected = false,
  onChangeRowSelected = () => {},
  onRowCollapsable = false,
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
  const [openGrouped, setOpenGrouped] = useState(false);
  const [openGroupedIndex, setOpenGroupedIndex] = useState(0);

  useEffect(() => {
    setNormalTableData(tableData);
    setHeaderValues(headers);
    if (tableData?.length > 0 && changeColumnData?.length > 0) {
      let newArray: any[] = changDataContent(tableData, changeColumnData);
      setNormalTableData(newArray);
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
    onChangeRowSelected(newSelected);
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

  const renderTableHead = useCallback(() => {
    return headerValues.map((item: headersInterface, key: number) => {
      const { FilterComponent } = item;
      return (
        <StyledTableCell key={key}>
          <TableSortLabel
            style={{ padding: "0px 5px" }}
            active={orderBy === item.name}
            direction={orderBy === item.name ? order : "asc"}
            onClick={() => handleRequestSort(item.name)}
          >
            {item.headerName}
          </TableSortLabel>
          {item.isFilterEnabled && (
            <div>
              {FilterComponent ? (
                <>
                  {FilterComponent({
                    onchange: (data: any) => handleFilter(data, item.name),
                  })}
                </>
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
                  onChange={(e) => handleFilter(e?.target.value, item.name)}
                  value={values[item.name]}
                />
              )}
            </div>
          )}
        </StyledTableCell>
      );
    });
  }, [headerValues, orderBy, order]);

  const renderCollapsableTable = (columnItem: any) => {
    if (openGrouped) {
      let keyValues = Object.keys(columnItem);

      let subTableData: any[] = [];
      let columnField: string = "";
      for (let item of keyValues) {
        if (typeof columnItem[item] === "object") {
          let itemData = columnItem[item].some((value: any) => {
            if (typeof value === "object") {
              columnField = item;
              return typeof value === "object";
            }
          });
          if (itemData) subTableData = columnItem[item];
        }
      }
      let subTableDataHeaders: any[] = [];
      if (subTableData?.length > 0) {
        subTableDataHeaders = Object.keys(subTableData[0]);
      }

      return (
        <Box sx={{ margin: 1 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "none",
                  }}
                >
                  {capitalizingData(columnField)}
                </TableCell>
              </TableRow>
              <TableRow>
                {subTableDataHeaders?.length > 0 &&
                  subTableDataHeaders.map((headerItem: any, key: number) => {
                    return (
                      <TableCell key={key} style={{ fontWeight: "bold" }}>
                        {capitalizingData(headerItem)}
                      </TableCell>
                    );
                  })}
              </TableRow>
            </TableHead>
            <TableBody>
              {subTableData.map((data: any, index: number) => {
                return (
                  <TableRow key={index}>
                    {subTableDataHeaders?.length > 0 &&
                      subTableDataHeaders.map(
                        (headerItem: any, key: number) => {
                          return (
                            <TableCell key={key} style={{ border: "none" }}>
                              {data[headerItem]}
                            </TableCell>
                          );
                        }
                      )}
                  </TableRow>
                );
              })}
              {subTableData.length === 0 && (
                <TableRow>
                  <TableCell style={{ border: "none" }}>
                    No Items found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      );
    }
  };
  // [openGrouped]
  // );

  return (
    <div style={{ overflow: "hidden" }}>
      <TableContainer style={{ marginTop: "1rem" }}>
        <Table
          stickyHeader={true}
          size="small"
          aria-label="a dense table"
          sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
        >
          <TableHead>
            <TableRow>
              {onRowCollapsable && (
                <StyledTableCell style={{ width: "2%" }}></StyledTableCell>
              )}
              {onRowSelected && (
                <StyledTableCell>{tableHeadCheckBox()}</StyledTableCell>
              )}
              {renderTableHead()}
              {extraColumn?.length > 0 &&
                extraColumn.map((item: any, key: number) => (
                  <StyledTableCell key={key} style={{ textAlign: "center" }}>
                    {item.headerName ? (
                      capitalizingData(item.headerName)
                    ) : (
                      <></>
                    )}
                  </StyledTableCell>
                ))}
            </TableRow>
          </TableHead>
          {stableSort(normalTableData, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((columnItem: any, columnKey: number) => {
              const isItemSelected = isSelected(columnItem);
              return (
                <TableBody key={columnKey}>
                  <TableRow
                    hover={typeof onRowClick === "function" ? true : false}
                    style={{
                      cursor:
                        typeof onRowClick === "function"
                          ? "pointer"
                          : "default",
                    }}
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

                    {onRowCollapsable && (
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => {
                            setOpenGrouped(!openGrouped);
                            setOpenGroupedIndex(columnKey);
                          }}
                        >
                          {openGrouped && openGroupedIndex === columnKey ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                    )}

                    {headerValues.map(
                      (headerItem: headersInterface, headerKey: number) => {
                        let value;
                        if (typeof columnItem[headerItem.name] === "object") {
                          let itemData = columnItem[headerItem.name].some(
                            (value: any) => {
                              return typeof value === "object";
                            }
                          );
                          itemData
                            ? (value = "-")
                            : (value = columnItem[headerItem.name]);
                        } else {
                          value = columnItem[headerItem.name];
                        }
                        return (
                          <TableCell key={headerKey} style={{ lineHeight: 0 }}>
                            {typeof headerItem.renderDataContent === "function"
                              ? headerItem.renderDataContent(
                                  columnItem[headerItem.name]
                                )
                              : value}
                          </TableCell>
                        );
                      }
                    )}

                    {extraColumn?.length > 0 &&
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

                  <TableRow>
                    <TableCell
                      style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                        border: "none",
                      }}
                      colSpan={headerValues?.length + extraColumn?.length}
                    >
                      {openGroupedIndex === columnKey && (
                        <Collapse in={openGrouped} timeout="auto" unmountOnExit>
                          {renderCollapsableTable(columnItem)}
                        </Collapse>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
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

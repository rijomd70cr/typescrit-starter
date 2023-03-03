export const changDataContent = (
  tableData: any[],
  changeColumnData: any[]
): any[] => {
  for (let item of tableData) {
    for (let data of changeColumnData) {
      if (data?.changeData && Object.keys(data?.uniqueId).length) {
        let keyOfUniqueId = Object.keys(data?.uniqueId)[0];
        if (data?.uniqueId[keyOfUniqueId] === item[keyOfUniqueId]) {
          const target = tableData.find(
            (obj) => obj[keyOfUniqueId] == item[keyOfUniqueId]
          );
          item[data.columnName] = data.changeData;
          Object.assign(target, item);
        }
      }
    }
  }
  return tableData;
};

type Order = "asc" | "desc";

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const selectFromCheckBox = (selectedData: any, data: any) => {
  let duplicate: any;
  if (selectedData?.length > 0) {
    duplicate = selectedData?.find(
      (item: any) => JSON.stringify(item) === JSON.stringify(data)
    );
  }
  if (duplicate) {
    selectedData = selectedData.filter(
      (item: any) => JSON.stringify(item) !== JSON.stringify(duplicate)
    );
  } else {
    selectedData.push(data);
  }
  return selectedData;
};

export const filterByHeaders = (tableData: any[], filterObject: any): any[] => {
  return tableData.filter(function (obj) {
    return Object.keys(filterObject).every(function (c) {
      return obj[c]?.toString().includes(filterObject[c]);
    });
  });
};

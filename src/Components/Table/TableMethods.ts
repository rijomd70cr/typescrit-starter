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

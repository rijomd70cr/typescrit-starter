import { useMemo, useState, useEffect } from "react";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";

type Props = {
  tableData: any[];
  columnData: any[];
  [detailedProps: string]: any;
};

export const MaterialReactTableComponent = ({
  tableData,
  columnData,
  ...detailedProps
}: Props) => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (tableData?.length > 0) setData(tableData);
    return () => {};
  }, [tableData]);
  const columns = useMemo<MRT_ColumnDef<any>[]>(() => columnData, [columnData]);

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      {...detailedProps}
    />
  );
};

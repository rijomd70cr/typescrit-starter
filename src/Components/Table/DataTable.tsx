import { useEffect, useState, useCallback } from "react";
import DataTable from "react-data-table-component";

import { getRequestHeaders } from "../../Services/Methods/Authmethods";
import { useFetchWithAbort } from "../../Services/Hook/Hook";

type Props = {
  columns: any[];
  title: string;
  myApi: string;
  reload: number;
  [x: string]: any;
};

// pending reload table
export const TableList = (props: Props) => {
  const { columns, title, myApi, reload, ...x } = props;
  const [requestOptions, setRequestOptions] = useState<any>({});
  const [url, setUrl] = useState<string>("");

  const productList = useFetchWithAbort(url, requestOptions);

  useEffect(() => {
    (async () => {
      let options = await getRequestHeaders("GET", {});
      setRequestOptions(options);
      setUrl(myApi);
    })();

    return () => {};
  }, [myApi]);

  const renderDataTable = useCallback(() => {
    return (
      <DataTable
        title={title ? title : ""}
        columns={columns}
        data={productList?.fetchedData?.data?.docs}
        pagination
        highlightOnHover
        {...x}
      />
    );
  }, [productList?.fetchedData]);

  return <div>{renderDataTable()}</div>;
};

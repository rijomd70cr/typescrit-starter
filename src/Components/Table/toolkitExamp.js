// For actions service calling making async functionalities
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  // Fetch the backend endpoint:
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  // Get the JSON from the response:
  const data = await response.json();

  // Return result:
  return data;
});

// const UserAdd = (props: Props) => {
//   const headers: any[] = [
//     {
//       name: "title",
//       headerName: "Title",
//       isFilterEnabled: true,
//     },
//     {
//       name: "year",
//       headerName: "Year",
//       isFilterEnabled: true,
//     },
//     {
//       name: "genres",
//       headerName: "Genres",
//       isFilterEnabled: true,
//     },
//     {
//       name: "runtime",
//       headerName: "Runtime",
//       isFilterEnabled: true,
//     },
//     {
//       name: "director",
//       headerName: "Director",
//       isFilterEnabled: true,
//     },
//   ];
//   let changeColumnData: any[] = [
//     // { uniqueId: { id: "111" }, columnName: "name", changeData: <AddIcon /> },
//   ];
//   let extraColumn: any[] = [
//     {
//       headerName: "ACTIONS",
//       content: <div>View</div>,
//       onClick: (data: any) => {},
//     },
//   ];
//   const action: any[] = [];
//   return (
//     <PageLayout title="Add User" actions={action}>
//       <div>
//         {dataArray?.length > 0 && (
//           <NormalTable
//             headers={headers}
//             headerStyle={{
//               backgroundColor: "#ccc",
//               color: "black",
//               textAlign: "start",
//               height: "40px",
//               width: "auto",
//             }}
//             tableData={dataArray}
//             extraColumn={extraColumn}
//             capitalizingHeaders={true}
//             changeColumnData={changeColumnData}
//             pagination={true}
//             footerStyle={{}}
//             onRowClick={false}
//             sortBy={"title"}
//             onRowSelected={false}
//             onChangeRowSelected={(item: any[]) => console.log(item)}
//             onRowCollapsable={true} //for key value pair arrays for grouping by row
//           ></NormalTable>
//         )}
//       </div>
//     </PageLayout>
//   );
// };

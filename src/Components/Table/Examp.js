// import { createAsyncThunk } from "@reduxjs/toolkit";
// export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
//   const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
//   const data = await response.json();
//   return data;
// });

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



// const UserAdd = (props: Props) => {
//   const action: any[] = [];

//   let columnData: any = [
//     {
//       accessorKey: "title",
//       header: "Title",
//     },
//     {
//       accessorKey: "year",
//       header: "Year",
//     },
//     {
//       accessorKey: "director",
//       header: "Directors",
//     },
//     {
//       accessorKey: "runtime",
//       header: "Runtime",
//     },
//     {
//       accessorKey: "actors",
//       enableColumnOrdering: false,
//       header: "Actors",
//     },
//   ];

//   return (
//     <PageLayout title="Add User" actions={action}>
//       <div>
//         <MaterialReactTableComponent
//           tableData={dataArray}
//           columnData={columnData}
//           getSubRows={(data: any) => data.general} //for get
//           enableExpanding
//         />
//       </div>
//     </PageLayout>
//   );
// };
// export default UserAdd;
// let sampleData = [
//   {
//     id: 7,
//     title: "City of God",
//     year: "1996",
//     general: [
//       { title: "Crime", year: "1111" },
//       { title: "Drama", year: "1111" },
//     ],
//   },
// ];

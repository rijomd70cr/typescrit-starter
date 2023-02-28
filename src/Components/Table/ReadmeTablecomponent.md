1.  ######### NORMAL TABLE COMPONENT ###########

Table props:-

let headers: any[] = [
{name: "id",headerName:"a"},{ name: "name" ,headerName:"c"},
{name: "status",renderDataContent: (data: any) => {return <Component />}},
];

let tableData:any=[];

let extraColumn: any[] = [{
headerName: "Actions",
content: <div style={{ color: "red" }}>HERE</div>,
onClick: (data: any) => {
console.log(data, "hhh");},
}];

headerStyle={{
backgroundColor: "#ccc",
color: "black",
textAlign: "start",
height: "40px",}}

On particular data : uniqueId and columnName should not be same
let changeColumnData: any[] = [
{ uniqueId: { id: "111" }, columnName: "name", changeData: <UserAdd /> },];

Example:-

<!-- <NormalTable
headers={headers}
headerStyle={{backgroundColor: "#ccc",color: "black",textAlign: "start",height: "40px",}}
tableData={columns}
extraColumn={extraColumn}
capitalizingHeaders={true}
changeColumnData={changeColumnData}
pagination={true}
footerStyle={{}}
onRowClick={() => {}}
sortBy={"name"}
</NormalTable> -->

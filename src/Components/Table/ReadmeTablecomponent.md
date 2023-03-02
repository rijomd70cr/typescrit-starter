1.  ######### NORMAL TABLE COMPONENT ###########
    Table props:-

        import {selectBox} from "...//path

    let headers: any[] = [
    {name: "id",headerName:"a", isFilterEnabled: true,filterComponent: "",},{ name: "name" ,headerName:"c",isFilterEnabled: false,filterComponent: selectBox,},
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
tableData={tableData}
extraColumn={extraColumn}
capitalizingHeaders={true}
changeColumnData={changeColumnData}
pagination={true}
footerStyle={{}}
onRowClick={() => {}}
onRowSelected={true or false}  //for checked rows
sortBy={"name"}  //sort by initial
</NormalTable> -->

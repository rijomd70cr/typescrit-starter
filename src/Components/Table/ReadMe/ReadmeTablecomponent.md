1.  ######### NORMAL TABLE COMPONENT ###########
    Table props:-


  let headers: any[] = [
    {
      name: "dob",
      headerName: "DOB",
      isFilterEnabled: true,
    },
    {
      name: "status",
      headerName: "STATUS",
      isFilterEnabled: true,
      renderDataContent: (data: any) => {
        return data === "active" ? (
          <p style={{ color: "green" }}>Active</p>
        ) : (
          <p style={{ color: "red" }}>InActive</p>
        );
      },
      FilterComponent: (props: any) => {
        return (
          <SelectBox
            {...props}
            onChange={(data: any) => props.onchange(data)}
            dataCompo={statusCompo}
          />
        );
      },
    },
  ];

let tableData:any=[];

let extraColumn: any[] = [{
headerName: "Actions",
content: <div style={{ color: "red" }}>HERE</div>,
style: { width: "10%" },
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
onRowClick={() => {}} //false :-no action or any function
onRowSelected={true or false}  //for checked rows
onChangeRowSelected={(item: any[]) => console.log(item)}
sortBy={"name"}  //sort by initial
</NormalTable> -->

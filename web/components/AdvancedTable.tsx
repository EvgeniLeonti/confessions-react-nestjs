import MUIDataTable from "mui-datatables";





export default function DataTable() {
  const columns = ["Name", "Company", "City", "State"];

  const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
  ];

  const options = {
    filterType: 'checkbox',
  };


  return (
    <MUIDataTable
      title={"Confessions List"}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

import React, { useState } from "react";
import DataTable from "react-data-table-component";

import { Heading } from "../atoms/Heading";
import { Button } from "../atoms/Button";

export function CoursesTable() {
  const [selected, setSelected] = useState();

  const data = [
    { id: 1, title: "Prvy pokus", year: "1980" },
    { id: 2, title: "Druhy pokus", year: "1990" },
    { id: 3, title: "Treti pokus", year: "2000" },
    { id: 4, title: "Stvrty pokus", year: "2010" },
    { id: 5, title: "Piaty pokus", year: "2020" }
  ];

  const handleAdd = () => {
    console.log("Adding Course");
  };

  const handleEdit = row => {
    console.log("Edited Row: ", row);
  };

  const handleDelete = () => {
    console.log("Deleted Rows: ", selected);
  };

  const columns = [
    {
      name: "Title",
      selector: "title",
      sortable: true
    },
    {
      name: "Year",
      selector: "year",
      sortable: true,
      right: true
    },
    {
      name: "Edit",
      cell: row => (
        <Button variant="secondary" onClick={e => handleEdit(row)}>
          <i className="fa fa-edit" />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  const customStyle = {
    headCells: {
      style: {
        fontSize: "18px"
      }
    },
    cells: {
      style: {
        fontSize: "16px"
      }
    }
  };

  return (
    <div align="center">
      <Heading level="1">COURSES</Heading>
      <br />
      <div className="w-responsive pl-5 pr-5">
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyle}
          highlightOnHover
          responsive
          pagination
          selectableRows
          subHeader
          subHeaderAlign="left"
          onSelectedRowsChange={state => setSelected(state.selectedRows)}
          contextActions={
            <Button variant="danger" className="mr-3" onClick={handleDelete}>
              <i className="fa fa-trash-alt fa-fw" />
              <b> Remove</b>
            </Button>
          }
          subHeaderComponent={
            <Button variant="success" className="mr-3" onClick={handleAdd}>
              <i className="fa fa-plus fa-fw" />
              <b> New Course</b>
            </Button>
          }
        />
      </div>
    </div>
  );
}

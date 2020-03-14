import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

import { useAuth } from "../../utils/auth";
import { globalApiInstance } from "../../utils/api";

import { ServerStatus } from "../organisms/ServerStatus";
import { Heading } from "../atoms/Heading";
import { Button } from "../atoms/Button";

export function CoursesTable({ isEditable, noCoursesMessage }) {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(null);
  const [selected, setSelected] = useState(null);
  const [courses, setCourses] = useState([]);

  const auth = useAuth();
  const fetchUser = isEditable ? auth.user : auth.token;
  const fetchCourses = isEditable
    ? "courses/getMyCourses"
    : "access/getAccessibleCourses";

  useEffect(() => {
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + fetchCourses, {
        user: fetchUser
      })
      .then(res => {
        setStatus("idle");
        setCourses(res.data.data);
      })
      .catch(err => {
        setStatus("error");
        setMessage(err.message);
      });
  }, [fetchCourses, fetchUser, message]);

  const handleAdd = () => {
    // TODO: Fix adding courses!
    console.log("Adding Course");
    globalApiInstance.post(
      process.env.REACT_APP_BASE_API + "courses/createNewCourse",
      {
        name: "D Course",
        org: "Whatever School",
        cat: "Medical",
        level: "Beginner",
        length: "1 - 10 days",
        author: auth.user
      }
    );
  };

  const handleEnter = row => {
    console.log("Entered Row: ", row);
  };

  const handleEdit = row => {
    console.log("Edited Row: ", row);
  };

  const handleRemove = row => {
    console.log("Removed Row: ", row);
  };

  const handleRemoveAll = () => {
    console.log("Deleted Rows: ", selected);
  };

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      wrap: true
    },
    {
      name: "From",
      selector: "org",
      sortable: true,
      wrap: true
    },
    {
      name: "Category",
      selector: "cat",
      sortable: true,
      wrap: true
    },
    {
      name: "Level",
      selector: "level",
      sortable: true,
      wrap: true
    },
    {
      name: "Length",
      selector: "length",
      sortable: true,
      wrap: true
    },
    {
      name: "Author",
      selector: "author",
      sortable: true,
      wrap: true
    },
    {
      name: "Actions",
      cell: row => (
        <div className="row">
          <Button
            variant="info"
            className="ml-1 mr-1"
            onClick={e => handleEnter(row)}
          >
            <i className="fa fa-book-open" />
          </Button>
          {isEditable ? (
            <div>
              <Button
                variant="secondary"
                className="ml-1 mr-1"
                onClick={e => handleEdit(row)}
              >
                <i className="fa fa-edit" />
              </Button>
              <Button
                variant="danger"
                className="ml-1 mr-1"
                onClick={e => handleRemove(row)}
              >
                <i className="fa fa-trash-alt fa-fw" />
              </Button>
            </div>
          ) : null}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      minWidth: isEditable ? "200px" : "100px",
      button: true
    }
  ];

  const customStyle = {
    headCells: {
      style: {
        fontSize: "16px"
      }
    },
    cells: {
      style: {
        fontSize: "14px"
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
          data={courses}
          customStyles={customStyle}
          highlightOnHover
          responsive
          pagination
          noDataComponent={noCoursesMessage}
          selectableRows={isEditable}
          subHeader={isEditable}
          subHeaderAlign="left"
          onSelectedRowsChange={state => setSelected(state.selectedRows)}
          contextActions={
            <Button variant="danger" className="mr-3" onClick={handleRemoveAll}>
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
      <ServerStatus status={status} message={message} />
    </div>
  );
}

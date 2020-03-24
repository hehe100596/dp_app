import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import swal from "sweetalert";

import { useAuth } from "../../utils/auth";
import { globalApiInstance } from "../../utils/api";

import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { InvitesModal } from "./InvitesModal";
import { ServerStatus } from "../organisms/ServerStatus";

export function CoursesTable({ isEditable, noCoursesMessage }) {
  const [inviteTo, setInviteTo] = useState(null);
  const [courseName, setCourseName] = useState("");

  const [fetchSignal, setFetchSignal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [courses, setCourses] = useState([]);

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(null);

  const auth = useAuth();
  const fetchUser = isEditable ? auth.user : auth.token;
  const fetchCourses = isEditable
    ? "courses/getMyCourses"
    : "courses/getAccessibleCourses";

  useEffect(() => {
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + fetchCourses, {
        user: fetchUser
      })
      .then(res => {
        setCourses(res.data.data);
        setStatus("success");
      })
      .catch(err => {
        setStatus("error");
        setMessage(err.message);
      });
  }, [fetchSignal, fetchCourses, fetchUser]);

  const deleteCourses = rows => {
    setStatus("loading");

    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "courses/deleteCourses", {
        selectedCourses: rows
      })
      .then(res => {
        setMessage("Course(s) successfully deleted");
        setFetchSignal(!fetchSignal);
        setSelected(null);
      })
      .catch(err => {
        setStatus("error");
        setMessage(err.message);
      });
  };

  const handleInvite = row => {
    setStatus("idle");
    setInviteTo(row._id);
    setCourseName(row.name);
  };

  const closeInvite = () => {
    setInviteTo(null);
  };

  const handleRemove = row => {
    swal({
      title: "Do you want to delete this course?",
      text: "You are about to delete this course. Are you sure about it?",
      icon: "warning",
      buttons: ["No", "Yes"]
    }).then(function(isConfirm) {
      if (isConfirm) {
        deleteCourses([row]);
      }
    });
  };

  const handleRemoveAll = () => {
    swal({
      title: "Do you want to delete selection?",
      text: "You are about to delete these courses. Are you sure about it?",
      icon: "warning",
      buttons: ["No", "Yes"]
    }).then(function(isConfirm) {
      if (isConfirm) {
        deleteCourses(selected);
      }
    });
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
      omit: isEditable,
      wrap: true
    },
    {
      name: "Actions",
      cell: row => (
        <div className="row">
          {isEditable ? (
            <div>
              <Button
                variant="success"
                className="ml-1 mr-1"
                onClick={e => handleInvite(row)}
              >
                <i className="fa fa-user-plus" />
              </Button>
              <Link to={{ pathname: `/edit-course/${row._id}` }}>
                <Button variant="primary" className="ml-1 mr-1">
                  <i className="fa fa-edit" />
                </Button>
              </Link>
              <Button
                variant="danger"
                className="ml-1 mr-1"
                onClick={e => handleRemove(row)}
              >
                <i className="fa fa-trash-alt fa-fw" />
              </Button>
            </div>
          ) : (
            <Link to={{ pathname: `/enter-course/${row._id}` }}>
              <Button variant="info" className="ml-1 mr-1">
                <i className="fa fa-book-open" />
              </Button>
            </Link>
          )}
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
          clearSelectedRows={fetchSignal}
          contextActions={
            <Button variant="danger" className="mr-3" onClick={handleRemoveAll}>
              <i className="fa fa-trash-alt fa-fw" />
              <b> Remove</b>
            </Button>
          }
          subHeaderComponent={
            <Link to="/add-course">
              <Button variant="secondary" className="mr-3">
                <i className="fa fa-plus fa-fw" />
                <b> New Course</b>
              </Button>
            </Link>
          }
        />
      </div>
      <InvitesModal
        inviteTo={inviteTo}
        courseName={courseName}
        closeInvite={closeInvite}
      />
      <EmptyLine level="2" />
      <ServerStatus status={status} message={message} />
    </div>
  );
}

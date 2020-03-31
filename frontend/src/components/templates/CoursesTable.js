import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import swal from "sweetalert";

import { useAuth } from "../../utils/auth";
import { globalApiInstance } from "../../utils/api";

import { FontIcon } from "../atoms/FontIcon";
import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { ServerStatus } from "../organisms/ServerStatus";
import { InvitesModal } from "../organisms/InvitesModal";

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
      name: "Status",
      selector: "config.status",
      sortable: true,
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
                <FontIcon icon="user-plus" />
              </Button>
              <Link to={{ pathname: `/edit-course/${row._id}` }}>
                <Button variant="primary" className="ml-1 mr-1">
                  <FontIcon icon="edit" />
                </Button>
              </Link>
              <Button
                variant="danger"
                className="ml-1 mr-1"
                onClick={e => handleRemove(row)}
              >
                <FontIcon icon="trash-alt" />
              </Button>
            </div>
          ) : row.config.status === "Active" ? (
            <Link to={{ pathname: `/enter-course/${row._id}` }}>
              <Button variant="info" className="ml-1 mr-1">
                <FontIcon icon="book-open" />
              </Button>
            </Link>
          ) : (
            <Button variant="info" disabled className="ml-1 mr-1">
              <FontIcon icon="book-dead" />
            </Button>
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
          subHeaderAlign="right"
          onSelectedRowsChange={state => setSelected(state.selectedRows)}
          clearSelectedRows={fetchSignal}
          contextActions={
            <Button variant="danger" className="mr-3" onClick={handleRemoveAll}>
              <FontIcon icon="trash-alt" />
              <b> Remove</b>
            </Button>
          }
          subHeaderComponent={
            <Link to="/add-course">
              <Button variant="warning" className="mr-3">
                <FontIcon icon="plus" />
                <b> New course</b>
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

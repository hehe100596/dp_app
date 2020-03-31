import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import swal from "sweetalert";

import { useAuth } from "../../utils/auth";
import { globalApiInstance } from "../../utils/api";

import { FontIcon } from "../atoms/FontIcon";
import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { ServerStatus } from "../organisms/ServerStatus";

export function CourseStudents({ courseId }) {
  const [fetchSignal, setFetchSignal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [students, setStudents] = useState([]);

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(null);

  const auth = useAuth();

  useEffect(() => {
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "courses/getUsersWithAccess", {
        course: courseId
      })
      .then(res => {
        if (res.data.data.access.length > 0)
          globalApiInstance
            .post(process.env.REACT_APP_BASE_API + "users/getSelectedUsers", {
              tokens: res.data.data.access
            })
            .then(res => {
              if (res.data.data) {
                let users = [];

                res.data.data.forEach(function(entry) {
                  if (entry.mail !== auth.user) {
                    let points = 0;

                    if (entry.progress && entry.progress.length > 0) {
                      let progress = entry.progress.find(
                        obj => obj.course === courseId
                      );

                      if (progress) points = progress.points;
                    }

                    let user = {
                      name: entry.name,
                      mail: entry.mail,
                      token: entry.token,
                      points: points
                    };

                    users.push(user);
                  }
                });

                setStudents(users);
              }
            })
            .catch(err => {
              setStatus("error");
              setMessage(err.message);
            });
        setStatus("success");
      })
      .catch(err => {
        setStatus("error");
        setMessage(err.message);
      });
  }, [courseId, auth.user, fetchSignal]);

  const removeUsers = rows => {
    setStatus("loading");

    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "courses/removeStudents", {
        course: courseId,
        selectedUsers: rows
      })
      .then(res => {
        setMessage("User(s) successfully removed");
        setFetchSignal(!fetchSignal);
        setSelected(null);
      })
      .catch(err => {
        setStatus("error");
        setMessage(err.message);
      });
  };

  const handleRemove = row => {
    swal({
      title: "Do you want to remove this user?",
      text: "You are about to remove this user. Are you sure about it?",
      icon: "warning",
      buttons: ["No", "Yes"]
    }).then(function(isConfirm) {
      if (isConfirm) {
        removeUsers([row]);
      }
    });
  };

  const handleRemoveAll = () => {
    swal({
      title: "Do you want to remove these users?",
      text: "You are about to remove these users. Are you sure about it?",
      icon: "warning",
      buttons: ["No", "Yes"]
    }).then(function(isConfirm) {
      if (isConfirm) {
        removeUsers(selected);
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
      name: "E-mail",
      selector: "mail",
      sortable: true,
      wrap: true
    },
    {
      name: "Points",
      selector: "points",
      sortable: true,
      wrap: true
    },
    {
      name: "Actions",
      cell: row => (
        <Button
          variant="danger"
          className="ml-1 mr-1"
          onClick={e => handleRemove(row)}
        >
          <FontIcon icon="user-slash" />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      minWidth: "100px",
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
          data={students}
          customStyles={customStyle}
          highlightOnHover
          responsive
          pagination
          noDataComponent={"No users have access to this course"}
          selectableRows
          onSelectedRowsChange={state => setSelected(state.selectedRows)}
          clearSelectedRows={fetchSignal}
          contextActions={
            <Button variant="danger" className="mr-3" onClick={handleRemoveAll}>
              <FontIcon icon="user-slash" />
              <b> Remove</b>
            </Button>
          }
        />
      </div>
      <EmptyLine level="2" />
      <ServerStatus status={status} message={message} />
    </div>
  );
}

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

export function ModulesTable({ isEditable, noModulesMessage }) {
  const [fetchSignal, setFetchSignal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [modules, setModules] = useState([]);

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(null);

  const auth = useAuth();
  const fetchUser = isEditable ? auth.user : auth.token;
  const fetchModules = isEditable
    ? "modules/getMyModules"
    : "modules/getAccessibleModules";

  useEffect(() => {
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + fetchModules, {
        user: fetchUser
      })
      .then(res => {
        if (res.data.data) {
          let results = [];

          res.data.data.forEach(function(entry) {
            let points = 0;

            if (entry.content && entry.content.length > 0) {
              entry.content.forEach(function(entry) {
                points += entry.points;
              });
            }

            let module = {
              _id: entry._id,
              name: entry.name,
              cat: entry.cat,
              type: entry.type,
              author: entry.author,
              points: points
            };
            results.push(module);
          });

          setModules(results);
          setStatus("success");
        }
      })
      .catch(err => {
        setStatus("error");
        setMessage(err.message);
      });
  }, [fetchSignal, fetchModules, fetchUser]);

  const deleteModules = rows => {
    setStatus("loading");

    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "modules/deleteModules", {
        selectedModules: rows
      })
      .then(res => {
        setMessage("Module(s) successfully deleted");
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
      title: "Do you want to delete this module?",
      text: "You are about to delete this module. Are you sure about it?",
      icon: "warning",
      buttons: ["No", "Yes"]
    }).then(function(isConfirm) {
      if (isConfirm) {
        deleteModules([row]);
      }
    });
  };

  const handleRemoveAll = () => {
    swal({
      title: "Do you want to delete selection?",
      text: "You are about to delete these modules. Are you sure about it?",
      icon: "warning",
      buttons: ["No", "Yes"]
    }).then(function(isConfirm) {
      if (isConfirm) {
        deleteModules(selected);
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
      name: "Category",
      selector: "cat",
      sortable: true,
      wrap: true
    },
    {
      name: "Type",
      selector: "type",
      sortable: true,
      wrap: true
    },
    {
      name: "Max points",
      selector: "points",
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
              <Link to={{ pathname: `/edit-module/${row._id}` }}>
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
          ) : (
            <Link to={{ pathname: `/enter-module/${row._id}` }}>
              <Button variant="info" className="ml-1 mr-1">
                <FontIcon icon="eye" />
              </Button>
            </Link>
          )}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      minWidth: isEditable ? "150px" : "100px",
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
          data={modules}
          customStyles={customStyle}
          highlightOnHover
          responsive
          pagination
          noDataComponent={noModulesMessage}
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
            <Link to="/add-module">
              <Button variant="warning" className="mr-3">
                <FontIcon icon="plus" />
                <b> New module</b>
              </Button>
            </Link>
          }
        />
      </div>
      <EmptyLine level="2" />
      <ServerStatus status={status} message={message} />
    </div>
  );
}

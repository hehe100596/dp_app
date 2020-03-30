import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import swal from "sweetalert";

import { globalApiInstance } from "../../utils/api";

import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { ServerStatus } from "../organisms/ServerStatus";

export function ModuleContent({ moduleId, changeTab }) {
  const [fetchSignal, setFetchSignal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [type, setType] = useState(null);
  const [segmentType, setSegmentType] = useState("HTML");
  const [segments, setSegments] = useState([]);

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "modules/getModule", {
        module: moduleId
      })
      .then(res => {
        setType(res.data.data.type);
        setSegments(res.data.data.content);
        setStatus("success");
      })
      .catch(err => {
        setStatus("error");
        setMessage(err.message);
      });
  }, [moduleId, fetchSignal]);

  const finishModule = () => {
    changeTab("redirect");
  };

  const removeSegments = rows => {
    setStatus("loading");

    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "modules/removeSegments", {
        module: moduleId,
        selectedSegments: rows
      })
      .then(res => {
        setMessage("Segment(s) successfully removed");
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
      title: "Do you want to remove this segment?",
      text: "You are about to remove this segment. Are you sure about it?",
      icon: "warning",
      buttons: ["No", "Yes"]
    }).then(function(isConfirm) {
      if (isConfirm) {
        removeSegments([row]);
      }
    });
  };

  const handleRemoveAll = () => {
    swal({
      title: "Do you want to remove these segments?",
      text: "You are about to remove these segments. Are you sure about it?",
      icon: "warning",
      buttons: ["No", "Yes"]
    }).then(function(isConfirm) {
      if (isConfirm) {
        removeSegments(selected);
      }
    });
  };

  const addSegment = () => {
    setStatus("loading");

    // TODO: Fix adding segments (with modal)!
    let segment = {
      name: "pokus",
      sType: segmentType,
      rqmt: "rqmt",
      points: 0,
      data: "pokus"
    };

    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "modules/addNewSegment", {
        moduleId: moduleId,
        segment: segment
      })
      .then(res => {
        setFetchSignal(!fetchSignal);
        setMessage("Segment successfully added");
      })
      .catch(err => {
        setStatus("error");
        setMessage(err.message);
      });
  };

  const handleEdit = row => {
    setStatus("loading");

    // TODO: Fix editing segments (with modal)!
    console.log(row._id + row.sType);
  };

  const updateSegmentsOrder = segments => {
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "modules/updateSegmentsOrder", {
        moduleId: moduleId,
        segments: segments
      })
      .then(res => {
        setFetchSignal(!fetchSignal);
        setMessage("Segment successfully moved");
      })
      .catch(err => {
        setStatus("error");
        setMessage(err.message);
      });
  };

  const moveUp = row => {
    setStatus("loading");

    let currentPos = segments.indexOf(row);
    segments[currentPos] = segments[currentPos - 1];
    segments[currentPos - 1] = row;

    updateSegmentsOrder(segments);
  };

  const moveDown = row => {
    setStatus("loading");

    let currentPos = segments.indexOf(row);
    segments[currentPos] = segments[currentPos + 1];
    segments[currentPos + 1] = row;

    updateSegmentsOrder(segments);
  };

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      wrap: true
    },
    {
      name: "Type",
      selector: "sType",
      sortable: true,
      wrap: true
    },
    {
      name: "Requirement",
      selector: "rqmt",
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
        <div>
          <Button
            variant="secondary"
            className="ml-1 mr-1"
            onClick={e => moveUp(row)}
            disabled={segments.indexOf(row) === 0}
          >
            <i className="fa fa-long-arrow-alt-up" />
          </Button>
          <Button
            variant="info"
            className="ml-1 mr-1"
            onClick={e => handleEdit(row)}
          >
            <i className="fa fa-folder-open fa-fw" />
          </Button>
          <Button
            variant="danger"
            className="ml-1 mr-1"
            onClick={e => handleRemove(row)}
          >
            <i className="fa fa-folder-minus fa-fw" />
          </Button>
          <Button
            variant="secondary"
            className="ml-1 mr-1"
            onClick={e => moveDown(row)}
            disabled={segments.indexOf(row) === segments.length - 1}
          >
            <i className="fa fa-long-arrow-alt-down" />
          </Button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      minWidth: "220px",
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
          data={segments}
          customStyles={customStyle}
          highlightOnHover
          responsive
          pagination
          noDataComponent={"This module is currently empty"}
          selectableRows
          subHeader
          subHeaderAlign="right"
          onSelectedRowsChange={state => setSelected(state.selectedRows)}
          clearSelectedRows={fetchSignal}
          contextActions={
            <Button variant="danger" className="mr-3" onClick={handleRemoveAll}>
              <i className="fa fa-folder-minus fa-fw" />
              <b> Remove</b>
            </Button>
          }
          subHeaderComponent={
            <>
              {type === "Info" ? (
                <select
                  className="mr-3"
                  style={{ width: "250px", height: "30px" }}
                  value={segmentType}
                  onChange={e => setSegmentType(e.target.value)}
                >
                  <option value="HTML">HTML</option>
                </select>
              ) : null /* TODO: Add "Test" type! */}
              <Button variant="success" className="mr-3" onClick={addSegment}>
                <i className="fa fa-folder-plus fa-fw" />
                <b> Add segment</b>
              </Button>
            </>
          }
        />
      </div>
      <EmptyLine level="2" />
      <ServerStatus status={status} message={message} />
      {changeTab ? (
        <>
          <EmptyLine level="2" />
          <Button
            className={"btn btn-primary"}
            style={{ width: "200px" }}
            type="button"
            onClick={finishModule}
          >
            <b>Finish module</b>
          </Button>
        </>
      ) : null}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import swal from "sweetalert";

import { globalApiInstance } from "../../utils/api";

import { FontIcon } from "../atoms/FontIcon";
import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { ServerStatus } from "../organisms/ServerStatus";
import { InfoSegmentsModal } from "../organisms/InfoSegmentsModal";
import { TestSegmentsModal } from "../organisms/TestSegmentsModal";

export function ModuleContent({ moduleId, changeTab }) {
  const [segmentId, setSegmentId] = useState(null);

  const [fetchSignal, setFetchSignal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [type, setType] = useState(null);
  const [segmentType, setSegmentType] = useState("HTML");
  const [segments, setSegments] = useState([]);

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(null);

  const closeModal = (isExit) => {
    setSegmentId(null);
    setStatus("idle");
    if (!isExit) setFetchSignal(!fetchSignal);
  };

  useEffect(() => {
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "modules/getModule", {
        module: moduleId,
      })
      .then((res) => {
        setType(res.data.data.type);
        setSegments(res.data.data.content);
        setStatus("success");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message);
      });
  }, [moduleId, fetchSignal]);

  const finishModule = () => {
    changeTab("redirect");
  };

  const removeSegments = (rows) => {
    setStatus("loading");

    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "modules/removeSegments", {
        module: moduleId,
        selectedSegments: rows,
      })
      .then((res) => {
        setMessage("Segment(s) successfully removed");
        setFetchSignal(!fetchSignal);
        setSelected(null);
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message);
      });
  };

  const handleRemove = (row) => {
    swal({
      title: "Do you want to remove this part?",
      text: "You are about to remove this part. Are you sure about it?",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then(function (isConfirm) {
      if (isConfirm) {
        removeSegments([row]);
      }
    });
  };

  const handleRemoveAll = () => {
    swal({
      title: "Do you want to remove these parts?",
      text: "You are about to remove these parts. Are you sure about it?",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then(function (isConfirm) {
      if (isConfirm) {
        removeSegments(selected);
      }
    });
  };

  const addSegment = () => {
    setSegmentId("new");
  };

  const handleEdit = (row) => {
    setSegmentType(row.sType);
    setSegmentId(row._id);
  };

  const updateSegmentsOrder = (segments) => {
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "modules/updateSegmentsOrder", {
        moduleId: moduleId,
        segments: segments,
      })
      .then((res) => {
        setFetchSignal(!fetchSignal);
        setMessage("Segment successfully moved");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message);
      });
  };

  const moveUp = (row) => {
    setStatus("loading");

    let currentPos = segments.indexOf(row);
    segments[currentPos] = segments[currentPos - 1];
    segments[currentPos - 1] = row;

    updateSegmentsOrder(segments);
  };

  const moveDown = (row) => {
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
      wrap: true,
    },
    {
      name: "Type",
      selector: "sType",
      sortable: true,
      wrap: true,
    },
    {
      name: "Required time",
      selector: "rqmt",
      sortable: true,
      wrap: true,
      omit: type !== "Info",
    },
    {
      name: "Points",
      selector: "points",
      sortable: true,
      wrap: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Button
            variant="primary"
            className="ml-1 mr-1"
            onClick={(e) => handleEdit(row)}
          >
            <FontIcon icon="folder-open" />
          </Button>
          <Button
            variant="danger"
            className="ml-1 mr-1"
            onClick={(e) => handleRemove(row)}
          >
            <FontIcon icon="folder-minus" />
          </Button>
          <Button
            variant="secondary"
            className="ml-1 mr-1"
            onClick={(e) => moveDown(row)}
            disabled={segments.indexOf(row) === segments.length - 1}
          >
            <FontIcon icon="long-arrow-alt-down" />
          </Button>
          <Button
            variant="secondary"
            className="ml-1 mr-1"
            onClick={(e) => moveUp(row)}
            disabled={segments.indexOf(row) === 0}
          >
            <FontIcon icon="long-arrow-alt-up" />
          </Button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      minWidth: "220px",
      button: true,
    },
  ];

  const customStyle = {
    headCells: {
      style: {
        fontSize: "16px",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
      },
    },
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
          onSelectedRowsChange={(state) => setSelected(state.selectedRows)}
          clearSelectedRows={fetchSignal}
          contextActions={
            <Button variant="danger" className="mr-3" onClick={handleRemoveAll}>
              <FontIcon icon="folder-minus" />
              <b> Remove</b>
            </Button>
          }
          subHeaderComponent={
            <>
              <select
                className="mr-3"
                style={{ width: "250px", height: "30px" }}
                value={segmentType}
                onChange={(e) => setSegmentType(e.target.value)}
              >
                <option value="HTML">HTML</option>
                {type === "Info" ? (
                  <option value="Video or media">Video or media</option>
                ) : (
                  <>
                    <option value="One correct choice">
                      One correct choice
                    </option>
                    <option value="Multiple correct choices">
                      Multiple correct choices
                    </option>
                    <option value="Text answer">Text answer</option>
                  </>
                )}
              </select>
              <Button variant="warning" className="mr-3" onClick={addSegment}>
                <FontIcon icon="folder-plus" />
                <b> Add segment</b>
              </Button>
            </>
          }
        />
      </div>
      {type === "Info" ? (
        <InfoSegmentsModal
          segmentId={segmentId}
          moduleId={moduleId}
          type={segmentType}
          closeModal={closeModal}
        />
      ) : (
        <TestSegmentsModal
          segmentId={segmentId}
          moduleId={moduleId}
          type={segmentType}
          closeModal={closeModal}
        />
      )}
      <EmptyLine level="2" />
      <ServerStatus status={status} message={message} />
      <EmptyLine level="1" />
      {changeTab ? (
        <Button
          className={"btn btn-success"}
          style={{ width: "200px" }}
          type="button"
          onClick={finishModule}
        >
          <b>Finish module</b>
        </Button>
      ) : (
        <Link to={{ pathname: `/enter-module/${moduleId}` }}>
          <Button className={"btn btn-info"} style={{ width: "200px" }}>
            <b>Preview</b>
          </Button>
        </Link>
      )}
    </div>
  );
}

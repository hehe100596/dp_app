import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import swal from "sweetalert";

import { globalApiInstance } from "../../utils/api";

import { FontIcon } from "../atoms/FontIcon";
import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { ServerStatus } from "../organisms/ServerStatus";
import { SectionsModal } from "../organisms/SectionsModal";

export function CourseContent({ courseId, changeTab }) {
  const [sectionId, setSectionId] = useState(null);

  const [fetchSignal, setFetchSignal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [sections, setSections] = useState([]);

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(null);

  const closeModal = (isExit) => {
    setSectionId(null);
    setStatus("idle");
    if (!isExit) setFetchSignal(!fetchSignal);
  };

  useEffect(() => {
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "courses/getCourse", {
        course: courseId,
      })
      .then((res) => {
        setSections(res.data.data.content);
        setStatus("success");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message);
      });
  }, [courseId, fetchSignal]);

  const finishCourse = () => {
    changeTab("redirect");
  };

  const removeSections = (rows) => {
    setStatus("loading");

    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "courses/removeSections", {
        course: courseId,
        selectedSections: rows,
      })
      .then((res) => {
        setMessage("Section(s) successfully removed");
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
        removeSections([row]);
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
        removeSections(selected);
      }
    });
  };

  const addSection = () => {
    setSectionId("new");
  };

  const handleEdit = (row) => {
    setSectionId(row._id);
  };

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      wrap: true,
    },
    {
      name: "Points for unlocking",
      selector: "unlockPoints",
      sortable: true,
      wrap: true,
    },
    {
      name: "Rewarded points",
      selector: "rewardPoints",
      sortable: true,
      wrap: true,
    },
    {
      name: "Minimum requirement",
      selector: "minPoints",
      sortable: true,
      wrap: true,
    },
    {
      name: "Penalty",
      selector: "penalty",
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
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      minWidth: "150px",
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
          data={sections}
          customStyles={customStyle}
          highlightOnHover
          responsive
          pagination
          noDataComponent={"This course is currently empty"}
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
            <Button variant="warning" className="mr-3" onClick={addSection}>
              <FontIcon icon="folder-plus" />
              <b> Add section</b>
            </Button>
          }
        />
      </div>
      <SectionsModal
        sectionId={sectionId}
        courseId={courseId}
        closeModal={closeModal}
      />
      <EmptyLine level="2" />
      <ServerStatus status={status} message={message} />
      <EmptyLine level="1" />
      {changeTab ? (
        <Button
          className={"btn btn-success"}
          style={{ width: "200px" }}
          type="button"
          onClick={finishCourse}
        >
          <b>Finish course</b>
        </Button>
      ) : (
        <Link to={{ pathname: `/enter-course/${courseId}` }}>
          <Button className={"btn btn-info"} style={{ width: "200px" }}>
            <b>Preview</b>
          </Button>
        </Link>
      )}
    </div>
  );
}

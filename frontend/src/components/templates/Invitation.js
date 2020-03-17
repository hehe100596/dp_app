import React, { useState, useEffect } from "react";

import { globalApiInstance } from "../../utils/api";

import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { ServerStatus } from "../organisms/ServerStatus";

export function Invitation({ user, link }) {
  const [invite, setInvite] = useState([]);

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "invites/getInviteLink", {
        link: link
      })
      .then(res => {
        setStatus("idle");
        setInvite(res.data.data);
      })
      .catch(err => {
        setStatus("error");
        setMessage(err.message);
      });
  }, [link]);

  function giveAccess() {
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "courses/giveAccess", {
        course: invite.courseId,
        user: user
      })
      .then(res => {
        setStatus("success");
        setMessage("You can now see this course among Courses");
      })
      .catch(err => {
        setStatus("error");
        setMessage(err.message);
      });
    return 0;
  }

  function acceptInvite() {
    setStatus("loading");
    globalApiInstance
      .post(process.env.REACT_APP_BASE_API + "courses/getCourseWithAccess", {
        course: invite.courseId,
        user: user
      })
      .then(res => {
        if (res.data.data) {
          setStatus("error");
          setMessage("You already have access to this course");
        } else {
          giveAccess();
        }
      })
      .catch(err => {
        setStatus("error");
        setMessage(err.message);
      });
    return 0;
  }

  return (
    <div align="center">
      {invite ? (
        <div>
          Invitation to course <b>{invite.courseName}</b>
          <EmptyLine level="1" />
          <Button
            className={"btn btn-info"}
            style={{ width: "200px" }}
            type="button"
            onClick={acceptInvite}
          >
            <b>Accept Invitation</b>
          </Button>
        </div>
      ) : (
        <b>This invitation is either invalid or no longer active</b>
      )}
      <EmptyLine level="1" />
      <ServerStatus status={status} message={message} />
    </div>
  );
}

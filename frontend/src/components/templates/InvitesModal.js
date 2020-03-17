import React, { useState } from "react";
import Modal from "react-modal";

import { Heading } from "../atoms/Heading";
import { Button } from "../atoms/Button";
import { EmptyLine } from "../atoms/EmptyLine";
import { ServerStatus } from "../organisms/ServerStatus";

export function InvitesModal({ inviteTo, courseName, closeInvite }) {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [expiration, setExpiration] = useState("20");

  const closeInviteModal = () => {
    setStatus(null);
    setMessage(null);
    setExpiration("20");
    closeInvite();
  };

  const handleChange = event => {
    setExpiration(event.target.value);
  };

  const generateLink = () => {
    setStatus("loading");

    const baseUrl = window.location.origin + "/invites/";

    const inviteLinkId =
      "$2b$10$5Qtou7OOVv.1cNCSWTuzQ.CKjEEBFxdUMJGpJbQgemBS9ohIUqamW";

    const inviteLink = baseUrl + inviteLinkId;

    console.log(inviteTo, expiration);

    setStatus("success");
    setMessage(inviteLink);
  };

  const copyToClipboard = () => {
    const dummy = document.createElement("input");
    document.body.appendChild(dummy);

    dummy.setAttribute("value", message);
    dummy.select();

    document.execCommand("copy");
    document.body.removeChild(dummy);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };

  return (
    <Modal
      isOpen={inviteTo != null}
      onRequestClose={closeInviteModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div align="center">
        <Heading level="2">CREATE INVITE LINK</Heading>
        <EmptyLine level="2" />
        {status !== "success" ? (
          <div>
            <b>Invite other people to following course:</b>
            <EmptyLine level="1" />
            <input
              type="text"
              value={courseName}
              style={{ width: "300px", height: "30px" }}
              disabled
            />
            <EmptyLine level="2" />
            <b>Select expiration time of invite link:</b>
            <EmptyLine level="1" />
            <select
              value={expiration}
              style={{ width: "300px", height: "30px" }}
              onChange={handleChange}
            >
              <option value="20">20 minutes</option>
              <option value="60">1 hour</option>
              <option value="1440">1 day</option>
              <option value="4320">3 days</option>
              <option value="10080">1 week</option>
              <option value="0">never</option>
            </select>
            <EmptyLine level="1" />
          </div>
        ) : (
          <b>Following invite link has been successfully generated:</b>
        )}
        <EmptyLine level="1" />
        <ServerStatus status={status} message={message} />
        <EmptyLine level="2" />
        {status !== "success" ? (
          <Button
            className={"btn btn-success mr-2"}
            style={{ width: "150px" }}
            type="submit"
            onClick={generateLink}
          >
            <b>Next</b>
          </Button>
        ) : (
          <Button
            className={"btn btn-info mr-2"}
            style={{ width: "150px" }}
            type="button"
            onClick={copyToClipboard}
          >
            <b>Copy</b>
          </Button>
        )}
        <Button
          className={"btn btn-danger"}
          style={{ width: "150px" }}
          type="button"
          onClick={closeInviteModal}
        >
          <b>Close</b>
        </Button>
      </div>
    </Modal>
  );
}

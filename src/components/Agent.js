import React, { useEffect, useState } from "react";

import axios from "axios";
import { ticket } from "../db/schemas/ticket";

import "../styles/Agent.css";

import logo from "../icons/Logo.svg";
import notification from "../icons/notification.svg";

import ActiveTicket from "./ActiveTicket";
import AllTickets from "./AllTickets";

export default function Agent() {
  const [tickets, setTickets] = React.useState([]);
  const [comment, setComment] = React.useState("");
  const [status, setStatus] = React.useState("");

  const [assignedTicketSelected, setAssignedTicketSelected] = useState(true);
  const [allTicketsSelected, setAllTicketsSelected] = useState(false);
  const user = localStorage.getItem("currentUser");
  const currentUser = JSON.parse(user);

  useEffect(() => {
    axios({
      method: "GET",
      url: "agent/" + currentUser.username,
    })
      .then((result) => {
        console.log(result);
        setTickets(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "status") {
      setStatus(e.target.value);
    } else if (e.target.name === "comment") {
      setComment(e.target.value);
    }
  };
  const onSubmit = (e, ticket) => {
    e.preventDefault();

    console.log(ticket, comment, status);

    let updateData = {
      id: ticket._id,
      agentComment: comment,
      status: status,
    };

    axios({
      method: "PUT",
      url: "/agent",
      data: updateData,
    })
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelection = (e) => {
    switch (e.target.id) {
      case "assignedTicketSelected":
        setAssignedTicketSelected(true);
        setAllTicketsSelected(false);
        break;
      case "allTicketsSelected":
        setAssignedTicketSelected(false);
        setAllTicketsSelected(true);
        break;
    }
  };

  return (
    <>
      <div className="agent-titleBar">
        <div className="agent-logo-container">
          <img src={logo} alt="logo" />
        </div>
        <div className="agent-title-container">Agent Page</div>
        <div className="agent-notification-container">
          <img src={notification} alt="notification icon" />
        </div>
        <div className="agent-account-container">
          <h4>User's Name</h4>
        </div>
      </div>
      <div className="agent-navBar">
        <div
          className="agent-navBar-button"
          id="assignedTicketSelected"
          onClick={(e) => handleSelection(e)}
          style={{
            backgroundColor: assignedTicketSelected ? "#1a2a55" : "white",
            color: assignedTicketSelected ? "white" : "black",
          }}
        >
          Assigned Tickets
        </div>
        <div
          className="agent-navBar-button"
          id="allTicketsSelected"
          onClick={(e) => handleSelection(e)}
          style={{
            backgroundColor: allTicketsSelected ? "#1a2a55" : "white",
            color: allTicketsSelected ? "white" : "black",
          }}
        >
          All Tickets
        </div>
      </div>
      <div>
        {assignedTicketSelected ? (
          <ActiveTicket />
        ) : allTicketsSelected ? (
          <AllTickets />
        ) : (
          <></>
        )}
      </div>
      {/* // <div className="agent-container"> 
    {/* //   <h1>Agent Page</h1> 

    {/* ///   {tickets.map((ticket) => ( *
    //     <div className="ticket-container">
    //       <form onSubmit={(e) => onSubmit(e, ticket)}>
    //         <div className="ticket-info">
    //           <p>Description: {ticket.description}</p>
    //           <p>Created By: {ticket.createdBy}</p>
    //           <p>Priority: {ticket.priority}</p>
    //         </div>
    //         <div className="comment-container">
    //           <textarea
    //             placeholder="Add Comment"
    //             name="comment"
    //             onChange={(e) => handleChange(e)}
    //           ></textarea>
    //         </div>
    //         <div className="status-container">
    //           <select name="status" onChange={(e) => handleChange(e)}>
    //             <option defaultValue=""></option>
    //             <option value="OPEN">Open</option>
    //             <option value="CLOSED">Closed</option>
    //           </select>
    //         </div>
    //         <div className="update-button-container">
    //           <input
    //             className="update-button"
    //             type="submit"
    //             value="Update Ticket"
    //           />
    //         </div>
    //       </form>
    //     </div>
    //   ))}
    // </div>*/}
    </>
  );
}

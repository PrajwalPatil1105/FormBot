import React, { useEffect, useState } from "react";
import styles from "../Popup_Components/Share.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";

function Share({ Mode, setsharepopup, selectedWorkspace }) {
  const [sharedEmail, setsharedEmail] = useState("");
  const [accesslevel, setaccesslevel] = useState("edit");
  const [err, seterr] = useState("");
  const [serMsg, setserMsg] = useState("");
  // const workspaceId = localStorage.getItem("Workspaceid");

  // useEffect(() => {
  //   console.log(workspaceId);
  //   console.log(selectedWorkspace);
  // }, []);

  async function sendlink() {
    if (sharedEmail.length <= 2) {
      seterr("* Enter Email Address");
    } else if (!sharedEmail.includes("@")) {
      seterr("* Enter Valid Email");
    } else {
      seterr("");

      try {
        const response = await fetch(
          "http://localhost:4000/Formbot/workspaces/share",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sharedEmail,
              workspaceId: selectedWorkspace,
              accesslevel,
            }),
            credentials: "include",
          }
        );
        const data = await response.json();
        setserMsg(data);
      } catch (error) {
        console.error("Error sharing workspace:", error);
        setMessage("An error occurred while sharing the workspace.");
      }
    }
  }

  useEffect(() => {
    if (serMsg?.code === "0") {
      toast.error(serMsg?.message);
    } else if (serMsg?.code === "1") {
      toast.success(serMsg?.message);
    }
  }, [serMsg]);

  return (
    <>
      <section
        className={styles.popupdiv}
        style={{
          backgroundColor: Mode === "dark" ? "rgba(24, 24, 27, 1)" : "white",
          color: Mode === "dark" ? "white" : "rgba(24, 24, 27, 1)",
          boxShadow:
            Mode === "dark"
              ? "0px 0px 5.8px 0px rgba(255, 255, 255, 0.25)"
              : "0px 0px 5.8px 0px rgb(0, 0, 0)",
        }}
      >
        <button className={styles.close} onClick={() => setsharepopup(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <select
          className={styles.accessopt}
          style={{
            backgroundColor: Mode === "dark" ? "rgba(24, 24, 27, 1)" : "white",
            color: Mode === "dark" ? "white" : "rgba(24, 24, 27, 1)",
          }}
          onChange={(e) => setaccesslevel(e.target.value)}
        >
          <option value="edit" selected>
            Edit
          </option>
          <option value="view">View</option>
        </select>
        <h1 className={styles.headings}>Invite by Email</h1>
        <div className={styles.errdiv}>
          <p>{err}</p>
        </div>
        <input
          type="text"
          value={sharedEmail}
          className={styles.input}
          onChange={(e) => setsharedEmail(e.target.value)}
          placeholder="Enter email id"
          style={{
            backgroundColor: Mode === "dark" ? "rgb(36, 36, 38)" : "#d4c5c5",
            color: Mode === "dark" ? "white" : "rgb(0, 0, 0)",
          }}
        />
        <div className={styles.popupbtns}>
          <button onClick={sendlink}>Send Invite</button>
          <h1 className={styles.line}>Invite by link</h1>
          <button>Copy link</button>
        </div>
      </section>
    </>
  );
}

export default Share;

import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./JoinWorkspace.module.css";
import toast from "react-hot-toast";

function JoinWorkspace() {
  const { workspaceId, accesslevel } = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const currentPath = window.location.pathname;

  useEffect(() => {
    const checkAuthAndJoin = async () => {
      try {
        const authCheckResponse = await fetch(
          `${BASE_URL}/Formbot/check-auth`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const authData = await authCheckResponse.json();
        if (authData?.code === "0") {
          localStorage.setItem("postLoginRedirect", currentPath);
          navigate("/login");
          return;
        } else {
          navigate("/dashboard");
        }
      } catch (error) {
        console.log("Error joining workspace:");
        toast.error("Failed to join workspace");
      }
    };
    checkAuthAndJoin();
  }, [workspaceId, accesslevel, navigate]);

  return (
    <div className={styles.container}>
      {/* Animated Loading Spinner */}
      <div className={styles.spinner}></div>

      {/* Loading Text */}
      <p className={styles.text}>Processing your request...</p>
    </div>
  );
}

export default JoinWorkspace;

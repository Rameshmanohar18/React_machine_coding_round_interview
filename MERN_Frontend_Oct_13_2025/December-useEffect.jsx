import { useState, useEffect } from "react";

function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div>
      Status:{" "}
      <span style={{ color: isOnline ? "green" : "red" }}>
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>
  );
}

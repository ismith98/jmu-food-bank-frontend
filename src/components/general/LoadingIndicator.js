import React from "react";

export default function LoadingIndicator() {
  return (
    <>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <span style={{ display: "block" }}>
        If inventory doesn't load, refresh the page
      </span>
    </>
  );
}

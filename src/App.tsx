import { Outlet } from "react-router-dom";
import { Global } from "@emotion/react";

function App() {
  return (
    <>
      <Global
        styles={{
          body: {
            margin: 0,
            minHeight: "100vh",
            fontFamily: "Arial, Helvetica, sans-serif",
          },
        }}
      />
      <Outlet />
    </>
  );
}

export default App;

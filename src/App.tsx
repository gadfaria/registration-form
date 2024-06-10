import { useEffect } from "react";
import Registration from "./pages/Registration";

function App() {
  useEffect(() => {
    console.log("[RENDER] App");
  }, []);

  return (
    <div>
      <Registration />
    </div>
  );
}

export default App;

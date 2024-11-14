import { Toaster } from "sonner";
import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <AppRouter />
    </>
  );
}

export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./routers/AppRouter";
import Scrollbars from "rc-scrollbars";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Scrollbars
          style={{ maxWidth: "100vw", height: "100vh" }}
          autoHide
          renderTrackVertical={(props) => (
            <div {...props} className="track-vertical z-[9999]" />
          )}
        >
          <AppRouter />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </Scrollbars>
      </QueryClientProvider>
    </>
  );
}

export default App;

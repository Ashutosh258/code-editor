import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./screens/homeScreen/index.js";
import { PlaygroundScreen } from "./screens/playgroundScreen/index.js";
import { PlaygroundProvider } from "./Providers/PlaygroundProvider.js";
import { ModalProvider } from "./Providers/ModalProvider.js";
function App() {
  return (
    <PlaygroundProvider>
      <ModalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/playground" element={<PlaygroundScreen />} />
        </Routes>
      </BrowserRouter>
      </ModalProvider>
    </PlaygroundProvider>
  );
}

export default App;

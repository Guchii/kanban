import Header from "@/components/header";
import { AppContextProvider } from "@/providers";

function App() {
  return (
    <AppContextProvider>
      <Header />
      <main>hello</main>
    </AppContextProvider>
  );
}

export default App;

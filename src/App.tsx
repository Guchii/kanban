import Header from "@/components/header";
import { useFetch } from "@/hooks/use-fetch";
import { AppContextProvider } from "@/providers";

type FetchDataType = {
  ticket: Array<{
    id: string;
    title: string;
    tag: string[];
    userId: string;
    status: string;
    priority: number;
  }>;
  user: Array<{
    id: string;
    name: string;
    available: boolean;
  }>;
};

function App() {
  const { data, error } = useFetch<FetchDataType>(import.meta.env.VITE_API_URL);
  return (
    <AppContextProvider>
      <Header />
      <main
        style={{
          padding: "32px",
        }}
      >
        {error ? <p>{error.message}</p> : null}{" "}
        {data ? <p>{JSON.stringify(data)}</p> : null}
      </main>
    </AppContextProvider>
  );
}

export default App;

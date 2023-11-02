import { useFetch } from "@/hooks/use-fetch";
import { useAppContext } from "@/hooks/use-context";
import { useMemo } from "react";
import Ticket from "./components/ticket";

export type FetchDataType = {
  tickets: Array<{
    id: string;
    title: string;
    tag: string[];
    userId: string;
    status: string;
    priority: number;
  }>;
  users: Array<{
    id: string;
    name: string;
    available: boolean;
  }>;
};

function App() {
  const { data, error } = useFetch<FetchDataType>(import.meta.env.VITE_API_URL);
  const [{ sorting, grouping }] = useAppContext();
  const tickets = useMemo(() => {
    const fieldName =
      grouping === "user"
        ? "userId"
        : grouping === "priority"
        ? "priority"
        : "status";
    return (
      data?.tickets.reduce((acc, ticket) => {
        if (acc[ticket[fieldName]]) {
          acc[ticket[fieldName]].push(ticket);
        } else {
          acc[ticket[fieldName]] = [ticket];
        }
        // sort all tickets by title or priority
        if (sorting === "title")
          Object.entries(acc).map(([key]) => {
            acc[key].sort((a, b) =>
              a.title.toLowerCase().localeCompare(b.title.toLowerCase())
            );
          });
        else {
          Object.entries(acc).map(([key]) => {
            acc[key].sort((a, b) => {
              return a.priority - b.priority;
            });
          });
        }
        return acc;
      }, {} as Record<string, typeof data.tickets>) || {}
    );
  }, [data, grouping, sorting]);

  const users = useMemo(() => {
    return (
      data?.users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {} as Record<string, (typeof data.users)[number]>) || {}
    );
  }, [data]);

  return (
    <main
      style={{
        padding: "32px",
      }}
    >
      {error ? <p>{error.message}</p> : null}{" "}
      {!data ? (
        <p>loading...</p>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "16px",
            }}
          >
            {grouping === "user" ? (
              <>
                {Object.entries(tickets).map(([user, tickets]) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                      key={user}
                    >
                      {tickets.map((ticket) => (
                        <Ticket
                          key={ticket.id}
                          user={
                            users?.[user] ?? {
                              available: false,
                              id: "",
                              name: "",
                            }
                          }
                          ticket={ticket}
                        />
                      ))}
                    </div>
                  );
                })}
              </>
            ) : grouping === "priority" ? (
              <>
                {Object.entries(tickets).map(([priority, tickets]) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                      key={priority}
                    >
                      {tickets.map((ticket) => (
                        <Ticket
                          key={ticket.id}
                          user={
                            users?.[ticket.userId] ?? {
                              available: false,
                              id: "",
                              name: "",
                            }
                          }
                          ticket={ticket}
                        />
                      ))}
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {Object.entries(tickets).map(([status, tickets]) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                      key={status}
                    >
                      {tickets.map((ticket) => (
                        <Ticket
                          key={ticket.id}
                          user={
                            users?.[ticket.userId] ?? {
                              available: false,
                              id: "",
                              name: "",
                            }
                          }
                          ticket={ticket}
                        />
                      ))}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </>
      )}
    </main>
  );
}

export default App;

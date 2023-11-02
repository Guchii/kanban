import { useMemo } from "react";

import { useFetch } from "@/hooks/use-fetch";
import { useAppContext } from "@/hooks/use-context";
import Ticket from "@/components/ticket";
import {
  AlertCircle,
  CheckCheckIcon,
  Circle,
  CircleDashed,
  LucideIcon,
  Minus,
  MoreHorizontal,
  PlusIcon,
  SignalHigh,
  SignalLow,
  SignalMedium,
  X,
} from "lucide-react";

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

export const PriorityMap = new Map<number, [string, LucideIcon]>([
  [4, ["No Priority", Minus]],
  [0, ["Urgent", AlertCircle]],
  [1, ["High", SignalHigh]],
  [2, ["Medium", SignalMedium]],
  [3, ["Low", SignalLow]],
]);

export const StatusMap = new Map<string, [LucideIcon]>([
  ["Todo", [Circle]],
  ["In progress", [CircleDashed]],
  ["Backlog", [AlertCircle]],
  ["Done", [CheckCheckIcon]],
  ["Canceled", [X]],
]);
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
        height: "calc(100vh - 80px)",
        overflow: "auto",
        padding: "32px",
      }}
    >
      {error ? <p>{error.message}</p> : null}
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
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <div
                          style={{
                            borderRadius: 25,
                            width: 24,
                            height: 24,
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              width: 10,
                              height: 10,
                              position: "absolute",
                              bottom: 0,
                              right: 0,
                              background: users[user].available
                                ? "#7FFFD4"
                                : "#a5a6a9",
                              borderRadius: 4000,
                            }}
                          />
                          <img
                            src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${users[user].name}`}
                            style={{ borderRadius: 4000, zIndex: -100 }}
                            width={24}
                            height={24}
                            alt={users[user].name}
                          />
                        </div>
                        <span
                          style={{
                            textTransform: "capitalize",
                          }}
                        >
                          {users?.[user].name ?? "Unknown"}
                        </span>
                        <span
                          style={{
                            marginRight: "auto",
                            color: "#5b5c5f",
                          }}
                        >
                          {tickets.length}
                        </span>
                        <PlusIcon height={16} cursor={"pointer"} />
                        <MoreHorizontal height={16} cursor={"pointer"} />
                      </div>
                      {tickets.map((ticket) => (
                        <Ticket
                          key={ticket.id}
                          hideUser
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
                {Array.from(PriorityMap.keys()).map((priority) => {
                  const myTickets = tickets[priority];
                  const [text, Icon] = PriorityMap.get(priority) as [
                    string,
                    LucideIcon
                  ];
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                      key={priority}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Icon
                          height={16}
                          color={priority === 0 ? "orange" : undefined}
                        />
                        <span
                          style={{
                            textTransform: "capitalize",
                          }}
                        >
                          {text}
                        </span>
                        <span
                          style={{
                            marginRight: "auto",
                          }}
                        >
                          {myTickets.length}
                        </span>
                        <PlusIcon height={16} cursor={"pointer"} />
                        <MoreHorizontal height={16} cursor={"pointer"} />
                      </div>

                      {myTickets.map((ticket) => (
                        <Ticket
                          key={ticket.id}
                          hidePriority
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
                {Array.from(StatusMap.keys()).map((status) => {
                  const [Icon] = StatusMap.get(status) as [LucideIcon];
                  const myTickets = tickets[status] ?? [];
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                      key={status}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Icon height={16} />
                        <span
                          style={{
                            textTransform: "capitalize",
                          }}
                        >
                          {status}
                        </span>
                        <span
                          style={{
                            marginRight: "auto",
                            color: "#5b5c5f",
                          }}
                        >
                          {myTickets.length}
                        </span>
                        <PlusIcon height={16} cursor={"pointer"} />
                        <MoreHorizontal height={16} cursor={"pointer"} />
                      </div>
                      {myTickets.map((ticket) => (
                        <Ticket
                          key={ticket.id}
                          hideStatus
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

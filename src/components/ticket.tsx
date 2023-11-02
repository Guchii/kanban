import { FetchDataType, PriorityMap, StatusMap } from "@/App";
import { FileX, LucideIcon } from "lucide-react";

interface TicketProps {
  ticket: FetchDataType["tickets"][number];
  user: FetchDataType["users"][number];
  hideUser?: boolean;
  hidePriority?: boolean;
  hideStatus?: boolean;
}

function Ticket({
  ticket,
  user,
  hidePriority,
  hideStatus,
  hideUser,
}: TicketProps) {
  const [StatusIcon] = StatusMap.get(ticket.status) as [LucideIcon];
  const PriorityIcon = (
    PriorityMap.get(ticket.priority) as [string, LucideIcon]
  )[1];
  return (
    <div
      style={{
        width: "300px",
        height: "auto",
        background: "var(--primary)",
        borderRadius: 8,
        boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div style={{ padding: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBlockEnd: 2,
          }}
        >
          <span style={{ color: "#5b5c5f" }}>{ticket.id}</span>
          {!hideUser ? (
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
                  background: user.available ? "#7FFFD4" : "#a5a6a9",
                  borderRadius: 4000,
                }}
              />
              <img
                src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.name}`}
                style={{ borderRadius: 4000, zIndex: 100 }}
                width={24}
                height={24}
                alt={user.name}
              />
            </div>
          ) : null}
        </div>
        <div
          style={{
            fontSize: 14,
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          {!hideStatus ? (
            <StatusIcon
              width={16}
              style={{ flex: "none", alignSelf: "start" }}
            />
          ) : null}
          {ticket.title}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBlockStart: 16,
            alignItems: "center",
            color: "#5b5c5f",
          }}
        >
          {!hidePriority ? (
            <PriorityIcon width={16} style={{ flex: "none" }} />
          ) : null}
          {ticket.tag.map((t) => {
            return (
              <div
                key={t}
                style={{
                  background: "var(--secondary)",
                  border: "0.25px solid #5b5c5f",
                  fontSize: 10,
                  padding: "2px 6px",
                  borderRadius: 4,
                }}
              >
                {t}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Ticket;

const steps = ["Created", "Approved", "Sent", "Signed", "Locked"];

export default function StatusTimeline({ status }) {
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
      {steps.map(step => {
        const active =
          steps.indexOf(step) <= steps.indexOf(status);

        return (
          <span
            key={step}
            className="badge"
            style={{
              background: active ? "#bbf7d0" : "#e5e7eb",
            }}
          >
            {step}
          </span>
        );
      })}
    </div>
  );
}

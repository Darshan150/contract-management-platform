import StatusTimeline from "../components/StatusTimeline.jsx";

export default function ContractDetails({
  contract,
  blueprint,
  onBack
}) {
  return (
    <div className="container">
      <h2>Contract Details</h2>

      <StatusTimeline status={contract.status} />

      <p><b>Contract Name:</b> {contract.name}</p>
      <p><b>Status:</b> {contract.status}</p>
      <p><b>Blueprint:</b> {blueprint?.name}</p>

      <h4 style={{ marginTop: 20 }}>Blueprint Fields</h4>

      <ul>
        {blueprint?.fields.map((f, i) => (
          <li key={i}>
            {f.label} <i>({f.type})</i>
          </li>
        ))}
      </ul>

      <button
        className="secondary"
        style={{ marginTop: 20 }}
        onClick={onBack}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}


import { useEffect, useState } from "react";
import { getBlueprints, createContract } from "../api.js";

export default function CreateContract({ onDone }) {
  const [name, setName] = useState("");
  const [blueprintId, setBlueprintId] = useState("");
  const [blueprints, setBlueprints] = useState([]);

  useEffect(() => {
    getBlueprints().then(setBlueprints);
  }, []);

  async function submit() {
    if (!name || !blueprintId) {
      alert("All fields are required");
      return;
    }

    await createContract({
      name,
      blueprint_id: Number(blueprintId),
      fields: [],
    });

    onDone();
  }

  return (
    <div className="container">
      <h2>Create Contract</h2>
      <p className="subtitle">
        Create a contract instance from an existing blueprint.
      </p>

      <label>Contract Name</label>
      <input
        placeholder="Employment Agreement"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <label style={{ marginTop: 16 }}>Blueprint</label>
      <select
        value={blueprintId}
        onChange={e => setBlueprintId(e.target.value)}
      >
        <option value="">Select blueprint</option>
        {blueprints.map(b => (
          <option key={b.id} value={b.id}>{b.name}</option>
        ))}
      </select>

      <div style={{ marginTop: 20 }}>
        <button className="primary" onClick={submit}>
          Create Contract
        </button>
        <button
          className="secondary"
          style={{ marginLeft: 8 }}
          onClick={onDone}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}



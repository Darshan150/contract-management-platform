import { useEffect, useState } from "react";
import { getBlueprints, createContract } from "../api";

export default function CreateContract({ onDone }) {
  const [name, setName] = useState("");
  const [blueprints, setBlueprints] = useState([]);
  const [blueprintId, setBlueprintId] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getBlueprints();
      setBlueprints(data);
    }
    load();
  }, []);

  async function submit(e) {
    e.preventDefault();

    if (!blueprintId) {
      alert("Please select a blueprint");
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
    <form className="card" onSubmit={submit}>
      <h2>Create Contract</h2>

      <label>Contract Name</label>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Employment Agreement"
        required
      />

      <label>Blueprint</label>
      <select
        value={blueprintId}
        onChange={e => setBlueprintId(e.target.value)}
        required
      >
        <option value="">Select blueprint</option>
        {blueprints.map(bp => (
          <option key={bp.id} value={bp.id}>
            {bp.name}
          </option>
        ))}
      </select>

      <div style={{ marginTop: 12 }}>
        <button className="primary" type="submit">
          Create Contract
        </button>
        <button type="button" onClick={onDone}>
          Cancel
        </button>
      </div>
    </form>
  );
}


import { useEffect, useState } from "react";
import { getBlueprints, createContract } from "../api";

export default function CreateContract({ onDone }) {
  const [name, setName] = useState("");
  const [blueprints, setBlueprints] = useState([]);
  const [blueprintId, setBlueprintId] = useState("");

  useEffect(() => {
    async function loadBlueprints() {
      const data = await getBlueprints();
      console.log("Blueprints loaded:", data);
      setBlueprints(data);
    }
    loadBlueprints();
  }, []);

  async function submit(e) {
    e.preventDefault();

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
        <button type="submit" className="primary">
          Create Contract
        </button>
        <button type="button" onClick={onDone}>
          Cancel
        </button>
      </div>
    </form>
  );
}


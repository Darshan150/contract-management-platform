import { useEffect, useState } from "react";
import { getContracts, transitionContract } from "../api";
import CreateContract from "./CreateContract";

export default function Dashboard() {
  const [contracts, setContracts] = useState([]);
  const [view, setView] = useState("list");

  async function load() {
    const data = await getContracts();
    setContracts(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function change(id, state) {
    await transitionContract(id, state);
    load();
  }

  if (view === "create") {
    return <CreateContract onDone={() => {
      setView("list");
      load();
    }} />;
  }

  return (
    <div className="container">
      <h2>Contract Management</h2>

      <button className="primary" onClick={() => setView("create")}>
        + New Contract
      </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {contracts.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.status}</td>
              <td>
                {c.status === "Created" && (
                  <button onClick={() => change(c.id, "Approved")}>Approve</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


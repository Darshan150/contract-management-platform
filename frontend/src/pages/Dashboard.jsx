import { useEffect, useState } from "react";
import {
  getContracts,
  getBlueprints,
  transitionContract
} from "../api.js";

import CreateContract from "./CreateContract.jsx";
import ContractDetails from "./ContractDetails.jsx";

export default function Dashboard() {
  const [contracts, setContracts] = useState([]);
  const [blueprints, setBlueprints] = useState([]);
  const [view, setView] = useState("list");
  const [selected, setSelected] = useState(null);

  async function load() {
    setContracts(await getContracts());
  }

  useEffect(() => {
    load();
    getBlueprints().then(setBlueprints);
  }, []);

  async function change(id, state) {
    await transitionContract(id, state);
    load();
  }

  function blueprintFor(id) {
    return blueprints.find(b => b.id === id);
  }

  /* ---------- VIEW: CONTRACT DETAILS (A + B) ---------- */
  if (selected) {
    return (
      <ContractDetails
        contract={selected}
        blueprint={blueprintFor(selected.blueprint_id)}
        onBack={() => setSelected(null)}
      />
    );
  }

  /* ---------- VIEW: CREATE CONTRACT ---------- */
  if (view === "create") {
    return (
      <CreateContract
        onDone={() => {
          setView("list");
          load();
        }}
      />
    );
  }

  /* ---------- VIEW: DASHBOARD ---------- */
  return (
    <div className="container">
      <h2>Contract Management</h2>

      <p className="subtitle">
        Contracts follow a backend-enforced lifecycle implemented as a state
        machine. Invalid transitions are rejected at API level.
      </p>

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

              <td>
                <span className={`badge ${c.status}`}>
                  {c.status}
                </span>
              </td>

              <td>
                {/* VIEW DETAILS (A) */}
                <button
                  className="secondary"
                  onClick={() => setSelected(c)}
                >
                  View
                </button>

                {/* LIFECYCLE ACTIONS */}
                {c.status === "Created" && (
                  <button
                    className="primary"
                    onClick={() => change(c.id, "Approved")}
                  >
                    Approve
                  </button>
                )}

                {c.status === "Approved" && (
                  <button
                    className="primary"
                    onClick={() => change(c.id, "Sent")}
                  >
                    Send
                  </button>
                )}

                {c.status === "Sent" && (
                  <button
                    className="primary"
                    onClick={() => change(c.id, "Signed")}
                  >
                    Sign
                  </button>
                )}

                {c.status === "Signed" && (
                  <button
                    className="primary"
                    onClick={() => change(c.id, "Locked")}
                  >
                    Lock
                  </button>
                )}

                {["Locked", "Revoked"].includes(c.status) && (
                  <span style={{ color: "#6b7280" }}>
                    No actions
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


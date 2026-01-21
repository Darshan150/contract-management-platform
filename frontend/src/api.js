const BASE = "http://localhost:8000";

export const getBlueprints = async () =>
  fetch(`${BASE}/blueprints`).then(r => r.json());

export const getContracts = async () =>
  fetch(`${BASE}/contracts`).then(r => r.json());

export const createContract = async (data) =>
  fetch(`${BASE}/contracts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json());

export const transitionContract = async (id, state) =>
  fetch(`${BASE}/contracts/${id}/transition?state=${state}`, {
    method: "POST",
  }).then(r => r.json());


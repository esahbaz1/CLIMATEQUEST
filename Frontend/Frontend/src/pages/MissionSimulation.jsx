import React, { useEffect, useState } from "react";
import axios from "axios";

const MissionSimulation = () => {
  const [missions, setMissions] = useState([]);
  const [selectedMission, setSelectedMission] = useState(null);

  useEffect(() => {
    const fetchMissions = async () => {
      const res = await axios.get("http://localhost:5000/missions");
      setMissions(res.data);
    };
    fetchMissions();
  }, []);

  const handleOptionClick = (impact) => {
    alert(`You selected an option with impact: ${impact}`);
    // TODO: Integrate backend update for CO2 reduction
  };

  if (!missions.length) return <p>Loading missions...</p>;

  return (
    <div className="p-8 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Missions</h1>
      <div className="grid gap-4">
        {selectedMission ? (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">{selectedMission.title}</h2>
            <p className="mb-4">{selectedMission.description}</p>
            <h3 className="font-semibold mb-2">Options:</h3>
            {selectedMission.options.map((opt, i) => (
              <button
                key={i}
                className="block w-full bg-green-500 text-white py-2 mb-2 rounded hover:bg-green-600 transition"
                onClick={() => handleOptionClick(opt.impact)}
              >
                {opt.name} (Impact: {opt.impact})
              </button>
            ))}
            <button
              className="mt-4 text-sm text-green-600 hover:underline"
              onClick={() => setSelectedMission(null)}
            >
              Back to Missions
            </button>
          </div>
        ) : (
          missions.map((m) => (
            <div
              key={m._id}
              className="bg-white p-6 rounded shadow cursor-pointer hover:shadow-lg transition"
              onClick={() => setSelectedMission(m)}
            >
              <h2 className="text-xl font-bold">{m.title}</h2>
              <p>{m.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MissionSimulation;

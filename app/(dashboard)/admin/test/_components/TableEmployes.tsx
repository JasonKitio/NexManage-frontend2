// import { Employe } from '../types';

import { Employer } from "@/types/employer";

interface Props {
  employes: Employer[];
  mode: "debut" | "fin";
  onModeChange: (mode: "debut" | "fin") => void;
}

export default function TableEmployes({ employes, mode, onModeChange }: Props) {
  return (
    <div className="mt-2 mb-4 p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">Détails des employés</h2>
        <div className="space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded ${
              mode === "debut" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => onModeChange("debut")}
          >
            Début
          </button>
          <button
            className={`px-3 py-1 text-sm rounded ${
              mode === "fin" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => onModeChange("fin")}
          >
            Fin
          </button>
        </div>
      </div>

      <table className="w-full table-auto border">
        <thead className="bg-gray-50">
          <tr>
            <th>Employé</th>
            <th>Téléphone</th>
            <th>Email</th>
            <th>Heure</th>
            <th>Observation</th>
          </tr>
        </thead>
        <tbody>
          {employes.map((e) => (
            <tr key={e.id} className="text-center">
              <td>{e.name}</td>
              <td>{e.telephone}</td>
              <td>{e.email}</td>
              {/* <td>{e.}</td> */}
              <td>
                {/* <span
                  className={`px-2 py-1 text-xs rounded-full text-white ${
                    e.observation.includes("tardive")
                      ? "bg-red-500"
                      : e.observation.includes("sup")
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {e.observation}
                </span> */}
                <span className="px-2 py-1 text-xs rounded-full bg-gray-200">
                  {mode === "debut" ? "08:00" : "17:00"}{" "}
                  {/* Placeholder for time */}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

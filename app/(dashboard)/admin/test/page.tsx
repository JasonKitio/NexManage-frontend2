"use client";

import { useState } from "react";
import TableEmployes from "./_components/TableEmployes";

type Employe = {
  id: string;
  nom: string;
  initiales: string;
  telephone: string;
  email: string;
  heure: string;
  observation: string;
};

type Contrat = {
  id: string;
  titre: string;
  lieu: string;
  heure: string;
  status: "En attente" | "En cours" | "Terminer";
  employes: Employe[];
};

const contrats: Contrat[] = [
  {
    id: "1",
    titre: "Contrat Test 1",
    lieu: "Logbessou",
    heure: "08:00:00 - 17:00:00",
    status: "En attente",
    employes: [
      {
        id: "1",
        nom: "Loic Bryan",
        initiales: "LB",
        telephone: "+237 696 354 128",
        email: "loic62@gmail.com",
        heure: "07:30:00",
        observation: "Heures sup’ (3)",
      },
      {
        id: "2",
        nom: "Loic Bryan",
        initiales: "LB",
        telephone: "+237 696 354 128",
        email: "loic62@gmail.com",
        heure: "07:30:00",
        observation: "Journée finie",
      },
    ],
  },
  {
    id: "2",
    titre: "Contrat Test 2",
    lieu: "Akwa",
    heure: "09:00:00",
    status: "En cours",
    employes: [],
  },
  {
    id: "3",
    titre: "Contrat Test 3",
    lieu: "Denver",
    heure: "09:00:00",
    status: "Terminer",
    employes: [],
  },
];

export default function PointagePage() {
  const [selectedContractId, setSelectedContractId] = useState<string | null>(
    null
  );
  const [pointageMode, setPointageMode] = useState<"debut" | "fin">("debut");

  const toggleContract = (id: string) => {
    setSelectedContractId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Employer présent - 01/04/2025</h1>

      <table className="w-full table-auto border mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Contrat</th>
            <th>Employeurs</th>
            <th>Lieu</th>
            <th>Heure</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {contrats.map((contrat) => (
            <>
              <tr
                key={contrat.id}
                className="cursor-pointer text-center hover:bg-gray-50"
                onClick={() => toggleContract(contrat.id)}
              >
                <td className="text-blue-500 underline">{contrat.titre}</td>
                <td>
                  {contrat.employes.slice(0, 3).map((e) => (
                    <span
                      key={e.id}
                      className="inline-block rounded-full px-2 border text-xs mx-1"
                    >
                      {e.initiales}
                    </span>
                  ))}
                  {contrat.employes.length > 3 && (
                    <span className="inline-block bg-gray-800 text-white rounded-full px-2 text-xs">
                      +{contrat.employes.length - 3}
                    </span>
                  )}
                </td>
                <td>{contrat.lieu}</td>
                <td>{contrat.heure}</td>
                <td>
                  <span
                    className={`px-2 py-1 text-white text-sm rounded-full ${
                      contrat.status === "En attente"
                        ? "bg-yellow-400"
                        : contrat.status === "En cours"
                        ? "bg-blue-400"
                        : "bg-green-400"
                    }`}
                  >
                    {contrat.status}
                  </span>
                </td>
              </tr>

              {selectedContractId === contrat.id && (
                <tr>
                  <td colSpan={5}>
                    <TableEmployes
                      employes={contrat.employes}
                      mode={pointageMode}
                      onModeChange={(m) => setPointageMode(m)}
                    />
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

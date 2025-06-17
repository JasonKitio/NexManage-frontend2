"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { DemandeConge } from "@/types/demande";
// import { MoreMenu } from "@/app/(dashboard)/demandes/_components/MoreMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { CirclePlus, Search } from "lucide-react";

interface DemandeCongeTableProps {
  demandes: DemandeConge[] | null; // Permet null
}

export default function DemandeCongeTable({ demandes }: DemandeCongeTableProps) {

  

  const [sorting, setSorting] = React.useState<
    import("@tanstack/react-table").SortingState
  >([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pageSize, setPageSize] = React.useState(10);

  // Colonnes du tableau
  const columns = React.useMemo<ColumnDef<DemandeConge>[]>(
    () => [
      {
        accessorKey: "idDemande",
        header: "#",
        cell: (info) => info.getValue(),
        enableSorting: true,
        size: 60,
      },
      {
        accessorFn: (row) =>
          `${row.employe.name}${row.employe.role ? ` (${row.employe.role})` : ""}`,
        id: "employe",
        header: "Employé nom",
        cell: (info) => info.getValue(),
        enableSorting: true,
        size: 180,
      },
      {
        accessorKey: "dateDebut",
        header: "Début",
        cell: (info) => {
          const value = info.getValue();
          return value 
            ? new Date(value as string).toLocaleDateString("fr-FR") 
            : "N/A";
        },
        enableSorting: true,
        size: 120,
      },
      {
        accessorKey: "dateFin",
        header: "Fin",
        cell: (info) => {
          const value = info.getValue();
          return value 
            ? new Date(value as string).toLocaleDateString("fr-FR") 
            : "N/A";
        },
        enableSorting: true,
        size: 140,
      },
      {
        accessorKey: "duration",
        header: "Durée",
        cell: (info) => info.getValue() || "N/A",
        enableSorting: false,
        size: 100,
      },
      {
        accessorKey: "statut",
        header: "État",
        cell: (info) => {
          const statut = info.getValue() as string;
          let bgColor = "";
          let textColor = "";
          let iconClass = "";

          switch (statut.toLowerCase()) {
            case "refusée":
            case "refuser":
              bgColor = "bg-[#FFD6D6]";
              textColor = "text-[#FF4D4D]";
              iconClass = "fas fa-times-circle";
              break;
            case "en attente":
              bgColor = "bg-[#FFEDB8]";
              textColor = "text-[#EAAA00]";
              iconClass = "fas fa-clock";
              break;
            case "approuvée":
            case "approuver":
              bgColor = "bg-[#D6FFD6]";
              textColor = "text-[#00B800]";
              iconClass = "fas fa-check-circle";
              break;
            default:
              bgColor = "bg-gray-200";
              textColor = "text-gray-700";
              iconClass = "fas fa-info-circle";
          }

          return (
            <span
              className={`inline-flex items-center space-x-2 ${bgColor} ${textColor} rounded-full px-3 py-1 text-sm font-medium select-none`}
            >
              <i className={`${iconClass}`}></i>
              <span>{statut}</span>
            </span>
          );
        },
        enableSorting: true,
        size: 120,
      },
      {
        id: "actions",
        header: "",
        // cell: ({ row }) => <MoreMenu demande={row.original} />,
        size: 60,
      },
    ],
    []
  );

  // Correction : Utiliser un tableau vide si demandes est null/undefined
  const data = React.useMemo(() => demandes || [], [demandes]);

  // Création du tableau avec react-table
  const table = useReactTable({
    data, // Utilisation du tableau sécurisé
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Date dynamique pour l'en-tête
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="bg-white text-[#1E2A38] min-h-screen flex flex-col p-6  w-full mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <div className="bg-[#E6F0F5] rounded-full p-4 flex items-center justify-center">
            <Image
              src="/illustration/work-history.svg"
              alt="Icone congé"
              width={32}
              height={32}
              draggable={false}
              className="w-8 h-8"
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-5">Congé</h1>
            <p className="text-xs text-[#6B7A8F] mt-0.5">{currentDate}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          
          <Button
            className="bg-[#3759B8] text-white rounded-full px-8 py-2 flex items-center space-x-2 text-sm font-medium select-none"
            onClick={() => alert("Créer une nouvelle demande")}
          >
            <span>Créer</span>
            <CirclePlus className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Filtres */}
      <section className="flex  flex-col sm:flex-row  sm:items-center sm:space-x-6 mb-6 space-y-3 sm:space-y-0 w-full ">
        <select
          aria-label="Filtrer par type"
              className={`appearance-none border rounded-full w-full pl-5 pr-10 py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white cursor-pointer`}
          // TODO: gérer filtre type
          onChange={() => {}}
        >
          <option value="">Tout</option>
        </select>
        <select
          aria-label="Filtrer par ordre"
          className={`appearance-none border rounded-full w-full pl-5 pr-10 py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white cursor-pointer`}
          // TODO: gérer filtre ordre
          onChange={() => {}}
        >
          <option value="">Ordre</option>
        </select>
      

        <div className="w-full md:w-40%  ml-auto">
            <label htmlFor="search" className="sr-only">
              Rechercher
            </label>
            <div className="flex w-20% items-center border border-[#9CA3AF] rounded-full px-4 py-2 text-[#6B7A8F] text-sm focus-within:ring-2 focus-within:ring-[#3759B8] focus-within:border-transparent">
              <Search className="w-4 h-3 mr-2 text-[#9CA3AF]" />
              <Input
                id="search"
                type="search"
                placeholder="Rechercher"
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 py-2 xl:w-sm 2xl:w-xl 2xl:border-0 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-none"
              />
            </div>
          </div>

      </section>

      {/* Tableau */}
      <section className="overflow-x-auto w-full pb-6">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-[#E9F2F7] text-[#1E2A38] text-sm font-semibold leading-5"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left py-3 px-4 select-none first:rounded-tl-[20px] last:rounded-tr-[20px]"
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ minWidth: header.column.columnDef.size }}
                  >
                    <div className="flex items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-4 text-center border border-[#E6F0F5]"
                >
                  <div className="flex flex-col items-center justify-center w-full py-12">
                    <Image
                      src="/illustration/rafiki.svg"
                      alt="Aucun résultat"
                      width={200}
                      height={200}
                      className="h-64 w-auto"
                    />
                    <p className="mt-4">Aucune demande trouvée</p>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="bg-white border border-[#E6F0F5] hover:bg-gray-50 font-medium"
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <td
                      key={cell.id}
                      className={`py-4 px-4 ${
                        index !== 0 ? "border-l border-[#E6F0F5]" : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {/* Pagination */}
      {table.getPageCount() > 1 && (
        <footer className="flex flex-col sm:flex-row sm:items-center justify-between mt-8 text-[#6B7A8F] text-sm select-none gap-4">
          <div className="flex items-center space-x-2">
            <span>Résultats par page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                const size = Number(e.target.value);
                setPageSize(size);
                table.setPageSize(size);
              }}
              className="border rounded-full py-1 px-3 focus:outline-none focus:ring-2 focus:ring-[#3759B8]"
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <span>
              Page {table.getState().pagination.pageIndex + 1} sur{" "}
              {table.getPageCount()}
            </span>
            <Button
              variant="outline"
              className="rounded-full w-10 h-10 flex items-center justify-center text-lg"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              aria-label="Première page"
            >
              «
            </Button>
            <Button
              variant="outline"
              className="rounded-full w-10 h-10 flex items-center justify-center text-lg"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Page précédente"
            >
              ‹
            </Button>
            <Button
              variant="outline"
              className="rounded-full w-10 h-10 flex items-center justify-center text-lg"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Page suivante"
            >
              ›
            </Button>
            <Button
              variant="outline"
              className="rounded-full w-10 h-10 flex items-center justify-center text-lg"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              aria-label="Dernière page"
            >
              »
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
}
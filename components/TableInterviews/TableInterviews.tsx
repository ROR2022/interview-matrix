"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
} from "@nextui-org/react";

import { Interviews } from "@/models/Interview";
//import { object } from "yup";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

let columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

const TableInterviews = () => {
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);
  const [dataInterviews, setDataInterviews] = useState<Array<Interviews>>([]);
  const [dataColumns, setDataColumns] = useState<Array<any>>([...columns]);
  const router = useRouter();

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const respose = await fetch("api/interview");
      const myInterviews = await respose.json();
      // eslint-disable-next-line
      console.log("my Interviews:..", myInterviews);
      const { interviews } = myInterviews;

      setDataInterviews([...interviews]);
      columns = Object.keys(interviews[0]).map((key) => {
        return {
          key: key,
          label: key.toUpperCase(),
        };
      });
      setDataColumns([...columns]);
    } catch (error) {
      // eslint-disable-next-line
      console.error("error al recuperar las interviews:..", error);
    }
  };

  const handleSelectionChange = (keys: any) => {
    if (keys === "all") {
      //console.log("Seleccionados todos los registros");
      const myArray = rows.map((item) => item.key);

      //console.log("seleccion:..", myArray);
      setSelectedKeys(myArray);
    }
    if (typeof keys === "object") {
      const mySet = new Set(keys);

      const myArray = Array.from(mySet) as Array<string>;

      //console.log("selección:..", myArray);
      setSelectedKeys(myArray);
    }
  };

  const formatDate = (date: any) => {
    //console.log("date:..", date);

    const opciones: Intl.DateTimeFormatOptions = {
      weekday: "long", // "lunes", "martes", ...
      year: "numeric", // Año completo
      month: "long", // Mes completo ("enero", "febrero", ...)
      day: "numeric", // Día del mes
    };

    const fechaFormateada = new Date(date).toLocaleDateString(
      "es-ES",
      opciones
    );

    return fechaFormateada;
  };

  const handleEditInterview = () => {
    console.log("Editar entrevista");
    console.log("selectedKeys:..", selectedKeys);
    router.push(`/form?id=${selectedKeys[0]}`);
  };

  const handleDeleteInterviews = () => {
    console.log("Eliminar entrevistas");
    console.log("selectedKeys:..", selectedKeys);
    
  };

  return (
    <div
      className="flex flex-col gap-3"
      style={{ width: "90vw", overflow: "auto" }}
    >
      {dataInterviews.length === 0 ? (
        <div className="flex justify-center items-center">
          <h2 className="text-2xl text-gray-400">No hay datos que mostrar</h2>
        </div>
      ) : (
        <div>
          <Table
            isStriped
            aria-label="Controlled table interviews"
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            onSelectionChange={handleSelectionChange}
          >
            <TableHeader columns={dataColumns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={dataInterviews}>
              {(item) => (
                <TableRow key={String(item._id)}>
                  {(columnKey) => {
                    if (columnKey === "techs") {
                      return <TableCell>{item.techs.join(", ")}</TableCell>;
                    }
                    if (columnKey === "fecha") {
                      return <TableCell>{formatDate(item.fecha)}</TableCell>;
                    }

                    return (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    );
                  }}
                </TableRow>
              )}
            </TableBody>
          </Table>
          {selectedKeys.length > 0 && (
            <div className="flex gap-2 mt-2">
              {selectedKeys.length === 1 && (
                <Button
                  aria-label="editButton"
                  color="secondary"
                  size="sm"
                  onClick={handleEditInterview}
                >
                  Edit
                </Button>
              )}
              <Button
                aria-label="deleteButton"
                color="danger"
                size="sm"
                onClick={handleDeleteInterviews}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TableInterviews;

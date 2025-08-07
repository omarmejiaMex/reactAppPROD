import React, { useEffect, useState } from "react";

export default function AkeysList() {
    const [currentList, setCurrentList] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetch("http://10.2.85.101:8080/empleados/", { signal })
            .then(res => res.json())
            .then(data => {
                console.log("Datos recibidos:", data);
                setCurrentList(data); // Ahora es un array directamente
            })
            .catch(error => {
                if (error.name !== "AbortError") {
                    console.error("Error en fetch:", error);
                }
            });

        return () => controller.abort();
    }, []);

    return (
        <div>
            <h2 className="elemenlist">Lista de ejemplo</h2>
            <ul className="listaAkeys">
                {currentList.map((empleado) => (
                    <li className="elemenlist" key={empleado.id}>{empleado.Name}</li>
                ))}
            </ul>
        </div>
    );
}

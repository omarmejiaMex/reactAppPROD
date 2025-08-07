import React, { useEffect, useState } from 'react'


const ItemUbicacionCashier = () => {
    const [ubicacion, setUbicacion] = useState(null);
    const [codigo, setCodigo] = useState("");

    const buscarUbicacion = () => {
        if (!codigo.trim()) {
            setUbicacion(null); // Limpia el usuario si el código está vacío
            return;
        }

        fetch(`http://10.2.85.101:8080/empleados/cashierubi/${codigo}`)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error("Usuario no encontrado");
                }
                return resp.json();
            })
            .then((data) => setUbicacion(data))

            .catch((error) => {
                console.error("Error fetching data:", error);
                setUbicacion(null); // Limpia el usuario si hay error
                alert("Ubicacion no encontrado o no disponible"); // Muestra la alerta
                setCodigo("");
            });

    };

    // Ejecutar búsqueda inicial
    useEffect(() => {
        buscarUbicacion();
    }, []);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            buscarUbicacion();
        }
    };


    return (
        <div>
            <input
                id='idinputTVCODE'
                className='inputTVCODE'
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ingrese Ubicacion y presione Enter"
            />
            {ubicacion && (
                <>
                    <p id='Ubicacion'>{ubicacion.DESCRIPCION}</p>
                    <p>{ubicacion.OCUPADO}</p>
                </>
            )}
        </div>
    );
}

export default ItemUbicacionCashier

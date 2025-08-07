
import React, { useEffect, useState } from 'react'

const ItemAkey = () => {
    const [akey, setAkey] = useState(null);
    const [codigo, setCodigo] = useState("");
    const [listaAkeys, setListaAkeys] = useState([]);
    const [mensajeError, setMensajeError] = useState("");

   

    const buscarAkeyJob = () => {
        if (!codigo.trim()) return; // Evita búsquedas vacías
        fetch(`http://10.2.85.101:8080/empleados/akey/${codigo}`)
            .then((resp) => resp.json())
            .then((data) => {
                setAkey(data);
                if (data && data.JobNum) {
                    buscarListaAkeys(data.JobNum);
                } else {
                    setMensajeError("No se encontró información para este AKey.");
                    setListaAkeys([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching AKey:", error);
                alert("No se encontró información. Verifique el AKey ingresado.");
                setAkey(null);
                setListaAkeys([]);
            })
            .finally(() => {
                setCodigo(""); // Limpia el input después de la búsqueda
            });
    };

    // Ejecutar búsqueda inicial
    useEffect(() => {
        buscarAkeyJob();
    }, []);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            buscarAkeyJob();
        }
    };

     const buscarListaAkeys = (jobNum) => {
        fetch(`http://10.2.85.101:8080/empleados/job/${jobNum}`)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.length === 0) {
                    setMensajeError("No se encontraron AKeys para este JobNum.");
                    setListaAkeys([]);
                } else {
                    // const nameUserElement = document.getElementById("nameUser");
                    // const userName = nameUserElement ? nameUserElement.innerText : "Nombre Desconocido";

                    // const ubicacionElement = document.getElementById("Ubicacion");
                    // const ubicacion = ubicacionElement ? ubicacionElement.innerText : "Ubicacion Desconocida";


                    // Agregar userName a cada objeto en el array
                    const updatedData = data.map(item => ({
                        ...item,
                        // UserName: userName,
                        // Ubicacion: ubicacion// Agregar el usuario a cada objeto
                    }));

                    const newArray = updatedData.map(({ SchedDate, timeBegan, Locked, MinutesEach,
                        MinutesTot, OrigSchedTime, SchedTime, timeEnded, Frozen, Qty, MatrixPart, ...rest }) => rest);

                    setListaAkeys(newArray);
                    console.log("Datos actualizados con UserName:", newArray);
                    setMensajeError(""); // Borra el mensaje de error si hay resultados
                }
            })
            .catch((error) => {
                console.error("Error fetching AKeys:", error);
                setMensajeError("Error al obtener los AKeys.");
                setListaAkeys([]);
            });
    };



    return (
        <div>
            <input
                className='inputTVCODE'
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ingrese Akey y presione Enter"
            />
            {akey && (
                <>
                    <p id='idAkey'>Akey {akey.AKey}</p>
                    <p id='job'>JOB: {akey.JobNum}</p>
                    <p id='jobPart'>No Part: {akey.JobPart}</p>

                    <hr className='lineas' />
                </>
            )}
            {mensajeError && <p style={{ color: "red" }}>{mensajeError}</p>}

            <ul id='listaAkeys'>
                {listaAkeys.map((item) => (
                    <li key={item.AKey}>
                        {item.AKey}
                        
                    </li>
                ))}
            </ul>



            {/* {listaAkeys.length > 0 && (
                <button className='button' onClick={guardarLista}>Guardar Lista</button>
            )} */}


        </div>
    );
}

export default ItemAkey

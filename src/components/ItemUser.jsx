import React, { useEffect, useState } from 'react'
import './estilachos.css'
import { data } from 'react-router-dom';

function ItemListAkeys() {
    const [usuario, setUsuario] = useState(null);
    const [codigo, setCodigo] = useState("");

    const buscarUsuario = () => {
        if (!codigo.trim()) {
            setUsuario(null); // Limpia el usuario si el código está vacío
            return;
        }

        fetch(`http://10.2.85.101:8080/empleados/tavm/${codigo}`)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error("Usuario no encontrado");
                }
                return resp.json();
            })
            .then((data) => setUsuario(data))

            .catch((error) => {
                console.error("Error fetching data:", error);
                setUsuario(null); // Limpia el usuario si hay error
                alert("Usuario no encontrado. Verifique el código ingresado."); // Muestra la alerta
                setCodigo("");
            });

    };

    // Ejecutar búsqueda inicial
    useEffect(() => {
        buscarUsuario();
    }, []);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            buscarUsuario();
        }
    };


    return (
        <div>
            <input
                id='inputTvcode'
                className='inputTVCODE'
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ingrese TVCODE y presione Enter"
            />
            {usuario && (
                <>
                    <p id='nameUser'>{usuario.FullName}</p>
                    <p id='tvCode'>{usuario.TID}</p>
                </>
            )}
        </div>
    );
}

export default ItemListAkeys
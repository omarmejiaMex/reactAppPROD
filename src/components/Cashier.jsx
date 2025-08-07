
import ItemUser from './ItemUser';
import ItemAkey from './ItemAkey';
import ItemUbicacionCashier from './ItemUbicacionCashier';
import React, { useEffect, useState } from 'react'

const Cashier = () => {
  const [ubicacion, setUbicacion] = useState("Controlando la ");

  useEffect(() => {
    const ubicacionElement = document.getElementById("Ubicacion");
    if (ubicacionElement) {
      const textoUbicacion = ubicacionElement.innerText.trim();
      if (textoUbicacion) {
        setUbicacion(textoUbicacion);
      }
    }
  }, []);

  //Limpia todo
  const limpiarInterfaz = () => {
    // Limpiar los campos o elementos de la interfaz
    document.getElementById("nameUser").innerText = "";
    document.getElementById("Ubicacion").innerText = "";
    document.getElementById("job").innerText = "";
    document.getElementById("jobPart").innerText = "";
    document.getElementById("idAkey").innerText = "";
    document.getElementById("tvCode").innerText = "";
    document.getElementById("inputTvcode").innerText = "";
    document.getElementById("idinputTVCODE").innerText = "";

    const inputElement = document.getElementById("idinputTVCODE");
    if (inputElement) {
      inputElement.value = "";
    }
    const inputElementtvcode = document.getElementById("inputTvcode");
    if (inputElementtvcode) {
      inputElementtvcode.value = "";
    }
    const listaElementos = document.getElementById("listaAkeys");
    if (listaElementos) {
      listaElementos.innerHTML = ""; // Vaciar la lista
    }

    console.log("Interfaz limpiada.");
  };


  //verificar si el job ya esta registrado
  const verificarJob = async (Job) => {
    try {
      // Reemplazar el valor en la URL con el Job actual
      const response = await fetch(`http://10.2.85.101:8080/empleados/jobLocal/${Job}`);

      if (!response.ok) {
        console.error(`Error en la consulta: ${response.status} - ${response.statusText}`);

        // Controlar errores específicos del código HTTP
        if (response.status === 404) {
          alert("El Job no fue encontrado. se procede a agregar");
          const listaElementos = document.getElementById("listaAkeys");
          if (listaElementos) {
            listaElementos.innerHTML = ""; // Vaciar la lista
          }
          return true;
          // se agrega todos los akeys y se borra la lista generada anteriormente
        } else {
          alert(`Error en el servidor: ${response.statusText}`);
          return false; // Detener flujo
        }
      }



      const data = await response.json();
      console.log("esto es lo que trae", data)
      // Verificar si el Job ya está registrado
      if (data && data.JOB) { // Suponiendo que la API devuelva un campo "existe"
        alert("Este Job ya se encuentra registrado.");
        const listaElementos = document.getElementById("listaAkeys");
        if (listaElementos) {
          listaElementos.innerHTML = ""; // Vaciar la lista
        }
        //ingresar el metodo a despliegue la lista guardada con akey job usuario registrado y estatus
        const respuestaJobIncompleto = await fetch(`http://10.2.85.101:8080/empleados/jobLocalincompleto/${Job}`);
        if (!respuestaJobIncompleto.ok) throw new Error(`Error en la consulta: ${respuestaJobIncompleto.statusText}`);
        const datosJobIncompleto = await respuestaJobIncompleto.json();
        const contenedor = document.getElementById("datosJobIncompleto");
        if (contenedor) {


          contenedor.innerHTML = "<h2>Datos Job Incompleto:</h2>";
          datosJobIncompleto.forEach(registro => {

            contenedor.innerHTML += `<p>AK${registro.AKEY}, 
            Ubi: ${registro.UBICACION}, 
            Job: ${registro.JOB}, 
            Usuario: ${registro.EMPLEADO_AKEY}, 
            Fecha Reg: ${registro.DATE_AKEY}</p>`;
          });
        }
        //console.log(datosJobIncompleto);
        //

        //limpiarInterfaz();
        return false; // Detener flujo si el Job ya existe
      } else {

        alert("no esta dado de alta este job desea agregarlo?")
      }
    } catch (error) {
      console.error("Error al verificar el Job:", error);

      alert("Hubo un problema al consultar el estado del Job. Por favor, intente nuevamente.");
      return false; // Detener flujo en caso de error
    }

    return true; // Continuar flujo si el Job no está registrado
  };


  const generarUbicacion = async () => {
    const EmpName = document.getElementById("nameUser")?.innerText || "";
    const ubicacionElement = document.getElementById("Ubicacion");
    const Job = document.getElementById("job")?.innerText || "";
    const matrixPart = document.getElementById("jobPart")?.innerText || "";



    if (EmpName) {

      if (Job) {

        //primero consultar si esta guardado el job en la BD para no duplicar el listado
        const continuar = await verificarJob(Job.replace("JOB: ", ""));
        console.log(Job, continuar);

        if (!continuar) return; // Detener si el Job ya existe


        if (ubicacionElement) {

          const listaElementos = document.querySelectorAll("#listaAkeys li");
          const now = new Date().toLocaleDateString();
          const lista = Array.from(listaElementos).map(item => ({
            EmpName,
            Job: Job.replace("JOB: ", ""),
            Akey: item.innerText,
            matrixPart: matrixPart.replace("No Part: ", ""),
            akeyScanned: 0,
            ubicacion: ubicacionElement.innerText,

            registrado: 0,
            currentDate1: now,
            //fecha akey
            //empleado que registra el akey
            jobEnded: false,
            //currentDate: now.toLocaleString()
          }));

          console.log(JSON.stringify(lista, null, 2));
          //guardar listado
          for (const registro of lista) {
            try {
              const response = await fetch("http://10.2.85.101:8080/empleados/regCashier", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registro)
              });

              if (!response.ok) throw new Error(`Error en la petición: ${response.statusText}`);
              const data = await response.json();
              console.log(`Guardado con ID: ${data.id}`);
            } catch (error) {
              console.error("Error al enviar datos:", error);
              alert(`Error al guardar Akey: ${registro.Akey}`);
              return;  // Detener el ciclo si falla uno
            }
          }

          //Actualizamos la ubicacion de cashier
          //const actualizarUbi = await fetch(`http://10.2.85.101:8080/empleados/updateCashierUbi/${ubicacionElement}`);
          //if (!actualizarUbi.ok) throw new Error(`Error en la actualizacion: ${actualizarUbi.statusText}`);
          //console.log("ubicacion actualizada: ", ubicacionElement)


        } else { alert("escanee una Ubicacion valido") }

      } else { alert("escanee un Akey valido") }

    } else { alert("escanee un tvcode valido") }


  };

  return (
    <div>
      <h1>Cashier</h1>
      <ItemUser />
      <br />
      <ItemAkey />
      <br />
      <ItemUbicacionCashier /> {/* Pasar setUbicacion como prop */}
      <br />

      <div id="datosJobIncompleto"></div> {/* Contenedor para mostrar datos */}
      {ubicacion && (
        <button className='button' style={{ padding: '15px' }} onClick={generarUbicacion}>Guardar Lista</button>
      )}

    </div>
  );
};

export default Cashier

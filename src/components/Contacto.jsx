import { useForm } from "react-hook-form";
import ItemFile from "./ItemFile";


const Contacto = () => {

    const { register, handleSubmit } = useForm();

    const enviar = async (data) => {
        try {
            const response = await fetch("http://10.2.85.101:8080/empleados/email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }

            const result = await response.json();
            console.log("Respuesta del servidor:", result);
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };

    const containerStyle = {
        width: "400px",
        height: "400px"
    };

    const center = {
        lat: 19.432608,
        lng: -99.133209
    };

    return (
        <div>

            <h1>Contacto</h1>
            <div id="div1">
                <form className='formulario' onSubmit={handleSubmit(enviar)}>
                    <input
                        type='text' className='inputContact' placeholder='ingresa Subject' {...register("subject")} />
                    <br /><br />
                    <input type="email" className='inputContact' placeholder='Email' {...register("to")} />
                    <br /><br />
                    <textarea className="inputContact" placeholder="Texto" rows="4" {...register("text")} />
                    <br /><br />
                    <button className='button' type='submit'>Enviar</button>
                </form>
                <br />
                <div id="div2">
                    <ItemFile />
                    <br />
                </div>
            </div>


            <div style={{ display: "flex", gap: "1px", alignItems: "stretch" }}>
                <div id="div3" style={{ flex: 1, margin: 0, padding: 0 }}>
                    <iframe src="https://storage.googleapis.com/maps-solutions-m1zuzo5srb/locator-plus/n0ai/locator-plus.html"
                        width="500px"
                        height="500px"

                        loading="lazy">
                    </iframe>
                    <br />
                </div>
                <div id="div4" style={{ flex: 1, margin: 0, padding: 0 }}>
                    <h2>Acerca de</h2>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/TMiAQPABgHA"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

            </div>
            <br />
            <div>
                <iframe
                    src="/Doc.pdf#toolbar=0" // Reemplaza con la URL de tu PDF
                    width="50%"
                    height="900px"
                    style={{ border: "none" }}
                ></iframe>
            </div>
        </div>

    )
}

export default Contacto

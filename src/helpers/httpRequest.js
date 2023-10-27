import axios from 'axios';

/**
* @param {String} url - URL del servicio que se quiere consumir.
* @param {string} method - Metodo que se quiere realizar ['GET','POST','PUT','DELETE']
* @param {Object} data - Datos que se desean enviar (por ejemplo, body) => usar la sentencia {data: values}
 * 
 */

// Función genérica para realizar peticiones HTTP
async function httpRequest(url, method, data = null) {

  try {
    const response = await axios({
      url: `http://${import.meta.env.VITE_API_BASE_URL}${url}`,
      method,
      data,
      headers: {
        // Authorization: `Bearer ${$token}`,
        "Content-Type": "application/json",
      }
    });
    return response

  } catch (error) {
    if (error.response.status == 401) {
      alert("Error de autenticacion")
    }
    // Manejo de errores
    if (error.response) {
      throw new Error(`Error en la petición: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('No se pudo obtener respuesta del servidor');
    }

  }
}

const httpFormDataRequest = async (url, method, formData)=>{
try {
    const response = await axios({
      url: `http://${import.meta.env.VITE_API_BASE_URL}${url}`,
      method,
      data: formData,
      headers: {
        // Authorization: `Bearer ${$token}`,
        "Content-Type": "multipart/form-data",
        
      }
    });
    return response

  } catch (error) {
    if (error.response.status == 401) {
      alert("Error de autenticacion")
    }
    if (error.response) {
      throw new Error(`Error en la petición: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('No se pudo obtener respuesta del servidor');
    }
  }

}
export { httpRequest ,httpFormDataRequest}

// Ejemplos de uso

/**
 * @param valuesObject: objeto que contiene los datos a enviar al backend. strapi se debe enviar un objeto {data: valuesObject} 
 */ 
// const { data } = await httpRequest("/products", "post", {
//   data: newProductValues,
// });


// (async () => {
//   try {
//     const resultadoGET = await httpRequest('https://jsonplaceholder.typicode.com/posts/1', 'GET');
//     console.log('Resultado GET:', resultadoGET);

//     const resultadoPOST = await httpRequest('https://jsonplaceholder.typicode.com/posts', 'POST', {
//       title: 'Nuevo Post',
//       body: 'Contenido del nuevo post',
//       userId: 1
//     });
//     console.log('Resultado POST:', resultadoPOST);
//   } catch (error) {
//     console.error('Error:', error.message);
//   }
// })();

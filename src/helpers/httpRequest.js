import axios from 'axios';
import { getStorageTokenUser } from '../stores/sesionManager';
import { notifications } from '../componets/alertsUser/alert';

/**
* @param {String} url - URL del servicio que se quiere consumir.
* @param {string} method - Metodo que se quiere realizar ['GET','POST','PUT','DELETE']
* @param {Object} data - Datos que se desean enviar (por ejemplo, body) => usar la sentencia {data: values}
 * 
 */

let $token = getStorageTokenUser()


// Función genérica para realizar peticiones HTTP
async function httpRequest(url, method, data = null) {
  $token = getStorageTokenUser()
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    
    if ($token) {
      headers.Authorization = `Bearer ${$token}`;
    }

    const response = await axios({
      url: `http://${import.meta.env.VITE_API_BASE_URL}${url}`,
      method,
      data,
      headers,
    });
    return response

  } catch (error) {
    if (error.response && error.response.status === 401) {
      notifications.error("Error de autenticación")
      // alert("Error de autenticación");
    }
    // Manejo de errores
    if (error.response) {
      notifications.error(`Error: ${error.response.status} - ${error.response.statusText}`, 5000)
      throw new Error(`Error en la petición: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      notifications.error('No se pudo obtener respuesta del servidor', 5000)
      throw new Error('No se pudo obtener respuesta del servidor');
    }

  }
}

const httpFormDataRequest = async (url, method, formData)=>{
  $token = getStorageTokenUser()
try {
    const response = await axios({
      url: `http://${import.meta.env.VITE_API_BASE_URL}${url}`,
      method,
      data: formData,
      headers: {
        Authorization: `Bearer ${$token}`,
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

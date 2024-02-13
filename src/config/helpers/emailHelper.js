import axios from 'axios';
const API_KEY_EMAIL = import.meta.env.VITE_MAILGUN_API_KEY
const enviarCorreoElectronico = async () => {
  try {
    const apiUrl = `https://api.mailgun.net/v3/sandbox3ddf962a8f864a3eb799898c8f41a4fd.mailgun.org/messages`;

    const datosCorreo = {
      from: 'Excited User <mailgun@sandbox-123.mailgun.org>',
      to: 'maxialz99@hotmail.com',
      subject: 'Asunto del correo',
      text: 'Contenido del correo electrónico',
    };

    console.log('import.meta.env.MAILGUN_API_KEY :>> ', API_KEY_EMAIL);

    const respuesta = await axios.post(apiUrl, datosCorreo, {
      auth: {
        username: 'api',
        password: API_KEY_EMAIL,
      },
    });

    console.log('Respuesta de Mailgun:', respuesta.data);
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error.message);
  }
};

export { enviarCorreoElectronico }

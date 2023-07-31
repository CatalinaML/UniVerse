# UniVerse
Proyecto MERN

Descripción
Este proyecto es un Blog Comunitario que permite a los usuarios compartir posteos e interactuar en una plataforma amigable y dinámica. Con este sistema, los usuarios pueden registrarse, iniciar sesión y acceder a una variedad de funciones según estén logeados o no.

Especificaciones Técnicas
El proyecto ha sido desarrollado utilizando el popular stack MERN (MongoDB, Express, React y Node.js) para brindar un rendimiento óptimo y una experiencia de usuario fluida. Se han empleado varias dependencias para mejorar la funcionalidad y seguridad del sistema:

yup: Para realizar la validación de datos de forma sencilla y robusta.
formik: Facilita la creación y gestión de formularios en React.
bcrypt: Utilizado para el hash y encriptación segura de contraseñas de usuarios.
connect-multiparty: Proporciona un middleware para trabajar con el envío de archivos en Express.
express: Framework de Node.js para la construcción de la API REST.
jsonwebtoken (JWT): Para la autenticación y generación de tokens seguros.
mongoose: Una biblioteca de modelado de objetos MongoDB (ODM) para Node.js.
mongoose-paginate: Permite la paginación sencilla de resultados en Mongoose.
nodemon: Herramienta para reiniciar automáticamente el servidor al detectar cambios en el código.
lodash: Biblioteca de utilidades de JavaScript que mejora la manipulación de datos.
luxon: Utilizado para la manipulación y formateo de fechas y horas.
sass: Para facilitar la escritura y organización del código CSS.
semantic-ui: Un conjunto de estilos y componentes de interfaz de usuario para un diseño atractivo.
Funcionalidades
Usuarios no logeados
Registrarse: Los usuarios pueden crear una cuenta en el blog mediante un formulario de registro.

Iniciar sesión: Aquí los usuarios podrán acceder a su cuenta existente mediante sus credenciales.

Ver todos los posteos: Los usuarios no logeados podrán navegar y visualizar todos los posteos publicados en el blog hasta la fecha.

Ver un post: Acceso a la lectura de un post específico para conocer su contenido.

Ordenar posteos: Posibilidad de ordenar los posteos por fecha y por popularidad.

Buscar posteos: Capacidad para buscar posteos por título o nombre del autor.

Usuarios logeados
Logout: Los usuarios logeados podrán cerrar sesión para proteger su privacidad.

Ver lista de todos los posts: Acceso a una lista con todos los posteos publicados en el blog.

Ver un post: Visualización de un post específico, con opciones para dar like o seguir al autor.

Ordenar posteos: Posibilidad de ordenar los posteos por fecha y por popularidad.

Buscar posteos: Capacidad para buscar posteos por título o nombre del autor.

Crear post: Los usuarios logeados pueden escribir y publicar sus propios posteos en el blog.

Ver su propio perfil: Acceso a información personal, como nombre de usuario, cantidad de seguidos, cantidad de seguidores y listado de los propios posteos.

Editar perfil: Opción para cambiar el nombre de usuario, el correo electrónico y la foto de perfil.






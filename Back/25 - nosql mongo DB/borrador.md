##

porque usar mongoDB

mongoDB es un sistema de base de datos orientado a documentos, que permite almacenar datos en forma de documentos JSON. Esto significa que los datos se almacenan en forma de objetos JSON, donde cada campo es un campo de objeto y cada valor es un valor de objeto.


claves, 

NoSQL: Bases de datos no relacionales
Flexible -> se pueden agregar nuevos campos sin modificar la estructura de la base de datos
Scalable -> grandes cantidades de datos
orientado a documentos -> los datos se almacenan en forma de documentos JSON anidados
alto rendimiento -> se pueden realizar operaciones de lectura y escritura rápidas
replicacion -> se pueden replicar los datos en diferentes servidores.
indexacion -> se pueden crear índices para mejorar la velocidad de búsqueda y la eficiencia de la base de datos.




select * from clientes == db.clientes.find({})


db.animales.find({tipo: "Salvaje"})
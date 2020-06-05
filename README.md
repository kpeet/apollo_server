# APOLLO SRM Cumplo 


###Inicio de proyecto
- docker-compose build
- docker network create apollonet (necesario para comunicar entre dockers, api_srm)
- docker-compose up


##resumen apollo-server
apollo-server: servidor para Graphql

Scheme(TypeDefs)
describe tus tipos de objetos, query y dato de tu aplicacion

Resolvers
Funciones responsables de retornar los valores que existen en tu schema(TypeDefs)

# dependencias
dotend: variables de entorno  
nodemon: reinicia el servidor a medida que cambian los archivos en desarrollo (-D)
apollo-datasource-rest: Comunicación REST para apollo




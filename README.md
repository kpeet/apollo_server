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

##Sprint 1 
Descripción servicios Apollo en confluence:

https://cumplo.atlassian.net/wiki/spaces/SRM/pages/1007288325/Servicios+registrados+en+Apollo+server+SRM+Sprint+1+Registrar+un+pago+confirmado


Registro de usuario(Representante)
Loguin de usuario(Representane)
Cambio de contraseña(Representante) [mutation forgotPassword]
confirmación de cambio de contraseña(Representante) [mutation confirmForgotPassword]

creación de empresa(Empresa)[mutation enterprises]
registrar una empresa como pagadora(Empresa-Pagadora)[mutation newEnterprisePayer]
asociar empresa pagadora a representante(Empresa-Pagadora-Representante)[mutation asssignRepresentativeToPayerEnterprise]

listar empresas pagadoras del representante(Empresa-Pagadora-Representante)[Query payerCompanyForRepresentative]

Crear un pago Confirmado [mutation confirmedPayment ]
Listar los pagos confirmados [Query confirmedPayment]
Setear empresa pagadora favorita de un representante [mutation setRepresentativeFavoritePayer]






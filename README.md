# Club de eventos

Este es un proyecto desarrollado en assemblyscript para la certificación de NCD de near protocol Hispano

## Contenido

Este repositorio contiene un contrato inteligente con los siguientes métodos:
### Escritura:
* `setCiudad`
* `setMiembro`
* `setEvento`
* `setAsistente`
### Lectura:
* `getCiudades`
* `getCiudad`
* `getMiembro`
* `getMiembros`
* `getEvento`
* `getEventos`
* `getAsistentes`
* `getAsistente`


## Uso

### Compilando y desplegando

Lo primero que debemos hacer es instalar las dependencias necesarias para que el proyecto funcione.

```sh
npm install
```

ó

```sh
yarn install
```

Una vez hecho esto, podemos compilar el código.

```sh
npm run build
```

ó

```sh
yarn build
```

El contrato compilado en WebAssembly se guarda en la carpeta `build/debug/`. Ahora solo es necesario desplegarlo en una cuenta de desarrollo.

```sh
near dev-deploy build/debug/contrato.wasm
```

### Usando variables de entorno

Una vez compilado y desplegado tu proyecto, vamos a requerir identificar la cuenta neardev. Esta la puedes encontrar en el archivo `AssemblyScript/neardev/neardev`. Podemos almacenar este contrato en una variable de entorno ejecutando lo siguiente en la consola, y sustituyendo por tu cuenta de desarrollo:

```sh
export CONTRATO=dev-0000000000000-000000000
```

Haciendo esto, podemos comprobar que la variable `CONTRATO` tiene almacenada nuestra cuenta dev.

```sh
echo $CONTRATO
```

### Métodos

El primer metodo es crear una ciudad, en este caso no requiere ningún near la creación de esta. Nos pedirá un ID y nombre de esta.

```sh
near call $CONTRATO setCiudad '{"id":1,"nombre":"NombreCiudad"}' --accountId tucuenta.testnet
```
El segundo metodo es crear un evento el cual no nos pedirá nears para realizar la creación de este y nos pedirá un id, nombre, ubicación, fecha, hora, descripción y si se encuentra activo o no.

```sh
near call $CONTRATO setEvento '{"id":1,"nombre":"Evento de bienvenida", "ubicacion":"Santiago-Chile","fecha":"2 de julio 2022","hora":"20:00hrs","descripcion":"evento de bienvenida a nuevos miembros","activo":true}' --accountId tucuenta.testnet
```

El tercer metodo es crear un miembro, en este caso nos pedirá 2 nears para poder ser miembros de este club y ser mayores de edad.

```sh
near call $CONTRATO setMiembro '{"nombre":"Jorge","edad":"25","tipoMiembro":"Administrador","ciudadMiembro":"Santiago-Chile"}' --accountId tucuenta.testnet --amount 2
```
Y nuestro último metodo setter es para crear asistentes a eventos el cual nos pedirá 20 nears para poder asistir.
```sh
near call $CONTRATO setAsistente '{"nombre":"Jorge","nombreEvento":"Evento de bienvenida", "ciudadEvento":"Santiago-Chile"}' --accountId tucuenta.testnet --amount 20
```

Claramente para cada uno de estos metodos necesitamos por lo menos tener 1 registrado.
El primero de ellos es `getCiudades`, el cual regresará todas las ciudades registradas.

```sh
near view $CONTRATO getCiudades
```
Luego esta el `getCiudad` el cual nos pedirá un id y regresará la ciudad si se encuentra.
```sh
near view $CONTRATO getCiudad '{"id":"1"}'
```

Para listar los eventos inscritos `getEventos`, el cual nos regresará todos los eventos inscritos que esten activos e inactivos

```sh
near view $CONTRATO getEventos
```

Para encontrar un solo evento `getEvento`, el cual nos pedirá un id y regresará si este se encuentra.

```sh
near view $CONTRATO getEvento '{"id":"1"}'
```

El metodo `getMiembros` para listar todos los miembros inscritos en el club.

```sh
near view $CONTRATO getMiembros
```

Para buscar un miembro en particular `getMiembro` nos pedirá su cuenta de near y veremos si se encuentra en el club.

```sh
near view $CONTRATO getMiembro '{"cuenta":"cuenta.testnet"}'
```

Para mostrar la lista de todos los asistentes a todos los eventos `getAsistentes`

```sh
near view $CONTRATO getAsistentes
```

Para buscar si una persona asistirá `getAsistente`, nos pedirá su cuenta de near y nos mostrará si actualmente asistirá o asistió a algún evento.

```sh
near view $CONTRATO getAsistente '{"cuenta":"cuenta.testnet"}'
```

Y nuestro último metodo es para pasar un evento de activo a inactivo, en caso de realizar su cancelación o que ya se ha realizado.
Este comando actualizará automaticamente el estado del evento, una vez ejecutado.

```sh
near call $CONTRATO setEventoEstado '{"id":"1"}' --accountId cuenta.testnet
```

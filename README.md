# My finances

Aplicación fullstack para gestionar y analizar gastos personales con métricas financieras e insights mensuales.
Se adapta al caso venezolano y su dualidad monetaria al permitir registros en bs o usd.

---

## Stack tecnológico

- Next.js
- TypeScript
- Sequelize
- PostgreSQL
- bcrypt
- JWT - jose

---

## Arquitectura

La aplicación sigue un patrón Backend for Frontend (BFF), donde el servidor de Next.js gestiona tanto el renderizado como la lógica de acceso a datos y autenticación.

El frontend nunca accede directamente a la base de datos; toda interacción pasa por servicios en el backend.

### Modelo de datos

```
User (1) - (N) Expense
User (1) - (N) Category
Category (1) - (N) Expense
```
Esta estructura permite definir categorías únicas para cada usuario, lo que facilita el filtrado de gastos para el mismo.

```
User
----
id: integer (PK)
username: string
email: string
password: string
```

```
Category
----
id: integer (PK)
name: string
user_id: integer (FK)
```

```
Expense
----
id: integer (PK)
description: string
date: date
amount_bs: decimal
amount_usd: decimal
rate: decimal
user_id: integer (FK)
category_id: integer (FK)
```

### Decisiones técnicas 

- Las contraseñas se almacenan hasheadas usando bcrypt
- La autenticación se maneja utilizando un JWT que se almacena en una cookie
- El atributo principal de la entidad Expense será `amount_usd`, sin embargo, para adaptarse al caso Venezuela existe también el atributo `amount_bs` el cual se utilizará para calcular un valor para `amount_usd` a través del atributo `rate`

---

## Estado actual del proyecto

✅ Modelado relacional completo
✅ Autenticación implementada
🚧 Dashboard en desarrollo

---

## Autor

Ricardo Ojeda - Frontend Developer

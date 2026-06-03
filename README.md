# Frontend - front_despacho

#demostracion di/cd.

## Descripción

Este proyecto es el frontend React Vite de la aplicación de despacho, que corre en `ec2_web` con IP pública `44.203.209.74`.

## Cómo correr con Docker localmente

Desde la carpeta `front_despacho`:

```bash
docker build -t juanvillagra/front-despacho:latest .
docker run -d --name front-despacho -p 80:80 juanvillagra/front-despacho:latest
```

## Variables de entorno necesarias

Este proyecto puede usar variables de entorno de Vite si se desea configurar una API base diferente.

Archivo `.env.example`:

```env
VITE_API_BASE=/api
```

## Cómo funciona el pipeline CI/CD

- `build-push-frontend.yml`: se dispara en `push` a la rama `deploy`, construye la imagen Docker y la sube a Docker Hub como `juanvillagra/front-despacho:latest`.
- `deploy-frontend.yml`: se dispara en la rama `deploy` y usa AWS SSM para ejecutar el despliegue en la instancia EC2 `i-06e73676ec6cd14e4`.

Secrets usados:
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN`

## Arquitectura del sistema

- `ec2_web` (44.203.209.74): frontend React Vite servido con Nginx.
- `ec2_app` (10.0.8.79): backend Ventas Spring Boot puerto `8080`.
- `ec2_datos` (10.0.8.139): backend Despachos Spring Boot puerto `8081` y MySQL.

El frontend consume APIs a través de un proxy en `ec2_web` que redirige `/api/ventas` a `http://10.0.8.79:8080/api/v1/ventas` y `/api/despachos` a `http://10.0.8.139:8081/api/v1/despachos`.

# 🧾 Teste Dynadok – Cadastro e Consulta de Clientes

Este projeto é parte de um desafio técnico, focado em boas práticas de arquitetura, integração com Redis, mensageria (Kafka) e Clean Architecture em Node.js com TypeScript.

---

## 🧱 Tecnologias Utilizadas

- **Node.js + TypeScript**
- **Express**
- **MongoDB (via Mongoose)**
- **Redis**
- **Apache Kafka (via KafkaJS)**
- **Jest** (Testes unitários e integração)
- **Docker + Docker Compose**
- **Swagger** (Documentação interativa)
- **Clean Architecture + SOLID**

---

## 🚀 Subindo a aplicação com Docker

Certifique-se de ter o Docker e Docker Compose instalados.

```bash
docker-compose up --build
```

Isso irá subir:

- API Node.js → `http://localhost:3000`
- MongoDB → `localhost:27017`
- Redis → `localhost:6379`
- Kafka + Zookeeper

---

## 📌 Endpoints Disponíveis

| Método | Rota            | Descrição                  |
| ------ | --------------- | -------------------------- |
| POST   | `/clientes`     | Cadastra um novo cliente   |
| GET    | `/clientes/:id` | Consulta um cliente por ID |
| PUT    | `/clientes/:id` | Atualiza um cliente        |
| DELETE | `/clientes/:id` | Remove um cliente          |
| GET    | `/clientes`     | Lista todos os clientes    |

---

## 📚 Documentação da API (Swagger)

Acesse a documentação interativa no Swagger:

```
http://localhost:3000/api-docs
```

Você poderá visualizar e testar todos os endpoints diretamente pelo navegador.

> O Swagger foi integrado usando `swagger-ui-express`.

---

## 📦 Estrutura de Pastas (Clean Architecture)

```
src/
├── domain/               # Entidades e contratos do domínio
├── application/          # Casos de uso, serviços e interfaces (ports)
├── infrastructure/       # Banco de dados, cache (Redis), Kafka
├── interfaces/           # Controllers e rotas (Express)
├── main/                 # EntryPoint da aplicação
├── tests/                # Testes unitários e integração
```

---

## 🧪 Rodando os Testes

```bash
npm run test
```

> Os testes cobrem serviços, repositórios e o fluxo de integração com MongoDB, Redis e Kafka.

---

## ⚙️ CI/CD com GitHub Actions

O projeto já inclui um workflow em `.github/workflows/ci.yml`.

Esse workflow roda testes automáticos em cada `push` ou `pull request` na branch `main`.

```yaml
name: Test and Build

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    services:
      mongo:
        image: mongo
        ports: ["27017:27017"]
      redis:
        image: redis
        ports: ["6379:6379"]
      kafka:
        image: bitnami/kafka:latest
        ports: ["9092:9092"]
        env:
          KAFKA_BROKER_ID: 1
          KAFKA_CFG_ZOOKEEPER_CONNECT: localhost:2181
          KAFKA_CFG_LISTENERS: PLAINTEXT://:9092
          KAFKA_CFG_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      zookeeper:
        image: bitnami/zookeeper:latest
        ports: ["2181:2181"]

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run test
```

---

## 💡 Extras

- Estrutura em Clean Architecture com forte separação de responsabilidades.
- Redis é usado para cachear clientes com TTL de 60 segundos.
- Kafka envia mensagens ao tópico `cliente.criado` para simular processamento assíncrono.

---

## 🧠 Autor

Desenvolvido por **Lucas Silvestre**  
Contato: [linkedin.com/in/silvestre](#) | [github.com/SilvestreL](https://github.com/SilvestreL)

# 🧾 Teste – Cadastro e Consulta de Clientes

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
- MongoDB → `mongo:27017`
- Redis → `redis:6379`
- Kafka + Zookeeper

> Para parar e remover os containers:

```bash
docker-compose down --volumes
```

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

```bash
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

Os testes incluem:

- Integração com MongoDB (em container)
- Cache Redis (mockado com Jest)
- Kafka Producer (mockado)

---

## ⚙️ CI/CD com GitHub Actions

O projeto possui CI automatizado via GitHub Actions.

A cada push ou pull request na branch `main`, é executado um workflow que:

- Sobe os containers com Docker Compose.
- Aguarda os serviços estarem prontos.
- Executa linter e testes dentro do container da aplicação.

---

## 💡 Extras

- Estrutura em Clean Architecture com forte separação de responsabilidades.
- Redis é usado para cachear clientes com TTL de 60 segundos.
- Kafka envia mensagens ao tópico `cliente.criado` para simular processamento assíncrono.

---

## 🧠 Autor

Desenvolvido por **Lucas Silvestre**  
Contato: [linkedin.com/in/silvestre](#) | [github.com/SilvestreL](https://github.com/SilvestreL)

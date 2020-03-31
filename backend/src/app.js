const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate'); // Para retornar erros da validação de forma mais 'bonita', sem exibir que foi falha do sistema com erro 500
const routes = require('./routes');

const app = express();

app.use(cors()); //permite acessar recursos de outro site mesmo estando em dominios diferentes
app.use(express.json()); // Comando para o app entender formato JSON
app.use(routes); // app usa 'ROTAS' que foram importadas para o arquivo através do require('./routes')
app.use(errors()); //exibe erros no formato 400

module.exports = app;


/**
 * Rota / Recurso
 */

/**
 * Método HTTP:
 *
 * GET: Buscar uma informação do Back-end
 * POST: Criar uma informação no Back-end
 * PUT: Alterar uma informação no Back-end
 * DELETE: Deletar uma informação no Back-end
 */

/**
 * Tipos de parâmetros:
 *
 * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)
 * Route Params: Parâmetros utilizados para identificar recursos
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

/**
 * Tipos de Banco de Dados:
 *
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server, etc.
 * NoSQL: MongoDB, CouchDB, etc.
 */

/**
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where()
 */

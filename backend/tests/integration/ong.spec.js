const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', ( () => {
    beforeEach( async ()=>{
        await connection.migrate.rollback(); //zera banco de dados
        await connection.migrate.latest(); //faz as migrations com o banco
    });

    afterAll(async () => {
        await connection.destroy(); //desconecta do banco
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "Teste", 
            email: "contatd@com.br", 
            whatsapp: "47000000000", 
            city: "Joinville", 
            uf: "SC"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
        
    });
}))
const connection = require('../database/connection');

module.exports = {

    async create(request, response){
        // {x, y, z} retorna valores de um objeto já declarados numa variavel.
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization; //pega Authorization do headers da requisição JSON
        
        //[id] declarado desta forma, recebe o primeiro valor retornado do array
        const [id] =  await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return response.json({ id });

    },

    async index(request, response){
        const { page = 1 } = request.query;

        // [count] recebe o primeiro valor do array
        const [count] = await connection('incidents').count(); //conta quantidade de resultados
                
        const incidents = await connection('incidents')//select com esquema de paginação e Join
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id' ).limit(5)
        .offset(( page - 1 ) * 5)
        .select([
            'incidents.*',
            'incidents.*', 
            'ongs.name', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city', 
            'ongs.uf'
        ]);
        
        response.header('X-Total-Count', count['count(*)']); //envia total de paginas para header de resposta da requisição
        return response.json(incidents);
    },

    async delete(request, response){

        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents').where('id', id).select('ong_id').first();

        if(incident.ong_id !== ong_id){
            return response.status(401).json({ error: 'Operation not permitted' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    
    }

};
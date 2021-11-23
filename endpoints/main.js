export const routes = async (app, options) => {
    app.get('/', async (request, reply) => {
        return { data: 'main' }
    });

    app.get('/user/:id', async (request, reply) => {
        return { data: request.params.id }
    });
};

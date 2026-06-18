import { get } from '../../../helpers/makeRequest';
import { todoSchema } from '../../../schemas/todo.schema';

const url = {
    url200: '/todos',
    url404: '/todos/404',
    url422: '/todos/:id'
}


describe('GET /todos', function (){
    it('Test for GET - 200', async function (){
        const response = await get(url.url200)
        response
        .expectStatus(200)
        .expectJsonSchema(todoSchema)
    })
    it('Test for GET - 401', async function (){
        const response = await get(url.url200, false)
        response.expectStatus(401)
    })
    it('Test for GET - 404', async function (){
        const response = await get(url.url404)
        response.expectStatus(404)
    })

    it('Test for GET - 422', async function (){
        const response = await get(url.url422)
        response.expectStatus(422)
    })
});

import axios from 'axios';

describe('CategoryController (e2e)', () => {
    let id: string;
    let headerAuthorization: any;

    beforeAll(async () => {
        const responseLogin = await axios.post(
            'http://localhost:3000/auth/login',
            {
                email: 'teste@teste.com',
                password: 'teste',
            },
        );

        headerAuthorization = {
            headers: {
                Authorization: `Bearer ${responseLogin.data.token}`,
            },
        };
    });

    it('shoudld create a new category', async () => {
        const input = {
            name: 'test',
        };
        const response = await axios.post(
            'http://localhost:3000/stock/categories',
            input,
            headerAuthorization,
        );
        const output = response.data;
        console.log(output);
        id = output.id;
        expect(output.id).toBeDefined();
    });

    it('shoudld list all categories', async () => {
        const response = await axios.get(
            'http://localhost:3000/stock/categories',
            headerAuthorization,
        );
        const output = response.data;
        expect(output.length).toBeGreaterThan(0);
    });

    it('shoudld get a category by id', async () => {
        const response = await axios.get(
            `http://localhost:3000/stock/categories/${id}`,
            headerAuthorization,
        );
        const output = response.data;
        expect(output.name).toBe('teste');
    });

    it('shoudld update a category', async () => {
        const input = {
            id,
            name: 'test1',
        };
        const response = await axios.put(
            `http://localhost:3000/stock/categories/${id}`,
            input,
            headerAuthorization,
        );
        const output = response.data;
        expect(output.name).toBe('test1');
    });

    it('shoudld delete a category', async () => {
        await axios.delete(
            `http://localhost:3000/stock/categories/${id}`,
            headerAuthorization,
        );

        const responseGet = await axios.get(
            `http://localhost:3000/stock/categories/${id}`,
            headerAuthorization,
        );
        const output = responseGet.data;
        expect(output).toBeUndefined();
    });
});

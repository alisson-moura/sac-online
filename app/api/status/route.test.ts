import { GET } from './route';

describe('API Route: /api/status (Integration)', () => {

  it('deve retornar o status 200 e um corpo de resposta válido', async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);

    expect(body.database.status).toBe('up');
    expect(body.database.version.length).toBeGreaterThanOrEqual(2);
    expect(body.database.conexoes).toBeGreaterThanOrEqual(1);
  });
});
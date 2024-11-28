import { rest } from 'msw';

const BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

export const handlers = [
  // Mock GET users
  rest.get(`${BASE_URL}/users`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
        },
      ])
    );
  }),

  // Mock GET posts
  rest.get(`${BASE_URL}/posts`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          title: 'Test Post 1',
          body: 'This is test post 1',
          userId: 1,
        },
        {
          id: 2,
          title: 'Test Post 2',
          body: 'This is test post 2',
          userId: 2,
        },
      ])
    );
  }),

  // Mock DELETE post
  rest.delete(`${BASE_URL}/posts/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        message: `Post ${id} deleted successfully`,
      })
    );
  }),
];
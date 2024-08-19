import { FastifyRequest } from 'fastify';

export const getUserIp = (req: FastifyRequest): string => {
  return (
    (req.headers['x-forwarded-for']
      ? req.headers['x-forwarded-for'].toString()
      : req.socket.remoteAddress) ?? 'IP Not Found'
  );
};

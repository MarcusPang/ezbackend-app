import Boom from '@hapi/boom';

export const checkLoggedIn = async (req) => {
  if (!req.user) {
    throw Boom.unauthorized();
  }
};

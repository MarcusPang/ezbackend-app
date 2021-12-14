const completeURL = (pathname: string) => {
  return new URL(pathname, process.env.NEXT_PUBLIC_BACKEND_URL).href;
};

export const customFetch = {
  get: async (url: string, opts: RequestInit = {}) => {
    const response = await fetch(completeURL(url), {
      ...opts,
      credentials: 'include',
    });
    return await response.json();
  },
  post: async (
    url: string,
    body: Record<string, unknown> = {},
    opts: RequestInit = {},
  ) => {
    const response = await fetch(completeURL(url), {
      ...opts,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    return await response.json();
  },
  put: async (
    url: string,
    body: Record<string, unknown> = {},
    opts: RequestInit = {},
  ) => {
    const response = await fetch(completeURL(url), {
      ...opts,
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    return await response.json();
  },
  patch: async (
    url: string,
    body: Record<string, unknown> = {},
    opts: RequestInit = {},
  ) => {
    const response = await fetch(completeURL(url), {
      ...opts,
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    return await response.json();
  },
  delete: async (
    url: string,
    body: Record<string, unknown> = {},
    opts: RequestInit = {},
  ) => {
    const response = await fetch(completeURL(url), {
      ...opts,
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    return await response.json();
  },
};

export default customFetch;

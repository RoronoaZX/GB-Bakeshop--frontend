export default function (/* ctx */) {
  return {
    httpClient: 'axios',
    redirect: {
      routes: {
        auth: '/account',
        guest: '/',
      },
    },
    endpoints: {
      authenticate: {
        url: '/auth/login',
      },
      user: {
        url: '/auth/user',
      },
    },
  };
}

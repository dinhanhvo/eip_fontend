export const environment = {
  production: true,
  contextPath: '/ad-dashboard',
  http: {
    apiUrl: '<https://api.myweb.com>',
  },
  mqtt: {
    server: 'tcp://broker.emqx.io:1883',
    protocol: 'wss',
    port: 1883
  }
};

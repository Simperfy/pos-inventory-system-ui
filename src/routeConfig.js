export const routes = [
  { name: 'home', path: '/' },
  { name: 'selection', path: '/selection' },
  { name: 'inventory', path: '/inventory' },
];

export const getRoute = (name) => routes.find((r) => r.name === name).path;
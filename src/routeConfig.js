export const routes = [
    {name: 'home', path: '/'},
    {name: 'inventory', path: '/inventory'},
    {name: 'selection', path: '/selection'},
    {name: 'sales', path: '/sales'},
];

export const getRoute = (name) => {
    return routes.find((r) => r.name === name).path;
};

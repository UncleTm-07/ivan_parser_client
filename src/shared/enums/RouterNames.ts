export const RouterNames = {
    HOME: {to: "/", name: "home", title: "Головна"},
    WORKERS: {to: "/workers", name: "workers", title: "НП працівники"},
    WORKER: {to: "/workers/:id", name: "worker", title: "Панель НП працівника"},
    SETTINGS: {to: "/settings", name: "settings", title: "Налаштування"},
    LOGIN: {to: "/login", name: "login", title: "Авторизація"},
    REGISTRATION: {to: "/registration", name: "registration", title: "Реєстрація"},
}

export const sidebarLinks = [
    {
        route: RouterNames.HOME.to,
        label: RouterNames.HOME.title,
    },
    {
        route: RouterNames.WORKERS.to,
        label: RouterNames.WORKERS.title,
    },
    {
        route: RouterNames.SETTINGS.to,
        label: RouterNames.SETTINGS.title,
    },
];


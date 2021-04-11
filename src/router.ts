import { Route } from 'vue-router';

const AsyncComponentBuilder = (folder: string, path: string) => {
    if (folder === 'layouts') {
        return () => import(
            /* webpackMode: "lazy" */
            /* webpackInclude: /\.vue$/ */
            `@/layouts/${path}`);
    }
};

/**
 * The route configuration array
 */
export const routes = [
    {
        path: '/',
        component: AsyncComponentBuilder('layouts', 'MaxVueLayout.vue'),
        name: 'root',
        meta: { requiresAuth: false }
    },
    {
        path: '/not-found',
        name: 'not-found',
        component: AsyncComponentBuilder('layouts', 'NotFoundLayout.vue'),
    }
];

/**
 * Global before guard
 *  - one of it's purpose is to redirect to 404 if requested route does not exists
 * @param {Object} to - the route transitioning to
 * @param {Object} from - the route transitioning from
 * @param {Function} next - the function to call to resolve the hook
 */
export function globalBeforeGuard(to: Route, from: Route, next: any) {
    if (to.matched.length === 0)
        next('not-found');
    else
        next();
}

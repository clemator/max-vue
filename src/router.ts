import MaxVueLayout from '@/layouts/MaxVueLayout.vue';
import NotFoundLayout from '@/layouts/NotFoundLayout.vue';

/**
 * The route configuration array
 */
export const routes = [
    {
        path: '/',
        component: MaxVueLayout,
        name: 'root',
        meta: { requiresAuth: false }
    },
    {
        path: '/not-found',
        name: 'not-found',
        component: NotFoundLayout,
    }
];

/**
 * Global before guard
 *  - one of it's purpose is to redirect to 404 if requested route does not exists
 * @param {Object} to - the route transitioning to
 * @param {Object} from - the route transitioning from
 * @param {Function} next - the function to call to resolve the hook
 */
export function globalBeforeGuard(to, from, next) {
    if (to.matched.length === 0)
        next('not-found');
    else
        next();
}

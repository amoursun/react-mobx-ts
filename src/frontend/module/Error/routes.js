/* eslint-disable */
/**
 * @file APP_NAME 路由配置
 * @author YOURNAME
 */

// 本模块独有的 PageContainer

// 使用项目公用的 PageContainer
import PageContainer from 'common/components/PageContainer'

export const errorRoutes = [
    {
        path: 'error',
        indexRoute: {
            onEnter(nextState, replace) {
                replace('404')
            }
        },
        childRoutes: [
            {
                path: '404',
                // component: Error404,
                getComponent(location, callback) {
                    require.ensure([], () => callback(null, require('./404').default))
                }
            }, {
                path: '403',
                // component: Error403,
                getComponent(location, callback) {
                    require.ensure([], () => callback(null, require('./403').default))
                }
            }, {
                path: 'browser',
                // component: error-browser,
                getComponent(location, callback) {
                    require.ensure([], () => callback(null, require('./errorBrowser').default))
                }
            }
        ]
    }, {
        path: '*',
        onEnter(nextState, replace) {
            replace('/error/404')
        },
    },
]

export default {
    path: '/',
    indexRoute: {
        onEnter(nextState, replace) {
            replace('index')
        }
    },
    component: PageContainer,
    childRoutes: errorRoutes
}

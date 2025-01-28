import {createNavigationContainerRef, CommonActions, StackActions} from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export const navigate = async (routeName: string, params?: object) => {
    navigationRef.isReady()
    if(navigationRef.isReady()){
        navigationRef.dispatch(CommonActions.navigate(routeName, params))
    }
}

export async function replace(routeName: string, params?: object) {
    navigationRef.isReady()
    if(navigationRef.isReady()){
        navigationRef.dispatch(StackActions.replace(routeName,params))
    }
}

export async function resetAndNavigate(routeName: string, params?: object) {
    navigationRef.isReady()
    if(navigationRef.isReady()){
        navigationRef.dispatch(CommonActions.reset({index: 0, routes: [{name: routeName}]}))
    }
}

export async function goBack() {
    navigationRef.isReady()
    if(navigationRef.isReady()){
        navigationRef.dispatch(CommonActions.goBack())
    }
}
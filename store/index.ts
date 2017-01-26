import { NgModule } from '@angular/core';
import { NgRedux, DevToolsExtension, select } from 'ng2-redux';
import { createEpicMiddleware } from 'redux-observable';
export { Observable } from 'rxjs';
import { combineReducers, bindActionCreators } from 'redux';
export { select, NgRedux } from 'ng2-redux';
export { AuthActions, PostsActions, CompaniesActions, StudentsActions } from "./actions"
import { AuthActions, PostsActions, CompaniesActions, StudentsActions } from "./actions"
import { AuthEpic, PostsEpic, CompaniesEpic, StudentsEpic } from "./epics"
import { authReducer, PostsReducer, CompaniesReducer, StudentsReducer } from "./reducers"

export interface IAppState {
    auth?: Object,
    posts?: Object,
    companies?: Object,
    students?: Object
}

export const AppReducer = combineReducers<IAppState>({
    auth: authReducer,
    posts: PostsReducer,
    companies: CompaniesReducer,
    students: StudentsReducer
})

@NgModule({
    providers: [
        // Your Actions
        AuthActions,
        PostsActions,
        CompaniesActions,
        StudentsActions,
        // Your Epics
        AuthEpic,
        PostsEpic,
        CompaniesEpic,
        StudentsEpic
    ]
})

export class ReduxStoreModule {
    constructor(private ngRedux: NgRedux<IAppState>, private ae: AuthEpic, private devTool: DevToolsExtension,
        private pe: PostsEpic, private ce: CompaniesEpic, private se: StudentsEpic) {
        const middleware = [
            createEpicMiddleware(this.ae.requestLogin),
            createEpicMiddleware(this.ae.register),
            createEpicMiddleware(this.ae.checkLogin),
            createEpicMiddleware(this.ae.loginSuccess),
            createEpicMiddleware(this.ae.requestLogout),
            createEpicMiddleware(this.ae.companiesUser),
            createEpicMiddleware(this.pe.addPost),
            createEpicMiddleware(this.ce.requestCompanies),
            createEpicMiddleware(this.ce.requestPostStudents),
            createEpicMiddleware(this.se.requestStudents),



        ]

        this.ngRedux.configureStore(
            AppReducer,
            {},
            middleware,
            [devTool.isEnabled() ? devTool.enhancer() : f => f]
        )
    }



}
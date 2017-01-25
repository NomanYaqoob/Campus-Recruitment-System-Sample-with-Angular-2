import { Routes } from "@angular/router"
import { Containers } from "../containers"
import { HomeContainer, SigninContainer, SignupContainer, RootContainer, DashboardContainer, ProfileContainer, PostsContainer } from "../containers"
import { Components } from "../components"
import { AuthGuard } from "../providers"
export const AppRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeContainer },
    { path: 'signin', component: SigninContainer },
    { path: 'signup', component: SignupContainer },
    {
        path: "",
        component: RootContainer,
        canActivate: [AuthGuard],
        children: [
            { path: "dashboard/:userId", component: DashboardContainer },
            { path: "profile", component: ProfileContainer },
            { path: "posts/:compId", component: PostsContainer }
        ]
    }
]


export const ApplicationComponents = [
    Containers,
    Components
]

import { AuthGuard } from "./authGuard"
import { FirebaseService } from "./firebase"
export const providers = [
    AuthGuard,
    FirebaseService
]

export {
    AuthGuard,
    FirebaseService
}
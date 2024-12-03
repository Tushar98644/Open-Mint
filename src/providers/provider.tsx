import { AuthGuard } from "./auth_gaurd"

export const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthGuard>
            {children}
        </AuthGuard>
    )
}
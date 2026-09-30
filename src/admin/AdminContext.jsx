import { createContext, useContext } from 'react'

// `expire` se llama cuando la API responde 401 (sesión vencida).
export const AdminContext = createContext({ expire: () => {} })
export const useAdmin = () => useContext(AdminContext)

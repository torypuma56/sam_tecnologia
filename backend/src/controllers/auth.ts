import { AdminModel } from '../models/admin'

export const login = async (email: string, password: string) => {
  const admin = await AdminModel.getByEmail(email)

  if (!admin) {
    return { success: false, message: 'Credenciales incorrectas' }
  }

  const passwordValida = await AdminModel.verificarPassword(
    password,
    admin.password
  )

  if (!passwordValida) {
    return { success: false, message: 'Credenciales incorrectas' }
  }

  return { success: true, data: { id: admin.id, email: admin.email } }
}

export const crearAdmin = async (email: string, password: string) => {
  return await AdminModel.create(email, password)
}
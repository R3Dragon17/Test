import bcrypt from 'bcryptjs'

export const encodePass = (pass: string) => {
    const SALT = bcrypt.genSaltSync()
    return bcrypt.hashSync(pass, SALT)
}

export const comparePass = (pass: string, hash: string) => {
    return bcrypt.compareSync(pass, hash)
}
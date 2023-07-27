import bcrypt from "bcrypt"

const saltRounds=10
export function hashPassword(plainPassword){
    return bcrypt.hash(plainPassword,saltRounds)
}
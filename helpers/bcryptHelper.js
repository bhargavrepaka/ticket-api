import bcrypt from "bcrypt"

const saltRounds=10
export async function hashPassword(plainPassword){
    try {
        return Promise.resolve(await bcrypt.hash(plainPassword,saltRounds)) 
    } catch (error) {
        return Promise.reject(error)
    }
    
}

export async function comparePassword(password,hashedPassword){
    try {
        return Promise.resolve(await bcrypt.compare(password,hashedPassword)) 
    } catch (error) {
        return Promise.reject(error)
    }
}
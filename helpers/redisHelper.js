import redis from "redis"
const client =redis.createClient(process.env.REDIS_URL)
try {
    await client.connect();
} catch (error) {
    console.log(error)
}

export async function setJwt(key,value){
    try {
        const res= await client.set(key,value)
        return Promise.resolve(res)
    } catch (error) {
        return Promise.reject(error)
    }
    
}

export async function getJwt(key){
    try {
        const res= await client.get(key)
        if(!res) throw new Error("User Not Found in Redis")
        return Promise.resolve(res)
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function deleteJwt(key){
    try {
        const res= await client.del(key)
        return Promise.resolve(res)
    } catch (error) {
        return Promise.reject(error)
    }
}
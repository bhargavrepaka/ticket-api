import redis from "redis"
const client =redis.createClient(process.env.REDIS_URL)
try {
    await client.connect();
} catch (error) {
    console.log(error)
}

export function setJwt(key,value){
    return client.set(key,value)
}

export function getJwt(key,){
    return client.get(key)
}
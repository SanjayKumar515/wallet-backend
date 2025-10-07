import ratelimit from "../config/upstash.js";

const rateLimiter = async(req,res,next)=>{
    try {
        // here we kept it simple  in real world we can use user id or ip address to identify user
        // and set different rate limit for different users
        // like free user can have 100 requests per hour and paid user can have 1000 requests per hour
        // also we can have different rate limit for different routes
        // like login route can have 10 requests per hour and other routes can have 100 requests per hour
        const {success} = await ratelimit.limit("My global rate limit");
        if(!success) return res.status(429).json({message:"Too many requests , please try again later"})
        next();
    } catch (error) {
        console.log("Error in rate limiter middleware ",error);
        res.status(500).json({message:"Internal server error!"});

    }

} 


export default rateLimiter;
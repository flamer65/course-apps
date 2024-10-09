const z = require('zod');
const user = z.object({
    email: z.string().email().min(12).max(100), 
    password: z.string().includes('@'),
    firstname: z.string().min(3), 
    lastname:  z.string().min(3)
})
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET
const JWT_USER_SECRET = process.env.JWT_USER_SECRET
module.exports = {
    user,
    JWT_ADMIN_SECRET,
    JWT_USER_SECRET
}

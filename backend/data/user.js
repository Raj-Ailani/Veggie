import bcrypt from 'bcryptjs'
const user=[
    {
        name:   'Admin User', 
        email:  'admin@veggie.com',
        password:bcrypt.hashSync('123456',10)  ,
        isAdmin:true
    },
    {
        name:   'Satish', 
        email:  'satish@veggie.com',
        password:bcrypt.hashSync('123456',10)   ,
    
    },
    {
        name:   'Preeti', 
        email:  'preeti@veggie.com',
        password:bcrypt.hashSync('123456',10)   ,
     
    },
]

export default user
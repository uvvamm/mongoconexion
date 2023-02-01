const jwt =require('jsonwebtoken');

const generarJWT = ( uid ) => {

    return new Promise((resolve, reject ) => {
    
    
        
        const payload={
            uid
            
        };
        
        
        jwt.sign( payload, process.env.JWT, {
            expiresIn : '12h'
        },(err,token) =>{
            if(err) {
                console.error(err);
                reject('no se genero jwt');
                
                
        }else {
            resolve(token);
        }
    }
    );
});

}

module.exports = {
    generarJWT};
const jwt =require('jsonwebtoken');

const validarJwt = (req, res, next) => {


    const token = req.header('x-token');
    console.log(token);
    if (!token){
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token no  hay uno'
        })
    }
    try {
        const {uid} = jwt.verify(token,process.env.JWT);
        console.log(uid);
        next();


    } catch (error) {
        return res.status(401).json({
         ok: false,
         msg: 'Invalid tok'
        })
    }


    
}

module.exports ={
    validarJwt
}
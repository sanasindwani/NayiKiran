// import jwt from 'jsonwebtoken'

// const generateTokenAndSetCookie=(userId, res)=>{
//     const token=jwt.sign({userId},process.env.JWT_SECRET,{
//         expiresIn:'15d'
//     })
//     console.log('Generated token:', token);
//     res.cookie("jwt",token,{
//         maxAge:15*24*60*60*1000,
//         httpOnly:true, //prevent xss attacks
//         sameSite:"strict",
//         secure: process.env.NODE_ENV !=="developmet"
//     })
// }
// export default generateTokenAndSetCookie



import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    try {
      const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d',
      });
      console.log('Generated token:', token);
  
      res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent XSS attacks
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production', // only secure in production
      });
      console.log('Token set in cookie');
    } catch (error) {
      console.error("Error generating or setting token:", error.message);
    }
  };
  

export default generateTokenAndSetCookie;
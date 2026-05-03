const firewallRules = {
  "192.168.1.1": "block",
  "192.168.1.4": "block",
  "192.168.1.9": "block",
  "192.168.1.13": "block",
  "192.168.1.16": "block",
  "192.168.1.19": "block"
};
const firewallMiddleware = asyncHandler(async (req,res,next)=>{

const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
// clean ip 
     const cleanIP = clientIP.replace('::ffff:', '');
  //
  const action = firewallRules[cleanIP];
  
  if (action === "block") {
    console.log(` Blocked IP: ${cleanIP}`);
    return res.status(403).json({
      error: "Access Denied",
      message: "Your IP address has been blocked by the firewall",
      ip: cleanIP
    });
  }
   console.log(`Allowed IP: ${cleanIP}`);
  next();

})
module.exports = firewallMiddleware;


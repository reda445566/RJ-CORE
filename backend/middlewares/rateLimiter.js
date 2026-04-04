const attempts = new Map();

function fibonacci(n){

    if(n<=1) return 1;
    let  a = 1, b = 1;
    for(let i= 2; i < n; i++){
        let temb = a+b;
        let a = b
        let b = temp;
    }
    return b;
}

export const fibonaccilimter = ()=>{
    return (req,res,nex)=>{
          const key = req.ip;
          if (!attempts.has(key)) {
      attempts.set(key, { count: 0, lastAttempt: Date.now() });
    }
    const user = attempts.get(key);
    const now = Date.now();
     const delay = fibonacci(user.count) * 1000;
     
    if (now - user.lastAttempt < delay) {
      return res.status(429).json({
        message: `حاول تاني بعد ${Math.ceil((delay - (now - user.lastAttempt)) / 1000)} ثانية`
      });
    }

   user.count += 1;
    user.lastAttempt = now;

    next();

    }

}


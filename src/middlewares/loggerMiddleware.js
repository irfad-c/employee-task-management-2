function loggerMiddleware(req, res,next) {
  const startTime = Date.now();

  res.on("finish", () => {
    const endTime = Date.now();
    const responseTime = endTime-startTime;
console.log(`${req.method}-${req.originalUrl}-${res.statusCode}-${responseTime}`);

  });
  next();
}

module.exports=loggerMiddleware

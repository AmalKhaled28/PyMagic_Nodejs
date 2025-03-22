const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.cookies.token; // جلب التوكن من الكوكيز

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // إرفاق بيانات المستخدم في الطلب
        next();
    } catch (error) {
        console.log(error);
        
        res.status(401).json({ message: "JWT Token expired." });
    }
};

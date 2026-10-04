const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
	const authorization = req.headers.authorization

	if (!authorization || !authorization.startsWith('Bearer ')) {
		return res.status(401).send('Authentication token required')
	}

	const token = authorization.split(' ')[1]

	try {
		req.author = jwt.verify(token, process.env.SECRET_KEY)
		next()
	} catch (err) {
		return res.status(401).send('Invalid or expired token')
	}
}

module.exports = auth

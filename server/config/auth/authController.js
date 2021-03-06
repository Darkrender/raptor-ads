const secret = process.env.TOKEN_SECRET || 'bobbyisbadatstarcraft';
const models = require('../../../database/schemas.js');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

module.exports = {
  logIn: (req, res) => {
    models.User.findOne({
      where: { email: req.body.email, isDeleted: false },
      include: [models.Rating],
    })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({
              email: user.email,
              first_name: user.first_name,
              id: user.id,
            }, secret, { expiresIn: '1h' });
            res.json({ user, token });
          } else {
            res.send({ error: 'Incorrect password' });
          }
        } else {
          res.send({ error: 'No account found with that email' });
        }
      });
  },

  getUserFromToken: (req, res) => {
    const token = req.params.token;
    jwt.verify(token, secret, (err, decoded) => {
      if (err || !decoded) {
        res.status(400).send('Bad Token');
      } else {
        models.User.findOne({
          where: { id: decoded.id, isDeleted: false },
          include: [models.Rating],
        })
          .then((user) => {
            res.json(user);
          });
      }
    });
  },
};

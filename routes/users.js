const express = require('express')
const route = express.Router()

const users = [
    {id: 1,
     name: 'Mike johnson',
     password: '23243lovfs'
    },

    {id: 2,
    name: 'Samson Matic',
    password: '23243lovfs'
    },

    {id: 3,
     name: 'David Mikeson',
     password: '23243lovfs'}
]

route.get('/api/users', (req, res) => {
    res.send(users)
})

route.post('/api/users', (req, res) => {
    
    const { error } = userValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = {
        id: users.length + 1,
        name: req.body.name
    }
    users.push(user)
    res.send(user)
})

route.put('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id))
    if (!user) return res.status(404).send('user with the given id does not exist.')

    const { error } = userValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    user.name = req.body.name

    res.send(user)

})

route.delete('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id))
    if (!user) return res.status(404).send('user with the given id does not exist.')

    const index = users.indexOf(user)
    users.splice(index, 1)

    res.send(user)
})


route.get('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id))
    if (!user) return res.status(404).send('user with the given id does not exist.')
    res.send(user)
})

const userValidation = (user) => {
    const schema = Joi.object({name: Joi.string().min(3).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })
    return schema.validate(user)
}

module.exports = route
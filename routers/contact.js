const express = require('express')
const Contact = require('../models/contact')
const router = new express.Router()

const cors = require('cors')

router.use(
    cors({
        origin: '*',
    }),
)

router.get('/allcontacts/:id', async (req, res) => {
    const ID = req.params.id

    try {
        const contacts = await Contact.find({ userId: ID })
        res.status(201).send(contacts)
    } catch (e) {
        res
            .status(400)
            .send({
                msg: 'something wrong while fetching contact list of single user.',
            })
    }
})

router.patch('/contacts/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'phone', 'address'];
    const isValidOperatiion = updates.every((update) =>
        allowedUpdates.includes(update),
    )

    if (!isValidOperatiion) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const contact = await Contact.findById({ _id: req.params.id })

        if (!contact) {
            return res.status(404).send()
        }

        updates.forEach((update) => (contact[update] = req.body[update]))
        await contact.save()

        res.send(contact)
    } catch (e) {
        res
            .status(400)
            .send({ msg: 'something wrong while updating single contact:' })
    }
})

router.delete('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete({ _id: req.params.id })

        if (!contact) {
            return res.status(404).send({ msg: "Not found" })
        }

        res.send({ msg: 'Deleted ' })
    } catch (e) {
        res
            .status(500)
            .send({ msg: 'something wrong while deleting single contact:' })
    }
})

router.post('/addcontact', async (req, res) => {

    const contact = new Contact(req.body)

    try {
        await contact.save()
        res.status(201).send(contact)
    } catch (e) {
        res
            .status(400)
            .send({ msg: 'something wrong while adding single contact:' })
    }
})

module.exports = router

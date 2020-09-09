const express = require("express");
const router = express.Router();
const User = require("../models/user");


// Getting all
router.get("/", async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        // request failed because of server internal error and not because of use fault
        res.status(500).json({ message: err.message });
    }
});


// Getting One
router.get("/:id", getUser, (req, res) => {
    res.json(res.user);
});


// Creating one
router.post("/", async (req, res) => {
    const user = new User({
        name: req.body.name,
        address: req.body.address,
        channel: req.body.channel
    });
    try {
        const newUser = await user.save();
        // http status code 201 entity create at server, status code 200 means success,
        // but 201 is more specific
        res.status(201).json(newUser);
    } catch (err) {
        // http status code 400 means request failed as user provided bad data
        res.status(400).json({ message: err.message });
    }
});


// Updating One
router.patch("/:id", getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }
    // channel;
    if (req.body.channel != null) {
        res.user.channel = req.body.channel;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Deleting One
router.delete("/:id", getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: "Deleted User" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: "Cannot find subscriber" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
}



module.exports = router;

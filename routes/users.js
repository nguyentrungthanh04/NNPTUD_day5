var express = require('express');
var router = express.Router();
const User = require('../schemas/users');

// CREATE
router.post("/", async (req, res) => {

    const user = new User(req.body);

    await user.save();

    res.json(user);
});

// GET ALL
router.get("/", async (req, res) => {

    const users = await User.find({ deleted: false }).populate("role");

    res.json(users);
});

// GET BY ID
router.get("/:id", async (req, res) => {

    const user = await User.findById(req.params.id).populate("role");

    res.json(user);
});

// UPDATE
router.put("/:id", async (req, res) => {

    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(user);
});

// SOFT DELETE
router.delete("/:id", async (req, res) => {

    await User.findByIdAndUpdate(req.params.id, {
        deleted: true
    });

    res.json({ message: "Soft deleted" });
});

router.post("/enable", async (req, res) => {

    const { email, username } = req.body;

    const user = await User.findOneAndUpdate(
        { email: email, username: username },
        { status: true },
        { new: true }
    );

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});

router.post("/disable", async (req, res) => {

    const { email, username } = req.body;

    const user = await User.findOneAndUpdate(
        { email: email, username: username },
        { status: false },
        { new: true }
    );

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});

module.exports = router;
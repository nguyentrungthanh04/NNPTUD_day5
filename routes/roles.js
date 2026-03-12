var express = require('express');
var router = express.Router();
const Role = require('../schemas/roles');

// CREATE
router.post("/", async (req, res) => {
    const role = new Role(req.body);
    await role.save();
    res.json(role);
});

// GET ALL
router.get("/", async (req, res) => {
    const roles = await Role.find();
    res.json(roles);
});

// GET BY ID
router.get("/:id", async (req, res) => {
    const role = await Role.findById(req.params.id);
    res.json(role);
});

// UPDATE
router.put("/:id", async (req, res) => {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(role);
});

// DELETE
router.delete("/:id", async (req, res) => {
    await Role.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;
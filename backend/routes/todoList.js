const router = require("express").Router();
const List = require("../models/list");
const User = require("../models/user");

//CREATE TASK

router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(400).json({ message: "Please Sign-up first." });
    }
    const list = new List({ title, body, user: existingUser });
    await list
      .save()
      .then(() => res.status(200).json({ message: "Task added", list }));
    existingUser.list.push(list);
    existingUser.save();
  } catch (error) {
    res.status(400).json({ error });
  }
});

//UPDATE TASK

router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body } = req.body;
    const id = req.params.id;
    const list = await List.findByIdAndUpdate(id, { title, body });
    list.save().then(() => res.status(200).json({ message: "Task Updated" }));
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

//DELETE TASK

router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const taskId = req.params.id;
    const existingUser = await User.findByIdAndUpdate(
       id ,
      {
        $pull: { list: taskId },
      }
    );

    if (existingUser) {
      await List.findByIdAndDelete(taskId).then(() =>
        res.status(200).json({ message: "Task Deleted Successfully" })
      );
    } else {
      res.status(400).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

//GET TASKS

router.get("/getTasks/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({
      createdAt: -1,
    });
    if(list.length !== 0){
        res.status(200).json({ list: list });
    }else{
        res.status(200).json({ message: "No Task Created" });
    }
  } catch (error) {
    res.status(400).json({message:"user not found", error });
    console.log(error);
  }
});

module.exports = router;

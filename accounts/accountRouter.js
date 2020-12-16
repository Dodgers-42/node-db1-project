const express = require("express");
const db = require("../data/dbConfig")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try{
        const accounts = await db.select("*")
            .from("accounts")
            res.json(accounts)
    }
    catch(err){
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try{
      const account = await db
        .select("*")
        .from("accounts")
        .where("id", req.params.id)
        .limit(1)
      res.json(account)
    }
    catch(err){
        next(err)
    }
})

// router.post("/", async (req, res, next) => {
//     try{
//         const newId = req.params.id
//         const newName = `account=${newId}`
//         const newAccount = {
//             name: newName,
//             budget: req.body.budget
//         }
// // maybe this instead of the one above...
//         // { 
//         //     name: req.body.name,
//         //     budget: req.body.budget
//         // }

//         if(!newAccount.budget){
//             return res.status(400).json({
//                 message: "You need a budget"
//             })
//         }

//         const [id] = await db
//             .insert(newAccount)
//             .into("accounts")
//         const account = await db
//             .select("*")
//             .from("accounts")
//             .where("id", id)

//         res.status(201).json(account)
//     }
//     catch(err){
//         next(err)
//     }
// })

router.put('/:id', async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }

        if (!payload.name || !payload.budget) {
            return res.status(400).json({
                message: "Need both a name and a budget"
            })
        }

        //UPDATE accounts SET name = ? AND budget =? WHERE ID = ?
        await db('accounts').where('id', req.params.id).update(payload)
        const account = await db
            .first("*")
            .from('accounts')
            .where('id', req.params.id)
        
        res.status(201).json(account)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        //DELETE FROM accounts WHERE ID =?

        await db('accounts').where('id', req.params.id).del()

        res.status(204).end()
    } catch(err) {
        next(err)
    }
})


module.exports = router;

const express = require("express")
const router = express.Router()

const members = require("../memberList")

const uuid = require("uuid")

router.get("/",(req,res)=>{
    res.json(members)
}) ;

router.get("/:id",(req,res)=>{
    const found = members.some(member=> member.id === parseInt(req.params.id)) ;

    if(found) {
        res.json(members.filter(member=> member.id === parseInt(req.params.id)))

    } 
    else {
        res
        .status(404)
        .json({msg: `No member found with id of ${req.params.id}`})
    }
    res.json(members)})


    // Post method 

    router.post("/",(req,res)=> {
        const newMember = {
            id: uuid.v4(),
            name: req.body.name,
            email: req.body.email,
            status: "Active"
        
        }

        if(!newMember.name || !newMember.email){
            return  res.status(400).json({
                msg: "please provide name and email address"
            })
        }
        members.push(newMember) ;
        res.json(members) ;
    })


// Delete Member

router.delete("/:id",(req,res)=>{
    const found = members.some(
        member => member.id === parseInt(req.params.id)
    )

    if(found) {
        res.json({
            msg: "Member has been deleted" ,
            members : members.filter(member=> member.id!==parseInt(req.params.id))
        })
    } else {
        res.status(400).json({msg:`Nomember found with id ${req.params.id}`})
    }
})


 module.exports = router ;
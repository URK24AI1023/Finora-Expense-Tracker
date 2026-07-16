const Budget = require("../models/Budget");


// ADD BUDGET

const addBudget = async(req,res)=>{

    try{

        const budget = await Budget.create({

            userId:req.user.id,

            category:req.body.category,

            amount:req.body.amount,

            month:req.body.month

        });


        res.status(201).json(budget);


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};




// GET ALL BUDGETS

const getBudgets = async(req,res)=>{

    try{


        const budgets = await Budget.find({

            userId:req.user.id

        });


        res.json(budgets);


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};





// DELETE BUDGET

const deleteBudget = async(req,res)=>{


    try{


        await Budget.findByIdAndDelete(

            req.params.id

        );


        res.json({

            message:"Budget deleted"

        });


    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};




module.exports={

addBudget,

getBudgets,

deleteBudget

};
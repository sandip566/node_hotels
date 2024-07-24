const express= require('express');
const router= express.Router();
const person = require('./../models/person');



router.post('/', async (req, res) => {

    try {
      const data = req.body
  
      const newPerson = new person(data);
  
      const response = await newPerson.save();
      console.log('Data saved');
      res.status(200).json({response    });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server Error' })
    }
  
  })


  router.get('/',async (req,res)=>{
    try{
      const data = await person.find();
      console.log('Data Fetched');
      res.status(200).json({data});
    }catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal server Error' })
    }
  })

  router.get('/:workType', async (req,res)=>{
    try{
      const workType= req.params.workType;
    if(workType=="chef" || workType== "manager" || workType=="waiter"){
      
      const response= await person.find({work:workType});
      console.log('response fetched');
      res.status(200).json(response);
    }
    else{
      res.status(404).json({error:'Invalid work type'});
    }
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'})
    
    }
  })

  router.put('/id', async (req,res)=>{
    try{
        const personId= req.params.id; 
        const updetedPersonData= req.body ; 

        const  response= await person.findByIdAndUpdate(personId, updetedPersonData,{
            new:true,
            runValidators:true,
        })
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
        

    }catch(err){
        console.log(err);
      res.status(500).json({error:'Internal Server Error'})
    
       
    }
  })

  router.delete('/:id', async(req,res)=>{
    try{
        const personId= req.params.id; 
        const response = await person.findByIdAndDelete(personId);
     
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message:'person Deleted Succesfully'});


    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})   
    }
  })


  module.exports= router;
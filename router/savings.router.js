const express = require('express');
const fs = require('fs');
const Saving = require("../models/savings.model");
const savingRouter = express.Router();
const savingJsonRecord = JSON.parse(fs.readFileSync("./data/savings.json"))

savingRouter.post("/create", async (req,res)=>{
    try{
        for(record  of savingJsonRecord){
            const newRecord = new Saving(record);
            await newRecord.save();
        }
        console.log("Record added successfully");
    res.status(201).json({
      success: true,
      message: "Savings created successfully",
    });
    }catch(error){
        console.error("Error in seeding the data")
    }
})

savingRouter.get("/", async (req, res) => {
    try {
      const getAllSavingsRecord = await Saving.find();
      if (getAllSavingsRecord.length > 0) {
        res.status(200).json({
          success: true,
          message: "Savings Record fetched successfully.",
          savings: getAllSavingsRecord,
        });
      } else {
        res.status(404).json({
          message: "No Saving Record found",
        });
      }
    } catch (error) {
      console.error("Error in fetching the Saving record: ", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });

  savingRouter.post("/", async (req, res) => {
    try {
      const {
        amount,
        paidTo,
        description,
        category
      } = req.body;
      if ((amount, paidTo, description, category)) {
        const newRecord = new Saving({
          amount,
          paidTo,
          description,
          category
          
        });
        console.log("New record added successfully", req.body);
        await newRecord.save();
        res.status(201).json({
          message: "Saving created successfully",
          event: newRecord,
        });
      } else {
        res.status(400).json({
          message: "Please provide the required fields",
        });
      }
    } catch (error) {
      console.error("Error in creating the Saving record: ", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });
  
  savingRouter.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const geteventRecord = await Saving.findById(id);
      if (geteventRecord) {
        res.status(200).json({
          success: true,
          message: "Saving Record fetched successfully.",
          event: geteventRecord,
        });
      } else {
        res.status(404).json({
          message: "No Saving found",
        });
      }
    } catch (error) {
      console.error("Error in fetching the Saving record: ", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });
  
  savingRouter.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteSavingRecord = await Saving.findByIdAndDelete(id);
      if (deleteSavingRecord) {
        res.status(200).json({
          sattus: true,
          message: "Saving deleted successfully",
          deletedRecord: deleteSavingRecord,
        });
      } else {
        res.status(404).json({
          message: "No Saving found",
        });
      }
    } catch (error) {
      console.error("Error in deleting the Saving record: ", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });
  
  savingRouter.patch("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedRecord = await Saving.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (updatedRecord) {
        res.status(200).json({
          success: true,
          message: "Saving record updated successfully",
          updatedRecord: updatedRecord,
        });
      } else {
        res.status(404).json({
          message: "No Saving found",
        });
      }
    } catch (error) {
      console.error("Error in updating the Saving record: ", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });

module.exports = savingRouter;
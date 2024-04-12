const express = require('express');
const Income = require("../models/income.model");
const incomeRouter = express.Router();


incomeRouter.get("/", async (req, res) => {
    try {
      const getAllIncomesRecord = await Income.find();
      if (getAllIncomesRecord.length > 0) {
        res.status(200).json({
          success: true,
          message: "Incomes Record fetched successfully.",
          incomes: getAllIncomesRecord,
        });
      } else {
        res.status(404).json({
          message: "No Income Record found",
        });
      }
    } catch (error) {
      console.error("Error in fetching the Income record: ", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });

  incomeRouter.post("/", async (req, res) => {
    try {
      const {
        amount,
        paidTo,
        description,
        category
      } = req.body;
      if ((amount, paidTo, description, category)) {
        const newRecord = new Income({
          amount,
          paidTo,
          description,
          category
          
        });
        console.log("New record added successfully", req.body);
        await newRecord.save();
        res.status(201).json({
          message: "Income created successfully",
          event: newRecord,
        });
      } else {
        res.status(400).json({
          message: "Please provide the required fields",
        });
      }
    } catch (error) {
      console.error("Error in creating the Income record: ", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });
  
  incomeRouter.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const geteventRecord = await Income.findById(id);
      if (geteventRecord) {
        res.status(200).json({
          success: true,
          message: "Income Record fetched successfully.",
          event: geteventRecord,
        });
      } else {
        res.status(404).json({
          message: "No Income found",
        });
      }
    } catch (error) {
      console.error("Error in fetching the Income record: ", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });
  
  incomeRouter.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteIncomeRecord = await Income.findByIdAndDelete(id);
      if (deleteIncomeRecord) {
        res.status(200).json({
          sattus: true,
          message: "Income deleted successfully",
          deletedRecord: deleteIncomeRecord,
        });
      } else {
        res.status(404).json({
          message: "No Income found",
        });
      }
    } catch (error) {
      console.error("Error in deleting the Income record: ", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });
  
  incomeRouter.patch("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedRecord = await Income.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (updatedRecord) {
        res.status(200).json({
          success: true,
          message: "Income record updated successfully",
          updatedRecord: updatedRecord,
        });
      } else {
        res.status(404).json({
          message: "No Income found",
        });
      }
    } catch (error) {
      console.error("Error in updating the Income record: ", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });

module.exports = incomeRouter;
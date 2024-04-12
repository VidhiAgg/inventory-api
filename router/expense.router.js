const express = require('express');
const Expense = require("../models/expense.model");
const expenseRouter = express.Router();


expenseRouter.get("/", async (req, res) => {
    try {
      const getAllExpensesRecord = await Expense.find();
      if (getAllExpensesRecord.length > 0) {
        res.status(200).json({
          success: true,
          message: "Expenses Record fetched successfully.",
          expenses: getAllExpensesRecord,
        });
      } else {
        res.status(404).json({
          message: "No Expense Record found",
        });
      }
    } catch (error) {
      console.error("Error in fetching the Expense record: ", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });

  expenseRouter.post("/", async (req, res) => {
    try {
      const {
        amount,
        paidTo,
        description,
        category
      } = req.body;
      if ((amount, paidTo, description, category)) {
        const newRecord = new Expense({
          amount,
          paidTo,
          description,
          category
          
        });
        console.log("New record added successfully", req.body);
        await newRecord.save();
        res.status(201).json({
          message: "Expense created successfully",
          event: newRecord,
        });
      } else {
        res.status(400).json({
          message: "Please provide the required fields",
        });
      }
    } catch (error) {
      console.error("Error in creating the Expense record: ", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });
  
  expenseRouter.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const geteventRecord = await Expense.findById(id);
      if (geteventRecord) {
        res.status(200).json({
          success: true,
          message: "Expense Record fetched successfully.",
          event: geteventRecord,
        });
      } else {
        res.status(404).json({
          message: "No Expense found",
        });
      }
    } catch (error) {
      console.error("Error in fetching the Expense record: ", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });
  
  expenseRouter.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteExpenseRecord = await Expense.findByIdAndDelete(id);
      if (deleteExpenseRecord) {
        res.status(200).json({
          sattus: true,
          message: "Expense deleted successfully",
          deletedRecord: deleteExpenseRecord,
        });
      } else {
        res.status(404).json({
          message: "No Expense found",
        });
      }
    } catch (error) {
      console.error("Error in deleting the Expense record: ", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });
  
  expenseRouter.patch("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedRecord = await Expense.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (updatedRecord) {
        res.status(200).json({
          success: true,
          message: "Expense record updated successfully",
          updatedRecord: updatedRecord,
        });
      } else {
        res.status(404).json({
          message: "No Expense found",
        });
      }
    } catch (error) {
      console.error("Error in updating the Expense record: ", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });

module.exports = expenseRouter;
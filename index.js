const express = require('express');
const dotenv = require("dotenv");

const app = express();
const cors = require("cors");
const helmet = require("helmet");

const router = express.Router();
const PORT = process.env.PORT ||4000;
console.log("PORT",process.env.PORT);
app.use(cors());
app.use(express.json());

app.use(helmet());

dotenv.config();

const {intializeDBConnection} = require("./dbConnect/dbConnect");


 intializeDBConnection();

const expenseRouter = require("./router/expense.router")
const incomeRouter = require("./router/income.router")
const savingRouter = require("./router/savings.router");

app.use("/expenses", expenseRouter);
app.use("/incomes", incomeRouter);
app.use("/savings", savingRouter);

 router.get("/", async (req, res) => {
   res.send("Welcome to the Inventory Management system");
 });
router.get("/",(req,res)=>{
   res.status(404).json({error: "Route not found"})
})



 app.listen(PORT,()=>{
    console.log(`App started at ${PORT}`)
 })

// app.listen();






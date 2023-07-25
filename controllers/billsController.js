const billsModel = require("../models/billsModel");


const getBillsController = async (req, res) => {
  try {
    const bills = await billsModel.find();
    res.send(bills);
  } catch (error) {
    console.log(error);
  }
};


const addBillsController = async (req, res) => {
  try {
    //creating new Item
    const newBill = new billsModel(req.body);
    //Waiting to save the itemm
    await newBill.save(); //new Item is the instance, it is saving the reference for itemModel, so it will be saved accordingly
    res.send("Bill generated successfully");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};


module.exports = { getBillsController,addBillsController };
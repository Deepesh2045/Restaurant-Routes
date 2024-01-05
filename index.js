import express from "express";

const app = express();
// To make app understand JSON
app.use(express.json());

// Mock Database
let menuList = [
  {
    id: 2,
    item: "Pizza",
    price: 200,
    image: null,
  },
  {
    id: 3,
    item: "Fried Chicken",
    price: 1500,
    image: null,
  },
  {
    id: 4,
    item: "Coffee",
    price: 150,
    image: null,
  },
];

// Added New Menu Item----------------------------------------------------
app.post("/menu/add", (req, res) => {
  const newItem = req.body;
  menuList.push(newItem);
  return res.status(201).send({ message: "New Item Added Successfully" });
});
// To get Menu List-------------------------------------------------------
app.get("/menu/list", (req, res) => {
  return res.status(201).send(menuList);
});
// To Delete Menu Item-----------------------------------------------------
app.delete("/menu/delete/:id", (req, res) => {
  const itemToDelete = Number(req.params.id);
  const newItemList = menuList.filter((item, index, array) => {
    return item.id !== itemToDelete;
  });
  menuList = structuredClone(newItemList);

  return res.status(201).send({ message: "Menu Item Deleted Successfully" });
});
// To Edit Menu Item--------------------------------------------------------
app.put("/menu/edit/:id", (req, res) => {
  // Extract id from postman
  const menuToEdit = Number(req.params.id);

  // Extract edited body value from postman
  const newMenuValues = req.body;

  // To Find item which is available or not
  const newFindValue = menuList.find((item, index, array) => {
    if (item.id === menuToEdit) {
      return item;
    }
  });
  // If not available
  if (!newFindValue) {
    return res.status(201).send({ message: "Item does not Match" });
  }
// Edit Menu Item
const newMenuEdited = menuList.map((item,index,array)=>{
    if(item.id === menuToEdit){
        return {...item, ...newMenuValues}
    }else{
        return item
    }
})
menuList = structuredClone(newMenuEdited) 

  return res.status(201).send({ message: "Menu Item Edited Successfully" });
});
// Port
const port = 3001;
app.listen(port, () => {
  console.log(`This Port is Listening on ${port}`);
});

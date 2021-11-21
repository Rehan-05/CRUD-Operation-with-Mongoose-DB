
const mongoose  = require("mongoose");
const Validator = require("validator");

// it can creat new database and can also connect to Data base the existing code
async function main() {
  await mongoose.connect('mongodb://localhost:27017/RehanSelfTest');
}
main().then(()=> console.log("Rehan Connection Established successfully"));
main().catch(err => console.log(err));

// Now we will establish schema in the database that will help us to create field data type
// we can also creat the deafault values

const RehanDataSchema =new mongoose.Schema({
          name: {
            type: String,
            required: true
          },
          email:{
            type: String,
            required: true,
            validate(value) {
              if(!Validator.isEmail(value)){
                throw new Error("Email is not valid");
                   }
                 }
               } ,
          type: String,
          active: Boolean
});

// Now we will create the model class that will help us to create the name of collection

const RehanSelf = new mongoose.model("RehanSelf",RehanDataSchema);

// // now we will create document and insert into database

async function CreateDocument() {
   try{
    const AliDetail = new RehanSelf({
      name: "Ali",
      type: "khan",
      active: true,
      email: "Rehangorya@gmail.com",
    });
    // const BasitKhanDetail = new RehanSelf({
    //   name: "Basit",
    //   type: "khan",
    //   active: true
    // });
    // const HassanDetail = new RehanSelf({
    //   name: "Hassan",
    //   type: "khan",
    //   active: true
    // });
    
    const result = await RehanSelf.insertMany([AliDetail]);
    console.log(result);
  }catch(err){
    console.log(err);
  }
}

CreateDocument();

async function GetDocument() {
  try{
    const result =  await RehanSelf.find({name:{$eq:"Ali"}});
    console.log(result);
  }catch(err){
    console.log(err);
  } 

}

// GetDocument();

  async function UpdateDocument(id) {
    try{
      const result = await RehanSelf.updateOne({_id:id},{$set:{name:"Rehan Asghar Goraya"}});
      console.log(result);
    }catch(err){
      console.log(err);
    }
  }

  // UpdateDocument("61977d103483830b80e82bad");

  async function DeleteDocument(id) {
    try{
      const result = await RehanSelf.deleteOne({_id:id});
      console.log(result);
    }catch(err){
      console.log(err);
    }
  }

  // DeleteDocument("61977de0032859ab51c9fa16");

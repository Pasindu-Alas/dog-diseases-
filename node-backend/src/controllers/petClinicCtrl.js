const PetClinic = require("../models/petClinic");
const PetClinicAuth = require("../models/petClinicAuth");
const PetClinicVerify = require("../models/petClinicVerify");

exports.createPetClinic = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //------ user signup
    const newPetClinicAuth = new PetClinicAuth(email, password);
    await newPetClinicAuth.signupPetClinic();
    //------- if successfully signed up, add user details into petClinic collection
    try {
      //------- generate uuid for pet clinic using random string generator library
      const uuid = Math.random().toString(36).substring(2, 9);
      
      const newPetClinic = new PetClinic(
        name,
        email,
        uuid,
      );

      const petClinic = await newPetClinic.savePetClinic();
      res.status(200).json({
        message: "Pet clinic registered successfully!",
        return : petClinic,
      });
      // res
      //   .status(200)
      //   .json({ message: "petClinic details saved ", petClinicId });

      //------- store emil and user id into petClinicVerify doc
      // if (petClinicId) {
      //   const newPetClinicVData = new PetClinicVerify(email, petClinicId);
      //   await newPetClinicVData.savePetClinicVData();
      //   res.status(200).json({
      //     message: "Pet clinic registered successfully!",
      //     petClinicId,
      //   });
      // }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPetClinicIdByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const uuid = await PetClinic.getPetClinicIdByEmail(email);
    res.status(200).json(uuid);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

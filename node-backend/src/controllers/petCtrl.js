const Pet = require("../models/pet-basic-info");
const PetAuth = require("../models/petAuth");

exports.registerPet = async (req, res) => {
  const {
    PetName,
    Category,
    Type,
    _vpetclinic,
    vaccinationHistory,
    specialRemarks,
    upcommingVdates,
    email,
    password,
  } = req.body;

  try {
    //----- signup users
    const newPetAuth = new PetAuth(email, password);
    await newPetAuth.signupPet();

    //--------store pet info
    const newPet = new Pet(
      PetName,
      Category,
      Type,
      _vpetclinic,
      email,
      vaccinationHistory,
      specialRemarks,
      upcommingVdates
    );

    const petId = await newPet.savePet();

    if (petId) {
      const petInfoId = await newPet.savePetMoreInfo(
        petId,
        vaccinationHistory,
        specialRemarks,
        upcommingVdates
      );
      if (petInfoId) {
        await newPet.savePetVerify(email, petId);
        res.status(200).json({
          message: "Pet registered successfully!",
          petId,
        });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPets = async (req, res) => {
  const { petCenterId } = req.params;
  try {
    const pets = await Pet.getAllPets(petCenterId);
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPetById = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await Pet.getPetById(id);
    res.status(200).json(pet);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.getPetInfoById = async (req, res) => {
  const { petId } = req.params;
  try {
    const pet = await Pet.getPetInfoById(petId);
    res.status(200).json(pet);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.updatePetData = async (req, res) => {
  const { id } = req.params;
  const { vaccinationHistory, specialRemarks } = req.body;

  try {
    await Pet.updatePetData(id, {
      vaccinationHistory,
      specialRemarks,
    });
    res.status(200).json({ message: "Pet data successfully updated." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePetData = async (req, res) => {
  const { id } = req.params;

  try {
    await Pet.deletePetData(id);
    await Pet.deletePet(id);

    res.status(200).json({ message: "Pet removed successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPetClinics = async (_, res) => {
  try {
    const clinis = await Pet.getAllPetClinics();
    res.status(200).json(clinis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPetIdByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const uuid = await Pet.getPetIdByEmail(email);
    res.status(200).json(uuid);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

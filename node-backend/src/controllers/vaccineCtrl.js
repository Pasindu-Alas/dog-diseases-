const Vaccination = require("../models/vaccine");

exports.createVaccinationDate = async (req, res) => {
  const { PetId, PetName, Email, Date, Vaccine, Status, _vpetclinic } =
    req.body;

  try {
    const newVaccineDate = new Vaccination(
      PetId,
      PetName,
      Email,
      Date,
      Vaccine,
      Status,
      _vpetclinic
    );

    const vdate = await newVaccineDate.addNewVaccineDate();
    res.status(200).json({
      message: "New vaccine date added successfully!",
      vdate,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateVaccineData = async (req, res) => {
  const { id } = req.params;
  const { Status } = req.body;

  try {
    await Vaccination.updateVaccinationStatus(id, {
      Status,
    });
    res
      .status(200)
      .json({ message: "Vaccination status successfully updated." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteVaccinationDate = async (req, res) => {
  const { id } = req.params;

  try {
    await Vaccination.deleteVaccinationDate(id);

    res.status(200).json({ message: "Vaccination removed successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllVaccination = async (req, res) => {
  const { petclinicId } = req.params;
  try {
    const vaccine = await Vaccination.getAllVaccination(petclinicId);
    res.status(200).json(vaccine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllVaccinationUser = async (req, res) => {
  const { petclinicId, petId } = req.params;
  try {
    const vaccine = await Vaccination.getAllVaccinationUser(petclinicId, petId);
    res.status(200).json(vaccine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

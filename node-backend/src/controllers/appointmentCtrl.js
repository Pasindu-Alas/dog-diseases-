const Appointment = require("../models/appointments");

exports.createAppointment = async (req, res) => {
  const { PetName, PetId, Date, Remarks, Status, _vpetclinic } = req.body;

  try {
    const newAppointment = new Appointment(
      PetName,
      PetId,
      Date,
      Remarks,
      Status,
      _vpetclinic
    );

    const appointmentId = await newAppointment.saveAppointment();
    res.status(200).json({
      message: "Appointment created successfully!",
      appointmentId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPendingAppointments = async (req, res) => {
  const { petclinicId } = req.params;
  try {
    const appointments = await Appointment.getPendingAppointments(petclinicId);
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllApprovedAppointments = async (req, res) => {
  const { petclinicId } = req.params;
  try {
    const appointments = await Appointment.getApprovedAppointments(petclinicId);
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.approveAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    await Appointment.approveAppointment(id);
    res.status(200).json({ message: "Appointment approved!" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.rejectAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    await Appointment.rejectAppointment(id);
    res.status(200).json({ message: "Appointment rejected!" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.completeAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    await Appointment.completeAppointment(id);
    res.status(200).json({ message: "Appointment completed!" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const Events = require("../models/events");

exports.createEvent = async (req, res) => {
  const { EventName, Date, Remark, _vpetclinic } = req.body;

  try {
    const newEvent = new Events(EventName, Date, Remark, _vpetclinic);

    const eventId = await newEvent.addNewEvent();
    res.status(200).json({
      message: "New event date added successfully!",
      eventId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { EventName, Date, Remark } = req.body;

  try {
    await Events.updateEvent(id, {
      EventName,
      Date,
      Remark,
    });
    res.status(200).json({ message: "Event successfully updated." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    await Events.deleteEvent(id);

    res.status(200).json({ message: "Event removed successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllEvents = async (req, res) => {
  const { petclinicId } = req.params;
  try {
    const events = await Events.getAllEvent(petclinicId);
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const { db } = require("../configs/firebaseConfig");

class Event {
  constructor(EventName, Date, Remark, _vpetclinic) {
    this.EventName = EventName;
    this.Date = Date;
    this.Remark = Remark;
    this._vpetclinic = _vpetclinic;
  }

  async addNewEvent() {
    try {
      const newEvent = await db.collection("Event").add({
        EventName: this.EventName,
        Date: this.Date,
        Remark: this.Remark,
        _vpetclinic: this._vpetclinic,
      });
      return newEvent.id;
    } catch (err) {
      console.error("Error creating new event : ", err);
      throw err;
    }
  }

  static async updateEvent(id, data) {
    try {
      await db.collection("Event").doc(id).update(data);
      return "Event data updated successfully.";
    } catch (err) {
      console.error("Error updating Event data : ", err);
      throw err;
    }
  }

  static async deleteEvent(id) {
    try {
      await db.collection("Event").doc(id).delete();
      return "Event removed successfully.";
    } catch (err) {
      console.error("Error removing Event data : ", err);
      throw err;
    }
  }

  static async getAllEvent(petclinicId) {
    try {
      const snapshot = await db
        .collection("Event")
        .where("_vpetclinic", "==", petclinicId)
        .get();
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (err) {
      console.error("Error getting Event data : ", err);
      throw err;
    }
  }
}

module.exports = Event;

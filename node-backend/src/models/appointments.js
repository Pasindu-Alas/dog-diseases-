const { db } = require("../configs/firebaseConfig");

class Appointment {
  constructor(PetName, PetId, Date, Remarks, Status, _vpetclinic) {
    this.PetName = PetName;
    this.PetId = PetId;
    this.Date = Date;
    this.Remarks = Remarks;
    this.Status = Status;
    this._vpetclinic = _vpetclinic;
  }

  async saveAppointment() {
    try {
      const newAppointmentRef = await db.collection("Appointment").add({
        PetName: this.PetName,
        PetId: this.PetId,
        Date: this.Date,
        Remarks: this.Remarks,
        Status: this.Status,
        _vpetclinic: this._vpetclinic,
      });
      return newAppointmentRef.id;
    } catch (err) {
      console.error("Error adding pet clinic : ", err);
      throw err;
    }
  }

  static async getPendingAppointments(petclinicId) {
    try {
      const snapshot = await db
        .collection("Appointment")
        .where("Status", "==", "PENDING")
        .where("_vpetclinic", "==", petclinicId)
        .get();

      console.log({ snapshot });

      if (snapshot.empty) {
        throw new Error("There are not pending appointments");
      }
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (err) {
      console.error("Error getting appointment data : ", err);
      throw err;
    }
  }

  static async getApprovedAppointments(petclinicId) {
    try {
      const snapshot = await db
        .collection("Appointment")
        .where("Status", "==", "APPROVED")
        .where("_vpetclinic", "==", petclinicId)
        .get();
      if (snapshot.empty) {
        throw new Error("There are not appointments");
      }
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (err) {
      console.error("Error getting appointment data : ", err);
      throw err;
    }
  }

  static async approveAppointment(id) {
    try {
      await db.collection("Appointment").doc(id).update({
        Status: "APPROVED",
      });
      return "Appointment approved.";
    } catch (err) {
      console.error("Error updating pet data : ", err);
      throw err;
    }
  }

  static async rejectAppointment(id) {
    try {
      await db.collection("Appointment").doc(id).update({
        Status: "REJECTED",
      });
      return "Appointment rejected.";
    } catch (err) {
      console.error("Error updating pet data : ", err);
      throw err;
    }
  }

  static async completeAppointment(id) {
    try {
      await db.collection("Appointment").doc(id).update({
        Status: "DONE",
      });
      return "Appointment completed.";
    } catch (err) {
      console.error("Error updating pet data : ", err);
      throw err;
    }
  }

  //   static async updatePetClinicData(id, data) {
  //     try {
  //       await db.collection("petclinic").doc(id).update(data);
  //       return "Pet clinic updated successfully.";
  //     } catch (err) {
  //       console.error("Error updating pet clinic data : ", err);
  //       throw err;
  //     }
  //   }

  //   static async deletePetClinicData(id) {
  //     try {
  //       await db.collection("petclinic").doc(id).delete();
  //       return "Pet clinic data deleted successfully.";
  //     } catch (err) {
  //       console.error("Error removing pet clinic data : ", err);
  //       throw err;
  //     }
  //   }
}

module.exports = Appointment;

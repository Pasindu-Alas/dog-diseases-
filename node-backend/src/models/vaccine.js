const { db } = require("../configs/firebaseConfig");

class Vaccine {
  constructor(PetId, PetName, Email, Date, Vaccine, Status, _vpetclinic) {
    this.PetId = PetId;
    this.PetName = PetName;
    this.Email = Email;
    this.Date = Date;
    this.Vaccine = Vaccine;
    this.Status = Status;
    this._vpetclinic = _vpetclinic;
  }

  async addNewVaccineDate() {
    try {
      const newVaccineDate = await db.collection("Vaccination").add({
        PetId: this.PetId,
        PetName: this.PetName,
        Email: this.Email,
        Date: this.Date,
        Vaccine: this.Vaccine,
        Status: this.Status,
        _vpetclinic: this._vpetclinic,
      });
      return newVaccineDate.id;
    } catch (err) {
      console.error("Error creating new product : ", err);
      throw err;
    }
  }

  static async updateVaccinationStatus(id, data) {
    try {
      //   const snapshot = await db.collection("Vaccination").doc(id).get();
      //   if (snapshot.empty) {
      //     throw new Error("Product not found.");
      //   }
      //   const doc = snapshot.docs;
      await db.collection("Vaccination").doc(id).update(data);
      return "Vaccine data updated successfully.";
    } catch (err) {
      console.error("Error updating Vaccine data : ", err);
      throw err;
    }
  }

  static async deleteVaccinationDate(id) {
    try {
      await db.collection("Vaccination").doc(id).delete();
      return "Vaccination removed successfully.";
    } catch (err) {
      console.error("Error removing Vaccination data : ", err);
      throw err;
    }
  }

  static async getAllVaccination(petclinicId) {
    try {
      const snapshot = await db
        .collection("Vaccination")
        .where("_vpetclinic", "==", petclinicId)
        .get();
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (err) {
      console.error("Error getting Vaccination data : ", err);
      throw err;
    }
  }

  static async getAllVaccinationUser(petclinicId, petId) {
    try {
      const snapshot = await db
        .collection("Vaccination")
        .where("_vpetclinic", "==", petclinicId)
        .where("PetId", "==", petId)
        .get();
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (err) {
      console.error("Error getting Vaccination data : ", err);
      throw err;
    }
  }
}

module.exports = Vaccine;

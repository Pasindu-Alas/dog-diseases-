const { db } = require("../configs/firebaseConfig");
const { auth } = require("../configs/firebaseConfig");

class PetBasicInfo {
  constructor(
    PetName,
    Category,
    // DOB,
    Type,
    _vpetclinic,
    email,
    password,
    vaccinationHistory,
    specialRemarks,
    upcommingVdates
  ) {
    this.PetName = PetName;
    this.Category = Category;
    // this.DOB = DOB;
    this.Type = Type;
    this._vpetclinic = _vpetclinic;
    this.email = email;
    this.password = password;
    this.vaccinationHistory = vaccinationHistory;
    this.specialRemarks = specialRemarks;
    this.upcommingVdates = upcommingVdates;
  }

  async savePet() {
    try {
      const newPetRef = await db.collection("pet").add({
        PetName: this.PetName,
        Category: this.Category,
        // DOB: this.DOB,
        Type: this.Type,
        email: this.email,
        _vpetclinic: this._vpetclinic,
      });
      return newPetRef.id;
    } catch (err) {
      console.error("Error adding pet : ", err);
      throw err;
    }
  }

  async savePetMoreInfo(petId, vHistory, remarks, upcommingVaccinedates) {
    try {
      const newPetInfoRef = await db.collection("pet-info").add({
        petId: petId,
        vaccinationHistory: vHistory,
        specialRemarks: remarks,
        upcommingVdates: upcommingVaccinedates,
      });
      return newPetInfoRef.id;
    } catch (err) {
      console.error("Error adding pet info : ", err);
      throw err;
    }
  }

  async savePetVerify(email, petId) {
    try {
      const newPetInfoRef = await db.collection("pet-verify").add({
        email: email,
        petId: petId,
      });
      return newPetInfoRef.id;
    } catch (err) {
      console.error("Error adding pet verify info : ", err);
      throw err;
    }
  }

  static async getAllPets(petCenterId) {
    try {
      const snapshot = await db
        .collection("pet")
        .where("_vpetclinic", "==", petCenterId)
        .get();
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (err) {
      console.error("Error getting pet data : ", err);
      throw err;
    }
  }

  static async getPetById(id) {
    try {
      const doc = await db.collection("pet").doc(id).get();
      if (!doc.exists) {
        throw new Error("Pet not found.");
      }
      return { id: doc.id, ...doc.data() };
    } catch (err) {
      console.error("Error getting pet data by id : ", err);
      throw err;
    }
  }

  static async getPetInfoById(id) {
    try {
      const snapshot = await db
        .collection("pet-info")
        .where("petId", "==", id)
        .get();
      if (snapshot.empty) {
        throw new Error("Pet not found.");
      }
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } catch (err) {
      console.error("Error getting pet : ", err);
      throw err;
    }
  }

  static async updatePetData(id, data) {
    try {
      const snapshot = await db
        .collection("pet-info")
        .where("petId", "==", id)
        .get();
      if (snapshot.empty) {
        throw new Error("Pet not found.");
      }
      const doc = snapshot.docs[0];
      await db.collection("pet-info").doc(doc.id).update(data);
      return "Pet data updated successfully.";
    } catch (err) {
      console.error("Error updating pet data : ", err);
      throw err;
    }
  }

  static async deletePetData(id) {
    try {
      const snapshot = await db
        .collection("pet-info")
        .where("petId", "==", id)
        .get();
      if (snapshot.empty) {
        throw new Error("Pet not found.");
      }
      const doc = snapshot.docs[0];
      await db.collection("pet-info").doc(doc.id).delete();
      return "Pet data deleted successfully.";
    } catch (err) {
      console.error("Error removing pet data : ", err);
      throw err;
    }
  }

  static async deletePet(id) {
    try {
      await db.collection("pet").doc(id).delete();
      return "Pet removed successfully.";
    } catch (err) {
      console.error("Error removing pet data : ", err);
      throw err;
    }
  }

  static async getAllPetClinics() {
    try {
      const snapshot = await db.collection("petclinic").get();
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        address: doc.data().address,
      }));
    } catch (err) {
      console.error("Error getting pet data : ", err);
      throw err;
    }
  }

  static async getPetIdByEmail(email) {
    try {
      const snapshot = await db
        .collection("pet-verify")
        .where("email", "==", email)
        .get();
      if (snapshot.empty) {
        throw new Error("Pet not found.");
      }
      const doc = snapshot.docs[0];
      return { petId: doc.data().petId };
    } catch (err) {
      console.error("Error geting pet data: ", err);
      throw err;
    }
  }
}

module.exports = PetBasicInfo;

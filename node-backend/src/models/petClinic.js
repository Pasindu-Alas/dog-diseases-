const { db } = require("../configs/firebaseConfig");

class PetClinic {
  constructor(name, email, uuid) {
    this.name = name;
    this.email = email;
    this.uuid = uuid;
  }

  async savePetClinic() {
    try {
      const newPetClinicRef = await db.collection("petclinic").add({
        name: this.name,
        email: this.email,
        uuid: this.uuid,
      });
      return newPetClinicRef.id;
    } catch (err) {
      console.error("Error adding pet clinic : ", err);
      throw err;
    }
  }

  static async getPetClinicIdByEmail(email) {
    try {
      const snapshot = await db
        .collection("petclinic")
        .where("email", "==", email)
        .get();
      if (snapshot.empty) {
        throw new Error("Pet Clinic not found.");
      }
      const doc = snapshot.docs[0];
      return { uuid: doc.data().uuid };
    } catch (err) {
      console.error("Error geting pet clinic data: ", err);
      throw err;
    }
  }

  // static async getAllPetClinics() {
  //   try {
  //     const snapshot = await db.collection("petclinic").get();
  //     return snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //   } catch (err) {
  //     console.error("Error getting pet clinic : ", err);
  //     throw err;
  //   }
  // }

  // static async getPetClinicById(id) {
  //   try {
  //     const doc = await db.collection("petclinic").doc(id).get();
  //     if (!doc.exists) {
  //       throw new Error("Pet clinic not found.");
  //     }
  //     return { id: doc.id, ...doc.data() };
  //   } catch (err) {
  //     console.error("Error getting pet clinic by id : ", err);
  //     throw err;
  //   }
  // }

  // static async getPetClinicByName(name) {
  //   try {
  //     const snapshot = await db
  //       .collection("petclinic")
  //       .where("name", "==", name)
  //       .get();
  //     if (snapshot.empty) {
  //       throw new Error("Pet clinic not found.");
  //     }
  //     const doc = snapshot.docs[0];
  //     return { id: doc.id, ...doc.data() };
  //   } catch (err) {
  //     console.error("Error getting pet clinic by name : ", err);
  //     throw err;
  //   }
  // }

  static async updatePetClinicData(id, data) {
    try {
      await db.collection("petclinic").doc(id).update(data);
      return "Pet clinic updated successfully.";
    } catch (err) {
      console.error("Error updating pet clinic data : ", err);
      throw err;
    }
  }

  static async deletePetClinicData(id) {
    try {
      await db.collection("petclinic").doc(id).delete();
      return "Pet clinic data deleted successfully.";
    } catch (err) {
      console.error("Error removing pet clinic data : ", err);
      throw err;
    }
  }
}

module.exports = PetClinic;

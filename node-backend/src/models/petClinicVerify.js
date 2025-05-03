const { db } = require("../configs/firebaseConfig");

class PetClinicVerify {
  constructor(petCenterName, email, uuid) {
    this.petCenterName = petCenterName;
    this.email = email;
    this.uuid = uuid;
  }

  async savePetClinicVData() {
    try {
      const newPetClinicVRef = await db.collection("petclinicCenter").add({
        petCenterName: this.petCenterName,
        email: this.email,
        uuid: this.uuid,
      });
      return newPetClinicVRef.id;
    } catch (err) {
      console.error("Error adding pet clinic v data: ", err);
      throw err;
    }
  }
}

module.exports = PetClinicVerify;

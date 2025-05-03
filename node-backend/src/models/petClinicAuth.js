const { auth } = require("../configs/firebaseConfig");

class PetClinicAuth {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async signupPetClinic() {
    try {
      const signupPetClinic = await auth.createUser({
        email: this.email,
        password: this.password,
      });
      return signupPetClinic.id;
    } catch (err) {
      console.error("Error registering pet clinic : ", err);
      throw err;
    }
  }
}

module.exports = PetClinicAuth;

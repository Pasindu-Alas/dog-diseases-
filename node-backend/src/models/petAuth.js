const { auth } = require("../configs/firebaseConfig");

class PetAuth {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async signupPet() {
    try {
      const signupPet = await auth.createUser({
        email: this.email,
        password: this.password,
      });
      return signupPet.id;
    } catch (err) {
      console.error("Error registering pet : ", err);
      throw err;
    }
  }
}

module.exports = PetAuth;

// src/classes/HUD.js
class HUD {
  constructor() {
    this.ammoText = document.querySelector(".ammo bitmap-font");
    this.healthText = document.querySelector(".health bitmap-font");
    this.armorText = document.querySelector(".armor bitmap-font");
  }

  updateAmmo(ammo) {
    this.ammoText.setAttribute("text", ammo);
  }

  updateHealth(health) {
    this.healthText.setAttribute("text", `${health}%`);
  }

  updateArmor(armor) {
    this.armorText.setAttribute("text", `${armor}%`);
  }
}

export default HUD;

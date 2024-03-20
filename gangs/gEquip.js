/**
 * gEquip.js - Automatically buy equipment
 * Tasks:
 * - Check cost of equipment
 * - Add equipment under [money * 0.04] to list
 * - buy each equipment for each member
 */

/** @param {NS} ns */
export async function main(ns) {
  while (true) {
    let equipment = [];
    const equipList = ns.gang.getEquipmentNames();
    let memArgs = [];
    for (let i in equipList) {
      if (ns.gang.getEquipmentCost(equipList[i]) <= (ns.getServerMoneyAvailable("home") * 0.03)) {
        equipment.push(equipList[i]);
      }
      if (ns.gang.getEquipmentType(equipList[i]) === "Augmentation") {
        memArgs.push(equipList[i]);
      }
    }
    const members = ns.gang.getMemberNames();
    for (let i in members) {
      for (let o in equipment) {
        ns.gang.purchaseEquipment(members[i], equipment[o]);
      }
    }
    for (let i in memArgs) {
      if ((ns.gang.getEquipmentCost(memArgs[i]) * 12) / ns.getServerMoneyAvailable("home") < 0.2) {
        for (let m in members) {
          ns.gang.purchaseEquipment(members[m], memArgs[i]);
        }
      }
    }
    await ns.sleep(30000);
  }
}
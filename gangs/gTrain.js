/**
 * gTrain.js - Training management
 * Tasks:
 * - Find members in training
 * - Train weak skills
 * - Set them to work when they're ready
 */

/** @param {NS} ns */
function Stats(member) { // How much exp a member should have
  this.hak = member.hack;
  this.combat = [member.str, member.def, member.dex, member.agi];
  this.cha = member.cha;
  this.enoughHacking = function () {
    return this.hak > 500;
  }
  this.enoughCombat = function () {
    return this.combat.every(el => el > 1000);
  }
  this.enoughCharisma = function () {
    return this.cha > 100;
  }
}
/** @param {NS} ns */
export async function main(ns) {
  let members = ns.gang.getMemberNames();
  let trainees = [];
  for (let i in members) {
    let memInfo = ns.gang.getMemberInformation(members[i]);
    if (memInfo.task === "Train Combat" || memInfo.task === "Train Hacking" || memInfo.task === "Train Charisma") {
      let check = new Stats(memInfo);
      if (!check.enoughCharisma() || !check.enoughCombat() || !check.enoughHacking()) {
        trainees.push(members[i]);
      }
    }
  }
  for (let i in trainees) {
    let info = ns.gang.getMemberInformation(trainees[i]);
    let check = new Stats(info);
    if (check.enoughCombat()) {
      if (check.enoughHacking()) {
        if (check.enoughCharisma()) {
          ns.gang.setMemberTask(trainees[i], "Human Trafficking");
        }
        else {
          ns.gang.setMemberTask(trainees[i], "Train Charisma");
        }
      }
      else {
        ns.gang.setMemberTask(trainees[i], "Train Hacking");
      }
    }
    else {
      ns.gang.setMemberTask(trainees[i], "Train Combat");
    }
  }
}
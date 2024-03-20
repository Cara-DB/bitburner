/**
 * gTask - Assigns tasks to members
 * INFO: WILL ONLY WORK WITH >= 7 MEMBERS
 * Tasks:
 * - Group members by task
 * - Task Assignment:
 *  - Move members from training when they're ready
 *  - At least [variable] members in each group:
 *    - Crime
 *    - Vigilante Justice
 *    - Extra training (for ascention)
 *    - Terrorism
 *    - RATIO: 3/2/1/1
 */
/** @param {NS} ns */
function Stats(member) { // How much exp a member should have
  this.hak = member.hack;
  this.combat = [member.str, member.def, member.dex, member.agi]
  this.cha = member.cha
  this.enoughHacking = function () {
    return this.hak > (500 + (180 * (member.hack_asc_mult + member.hack_mult)))
  }
  this.enoughCombat = function () {
    return this.combat.every(el => el > (1000 + (180 * (member.dex_asc_mult + dex.hack_mult))));
  }
  this.enoughCharisma = function () {
    return this.cha > (100 + (180 * (member.cha_asc_mult + member.cha_mult)))
  }
}

/** @param {NS} ns */
export async function main(ns) {
  const host = ns.getHostname();
  while (true) {
    let members = ns.gang.getMemberNames();
    // Groups vvv
    let training = [];
    let extraTraining = [];
    let commitingCrime = [];
    let commitingJustice = [];
    let commitingTerror = [];
    let uncommited = [];
    for (let i in members) { // Group members
      let memInfo = ns.gang.getMemberInformation(members[i]);
      if (memInfo.task === "Train Combat" || memInfo.task === "Train Hacking" || memInfo.task === "Train Charisma") {
        let check = new Stats(memInfo);
        if (check.enoughCharisma() && check.enoughCombat() && check.enoughHacking()) {
          extraTraining.push(members[i]);
        }
        else {
          training.push(members[i]);
        }
      }
      else if (memInfo.task === "Human Trafficking") {
        commitingCrime.push(members[i]);
      }
      else if (memInfo.task === "Terrorism") {
      commitingTerror.push(members[i]);
      }
      else if (memInfo.task === "Vigilante Justice") {
      commitingJustice.push(members[i]);
      }
      else {
      uncommited.push(members[i]);
      }
  }
  if (training.length > 0) { // Helps members train if needed
    ns.exec("gangs/gTrain.js", host, 1, ...training);
  }
  let ratio = Math.floor(members.length / 6);
  await ns.sleep(10000);
}
}
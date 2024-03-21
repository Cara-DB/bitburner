/** @param {NS} ns */
function Stats(member) { // How much exp a member should have
  this.hak = member.hack;
  this.combat = [member.str, member.def, member.dex, member.agi];
  this.cha = member.cha;
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
  const trainees = ns.args;
  for (let i in trainees) {
    let info = ns.gang.getMemberInformation(trainees[i])
    let check = new Stats(info);
    if (check.enoughCombat()) {
      if (check.enoughHacking()) {
        if (check.enoughCharisma()) {
          ns.gang.setMemberTask(trainees[i], "Unassigned");
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
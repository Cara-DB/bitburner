/**
 * gRecruit.js -- Recruits gang members
 */
/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");
  let nameGen = ns.gang.getMemberNames().length; // For name generation
  if (ns.gang.canRecruitMember() === true) { // If you can recruit
    if (ns.gang.getRecruitsAvailable() > 1) {
      let numberRecruits = ns.gang.getRecruitsAvailable();
      ns.print("Recruiting ", numberRecruits, " members!");
      for (let i in numberRecruits) { // Recruits each one available
        nameGen++;
        let name = "member-" + nameGen;
        ns.gang.recruitMember(name);
        ns.gang.setMemberTask(name, "Train Combat");
      }
    }
    else { // Recruits only one member
      nameGen++;
      let name = "member-" + nameGen;
      let check = ns.gang.recruitMember(name);
      if (check) {
        ns.print("Recruited a member!");
        ns.gang.setMemberTask(name, "Train Combat");
      }
      else {
        ns.print("Failed to recruit a member...");
      }
    }
  }
}
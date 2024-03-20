/**
 * gRecruit.js -- Recruits gang members
 * Checks every 5 seconds if you can recruit a gang member
 * Recruits if possible
 */
/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");
  const memNames = [""];
  while (true) {
    let nameGen = ns.gang.getMemberNames().length; // For name generation
    nameGen++;
    if (ns.gang.canRecruitMember() === true) { // If you can recruit
      if (ns.gang.getRecruitsAvailable() > 1) {
        let numberRecruits = ns.gang.getRecruitsAvailable();
        ns.print("Recruiting ", numberRecruits, " members!");
        while (numberRecruits > 0) { // Recruits each one available
          nameGen++;
          let name = "member-" + nameGen;
          ns.gang.recruitMember(name);
          ns.gang.setMemberTask(name, "Train Combat")
          await ns.sleep(100);
          numberRecruits--;
        }
      }
      else { // Recruits only one member
        ns.gang.recruitMember("member-" + nameGen);
        ns.print("Recruited a member!");
      }
    }
    else {
      ns.print("No members to recruit. Sleeping...");
    }
    await ns.sleep(5000);
  }
}
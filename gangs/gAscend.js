/**
 * gAscend.js - Ascends members
 * Tasks:
 * - Check if member can ascend
 * - If they can, check if it would improve a multiplier by x2
 * - Ascends member
 */
/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");
  while (true) {
    let members = ns.gang.getMemberNames();
    for (let i in members) {
      let ascentionFactors = ns.gang.getAscensionResult(members[i]) // Gets information on the member
      if (ascentionFactors !== undefined) { // If they can ascend
        delete ascentionFactors.respect;
        let couldAscend = false;
        Object.keys(ascentionFactors).forEach(function (key) { // Check their multipliers
          if (ascentionFactors[key] > 1.5) { // If a stat is good enough
            couldAscend = true;
          }
        });
        if (couldAscend === true) { // Ascends them
          ns.print("Ascending...");
          ns.gang.ascendMember(members[i]);
          ns.gang.setMemberTask(members[i], "Train Combat");
        }
      }
    }
    await ns.sleep(5000);
  }
}
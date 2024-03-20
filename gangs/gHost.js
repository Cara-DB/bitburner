/**
 * Main file for gang automation
 * Tasks:
 * - Create a gang if needed
 * - Run gang automation scripts
 * Current Scripts:
 * - gRecruit: recruit members
 * - gAscend: ascend members
 * - gTask: set member tasks
 */
/** @param {NS} ns */
export async function main(ns) {
  const host = ns.getHostname();
  if (ns.gang.inGang() === false) {
    // Creates gang
    let checkSuccess = ns.gang.createGang("Slum Snakes");
    if (checkSuccess) { // Checks if successful
      ns.tprint("Gang created!");
    }
    else {
      ns.tprint("Error: Couldn't create gang.");
    }
  }
  else {
    if (host !== "home") { // copies from home if necessary
      ns.scp("gangs/gRecruit.js", host, "home");
      ns.scp("gangs/gAscend.js", host, "home");
      ns.scp("gangs/gTask.js", host, "home");
      ns.scp("gangs/gEquip.js", host, "home");
    }
    ns.exec("gangs/gRecruit.js", host);
    ns.exec("gangs/gAscend.js", host);
    ns.exec("gangs/gTask.js", host);
    ns.exec("gangs/gEquip.js", host);
  }
}
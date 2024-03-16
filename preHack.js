/** @param {NS} ns */
export async function main(ns) {
  let targets = ns.read("targets.txt");
  targets = targets.split("\r\n");
  for (let i in targets) {
    ns.brutessh(targets[i]);
    ns.ftpcrack(targets[i]);
    ns.httpworm(targets[i]);
    ns.relaysmtp(targets[i]);
    ns.sqlinject(targets[i]);
    ns.nuke(targets[i]);
  }
}
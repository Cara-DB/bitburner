/** @param {NS} ns */
export async function main(ns) {
  let hostnames = ['home'];
  let targets = [];
  ns.clear("targets.txt")
  /** i stold this for loop */
  for (let i = 0; i < hostnames.length; i++) {
    hostnames.push(...ns.scan(hostnames[i]).filter(hostname => !hostnames.includes(hostname)))
  }
  for (let i in hostnames) {
    if (ns.getServerRequiredHackingLevel(hostnames[i]) < (ns.getHackingLevel() / 2) && ns.getServerMaxMoney(hostnames[i]) > 1000000) {
      targets.push(hostnames[i]);
    }
  }
  ns.tprint(targets.length);
  ns.write("targets.txt", targets.join("\r\n"), "w");
}
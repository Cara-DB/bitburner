/** @param {NS} ns */
export async function main(ns) {
  const target = ns.args[0];
  const host = ns.getHostname();
  const mLimit = ns.getServerMaxMoney(target);
  const sLimit = ns.getServerMinSecurityLevel(target);
  while (true) {
    let ram = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / 1.75)
    if (ram >= 1) {
      if (ns.getServerSecurityLevel(target) > (sLimit + 2)) {
        ns.exec("jweaken.js", host, ram, target, 0);
      }

      else if (ns.getServerMoneyAvailable(target) < (mLimit / 2)) {
        ns.exec("jgrow.js", host, ram, target, 0);
      }

      else {
        ns.exec("jhack.js", host, Math.floor(ram / 2), target, 0);
      }
    }
    await ns.sleep(100);
  }
}
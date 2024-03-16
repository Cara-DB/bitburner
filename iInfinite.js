/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");
  while (true) {
    ns.clearLog();
    const target = ns.args[0];
    ns.print("Money: ", ns.getServerMoneyAvailable(target), " out of a maximum ", ns.getServerMaxMoney(target));
    ns.print("Security: ", ns.getServerSecurityLevel(target), "from base level: ", ns.getServerMinSecurityLevel(target));
    await ns.sleep(1000);
  }
}
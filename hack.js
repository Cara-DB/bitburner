/** @param {NS} ns */
export async function main(ns) {
  let target = ns.args[0];
  ns.disableLog("sleep");
  ns.disableLog("getServerMoneyAvailable");
  ns.disableLog("getServerMaxMoney");
  while (true) {
    if (ns.getServerMoneyAvailable(target) >= ns.getServerMaxMoney(target) / 2) {
      await ns.hack(target);
    }
    await ns.sleep(200);
  }
}
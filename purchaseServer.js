/** @param {NS} ns */
export async function main(ns) {
  const ram = 4;
  let i = 0;
  while (i < ns.getPurchasedServerLimit()) {
    if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
      ns.purchaseServer("pserv-" + i, ram);
      ++i;
    }
    await ns.sleep(50);
  }
}
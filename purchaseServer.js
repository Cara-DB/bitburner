/** @param {NS} ns */
export async function main(ns) {
  const ram = 8;
  let i = 0;
  while (i < ns.getPurchasedServerLimit()) {
    if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
      ns.purchaseServer("pserv-" + i, ram);
      ++i;
      ns.scp("simpleHack.js", "pserv-" + i);
      ns.exec("simpleHack.js", "pserv-" + i, 3, "n00dles");
    }
    await ns.sleep(50);
  }
}
/** @param {NS} ns */
export async function main(ns) {
  const currentRam = ns.getServerMaxRam("pserv-10");
  const maxRam = ns.getPurchasedServerMaxRam();
  const money = ns.getPlayer().money;
  const server = "pserv-10";
  const servers = ns.getPurchasedServers();
  let ram = 2;
  while (ram * 2 <= maxRam && money > (ns.getPurchasedServerUpgradeCost(server, (ram * 2))) * 25) {
    ram *= 2;
    await ns.sleep(10);
  }
  if (ram > currentRam) {
    const increase = ns.formatPercent(ram / currentRam);
    const ask = `Can upgrade by ${increase}, upgrade?`;
    const output = await ns.prompt(ask, {"type": "boolean"});
    if (output === true) {
      for (let i in servers) {
        ns.upgradePurchasedServer(servers[i], ram);
      }
      ns.tprint("Upgraded!");
    }
  }
  else {
    const cost = ns.formatNumber(ns.getPurchasedServerUpgradeCost(server, (ram * 2)) * 25);
    const amount = ns.formatPercent((ram * 2) / currentRam);
    ns.tprint(`Upgrade costs ${cost} for ${amount} more RAM. You don't have enough!`);
  }
}
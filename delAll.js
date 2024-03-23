/** @param {NS} ns */
export async function main(ns) {
  const servers = ns.getPurchasedServers();
  for (let i in servers) {
    ns.killall(servers[i]);
    ns.deleteServer(servers[i]);
  }
}
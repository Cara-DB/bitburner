/** @param {NS} ns */
export async function main(ns) {
  let servers = ns.read("UsableServers.txt");
  servers = servers.split("\r\n");
  let targets = ns.read("targets.txt");
  targets = targets.split("\r\n");
  for (let i in servers) {
    ns.killall(servers[i]);
    ns.scp("hack.js", servers[i]);
    ns.scp("grow.js", servers[i]);
    ns.scp("weaken.js", servers[i]);
    ns.scp("hhack.js", servers[i]);
    ns.exec("hhack.js", servers[i], 1, "joesguns");
  }
}
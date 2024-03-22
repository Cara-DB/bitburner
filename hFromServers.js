/** @param {NS} ns */
export async function main(ns) {
  let servers = ns.read("UsableServers.txt");
  servers = servers.split("\r\n");
  let target = ns.args[0];
  for (let i in servers) {
    ns.killall(servers[i]);
    let threads = Math.floor(ns.getServerMaxRam(servers[i]) / 2.4);
    ns.scp("simpleHack.js", servers[i]);
    ns.exec("simpleHack.js", servers[i], threads, target);
  }
}
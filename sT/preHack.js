/** @param {NS} ns */
export async function main(ns) {
  let targets = ns.read("targets.txt");
  targets = targets.split("\r\n");
  let servers = ns.read("UsableServers.txt");
  servers = servers.split("\r\n");
  for (let i in targets) {
    if (ns.fileExists("bruteSSH.exe", "home")) {
      ns.brutessh(targets[i]);
    }
    if (ns.fileExists("FTPCrack.exe", "home")) {
      ns.ftpcrack(targets[i]);
    }
    if (ns.fileExists("HTTPWorm.exe", "home")) {
      ns.httpworm(targets[i]);
    }
    if (ns.fileExists("relaySMTP.exe", "home")) {
      ns.relaysmtp(targets[i]);
    }
    if (ns.fileExists("SQLInject.exe", "home")) {
      ns.sqlinject(targets[i]);
    }
    ns.nuke(targets[i]);
  }
  if (servers.length > 0) {
    for (let i in servers) {
      if (ns.fileExists("bruteSSH.exe", "home")) {
        ns.brutessh(servers[i]);
      }
      if (ns.fileExists("FTPCrack.exe", "home")) {
        ns.ftpcrack(servers[i]);
      }
      if (ns.fileExists("HTTPWorm.exe", "home")) {
        ns.httpworm(servers[i]);
      }
      if (ns.fileExists("relaySMTP.exe", "home")) {
        ns.relaysmtp(servers[i]);
      }
      if (ns.fileExists("SQLInject.exe", "home")) {
        ns.sqlinject(servers[i]);
      }
      ns.nuke(servers[i]);
    }
  }
}
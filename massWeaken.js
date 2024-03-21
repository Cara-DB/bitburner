/** @param {NS} ns */
export async function main(ns) {
  if (ns.fileExists("massHomeScripts.txt") === true) {
    let toKill = ns.read("massHomeScripts.txt");
    toKill = toKill.split("\r\n");
    toKill = toKill.map(Number);
    for (let i in toKill) {
      ns.kill(toKill[i]);
    }
    ns.rm("massHomeScripts.txt");
  }
  let targets = ns.read("targets.txt");
  targets = targets.split("\r\n");
  let scriptIds = [];
  let eachRam = Math.floor((ns.getServerMaxRam("home") / targets.length) * 0.95);
  for (let i in targets) {
    scriptIds.push(ns.exec("weaken.js", "home", (Math.floor((eachRam / 1.75) * 0.3)), targets[i]));
    scriptIds.push(ns.exec("grow.js", "home", (Math.floor((eachRam / 1.75) * 0.7)), targets[i]));
  }
  ns.write("massHomeScripts.txt", scriptIds.join("\r\n"), "w");
}
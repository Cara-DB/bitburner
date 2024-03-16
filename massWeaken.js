/** @param {NS} ns */
export async function main(ns) {
  let targets = ns.read("targets.txt");
  targets = targets.split("\r\n");
  let eachRam = Math.floor((ns.getServerMaxRam("home") / targets.length) / 2) - 100;
  for (let i in targets) {
    ns.exec("weaken.js", "home", (Math.floor(eachRam / 1.75)), targets[i]);
    ns.exec("grow.js", "home", (Math.floor(eachRam / 3.75)), targets[i]);
    ns.exec("grow.js", "home", (Math.floor(eachRam / 3.75)), targets[i]);
  }
}
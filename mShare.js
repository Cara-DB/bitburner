// Runs share.js
// Uses half of availiable ram
/** @param {NS} ns */
export async function main(ns) {
    let ram = (ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) / 2;
    let threads = Math.floor(ram / 4);
    ns.exec("share.js", "home", threads);
  }
/** @param {NS} ns */
export async function main(ns) {
  const targets = [
    "phantasy",
    "zer0",
    "crush-fitness",
    "iron-gym",
    "silver-helix",
    "omega-net",
  ];
  for (let i in targets) {
    ns.brutessh(targets[i]);
    ns.ftpcrack(targets[i]);
    ns.httpworm(targets[i]);
  }
}
function Server(name, level, money, growth) {
  this.serverName = name;
  this.hackLevel = level;
  this.maxMoney = money;
  this.growth = growth;
  this.levelNeeded = level * 2;
  this.money = function () {
    return this.maxMoney;
  };
  this.changeMoney = function (variable) {
    this.maxMoney = variable;
  };
}

const sortServers = (arr, value) => {
  const sorted = arr.sort((a, b) => {
    if (a[value] > b[value]) {
      return -1;
    }
    if (a[value] < b[value]) {
      return 1;
    }
    return 0;
  });
  return sorted;
};
/** @param {NS} ns */
export async function main(ns) {
  ns.clear("sInformation.txt");
  let servers = [];
  let serverinfo = [];
  let formatted = [];
  let hostnames = ['home'];
  let targets = [];
  let servert = [];
  let hackableServers = [];
  let canOpen = 0
  if (ns.fileExists("bruteSSH.exe", "home")) {
    canOpen++;
  }
  if (ns.fileExists("FTPCrack.exe", "home")) {
    canOpen++;
  }
  if (ns.fileExists("HTTPWorm.exe", "home")) {
    canOpen++;
  }
  if (ns.fileExists("relaySMTP.exe", "home")) {
    canOpen++;
  }
  if (ns.fileExists("SQLInject.exe", "home")) {
    canOpen++;
  }
  for (let e = 0; e < hostnames.length; e++) {
    hostnames.push(...ns.scan(hostnames[e]).filter(hostname => !hostnames.includes(hostname)))
  }
  for (let i in hostnames) {
    if (ns.getServerRequiredHackingLevel(hostnames[i]) < (ns.getHackingLevel() / 2) && ns.getServerMaxMoney(hostnames[i]) > 50000000) {
      servert.push(new Server(hostnames[i], ns.getServerRequiredHackingLevel(hostnames[i]), ns.getServerMaxMoney(hostnames[i]), ns.getServerGrowth(hostnames[i])));
    }
    if (ns.getServerMaxMoney(hostnames[i]) === 0) {
      servers.push(new Server(hostnames[i], ns.getServerRequiredHackingLevel(hostnames[i])));
      servers.push("");
    }
    if (ns.getServerRequiredHackingLevel(hostnames[i]) <= (ns.getHackingLevel()) && ns.getServerNumPortsRequired(hostnames[i]) <= canOpen && ns.getServerMaxRam(hostnames[i]) >= 16) {
      hackableServers.push(hostnames[i]);
    }
  }
  if (ns.args.length != 0) { // If player asks for server information
    const output = await ns.prompt("Please select sorting method:", {
      type: "select",
      choices: ["serverName", "hackLevel", "maxMoney", "growth", "levelNeeded"]
    });
    serverinfo = sortServers(servert, output);
  }
  
  ns.write("UsableServers.txt", hackableServers.join("\r\n"), "w"); // Servers we can hack from
  ns.write("Honeypots.txt", servers.join("\r\n"), "w"); // Honeypots (like the CSEC server)
  servert = sortServers(servert, "maxMoney");
  for (let i in serverinfo) { // Sanatizes server list
    let change = serverinfo[i].money();
    serverinfo[i].changeMoney(ns.formatNumber(change));
    delete serverinfo[i].money;
    delete serverinfo[i].changeMoney;
    for (const [key, value] of Object.entries(serverinfo[i])) {
      formatted.push(`${key}: ${value}`); // Makes new array
    }
    formatted.push("");
  }
  ns.write("sInformation.txt", formatted.join("\r\n"), "w");
  for (let i in servert) { // Find targets
    let server = servert[i].serverName;
    if (ns.getServerNumPortsRequired(server) <= canOpen) {
      targets.push(server);
    }
  }
  if (targets.length > 50) { // Removes low money servers if we have a lot of options
    let reduceBy = targets.length - 9;
    targets = targets.slice(0, reduceBy);
  }
  ns.write("targets.txt", targets.join("\r\n"), "w")
  ns.exec("st/preHack.js", "home"); // Hacks targets and usable servers
}
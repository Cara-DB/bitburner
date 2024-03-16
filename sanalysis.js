function Server(name, level, money, growth) {
  this.serverName = name;
  this.hackLevel = level;
  this.maxMoney = money;
  this.growth = growth;
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
  for (let e = 0; e < hostnames.length; e++) {
    hostnames.push(...ns.scan(hostnames[e]).filter(hostname => !hostnames.includes(hostname)))
  }
  for (let i in hostnames) {
    if (ns.getServerRequiredHackingLevel(hostnames[i]) < (ns.getHackingLevel() /2) && ns.getServerMaxMoney(hostnames[i]) > 10000000) {
      servers.push(new Server(hostnames[i], ns.getServerRequiredHackingLevel(hostnames[i]), ns.getServerMaxMoney(hostnames[i]), ns.getServerGrowth(hostnames[i])));
    }
  }
  const output = await ns.prompt("Please select sorting method:", {
    type: "select",
    choices: ["serverName", "hackLevel", "maxMoney", "growth", "growth"]
  });
  serverinfo = sortServers(servers, output);
  const servert = sortServers(servers, "maxMoney");
  for (let i in serverinfo) {
    let change = serverinfo[i].money();
    serverinfo[i].changeMoney(ns.formatNumber(change));
    delete serverinfo[i].money;
    delete serverinfo[i].changeMoney;
    for (const [key, value] of Object.entries(serverinfo[i])) {
      formatted.push(`${key}: ${value}`);
    }
    formatted.push("");
  }
  ns.write("sInformation.txt", formatted.join("\r\n"), "w");
  for (let i in servert) {
    targets.push(servert[i].serverName);
  }
  targets = targets.slice(0, 25);
  ns.write("targets.txt", targets.join("\r\n"), "w")
}
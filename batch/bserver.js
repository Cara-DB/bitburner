/** @param {NS} ns */
export async function main(ns) {
  const target = ns.args[0];
  const server = ns.getHostname();
  let ram = ns.args[1] - 100;
  let running = false;
  let growRam = Math.floor(ram * 0.7);
  let weakenRam = Math.floor(ram * 0.3);
  let g = NaN;
  let w = NaN;
  let g1 = NaN;
  let toKill = []
  ns.disableLog("getServerMoneyAvailable");
  ns.disableLog("getServerMaxMoney");
  ns.disableLog("getServerSecurityLevel");
  ns.disableLog("getServerMinSecurityLevel");
  ns.disableLog("getServerMaxRam");
  ns.disableLog("getServerUsedRam");
  while (true) {
    if (running === false) {
      g = 0;
      w = 0
      while (g === 0 && w === 0) {
        g = ns.exec("grow.js", server, (Math.floor(growRam / 1.75)), target);
        w = ns.exec("weaken.js", server, (Math.floor(weakenRam / 1.75)), target);
        await ns.sleep(20);
      }
      running = true;
    }
    if (ns.getServerMoneyAvailable(target) === ns.getServerMaxMoney(target)
      && ns.getServerSecurityLevel(target) === ns.getServerMinSecurityLevel(target)) {
      if (running) {
        ns.kill(g);
        ns.kill(w);
        running = false;
      }
      let o = 0;
      while (ns.getServerMoneyAvailable(target) === ns.getServerMaxMoney(target)
        && ns.getServerSecurityLevel(target) === ns.getServerMinSecurityLevel(target)) {
        // Calculations for the cycle
        let weakent = ns.getWeakenTime(target);
        let growt = weakent - ns.getGrowTime(target);
        let hackt = weakent - ns.getHackTime(target);
        let hackMoney = ns.getServerMaxMoney(target) / 2;
        let threads = Math.floor(ns.hackAnalyzeThreads(target, hackMoney)) + 2;
        let levelIncrease = ns.hackAnalyzeSecurity(threads, target);
        let decrease = (hackMoney / ns.getServerMoneyAvailable(target)) + 1;
        let growthThreads = Math.floor(ns.growthAnalyze(target, decrease) * 2);
        let weakenThreads = Math.floor(((ns.getServerSecurityLevel(target) + (growthThreads * 0.004)) / 0.005));
        let hweakenThreads = Math.floor(((ns.getServerSecurityLevel(target) + (levelIncrease * 0.004)) / 0.005));
        let ramNeeded = (ns.getScriptRam("jgrow.js") * growthThreads) + (ns.getScriptRam("jhack.js") * threads) + (ns.getScriptRam("jweaken.js") * weakenThreads);
        if (o < 100 && (ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / 2 >= ramNeeded) {
          while (o < 100 && (ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / 2 >= ramNeeded) {
            toKill.push(ns.exec("jgrow.js", server, growthThreads, target, (growt - 50)));
            toKill.push(ns.exec("jhack.js", server, threads, target, (hackt - 200)));
            toKill.push(ns.exec("jweaken.js", server, weakenThreads, target, 0));
            toKill.push(ns.exec("jweaken.js", server, hweakenThreads, target, 100));
            o++;
            await ns.sleep(100);
          }
          let sleepTime = weakent + (o * 100); // Sleeps while cycles are running
          await ns.sleep(sleepTime);
          o = 0;
        }
        await ns.sleep(20);
      }
    }
    await ns.sleep(20);
  }
}

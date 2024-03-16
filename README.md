Basic to intermediate Bitburner scripts
----

(Feel free to use, but please credit if you repost)

#### Notable files:

- sanalysis.js
  - Finds servers below your hacking level
  - Sorts based on server traits (money, growth etc) and outputs to 'sInformation.txt'
  - Outputs server names with half your hacking level to 'targets.txt'
  - (most hacking files take from 'targets.txt'
- massWeaken.js
  - Takes targets from 'targets.txt'
  - Divides equal portions of RAM to run weaken() and grow() on each target
  - Leaves ~10% ram left (approx 7TB of 65TB)
- Batch Hack
  - Needs both files + dependencies
  - Additionally sanalysis.js or make your own 'targets.txt'
  - Needs 25 servers at min. 1.5TB
  - Takes targets from 'targets.txt'
  - Okay cycle algorithm
- upcost.js
  - Checks if you can upgrade your servers
  - Upgrades them if you hit 'yes'
- findtargets.js
  - Finds servers you can hack
  - Opens/nukes them
  - Outputs names to 'targets.txt'

// Preload during the static build to prove no CMS, fonts or APIs are fetched.
const deny = () => {
  console.error("The local site build attempted a network connection.");
  process.exit(1);
};

require("node:net").Socket.prototype.connect = deny;
globalThis.fetch = deny;

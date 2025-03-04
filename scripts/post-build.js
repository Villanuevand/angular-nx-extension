const fs = require("fs");
const path = require("path");

const ROOT_FILE = "manifest.json";
const DIST_PATH = "dist/apps";

function copyFileToBuilds() {
  const rootFilePath = path.join(__dirname, "..", ROOT_FILE);

  if (!fs.existsSync(rootFilePath)) {
    console.error(`🚨 No se encontró el archivo en la raíz: ${ROOT_FILE}`);
    process.exit(1);
  }

  const builtApps = fs.readdirSync(DIST_PATH).filter((app) => {
    const appPath = path.join(DIST_PATH, app);
    return fs.statSync(appPath).isDirectory();
  });

  if (builtApps.length === 0) {
    console.warn("⚠️ No se encontraron aplicaciones buildeadas.");
    return;
  }

  builtApps.forEach((app) => {
    const targetPath = path.join(DIST_PATH, app, ROOT_FILE);
    fs.copyFileSync(rootFilePath, targetPath);
    console.log(`✅ Copiado ${ROOT_FILE} a ${targetPath}`);
  });
}

copyFileToBuilds();

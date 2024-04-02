import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function copyFiles(source, destination) {
    const files = fs.readdirSync(source);

    files.forEach(file => {
        const currentPath = path.join(source, file);
        const destinationPath = path.join(destination, file);

        if (fs.statSync(currentPath).isDirectory()) {
            fs.mkdirSync(destinationPath);
            copyFiles(currentPath, destinationPath);
        } else {
            fs.copyFileSync(currentPath, destinationPath);
        }
    });
}

function installProject() {
    const sourceDir = __dirname;

    const destinationDir = process.argv[2] || process.cwd();

    // Copy all files and folders from source to destination
    copyFiles(sourceDir, destinationDir);

    // Install dependencies (optional)
    execSync('npm install', { cwd: destinationDir, stdio: 'inherit' });

    console.log('Project installed successfully!');
}

// Run the installation process
installProject();

import fs from 'fs';
import chalk from 'chalk';
import playSound from 'play-sound';

const player = playSound({});

const parseFileContent = (content) => {
    const variables = {};


    const lines = content.split('\n');


    lines.forEach(line => {
        line = line.trim();

        const match = line.match(/^const\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*['"](.*)['"]/);

        if (match) {
            const variableName = match[1];
            const variableValue = match[2];

            variables[variableName] = variableValue;
        }
    });

    return variables;
};

const CheckVariablesFile = (fileName) => {
    try {
        const folderName = fileName.replace(/\.js$/, ''); 
        const fileContent = fs.readFileSync(fileName, 'utf8');
        const solutionContent = fs.readFileSync(`./solutions/${folderName}/index.js`, 'utf8');

        const fileVariables = parseFileContent(fileContent);
        const solutionVariables = parseFileContent(solutionContent);

        const fileVariableNames = Object.keys(fileVariables);
        const solutionVariableNames = Object.keys(solutionVariables);

        if (fileVariableNames.length === solutionVariableNames.length &&
            fileVariableNames.every(name => solutionVariableNames.includes(name) && fileVariables[name] === solutionVariables[name])) {
                const solutionMarkdown = fs.readFileSync(`./problems/${folderName}/solution.md`, 'utf8');
                const header = chalk.blueBright(`## ${chalk.bold(folderName)}`);
                console.log(header);
    
                const contentWithSeparator = solutionMarkdown.replace(/---/g, () => {
                    const separator = chalk.yellow('-'.repeat(40));
                    return separator;
                });
    
                console.log(contentWithSeparator);
                player.play('./that-is-the-correct-answer-gameshow-voice-retro-movie-guy-1-00-02.mp3', (err) => {
                    if (err) {
                        console.error('Error playing sound:', err);
                    }
                });
            return true;
        } else {
            console.log('The file does not contain the expected content.');
            return false;
        }
    } catch (error) {
        console.error('Error reading file:', error);
        return false;
    }
};

const fileName = process.argv[2];

if (!fileName) {
    console.error('Please provide the filename as an argument.');
    process.exit(1); 
}

const isFileCorrect = CheckVariablesFile(fileName);
console.log('Is file correct?', isFileCorrect);

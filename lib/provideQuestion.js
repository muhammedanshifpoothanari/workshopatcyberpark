import fs from 'fs';
import chalk from 'chalk';

export const GiveQuestion = (folderName) => {
    try {
        const header = chalk.blueBright(`## ${chalk.bold(folderName)}`);
        console.log(header);

        const separator = chalk.yellow('-'.repeat(40));
        console.log(separator);

        let question = fs.readFileSync(`./problems/${folderName}/problem.md`, 'utf8');

        question = question.replace(/```([\s\S]+?)```/g, (match, group) => {
            const lines = group.split('\n');
            const maxLength = Math.max(...lines.map(line => line.length));
            const boxWidth = maxLength + 6; 
            const horizontalLine = chalk.cyan.bold('┌' + '─'.repeat(boxWidth) + '┐') + '\n';
            const codeLines = lines.map(line => chalk.cyan.bold('│') + '   ' + chalk.white(line.padEnd(maxLength)) + '   ' + chalk.cyan.bold('│') + '\n').join('');
            const box = horizontalLine + codeLines + chalk.cyan.bold('└' + '─'.repeat(boxWidth) + '┘');
            return box;
        });

        question = question.replace(/`([^`]+)`/g, (match, group) => {
            return chalk.dim(group);
        });

        console.log(chalk.green(''));
        console.log(chalk.white(question));

        console.log(separator);
        console.log(chalk.green(''));
    } catch (error) {
        console.error(chalk.red('Error reading file:'), error);
    }
};

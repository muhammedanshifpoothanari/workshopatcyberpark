import figlet  from 'figlet'

export const HelloWorld = () => {
    figlet('Hello-World', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    const width = process.stdout.columns;
    const paddedText = data.padEnd(width);
    console.log('\x1b[44m\x1b[37m' + paddedText + '\x1b[0m');

});
}
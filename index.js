let HelloWorld;
let App;
import playSound from 'play-sound';

const player = playSound({});

import('./lib/friglet.js').then(module => {
    HelloWorld = module.HelloWorld;
    HelloWorld();
    player.play('./hiWelcome.mp3', (err) => {
        if (err) {
            console.error('Error playing sound:', err);
        }
    });
    return import('./app.js');
}).then(module => {
    App = module.App;
    App();
}).catch(error => {
    console.error('Error:', error);
});

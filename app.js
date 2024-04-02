import { intro, outro, select, spinner,isCancel, cancel } from '@clack/prompts';
import { transformedTopics } from './lib/problem.js';
import { GiveQuestion } from './lib/provideQuestion.js';

export const App = async () => {
    const s = spinner();
   
    intro('💬hi there let get started👏');
    s.start('Waiting for Your Answer');
 
    let question = await select({
        message: 'Pick a project type.',
        options: transformedTopics(0, 13),
    });

    if (question === 'more') {
        question = await select({
            message: '',
            options: transformedTopics(13, 21),
        });
    } 

    if (isCancel(question)) {
      cancel('Operation cancelled.');
      process.exit(0);
    }
    s.stop(question);
    outro(`You're all set!`);

   
        GiveQuestion(question)
   
      
   
}




 const workshopTopics = [
    "Introduction",
    "Variables",
    "Strings",
    "String Length",
    "Revising Strings",
    "Numbers",
    "Rounding Numbers",
    "Number to String",
    "If Statement",
    "For Loop",
    "Arrays",
    "Array Filtering",
    "more",
    "Accessing Array Values",
    "Looping Through Arrays",
    "Objects",
    "Object Properties",
    "Object Keys",
    "Functions",
    "Function Arguments",
    "Scope"
];

const compleatedTopics = [
    "Introduction",
    "Variables",
    "Strings",
    "String Length",
    
];

export const transformedTopics = (start = 0,end) => { return workshopTopics.map(topic => {
    return { value: topic.toLowerCase().replace(/\s+/g, '-'), label: topic};
}).slice(start, end);
}



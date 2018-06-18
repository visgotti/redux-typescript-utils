const types = new Set();
const allowedActionNamesRegex = /^[A-Z_]+$/;

//==============
// Cache Actions
//==============
export const addType = (name: string): void => {
    checkType(name);
    types.add(name);
};

const checkType = (name: string): void => {
    if (!allowedActionNamesRegex.test(name)) {
        throw new TypeError(`Action ${name} must only contain characters A-Z and _`);
    }

    if (types.has(name)) {
        throw new TypeError(`Duplicate action ${name}`);
    }
};

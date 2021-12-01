
const addAddr = (isAdd) => {
    return (target) => {
        target.isAddAddr = isAdd;
        target.prototype.addr = 'zhejiang';
        return target;
    }
}

const readOnly = (target, key, descriptor) => {
    descriptor.writable = false;
    return descriptor;
}

const upperCase = (target, key, descriptor) => {
    const initializerValue = descriptor.initializer();
    console.log('upperCase:', target, key ,descriptor, initializerValue);
    descriptor.initializer = function() {
        return initializerValue.toUpperCase();
    };
    return descriptor;
}




@addAddr(true)
class CustomObj {
    @readOnly
    sex = '';

    @upperCase
    name = 'default';

    age = 10;
};

export default CustomObj;
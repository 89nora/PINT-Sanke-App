export default class Loading {
    //load method takes a callback as an argument. So when it executes setTimeout it waits 3 seconds and then fires
    //a setState function from startScreen component's constructor
    static load(callback) {
        setTimeout(callback, 6000);
    }
}
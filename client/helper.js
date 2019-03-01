//Helper functions to do stuff

//Returns a number between min and max, inclusive.
function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//Returns a bool, with a num chance to return true
function randbool(num) {
    return (num) > Math.random();
}

//Returns the given string with a char inserted
function insert_char_at(str, chr, index) {
    if (index > str.length - 1) return str + chr;
    return str.substring(0, index) + chr + str.substring(index);
}

function del_char_at(str, index) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + str.substring(index + 1);
}

function send_dm(msg_in) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "send_data", true);

    var data = new FormData();
    data.append("msg", msg_in);
    xhr.send(data);
}
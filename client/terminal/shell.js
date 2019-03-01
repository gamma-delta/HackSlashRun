const state = {
    cursor: document.getElementById('cursor'),
    cursor_min: 0,
    cursor_pos: 0,
    cursor_max: 86, //Also inclusive.
    cursor_blink: 0,
    cursor_blink_default: 50,

    shell_dom: document.getElementById('shell'),
    header: document.getElementById('header'),
    console: document.getElementById('console'),
    input: document.getElementById('input'),
    pointer: document.getElementById('pointer'),

    commands: loaded_commands,

    is_booted: false,
    is_in_device: false,
    can_input: false,
    current_network: null,
    current_device: null,

    prev_inputs: [],
    current_prev_input: 0
};

state.reset_input = function() {
    this.input.innerText = "";
    this.cursor_pos = this.cursor_min;
    this.update_cursor();
};

state.update_cursor = function() {
    if (this.can_input && this.cursor_blink >= 0) {
        this.cursor.innerText = " ".repeat(this.cursor_pos) + "_";
    } else {
        this.cursor.innerText = "";
    }
    if (this.is_programming) //I'm programming
        this.pointer.innerText = "@ ";
    else if (this.current_device) //I'm in a device
        this.pointer.innerText = "~ ";
    else //Default
        this.pointer.innerText = "> ";
};

//View Controller
state.print = function(text) {
    if (this.console.innerText.slice(-1) == "\n") text = "  " + text;
    this.console.innerText += text;
    this.fix_console();
};

state.println = function(text) {
    this.console.innerText += "  " + text + "\n";
    this.fix_console();
};

state.print_array = function(array) {
    var max_length = 0;
    for (let entry of array) {
        max_length = Math.max(max_length, entry.length);
    }
    max_length += 4; //Have 4 spaces (1 tab) between them
    var columns = Math.floor(this.cursor_max / max_length);

    var to_print = "  ";
    var c = 0;
    for (let entry of array) {
        entry = entry.padEnd(max_length);
        to_print += entry;

        c++;
        if (c >= columns) {
            c = 0;
            to_print += "\n  ";
        }
    }
    if (to_print.slice(-3, -1) !== "\n") to_print += "\n";
    state.console.innerText += to_print;

    this.fix_console();
};

state.fix_console = function() {
    // Fix overflow problems.
    var split_console = this.console.innerText.split("\n");
    //if (split_console.slice(-1)[0] == "") split_console = split_console.slice(0, -1);
    if (split_console.length > 128) { //Let's be reasonable here.
        this.console.innerText = split_console.slice(split_console.length - 128, -1).join("\n") + "\n";
    }
    //Scroll window
    this.console.scrollTop = this.console.scrollHeight;
    
    //Force refresh
    this.shell_dom.style.display = "none";
    this.shell_dom.style.display = "block";
};

state.edit_header = function(text, overwrite, newline) {
    if (newline) {
        text += "\n"; //Add newline after
    }

    if (overwrite) {
        this.header.innerText = text;
    } else {
        this.header.innerText += text;
    }
};

state.move_cursor = function(to) {
    if (to === "front") {
        this.cursor_pos = this.cursor_min;
    } else if (to === "end") {
        this.cursor_pos = Math.min(this.cursor_max, this.input.innerText.length);
    } else if (to instanceof Number) {
        to = Math.min(to, this.cursor_max, this.input.innerText.length);
        to = Math.max(to, this.cursor_min);
        this.cursor_pos = to;
    } else {
        window.alert(`Error in move_cursor: to = ${to}`);
    }
    
    this.update_cursor();
};

state.shift_cursor = function(by) {
    var pos = Math.min(by + this.cursor_pos, this.cursor_max, this.input.innerText.length);
    pos = Math.max(pos, this.cursor_min);
    this.cursor_pos = pos;
    this.update_cursor();
};

state.can_typespace = function() {
    return this.cursor_pos < this.cursor_max;
}

state.can_backspace = function() {
    return this.cursor_pos > this.cursor_min;
}

state.progress_bar = function(start_msg, end_msg, length, probability, time, callback) {
    /*Creates a progress bar like so: 
        Searching: [=          ] —
        Searching: [==         ] \
        Searching: [===        ] |
        Searching: [====       ] /
    */
    this.can_input = false;
    this.update_cursor();
    var progress = 0;
    var marker = "-" // or \ | /

    var interval_obj = setInterval(() => {
        if (randbool(probability)) {
            progress++; //Random chance to advance progress
            if (progress > length) {
                //we're done
                var finished_bar = `\n  ${start_msg} [${'='.repeat(progress-1)}] ${end_msg}`;
                var new_console = this.console.innerText.split("\n").slice(0, -1).join("\n") + finished_bar;
                this.console.innerText = new_console + "\n";
                this.fix_console();

                clearInterval(interval_obj);
                if (callback instanceof Function) callback();

                this.can_input = true;
                this.update_cursor();
                return;
            }
        }
        var prog_done = '='.repeat(progress);
        var prog_left = ' '.repeat(length - progress);

        if (marker == "-") {marker = '\\';}
        else if (marker == "\\") {marker = "|";}
        else if (marker == "|") {marker = "/";}
        else if (marker == "/") {marker = "-";}
        else {marker = "-";} //fail-safe

        var display = `\n  ${start_msg} [${prog_done}${prog_left}] ${marker}`; //what gets displayed
        var new_console = this.console.innerText.split("\n").slice(0, -1).join("\n") + display;
        this.console.innerText = new_console;
        this.fix_console();
    }, time);
};

document.addEventListener('keydown', (e) => { //Handle key input
    if (!state.can_input) return;

    state.cursor_blink = state.cursor_blink_default; //Reset blink

    var key = e.key;
    if (key.includes("Arrow") || key == "Spacebar") e.preventDefault(); //no scrolling!
    if (key.length === 1 && state.can_typespace()) {
        state.input.innerText = insert_char_at(state.input.innerText, key, state.cursor_pos);
        state.shift_cursor(1);
    } else {
        if (key === "Backspace") {
            if (state.can_backspace()) {
                state.input.innerText = del_char_at(state.input.innerText, state.cursor_pos - 1);
                state.shift_cursor(-1);
            }
        } else if (key === "Enter") {
            state.accept_input();
        } else if (key === "ArrowLeft") {
            state.shift_cursor(-1);
        } else if (key === "ArrowRight") {
            state.shift_cursor(1);
        } else if (key === "ArrowUp") {
            if (state.current_prev_input > 0) {
                state.input.innerText = state.prev_inputs[--state.current_prev_input];
                state.move_cursor("end");
            } else {
                state.move_cursor("front");
            }
            
        } else if (key === "ArrowDown") {
            if (state.current_prev_input < state.prev_inputs.length - 1)
                state.input.innerText = state.prev_inputs[++state.current_prev_input];
            else if (state.current_prev_input = state.prev_inputs.length)
                state.input.innerText = "";
            state.move_cursor("end");
        }
    }
});

state.accept_input = function() {
    if (!this.can_input) return; //just in case
    var input = this.input.innerText;

    if (input.length === 0) {
        this.fix_console();
        return;
    }
    this.prev_inputs.push(input);
    this.current_prev_input = this.prev_inputs.length;
    this.execute(input);    
};

state.execute = function(input) {
    this.console.innerText += this.pointer.innerText + input + "\n";
    
    const splitted = input.split(" ");
    const command = splitted[0].toLowerCase(); //The command shouldn't care about case...
    const args = splitted.slice(1); //but the args might.

    if (this.commands.hasOwnProperty(command)) {
        this.commands[command].f(this.current_device != null, args);
    } else {
        this.println("Invalid command! Try `help' for a list of commands.");
    }  

    this.reset_input();
}

//Model
state.boot_shell = function() {
    if (this.is_booted) return; //No need to do it twice...
    this.edit_header(String.raw`
  _    _            _     ____   _____  
 | |  | |          | |   / __ \ / ____| 
 | |__| | __ _  ___| | _| |  | | (___   
 |  __  |/ _  |/ __| |/ / |  | |\___ \  
 | |  | | (_| | (__|   <| |__| |____) | 
 |_|  |_|\__ _|\___|_|\_\\____/|_____/   
---------------------------------------                                  
`);
    this.progress_bar("Booting up:", "Booted.", 30, 0.5, 50, () => {
        this.is_booted = true;
        this.current_network = main_network; //Main network

        this.cursor_blink = this.cursor_blink_default;
        this.reset_input();

        this.println("Type `help' for a list of commands.");

        setInterval(() => {
            if (this.cursor_blink <= -this.cursor_blink_default)
                this.cursor_blink = this.cursor_blink_default;
            this.cursor_blink--;
            this.update_cursor();
        }, 10);
    });
};
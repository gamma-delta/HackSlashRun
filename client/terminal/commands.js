const loaded_commands = {
    //Basic commands
    help: {
        used_in: "all",
        f: function(_, command) {
            if (command.length === 0) {
                //No args.
                state.println("Use `help [command]' for more information about that command");
                state.println("Possible commands:");
                state.print_array(Object.keys(state.commands));
            } else {
                //Info on a specific command
                try {
                    command = command[0];
                    const help = state.commands[command].help;
                    var to_print = help[0] + "\n";
                    for (let usage of help.slice(1)) {
                        to_print += "    " + usage + "\n";
                    }
                    state.print(to_print);
                } catch (err) {
                    console.log(err);
                    state.println(`Unknown command \`${command}'!`);
                }
            }
        },
        help: [
            "Provides information about HackOS commands.",
            "`help' Print all available commands",
            "`help [command]' Give more information about [command]."
        ]
    },
    echo: {
        used_in: "all",
        f: function(_, args) {
            if (args.length === 0) {
                state.println("Hello, world!");
            } else {
                const output = args.join(" ");
                if (output == "deez nuts")
                    state.println("haha, gateem!");
                else
                    state.println(output);
            }
        },
        help: [
            "Repeats messages back to the user.",
            "`echo' Print a test message",
            "`echo [args...]' Print all the args back to the user, seperated by spaces."
        ]
    },

    //Information and location
    location: {
        used_in: "all",
        f: function() {
            var obj_type = "";
            var name = "";
            if (state.current_device) {
                obj_type = state.current_device.type;
                name = state.current_device.name;
            } else {
                obj_type = state.current_network.type;
                name = state.current_network.name;
            }
            state.println(`You are currently in ${obj_type} ${name}.`)
        },
        help: [
            "Shows the current network or device the user is in.",
            "`location' Shows the current network or device the user is in."
        ]
    },
    search: {
        used_in: "all",
        f: function(is_in_device) {
            if (is_in_device) {
                //List registers
                const registers = state.current_device.registers;
                const size = registers.length;

                state.progress_bar("Searching for registers", "Done.", 30, 
                    ( 1/Math.sqrt(size + 1) ), 50, () => {
                        if (size == 0) {
                            state.println("This device is encrypted. (How'd you get in here, anyway?)");
                        } else {
                            state.print_array(registers);
                        }
                });
            } else {
                //List adjacent nets and devices
                const networks = [];
                for (entry in state.current_network.adjacent_networks) 
                    networks.push(state.current_network.adjacent_networks[entry].name);

                const devices = [];
                for (entry in state.current_network.devices)
                    devices.push(state.current_network.devices[entry].name);

                const size = networks.length + devices.length;
                state.progress_bar("Searching for devices & networks", "Done.", 30, 
                    ( 2/Math.sqrt(size + 1) ) , 50, () => {
                        if (size == 0) {
                            state.println("Nothing found.")
                        } else {
                            if (networks && networks.length) {
                                state.println("Networks:");
                                state.print_array(networks);
                            }
                            if (devices && devices.length) {
                                state.println("Devices:");
                                state.print_array(devices);
                            }
                        }
                        
                });
            }   
        },
        help: [
            "Searches for and lists all available devices, adjacent networks, or registers.",
            "> `search' Lists all devices and adjacent networks on the current network.",
            "~ `search' Lists all registers on the current device."
        ]
    },

    //Moving around
    enter: {
        used_in: "network",
        f: function(in_device, device_name) {
            if (in_device) {
                state.println("`enter' can only be used from a network!");
                return;
            } 
            if (device_name.length == 0) {
                state.println("Too few arguments. Try `help enter' for more information.");
                return;
            }
            device_name = device_name[0]; //I only need the first.
            for (let device of state.current_network.devices) {
                if (device.name == device_name) {
                    if (device.registers.length == 0) {
                        //Clever workaround to "lazy design"
                        state.println("That device is encrypted.");
                        return;
                    } else {
                        state.current_device = device;
                        state.println("Entered device succesfully.");
                        return;
                    }
                }
            }
            //else
            state.println("A device with that ID wasn't found.");
        },
        help: [
            "Enters a device. Only useable from a network.",
            "`> enter [device]' Enters the [device] with the given name."
        ]
    },
    exit: {
        used_in: "device",
        f: function(in_device) {
            if (!in_device) {
                state.println("`exit' can only be used from a device!");
            } else {
                state.current_device = null;
                state.println("Exited device succesfully.");
            }
        },
        help: [
            "Exits a device. Only useable from a device.",
            "~ `exit' Exits the current device."
        ]
    },
    link: {
        used_in: "network",
        f: function(in_device, args) {
            if (in_device) {
                state.println("`link' can only be used from a network!");
                return;
            }
            if (args.length == 0) {
                state.println("Too few arguments. Try `help link' for more information.");
                return;
            }
            var target_id = args[0];
            for (let network of state.current_network.adjacent_networks) {
                if (network.name == target_id) {
                    if (network.password != undefined) {
                        if (args.length == 1) {
                            state.println("This network requires a password.");
                            if (network.password_hint) state.println(`Hint: (${network.password_hint})`);
                            return;
                        } else {
                            if (args[1] == network.password) {
                                state.current_network = network;
                                state.println("Linked to network " + network.name);
                            } else {
                                state.println("Incorrect password.");
                                if (network.password_hint) state.println(`Hint: (${network.password_hint})`);
                            }
                            return;
                        }
                    } else {
                        //No password
                        state.current_network = network;
                        state.println("Linked to network " + network.name);
                        return;
                    }
                }
            }
            state.println("No network with that name was found.");
        },
        help: [
            "Links to an adjacent network.",
            "`link [name]' Change networks to the adjacent network with the given [name].",
            "`link [name] [password]' Change networks (if it requires a password)."
        ]
    },

    //Lets ハッキング～
    peek: {
        used_in: "device",
        f: function(in_device, args) {
            if (!in_device) {
                state.println("`peek' can only be used from a device!");
                return;
            }
            if (args.length < 1) {
                state.println("Too few arguments. Try `help peek' for more information.");
                return;
            }
            const register = args[0] + "_r"; //we're reading

            if(!state.current_device.hasOwnProperty(register)) {
                state.println("A register with that name wasn't found.");
                return;
            }

            const value = state.current_device[register]();
            state.println(`(${value})`);
        },
        help: [
            "Reveals the value of a register.",
            "`~ peek [register]' Reveals the value of [register]."
        ]
    },
    poke: {
        used_in: "device",
        f: function(is_device, args) {
            if (!is_device) {
                state.println("`poke' can only be used from a device!");
                return;
            }
            if (args.length < 2) {
                state.println("Too few arguments. Try `help poke' for more information.");
                return;
            }
            const register = args[0] + "_w"; //we're writing
            const value  = args[1];

            if (!state.current_device.hasOwnProperty(register)) {
                state.println("A register with that name wasn't found.");
                return;
            }

            const return_msg = state.current_device[register](value);
            state.println(`(${return_msg})`);
        },
        help: [
            "Alters a register and displays a brief message about the effect.",
            "`~ poke [register] [value]' Change the value of [register] to [value]"
        ]
    },
    read: {
        used_in: "device",
        f: function(is_device, args) {
            state.println("Files (and this command) are WIP, so this doesn't do anything.");
        },
        help: [
            "Read the contents of a file stored on a device.",
            "~ `read [file]' Read the contents of [file]"
        ]
    }
}
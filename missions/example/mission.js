class Lights {
    constructor(id, on) {
        this.name = "yamaha-Light" + id;
        this.type = "device";

        //Registers
        this.registers = ["switch"];

        this.is_on = on;
        this.switch_r = function() { return this.is_on };
        this.switch_w = function(value) {
            if (value == 0) {
                this.is_on = false;
                send_dm(`Light ${this.name} is now off`);
                return "Lights are now off.";
            } else if (value == 1) {
                this.is_on = true;
                send_dm(`Light ${this.name} is now on`);
                return "Lights are now on.";
            } else {
                send_dm(`Player tried to send ${value} to light ${this.name}`);
                return "Bad value! Try 0 or 1.";
            }
        };
    }
};

class FMS { //one firearm management service
    constructor(id) {
        this.name = "FMS#" + id;
        this.id = id;
        this.type = "device";

        //registers
        this.registers = ["shots_taken", "enable"];

        //shots taken
        this.shots = 0;
        this.shots_taken_r = function() { return this.shots };
        this.shots_taken_w = function(value) {
            value = parseInt(value);
            if (isNaN(value)) {
                send_dm(`Tried to change ${this.name}'s shots, but was NaN`);
                return "ERROR: NaN";
            }
            else {
                this.shots = value;
                send_dm(`Changed ${this.name}'s shots to ${this.shots}`);
                return `Shots taken reset to ${value}`;
            }
        };


        //enable / disable
        this.enabled = true;
        this.pin = (this.id << 3) ^ this.id;
        send_dm(`${this.name}'s pin is ${this.pin}`);
        this.enable_r = function() { return this.enabled };
        this.enable_w = function(value) {
            if (value != this.pin) {
                send_dm(`Tried pin ${value} to switch ${this.name} from ${this.enabled} (reqs ${this.pin})`);
                return "Invalid pin!"
            } else {
                this.enabled = !this.enabled;
                send_dm(`Used pin ${value} to switch ${this.name} to ${this.enabled}`);
                return `Firearm ${this.enabled? "enabled" : "disabled"}.`
            }
        }
    }
};

//The hacker always starts in main_network.
const main_network = {
    type: "network",
    name: "DTX:Climate",
    devices: [
        new Lights("002", false), new Lights("031", true), new Lights("064", true),
        new Lights("103", true), new Lights("215", false), new Lights("337", false),
        { //an HVAC unit
            name: "AKEA-HVAC5",
            type: "device",

            //registers
            registers: ["target_temp", "fan"],

            target_temp: 20,
            target_temp_r: function() { return this.target_temp },
            target_temp_w: function(value) {
                value = parseInt(value);
                if (isNaN(value)) {
                    send_dm(`Tried to change AKEA-HVAC5 temp, but NaN`);
                    return "不是数字。";
                }
                if (value > 40) {
                    this.target_temp = 40;
                    send_dm(`${value} too hot for AKEA-HVAC5; change to 40C`);
                    return `${value}C太热了，温度是40C了`;
                } else if (value < 5) {
                    this.target_temp = 5;
                    send_dm(`${value} too cold for AKEA-HVAC5; change to 5C`);
                    return `${value}C太冷了，温度是5C了`;
                }
                this.target_temp = value;
                send_dm(`AKEA-HVAC5 temp is now ${value}C`);
                return `温度是${value}C了`;
            },

            fan_on: false,
            fan_r: function() { return this.fan_on },
            fan_w: function(value) {
                if (value == 0) {
                    this.is_on = false;
                    return "关了风扇";
                } else if (value == 1) {
                    this.is_on = true;
                    return "开了风扇";
                } else {
                    return "不是1或0";
                }
            }
        }
    ]
};

const firearm_network = {
    type: "network",
    name: "DTX:Protek-FMS",
    password: "applesauce",
    password_hint: "mac's favorite food",
    devices: [
        new FMS("08"), new FMS("21")
    ]
}

main_network.adjacent_networks = [firearm_network];
firearm_network.adjacent_networks = [main_network];
class LockDoor {
    constructor(id) {
        this.name = "Door#" + id;
        this.id = id;
        this.type = "device";

        this.registers = ["lock"]

        //Registers
        this.is_locked = true;
        this.lock_r = function() {return this.is_locked};
        this.lock_w = function(value) {
            if (value == "true") {
                this.is_locked = true;
                
                send_dm(`Door ${this.id} is now locked`);
                return "Locked the door.";
            } else if (value == "false") {
                this.is_locked = false;

                send_dm(`Door ${this.id} is now unlocked`);
                return "Unlocked the door.";
            } else {
                return `ERROR: Not "true" or "false".`;
            }
        }
    }
};

class Phone {
    constructor(name) {
        this.name = name;
        this.type = "device";
        this.registers = []; //It will appear as "encrypted"
    }
};

const main_network = {
    type: "network",
    name: "Hydro@Thomas:public",
    devices: [
        new Phone("Edwards_iPhone"), new Phone("SatoshiGalaxyS8+"), new Phone("Jessicas_iPhone"),
        { //Brother Printer
            name: "Brother6555",
            type: "device",

            registers: ["paper_count", "ink", "input"],

            paper_count: 34,
            paper_count_r: function() {return `${this.paper_count} sheets left.`},
            paper_count_w: function() {return "Read Only."},

            ink: 9540,
            ink_r: function() {return `${this.ink} uL of ink left.`},
            ink_w: function() {return "Read Only."},

            input_r: function() {return "Write Only."},
            input_w: function(value) {
                if (this.paper_count - 1 >= 0 && this.ink - 55 >= 0) {
                    this.paper_count--;
                    this.ink -= 55;
                    send_dm(`Printed out "${value}"`);
                    return `Printed out "${value}"`;
                }
            } 
        } //End Brother printer
    ]
};

const doors_network = {
    type: "network",
    name: "Hydro@Thomas:access",
    password: "squaremoon",
    password_hint: "I stuck it on one of the chemical tanks",
    devices: [
        new LockDoor("00"), new LockDoor("01"), //First floor
        new LockDoor("10"), new LockDoor("11"), new LockDoor("12") //Second floor
    ]
};

const michealas_hotspot = {
    type: "network",
    name: "Michealas_iPhone",
    devices: [
        new Phone("Mikes_iPhone"), new Phone("Miguels_iPhone"), new Phone("PeterGalaxyS7"),
        new Phone("Kathys_iPadMini"),
        { //BLuetooth Speaker
            name: "JawboneSpeakerBBG",
            type: "device",

            registers: ["volume"],

            volume: 7,
            volume_r: function() {return this.volume},
            volume_w: function(value) {
                value = parseInt(value);
                if (isNaN(value)) return "not a number";
                if (0 <= value && value <= 10) {
                    this.volume = value;
                    send_dm(`Changed JawboneSpeaker's volume to ${value}`);
                    return "changed volume to " + value;
                } else {
                    return `${value} is out of bounds`;
                }
            }
        } //End bluetooth speaker
    ]
}

main_network.adjacent_networks = [doors_network, michealas_hotspot];
doors_network.adjacent_networks = [main_network];
michealas_hotspot.adjacent_networks = [main_network];
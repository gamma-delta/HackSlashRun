# Example Mission

This is a simple little mission intended for me to practice designing missions. Probably suitable as a first mission for your players.

# Story
DTX Corp. is one of those companies that either seems to do everything or nothing, depending on who you ask. According to their website, they do "data aquisition" with a focus on "balancing the privacy of the customer" with "the needs of the client." Seems like a load of BS (bad security) to you all.

Whatever it is they do, someone's hired you to sneak into one of their smaller server buildings and wipe their data off one of the server banks. They've provided you with a small USB drive that, when plugged into the correct bank, will automatically wipe your client's data. **Your mission is to use that USB drive and clear your client from their server bank.**

The USB drive is blank other than a sticker that says `0x656767`.

As the building is relatively small (only one story), DTX hasn't installed much physical security in terms of motion detectors, alarms, etc. They do have a few guards with firearms patrolling, though.

Good luck.

# Layout

See attached map.

There are two ways into the building: through the big glass doors to the Reception (DC 12 DEX / INT to unlock), or through the emergency exit to the Office (carelessly left unlocked). Neither of them have any alarms.

### Reception
This is how clients get into the building. In one corner is a receptionist's desk. On the wall behind it is a huge sign that says **DTX**. The door to the hallway is open but opaque.

### Hallway
There isn't anything of note here. It's just a hallway.

### Restrooms
There's a set of men's and women's restrooms up the hall from Reception. They are mostly the same, except the men's restroom has urinals and doesn't smell as nice. Biff and Ted won't go into the women's restroom, but they might go in the men's if they hear something.

### Meeting Room
There's a giant wooden meeting table in this room. On it are some sheets of paper with the schedule for the last meeting. (The .rtf is attached.) They all have various pen and pencil doodles on them made by bored employees. One of them has the formula for disabling the guards' firearms handwritten on it. There might also be some other useful info there.

There's also a projector in the ceiling pointing to a screen on the wall. It's a wired HDMI connection, so the Hacker can't connect to it.

Ted is sitting in this room playing on his phone when the players first come. (See the Security section.)

### Office

There are 6 desks here. They all have various bits of paper, pencils, etc on them, but nothing useful. 

Desk #3 (Mac's) is covered with empty applesauce containers. Desk #6 has two monitors. Desk #1 has a few photos of some family members.

### Server Room

The door to this room is electronically locked. You can open it with a DC 20 INT check, or a keycard off one of the guards.

Each server bank has an ID written on the inside. It takes 3 seconds to find the ID. To win, the players have to plug the drive into the server marked `656767` (marked with a star). Feel free to make the other IDs whatever you want (`chicken_tendies`, `i like plays`, `T'Râk niemozs̗̄ av Diz Nûts`).

## Security

There are two security guards roaming around, Biff and Ted. They both have a firearm connected to a Firearm Management System, which is hackable. Biff's has ID 08, and Ted's has ID 21.

Biff is walking around the outside of the building clockwise. Ted is supposed to start in the meeting room, walk up and down the hallway, and walk back to the meeting room. However, he is sitting in the meeting room with his back to the door playing a game on his phone. If he's disturbed, he'll go back to his patrol.

Neither of them are very smart. Turning on and off the lights will probably distract them from the players' presence.

They both have the same stats:
|Stat|Amount|
|---|---|
|DEX|3|
|STR|4|
|INT|1|
|CHA|3|
||
|SPD|

# Hacking
The hacker starts on network DTX:Climate.

### DTX:Climate
Despite it's name, this network controls lights as well as the HVAC.

The lights are long flourescent tube lights made by Yamaha and are named `yamaha-Light###`, where `###` is an ID. 

|ID #|Room|Starting Value|
|---|---|:---:|
|002|Reception|Off|
|031|Men's Restroom|On|
|064|Women's Restroom|On|
|103|Meeting Room|On|
|215|Hallway|Off|
|337|Office|Off|

There's also an HVAC unit, `AKEA-HVAC5`. Unfortunately, AKEA is a Chinese company, and so the devices' responses are all in Chinese. (The DM messages are in English.)

It controls the temperature throughout the building. It also controls a very loud fan, which is off by default. When it's on, sneak checks are made with advantage, but Ted will get up and start patrolling.

### DTX:Protek-FMS

DTX:Protek-FMS, which is next to DTX:Climate, controls Biff and Ted's firearms. There are two devices on it, corresponding to each of their firearms. You can freely `poke` any value to `shots_taken`, which might confuse them into not paying attention to you for a bit. `poke`ing an PIN to `enable` will enable or disable the entire firearm. It takes them 3 seconds to re-enable it manually.

The PIN is calculated from the ID of the firearm like so: `(ID << 3) ^ ID`. It should display the pin on your console as soon as the hacker connects. The formula should be hand-written in pencil on one of the documents in the meeting room.
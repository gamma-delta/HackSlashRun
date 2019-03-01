# Water Treatment
This is the second mission I've ever made. It's quite a bit different than the example mission: instead of secretly sneaking around at night, this is full-blown daylight. The players have to be a different kind of sneaky.

Still WIP

# Story
Following complaints of poor water quality, the City Council has raised money to construct a new water treatment facility. This facility, named the Thomas Water Plant after the mayor's dog, processes water from a nearby aquifer and provides it to the city and county. It just opened a month or two ago, so it's not quite open to the public.

However, you have recieved a tip that the company hired to construct the facility, **HydroAnswers**, might be using the building as a smuggling front. Your contact believes that if the building is being used as a front, the water quality will almost certainly suffer. As a result, not only will citizens be getting dirty water, there will also be a smuggling operation happening under everyone's noses.

Your contact wants you to **plant a bug somewhere on the central computer** connected to the instruments that measure water quality. You'll have to find where this is by yourself. **It takes 30 seconds** (10 turns in a row) to install the bug. If the water quality does suffer, the contact can send information about the water to the city council and get them to shut down the plant without ever revealing the smuggling operation. (They don't want the wrath of the operants on themselves or you.)

The area of the plant that actually processes the water is very, very high-security. The player's aren't making it there. Fortunately, the part with the computer is much lower-security.

Remember, plant your bug on the central computer. Good luck.

# Layout
The water plant has two floors. The computer's on the top floor. 

Players can enter through either the front door into Reception, pick the lock into Chemical Storage, or walk in the unlocked door into the Back Room.

## Reception
At the receptionist's desk, there's a little kid. Her name is Jamie. She has a key card hidden on the desk somewhere. The players can try and find the keycard or ask Jamie to unlock the door for them. (She'll do it if the players say "please".)

## Museum
This is the area of the plant that's going to be open to the public. On the walls are some pictures of the plant and how it works. There's also a little water-table demonstration.

## Break
There are a couple employees having a break in here, Miguel and Peter. Miguel's eating a sandwich and Peter's eating a salad. Neither of them have a key card.

By the back wall, there are two plastic tables. One of them has a hammer and a drill on them, as well as a bunch of fiberglass rolls. The other has a bunch of phones all plugged into a wall socket, a big sign that says `NO CELLPHONES ON SITE; PUT YOUR CELLPHONES HERE` with a picture of an ancient Nokia, and the printer.

## Restroom
It's a restroom, in accordance with fire codes. There is nothing here.

## Back Room
A very dark room. It seems suspicious, but there isn't really anything here.

## Closet
There's a bunch of hi-vis vests in here. They each give +5 to Charisma. (They're that good.)

## Chemicals
The outside door to this room has a hazard diamond on it.
```
Blue => 4
Red => 0
Yellow => 0
White => OX
```
On an INT check (DC 12) they can learn that Blue is health, Red is flammability, Yellow is reactivity, and White OX means it's an oxidizer (it helps fires burn).

Inside there's a bunch of chlorine tanks, including two so tall they reach through the ceiling. On the side opposite the door, there's a few employees on a couch playing Super Smash Bros: Mike, Bob, and Jessica. None of them could probably be moved to get off the couch. Jessica has a keycard on her badge. 

## Stairwells
There's two stairwells. They let you get to the next floor with 5 squares of movement.

## More Chemicals
Similar to the first Chemicals room. In the back, there's a post-it note stuck on one of the chemical drums that says `Password for the doors is opposite` on one side and `"Root Sun", all one word, no caps` on the other. (The password is `squaremoon`, the opposite of Root and Sun. This was stolen wholesale from The Mysterious Benedict Society.)

Kathy is in here, measuring the pressure of some tanks with a manometer.

## Crates
A room with a bunch of wooden crates. They all have stickers on them that say `CAUTION: EXPLOSIVE`. They contain tanks of various water treatment chemicals. (Eventually, once the smuggling operation goes online, they'd be filled with less legal stuff.)

Edward starts here. On his turn, he just wanders around the building.

## ???
There's not actually anything here. The wall connecting to Crates has an unlocked hidden door. This will likely absolutely convince the players there is definitely something there.

## Small Hallway
Just a hallway. It connects Control and Crates. There's a big glass window in the wall so people in the hallway can see into Control and vice versa.

Satoshi is here on a ladder fixing a lightbulb. From his position, he can see into Control where the terminal is. If the players give him a hand, he might let them into Control.

## Control
The objective is in here; just plant the bug on one of the three terminals.

Micheala is in here, listening to music on her speaker while she's configuring one of the terminals. She will stop the players if they try to mess with the computers.

# Security
There isn't much in the way of security here, other than semi-vigilantish employees. There are, however, doors.

Doors marked with a curved opening and no line in the wall are unlocked. Doors marked with a curved opening and a line in the wall are locked (DEX DC 15) and vulnerable to the lock shim. Doors marked with a K require a keycard or a DC 20 INT check. Doors marked with a number are fingerprinted and must be unlocked by the hacker or an employee.

# Items
Your players start the mission with the following items, which they may distribute among themselves.

|Item|Description|
|---|---|
|Water Quality Bug|Part of your objective. Plant it on the main computer in the water plant.|
|Card Copier|After standing in the same square as an electronic card for 3 seconds, there's a 50% chance it gets copied.|
|Lock Shim|A surprising number of doors are vulnerable to just slipping a shim through the jamb and opening the bolt. Gives a +5 to checks made to unlock vulnerable doors (marked with a curved line). Looks like a screwdriver with a curved hook on the end.|

# NPCs
There are a lot of workers around the building. See Layout for a little more info on each of them. They all have phones, which are sitting charging in the Break Room and are connected to Micheala's hotspot. Although their phones are encrypted, you can get the employees' names off of them.

- **Jamie** is the kid at the reception.
- **Mike**, **Bob**, and **Jessica** are playing Super Smash Bros on the couch in Chemicals.
- **Miguel** and **Peter** are eating in the Break Room.
- **Micheala** is configuring the central computer in Control.
- **Kathy** is inspecting the chemical tanks upstairs in More Chemicals.
- **Satoshi** is fixing a lightbulb in Small Hallway.
- **Edward** is wandering. Just move him somewhere within walking distance every turn. He starts in Crates.

All their stats are all 3. (Just to make it easy. This includes HP and Speed. Roll Initiative, though.)

# Hacking
There are three networks this time: `Hydro@Thomas:main`, `Hydro@Thomas:access` and `Michealas_iPhone`.

There's a Wifi-enabled printer in the Break Room. This is a chance for your players to be creative, as the Hacker can make it print out pretty much any plain text. (If they want to print out something a little more fancy, just say "It Happens". You're the GM, do whatever you want.)

Connected to Micheala's Iphone, which is in the Break Room, is a Jawbone speaker, which is sitting next to Micheala upstairs. The hacker can adjust the volume. Perhaps you can get her to come downstairs to try and fix her phone, which will get her away from the computer.
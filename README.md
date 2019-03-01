# Hack Slash Run
An RPG about physical hacking. There's two kinds of players: Runners do more RPG-style things: they go around a mission site, sneak past guards, and set up bugs. The Hacker doesn't have a character at all; instead they use a laptop and hack devices in the building by connecting to a server run by the GM.

# Why play Hack Slash Run?
HSR was designed to be really easy to play. Runners are just 4 numbers from 1-6 (representing Strength, Dexterity, Intelligence, and Charisma), there's not really combat, and everything is decided by simple 6-sided dice. There's also an interesting interplay between the Runners and the Hackers; the Runners can get passwords and information from inside the mission and the Hacker can help them back.

# How to Play
For more information on the rules of play, [look at the documentation](docs/index.html). It's called "documentation" and not "rules" because it's more hackery-sounding that way. (Duh.)

## Server
The game requires a server for your hacker to connect to. This is how to set it up, and some additional info.

### For Beginners
Open up a command prompt, and type in `ipconfig`. Look for the section that says `Wireless LAN adapter Wi-Fi` and write down the number after `IPv4 Address`. It should be 4 numbers seperated with periods.

Next, navigate to the folder with `hack_slash_run.exe`. (Google is your friend if you don't know how.) Then, type this in: `hack_slash_run.exe -m=missions/example/mission.js`. That will launch the example mission. To run another mission, change the path (the thing with slashes after the `-m=`) to another mission file.

Finally, tell your hacker to type that IP address you wrote down into a web browser, followed by `:1337`. (So, something like `123.45.67.89:1337`.) If everything is working correctly, your hacker should see the HackOS window pop up.

When the hacker `poke`s a value somewhere, you'll see it on your screen and an alert will play (so you know they did something.)

For a list of arguments, run `hack_slash_run.exe -h` or `hack_slash_run.exe --help`. It won't launch the server and it will tell you all the ways you can customize the game.

While the server's running, your players can also read the docs ("rules" for the uninspired). Tell them to go to the address your hacker went to, and put `/docs` after it. (`123.45.67.89:1337/docs`) Ta-da!

Finally, to stop the game after you're done, do `CTRL + C` or just close the terminal window.

### Dangerous Complex Advanced Technowizardry Section
The exe is compiled for windows, but if you have Go installed you should be able to compile it for your system. (If you do, please do a pull request or something so I can get some other platforms supported here. I'll credit you.)

The documentation is HTML, not Markdown. This is so the players can read it from the server. If you know a lightweight way to display Markdown as HTML, PLEASE PLEASE tell me. HTML is just... ugly for stuff like this.
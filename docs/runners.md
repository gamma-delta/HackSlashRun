# Rules for Runners

Runners are the players who have their characters in the building.

Throughout this document, 3 characters are used for example purposes. Here are their stats. (You'll learn what they mean in a little bit.)

*   **Mica**: STR 2, DEX 5, INT 4, CHA 1
*   **Damien**: STR 4, DEX 2, INT 3, CHA 3
*   **Luke**: STR 4, DEX 1, INT 2, CHA 5

# Characters
A character is the avatar of a Runner. Characters are fairly simple, as each character is essentially 4 numbers (their stats) and an inventory. There are no classes, feats, etc.

## Stats
There are 4 main stats for runners. These can have values from 1 - 6:

*   Dexterity is how fast you can run, how flexible you are, and how nimble your fingers are. In-game, it's used to calculate your speed, and helps to determine your initiative.
*   Strength is how hearty you are, and how tough your bones and muscles are. In-game, it is used to calculate your HP and to lift heavy things.
*   Intelligence is how well you can remember things or read a physical situation. In-game, it is mostly used for checks made to physically operate devices, find things, and see if people are lying or not.
*   Charisma is your people skills; how well you can lie, convince, or otherwise manipulate people. In-game, it's used to trick or convince people.

There are also some derived stats:

*   _HP_ or Hit Points is the amount of attacks you can take without dying. Once you take an attack at 0 HP, you die. Your base HP (the amount you have at the start of a mission) is your Strength plus 3.
*   _Speed_ is how far you can move per second. It is your dexterity divided by 2, plus 3. (DEX / 2) + 3
*   _Initiative_ is created at the beginning of each mission, and determines turn order. Anyone outside the mission area (usually Hackers) doesn't roll initiative until they enter it. Upon entering the mission area, roll 2d6 and add your Dexterity; this is your initiative. Players (and enemies) with a higher initiative go first, then the next highest, and so on until the lowest initiative. Then, start over from the top.

## Creating a Character
To create a character, distribute 12 "points" among your stats however you like. Alternatively, you can think of this as making your stats whatever you want as long as they add up to 12. You can't make a stat above 6 or below 1 using this method (nice try, min-maxers).

# Making Checks
In order to try to do something you may or may not succeed doing, make a check. For example, you might make a check to remember a cipher, but not to remember your name (too easy) or remember the exact text of a page you saw last week (too hard).

To make a check, the GM will tell you the **relevant stat** and think of a **difficulty score** (DC), which they keep secret. Roll 3d6, add your value for that stat, and tell the GM. If the result of your roll is greater than or equal to the difficulty score, it succeeds; otherwise, it fails.

You may always choose to purposely fail a check.

Sometimes, you may want to make a check only to use the result later (like for sneaking). If you do, roll 3d6 as normal and keep the number recorded somewhere for later use.

Example:

> Mica wants to try and pick a lock. The GM tells Mica to roll for Dexterity. As this is a fairly old lock, the GM secretly sets the DC to an easy 12. Mica rolls 3d6 and gets 2, 5, and 3. She adds her DEX score of 4 to her rolls to get 14, which she tells the GM. As this is above the DC, she successfully unlocks the door.

## Passive Checks

When you aren't actively trying to do something, but still would make a check, make a _passive check_ instead. For example, if you aren't actively looking for someone who is sneaking past you, make a passive check.

Passive checks don't require any die rolls. Instead, add your score for the relavent stat to 10 and use that.

Example:

> Mica unknowingly walks into a hallway equipped with a noise-sensitive alarm (DC 15). The DM tells her to make a passive Dexterity check, as she wasn't actively trying to be quiet. She adds 10 to her DEX score of 4 to get 14. This fails to beat the check, and the alarm goes off.

# Structure of a Mission

Once the team of Runners gets inside a building, the mission starts and the clock starts ticking. Everyone rolls 3d6 and adds their Dexterity to get Initiative. This determines the permanent turn order as long as the mission is going on (highest first).

Example:

> Mica, Damien, and Luke are about to start a mission. They each roll 3d6 and add their DEX scores:
> 
> *   Mica rolls 2, 1, 3. She adds her DEX of 5 to get 11.
> *   Damien rolls 6, 3, 5. He adds his DEX of 2 to get 16.
> *   Luke rolls 6, 2, 2. He adds his DEX of 1 to get 11. As Mica and Luke rolled the same number, they have to decide who goes first. After a heated round of rock-paper-scissors Luke is declared winner and goes ahead of Mica.
> 
> Unbeknownst to the players, there are also 2 security guards in the building. The DM assigns them Initiatives of 10 and 15.
> 
> The final turn order is:
> 
> *   Damien (16)
> *   Guard #2 (15)
> *   Luke (11)
> *   Mica (11)
> *   Guard #1 (10)
> 
> The DM writes this all down and _does not tell the players about the two other guards._

## Turns

**A turn may only take up to 30 real-life seconds** and represents 3 in-game seconds. Each action requires a certain number of seconds. A Runner may take any number of actions on their turn as long as they don't spend too many seconds. You may waste unused seconds if you want; you don't get them back later.

Some actions are so-called "free actions." These don't require any seconds, and may be done at any time, _even during other people's turns._

If you want to do something on someone else's turn, you can _ready an action_. Tell the DM what action you plan to take, and the conditions for it happening. You spend the seconds now, and if that condition happens before your next turn, you take the action. (If the condition never happens, you don't get the seconds back.)

Example:

> Damien is standing down the hall from a fire alarm. He spends 2 seconds to quietly walk to the alarm, and tells the GM that if a guard turns the corner into the hall, he will trigger the alarm. The GM decides that will take one second, which Damien spends. His turn is over. After Mica's turn, a guard does turn the corner. Damien pulls the fire alarm, which distracts the guard. Damien is now free to run away, as it's his turn again.

## List of Common Actions

You may ask the GM to take another action that's not listed here. Whether you can take that action or not is at the discretion of the GM, of course. However, because the game is timed the GM shouldn't outright say "no" without a good reason. If the GM does agree to the action, they'll tell you how many seconds it will take.

Here are some common actions:

### Move
It takes **1 second** to run a number of squares equal to your Speed.

### Sneaking
You usually don't want to be seen while on a mission (unless that's part of your strategy). So, you need to sneak around.

You may not start sneaking unless no one hostile is aware of your location. To start sneaking takes **3 seconds**. When you start sneaking, make a DEX check and record the number. Until you stop sneaking (a free action), the DC of each INT check made to find you is whatever the result of your DEX check was. If they make the check, they see you and you immediately stop being hidden (to everyone).

While sneaking, it takes **2 seconds** to take a Move action instead of 1.

### Making a Check
To make a generic check (ie, unlock a door, search a trash can) takes **2 seconds**. This is not the only time you make a check: for example, a guard might ask you a question on her turn, in which case you might make a Charisma check on her turn.

Alternatively, you can spend **3 seconds** and take +5 on a check, or only spend **1 second** but get -5 on the check.

# Conditions
Sometimes, the location you're in might make it easier or harder to do certain things. Here are some common conditions and their effects.

## Darkness
When it's dark, you have disadvantage on any checks that require sight. However, you can always try to hide when it's dark.
const Discord = require('discord.js');
const SnakeGame = require('./snake-game');
const HangmanGame = require('./hangman-game');
const MinesweeperGame = require('./minesweeper');
const Connect4 = require('./connect4');
const express = require('express');

const client = new Discord.Client(["MANAGE_MESSAGES"]);

const snakeGame = new SnakeGame(client);
const hangman = new HangmanGame(client);
const minesweeper = new MinesweeperGame(client);
const connect4 = new Connect4(client);

client.on('ready', () => {
    console.log('Logged in as ${client.user.tag}!');
});

client.on('message', msg => {
    if (msg.content === '!nsnake') {
        snakeGame.newGame(msg);
    }
    else if (msg.content === '!nhangman') {
        hangman.newGame(msg);
    }
    else if (msg.content === '!nconnect4') {
        connect4.newGame(msg);
    }
    else if (msg.content.toLowerCase() === '!nminesweeper') {
        minesweeper.newGame(msg);
    } 
    else if (msg.content.toLowerCase() === '!nhelp') {
        const embed = new Discord.MessageEmbed()
            .setColor('#fc2eff')
            .setTitle('Help - Commands')
            .setDescription("!nsnake - Play Snake\n!nhangman - Play Hangman\n!nconnect4 - Play Connect4\n!nminesweeper - Play Minesweeper")
            .setTimestamp();
        msg.channel.send(embed);
    }
});

client.login(process.env.BOT_TOKEN);

const app = express()
const port = 3030

app.get('/', (req, res) => {
    res.send('<script>window.close();</script>');
    if (req.query.col && req.query.row) {
        minesweeper.makeMove(parseInt(req.query.col), parseInt(req.query.row));
    }
})

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
})

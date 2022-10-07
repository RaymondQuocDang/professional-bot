module.exports = {
    name: 'messageCreate',
    execute(msg) {
        if (msg.author.bot === true) return;
        if (msg.content !== 'hi') return;
        msg.reply('hello');
    }
};
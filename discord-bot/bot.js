// Import the discord.js library
const Discord = require('discord.js');
// Create a new Discord client
const client = new Discord.Client();

// Load environment variables from .env
require('dotenv').config();
// Get the Discord bot token from the environment variables
const token = process.env.DISCORD_TOKEN;

// Event listener for when the bot is ready
client.once('ready', () => {
  console.log('Bot is ready!');
});

// Event listener for when a message is received
client.on('message', (message) => {
  // Ignore messages from the bot itself
  if (message.author.bot) return;

  // Check if the message starts with a specific command prefix (e.g., !calculate)
  if (message.content.startsWith('!calculate')) {
    // Extract the mathematical expression from the message
    const expression = message.content.slice('!calculate'.length).trim();

    try {
      // Use a custom math function to evaluate expressions
      const result = calculate(expression);

      // Send the result back to the Discord channel
      message.channel.send(`Result: ${result}`);
    } catch (error) {
      // Handle errors, such as invalid expressions
      message.channel.send('Invalid expression. Please provide a valid mathematical expression.');
    }
  }
});

// Custom function to handle mathematical calculations
function calculate(expression) {
  // Define supported functions and constants
  const supportedFunctions = ['log', 'exp', 'sin', 'cos', 'tan', 'cot'];
  // Replace supported functions with JavaScript Math functions
  supportedFunctions.forEach((func) => {
    expression = expression.replace(new RegExp(func, 'g'), `Math.${func}`);
  });

  // Evaluate the expression using eval
  const result = eval(expression);

  return result;
}

// Log in to Discord with your app's token
client.login(token);

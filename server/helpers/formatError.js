
const formatError = ( message ) => {
    const values = message.split(':');
    const field = values[1].split('.');

    const final = field[1].replace('_', ' ');

    return `This field (${final}) is being used by someone else`;
}

module.exports = formatError;
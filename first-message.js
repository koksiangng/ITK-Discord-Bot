//Code from https://www.youtube.com/watch?v=bJwPYCy17G4

/*
const addReactions = (message, reactions) => {
    message.react(reactions[0])
    reactions.shift()
    if(reactions.length > 0){
        setTimeout(() => addReactions(message, reactions), 750)
    }

}

module.exports = async(client, id, text, reactions = []) => {
    const channel = await client.channels.fetch(id)

    channel.messages.fetch().then((messages) => {
        if(messages.size === 0){
            //Send a new message
            channel.send(text).then((messages) => {
                //addReactions
            })
        }
    }) 
}*/
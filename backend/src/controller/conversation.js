const { responseBuilder } = require('../helper/response')
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const path = require('path');
const websocket = require('../config/websocket');

const textToAudioFile = async(text, outputID) => {
    const client = new textToSpeech.TextToSpeechClient({
        keyFilename: path.join(__dirname, '../..', process.env.GOOGLE_APPLICATION_CREDENTIALS),
        projectId: process.env.GOOGLE_APPLICATION_PROJECT_ID
    });
    
    // cypheria@keen-vigil-430717-h7.iam.gserviceaccount.com

    const request = {
        input: {text: text},
        voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
        audioConfig: {audioEncoding: 'MP3'}
    }

    const [response] = await client.synthesizeSpeech(request);

    let folder = 'public';
    let filePath = `/sound/${outputID}.mp3`

    const writeFile = util.promisify(fs.writeFile)
    await writeFile(folder + filePath, response.audioContent, 'binary');

    return filePath
}

module.exports = {
    start: async(req, res) => {
        try {
            let driverID = req.params.driver_id;
            // let passengerID = req.params.passenger_id;
            // let chosenTopic = req.params.chosen_topic;

            let topics = `Welcome to our Information Desk!

            Thank you for calling our service. We are here to provide you with all the information you need. To help us assist you better, please listen carefully to the following options:

            Press 1 for Customer Support. If you have any issues with our products or services, our support team is ready to help.

            Press 2 for Product Information. For details on our latest products, specifications, or availability, please select this option.

            Press 3 for Billing and Account Inquiries. If you have questions about your account, billing statements, or payments, press 3.

            Press 4 for Technical Support. For assistance with technical issues or troubleshooting, our experts are here to assist you.

            Press 0 to speak with an operator. If you need further assistance or wish to speak with a representative directly, press 0.

            For more information or to return to the main menu at any time, just press the star key (*).

            Thank you for choosing our service. We look forward to assisting you!`

            let speechFile = await textToAudioFile(topics, driverID)

            let sent = await websocket.sendMessageToDriver(speechFile, driverID)

            let response = responseBuilder('success', {file: speechFile})

            return res.status(200).json(response)
        } catch (err) {
            console.log(err);
            let response = responseBuilder('error', {}, err);
            return res.status(500).json(response);
        }
    },
    textToSpeechTest: async(req, res) => {
        try {
            const client = new textToSpeech.TextToSpeechClient({
                keyFilename: path.join(__dirname, '../..', 'windy-album-430717-i7-b42407d97313.json'),
                projectId: 'windy-album-430717-i7'
            });
            
            const text = req.body.text;
            // cypheria@keen-vigil-430717-h7.iam.gserviceaccount.com
    
            const request = {
                input: {text: text},
                voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
                audioConfig: {audioEncoding: 'MP3'}
            }
    
            const [response] = await client.synthesizeSpeech(request);
    
            const writeFile = util.promisify(fs.writeFile)
            await writeFile('public/sound/output.mp3', response.audioContent, 'binary');
            console.log('Audio output written to file: oubbb')


            // const openai = new OpenAI();

            // const speechFile = path.resolve(path.join(__dirname, '../..', "public/sound/output.mp3"));

            // const mp3 = await openai.audio.speech.create({
            //     model: "tts-1",
            //     voice: "alloy",
            //     input: "Today is a wonderful day to build something people love!",
            //   });
            //   console.log(speechFile);
            //   const buffer = Buffer.from(await mp3.arrayBuffer());
            //   await fs.promises.writeFile(speechFile, buffer);

            return res.status(200).json({message: 'public/sound/output.mp3'})
        } catch (err) {
            console.log(err);
            return res.status(500).json({message: err.message})
        }
    }
}
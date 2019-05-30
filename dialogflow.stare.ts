// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const functions = require('firebase-functions');
const { google } = require('googleapis');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  function dzien(agent) {
    const currentDate = new Date();
    const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    const odp = 'Dzisiaj jest : ' + days[currentDate.getDay()] + '. ';
    agent.add(odp);
  }
  function godzina(agent) {
    const currentDate = new Date();
    const godzinaJest = currentDate.getHours() + 1;
    const minutJest = currentDate.getMinutes();
    const odp = 'Jest godzina ' + godzinaJest + ' : ' + minutJest;
    agent.add(odp);
  }

  function ula(agent) {
    const odp = 'Panowie weźcie się do roboty';
    agent.add(odp);
  }
  function zlecenie(agent) {
    const odp = 'Podaj Auft-rag ciulu!';
    console.log(agent);
    agent.add(odp);
  }
  function waga(agent) {
    const odp = '3 tony cztery metry waży 2.06 kilograma';
    agent.add(odp);
  }
  function czasowka(agent) {
    const odp = 'Do wyrobienia normy brakuje ci 130 minut, czyli dwie godziny i 10 minut';
    agent.add(odp);
  }
  function robert(agent) {
    const odp = 'Robertowi włączył się szwędacz, wiec się kajś po zakładzie szwęda';
    agent.add(odp);
  }

  function dlugoscZakladki(agent) {
    const odp = 'powinna wynosic 30cm';
    agent.add(odp);
  }

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('dzien', dzien);
  intentMap.set('godzina', godzina);
  intentMap.set('ula', ula);
  intentMap.set('zlecenie', zlecenie);
  intentMap.set('waga3t4m', waga);
  intentMap.set('czasowka', czasowka);
  intentMap.set('robert', robert);
  intentMap.set('dlugoscZakladki', dlugoscZakladki);

  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});

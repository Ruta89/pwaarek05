// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const functions = require('firebase-functions');
const { google } = require('googleapis');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion, Payload } = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function welcome(agent) {
    agent.add(`Co mogę dla ciebie zrobić? Mogę: podać licznik, wagę, długość zakładki itp.!`);
  }

  function fallback(agent) {
    agent.add(`Nie zrozumiałem ciebie.`);
    agent.add(`Przepraszam, możesz powtórzyć?`);
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
    const odp = 'Podaj  z  lecenie!';
    console.log(agent);
    agent.add(odp);
  }

  function waga(agent) {
    const tonaz = agent.parameters.tonaz;
    const dlugosc = agent.parameters.dlugosc;
    let szp;
    let result;
    let wynikWaga;
    let licznikMetr;
    if (tonaz === 0.5) {
      licznikMetr = 20;
      szp = 1;
    }
    if (tonaz === 1) {
      licznikMetr = 22;
      szp = 1;
    }
    if (tonaz === 1.5) {
      licznikMetr = 17;
      szp = 1;
    }
    if (tonaz === 2) {
      licznikMetr = 22;
      szp = 2;
    }
    if (tonaz === 3) {
      licznikMetr = 22;
      szp = 3;
    }
    if (tonaz === 4) {
      licznikMetr = 22;
      szp = 2;
    }
    if (tonaz === 5) {
      licznikMetr = 20;
      szp = 3;
    }
    if (tonaz === 6) {
      licznikMetr = 20;
      szp = 4;
    }
    if (tonaz === 8) {
      licznikMetr = 20;
      szp = 5;
    }
    if (tonaz === 10) {
      licznikMetr = 24;
      szp = 6;
    }
    if (tonaz === 12) {
      licznikMetr = 28;
      szp = 6;
    }
    if (tonaz === 15) {
      licznikMetr = 36;
      szp = 6;
    }
    if (tonaz === 20) {
      licznikMetr = 26;
      szp = 12;
    }
    if (tonaz === 25) {
      licznikMetr = 32;
      szp = 12;
    }
    if (tonaz === 30) {
      licznikMetr = 38;
      szp = 12;
    }
    if (tonaz === 35) {
      licznikMetr = 44;
    }
    if (tonaz === 40) {
      licznikMetr = 50;
      szp = 12;
    }
    if (tonaz === 45) {
      licznikMetr = 54;
      szp = 12;
    }
    if (tonaz === 50) {
      licznikMetr = 64;
      szp = 12;
    }
    if (tonaz === 100) {
      licznikMetr = 126;
      szp = 12;
    }
    if (tonaz === 200) {
      licznikMetr = 252;
      szp = 12;
    }
    if (tonaz === 300) {
      licznikMetr = 384;
      szp = 12;
    }

    let nawinieto = licznikMetr * dlugosc + (dlugosc * 2 + 5);
    let zuzyto = nawinieto * szp;
    if (tonaz < 4) {
      let odp =
        'nawinięto ' +
        nawinieto +
        ' metrów ciękich nici, razem zużyto: ' +
        zuzyto +
        ' metrów, o wadze: ' +
        zuzyto * 0.0066 +
        ' kilogramów.';

      let wynikWaga = zuzyto * 0.0066;
      agent.add('Zużyto: ' + wynikWaga + ' kilogramów cieńkich nici.');
      agent.add(odp);
    } else if (tonaz > 3) {
      let odp =
        'Nawinięto ' +
        nawinieto +
        ' metrów grubych nici, zużyto: ' +
        zuzyto +
        ' metrów o wadze: ' +
        zuzyto * 0.0132 +
        ' kilogramów';
      let wynikWaga = zuzyto * 0.0132;
      agent.add(` ${tonaz} ton ${dlugosc} metrów waży ${wynikWaga} kilogramów.`);
      agent.add(odp);
    } else {
      agent.add('czy to blad czy to blad');
    }

    //  agent.add('waga - waga');
  }

  function czasowka(agent) {
    const odp = 'Do wyrobienia normy brakuje ci 130 minut, czyli dwie godziny i 10 minut';
    agent.add(odp);
  }

  function dlugoscZakladki(agent) {
    let tonaz = agent.parameters.tonaz;
    console.log(`User requested   ${tonaz}  wlll   `);
    let convertedTemp;
    // Sent the context to store the parameter information
    // and make sure the followup Rankine
    agent.setContext({
      name: 'tonaz',
      lifespan: 0,
      parameters: {
        tonaz: tonaz
      }
    });
    if (tonaz === 1) {
      let convertedTemp = 30;
      agent.add(`${tonaz} ton ma ${convertedTemp} centymetrów zakładki.`);
    } else if (tonaz === 2) {
      let convertedTemp = 30;
      agent.add(`${tonaz} ton ma ${convertedTemp} centymetrów zakładki.`);
    } else if (tonaz === 3) {
      let convertedTemp = 30;
      agent.add(`${tonaz} ton ma ${convertedTemp} centymetrów zakładki.`);
    } else if (tonaz === 4) {
      let convertedTemp = 40;
      agent.add(`${tonaz} ton ma ${convertedTemp} centymetrów zakładki.`);
    } else if (tonaz === 5) {
      let convertedTemp = 50;
      agent.add(`${tonaz} ton ma ${convertedTemp} centymetrów zakładki.`);
    } else if (tonaz === 6) {
      let convertedTemp = 60;
      agent.add(`${tonaz} ton ma ${convertedTemp} centymetrów zakładki.`);
    } else if (tonaz === 8) {
      let convertedTemp = 60;
      agent.add(`${tonaz} ton ma    ${convertedTemp} centymetrów zakładki. `);
    } else if (agent.parameters.tonaz === 10) {
      let convertedTemp = 60;
      agent.add(`${tonaz} ton ma    ${convertedTemp} centymetrów zakładki.  `);
    } else {
      let convertedTemp = 100;
      agent.add(`${tonaz} ton ma    ${convertedTemp} centymetrów zakładki.  `);
      agent.add(`${tonaz}° is  ${convertedTemp} cm tow10. `);
    }
  }

  function ileSzpul(agent) {
    let tonaz = agent.parameters.tonaz;
    switch (tonaz) {
      case 1:
        agent.add(` Potrzebujesz 1 szpule na ${tonaz}.`);

        break;
      case 2:
        agent.add(` Potrzebujesz 2 szpul na ${tonaz}.`);
        break;
      case 3:
        agent.add(` Potrzebujesz 3 szpul na  ${tonaz}. 66000`);

        break;
      case 4:
        agent.add(` Potrzebujesz  2 szpule 132 na ${tonaz}.`);

        break;
      case 5:
        agent.add(` Potrzebujesz  3 grube  szpule 132 na ${tonaz}.`);
        break;
      case 6:
        agent.add(` Potrzebujesz  4  grube szpule   na ${tonaz}.`);

        break;
      case 8:
        agent.add(` Potrzebujesz  5  grube szpule   na ${tonaz}.`);

        break;
      case 10:
        agent.add(` Potrzebujesz  6 grube szpule   na ${tonaz}.`);

        break;
      case 15:
        agent.add(` Potrzebujesz  12 grube szpule   na ${tonaz}.`);
        break;
      case 20:
        agent.add(` Potrzebujesz  12 grube szpule   na ${tonaz}.`);
        break;
      case 25:
        agent.add(` Potrzebujesz  12 grube szpule   na ${tonaz}.`);
        break;
      case 30:
        agent.add(` Potrzebujesz  12 grube szpule   na ${tonaz}.`);
        break;
      case 35:
        agent.add(` Potrzebujesz  12 grube szpule   na ${tonaz}.`);
        break;
      case 40:
        agent.add(` Potrzebujesz  12 grube szpule   na ${tonaz}.`);
        break;
      case 45:
        agent.add(` Potrzebujesz  12 grube szpule   na ${tonaz}.`);
        break;
      case 50:
        agent.add(` Potrzebujesz  12 grube szpule   na ${tonaz}.`);
        break;
      case 60:
        agent.add(` Potrzebujesz  12 grube szpule   na ${tonaz}.`);
        break;
      case 200:
        agent.add(` Potrzebujesz  12 grube szpule   na ${tonaz}.`);
        break;
      case 100:
        agent.add(` Potrzebujesz  12 grube szpule   na ${tonaz}.`);
        break;

      default:
        return agent.add(` Potrzebujesz napewno jakies szpule.`);
    }
  }

  function ustawLicznik(agent) {
    let tonaz = agent.parameters.tonaz;
    let dlugosc = agent.parameters.dlugosc;

    let licznikMetr = 0;
    let licznikRezultat = 0;
    if (tonaz === 0.5) {
      licznikMetr = 20;
    }
    if (tonaz === 1) {
      licznikMetr = 22;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(`Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 1.5) {
      licznikMetr = 17;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(`Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz <= 4) {
      licznikMetr = 22;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(`Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz > 4 && tonaz < 10) {
      licznikMetr = 20;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(`Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 10) {
      licznikMetr = 24;
      agent.add(24 * dlugosc);
    }
    if (tonaz === 12) {
      licznikMetr = 28;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(`Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 15) {
      licznikMetr = 36;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(`Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 20) {
      licznikMetr = 26;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(`Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 25) {
      licznikMetr = 32;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(`Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 30) {
      licznikMetr = 38;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(`Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 35) {
      licznikMetr = 44;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(`Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 40) {
      licznikMetr = 50;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(`Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 45) {
      licznikMetr = 54;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(`Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 50) {
      licznikMetr = 64;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(`Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 100) {
      licznikMetr = 126;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(`Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 200) {
      licznikMetr = 252;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(`Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 300) {
      licznikMetr = 384;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(`Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    licznikRezultat = licznikMetr * dlugosc;
    agent.add(`Ustaw licznik na:bladczyBlad ${licznikRezultat} metrów.`);
    //agent.add(
    //  `Ustaw licznik na ${licznikRezultat}  metrów.(  ${tonaz} ton, ${dlugosc} metrow. )`
    // );
    return licznikRezultat;
  }

  function ustawIleSzpulF(wll) {
    switch (wll) {
      case 1:
        return 1;
      case 2:
        return 2;

      case 3:
        return 3;
      case 4:
        return 2;
      case 5:
        return 3;
      case 6:
        return 4;
      case 8:
        return 5;
      case 10:
        return 6;
      case 15:
        return 6;
      case 20:
        return 12;
      case 25:
        return 12;

      default:
        return 12;
    }
  }

  function ustawLicznikF(wll, l1) {
    let licznikMetr = 0;
    if (wll === 0.5) {
      licznikMetr = 20;
    }
    if (wll === 1) {
      licznikMetr = 22;
    }
    if (wll === 1.5) {
      licznikMetr = 17;
    }
    if (wll <= 4) {
      licznikMetr = 22;
    }
    if (wll > 4 && wll < 10) {
      licznikMetr = 20;
    }
    if (wll === 10) {
      licznikMetr = 24;
    }
    if (wll === 12) {
      licznikMetr = 28;
    }
    if (wll === 15) {
      licznikMetr = 36;
    }
    if (wll === 20) {
      licznikMetr = 26;
    }
    if (wll === 25) {
      licznikMetr = 32;
    }
    if (wll === 30) {
      licznikMetr = 38;
    }
    if (wll === 35) {
      licznikMetr = 44;
    }
    if (wll === 40) {
      licznikMetr = 50;
    }
    if (wll === 45) {
      licznikMetr = 54;
    }
    if (wll === 50) {
      licznikMetr = 64;
    }
    if (wll === 100) {
      licznikMetr = 126;
    }
    if (wll === 200) {
      licznikMetr = 252;
    }
    if (wll === 300) {
      licznikMetr = 384;
    }
    return licznikMetr * l1;
  }

  function ustawWageF(wll, dl) {
    let szpule = ustawIleSzpulF(wll);
    let licznik = ustawLicznikF(wll, dl);
    const nawinieto = licznik + (dl * 2 + 5);
    const zuzyto = (licznik + (dl * 2 + 5)) * szpule;
    if (wll < 4) {
      console.log(
        'nawinieto [66.000] ' + nawinieto + ' metrów, zuzyto: ' + zuzyto + ' metrów o wadze: ' + zuzyto * 0.0066
      );
      return zuzyto * 0.0066;
    } else if (wll > 3) {
      console.log(
        'nawinieto [132.000] ' + nawinieto + ' metrów, zuzyto: ' + zuzyto + ' metrów o wadze: ' + zuzyto * 0.0132
      );
      return zuzyto * 0.0132;
    } else {
      console.log('[service] Blad: ' + 0);
      return 0;
    }
  }
  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  function yourFunctionHandler(agent) {
    agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
    agent.add(
      new Card({
        title: `Title: this is a card title`,
        imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
        text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
        buttonText: 'This is a button',
        buttonUrl: 'https://assistant.google.com/'
      })
    );
    agent.add(new Suggestion(`Quick Reply`));
    agent.add(new Suggestion(`Suggestion`));
    agent.setContext({
      name: 'weather',
      lifespan: 2,
      parameters: {
        city: 'Rome'
      }
    });
  }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // below to get this function to be run when a Dialogflow intent is matched
  function googleAssistantHandler(agent) {
    let conv = agent.conv(); // Get Actions on Google library conv instance
    conv.ask('Hello from the Actions on Google client library!'); // Use Actions on Google library
    agent.add(conv); // Add Actions on Google library responses to your agent's response
  }
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
  intentMap.set('waga', waga);
  intentMap.set('czasowka', czasowka);
  intentMap.set('dlugoscZakladki', dlugoscZakladki);
  intentMap.set('ileSzpul', ileSzpul);
  intentMap.set('ustawLicznik', ustawLicznik);
  // intentMap.set('your intent name here', yourFunctionHandler);
  intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});

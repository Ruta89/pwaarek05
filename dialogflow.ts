'use strict';

const functions = require('firebase-functions');
const { google } = require('googleapis');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion, Payload } = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({
    request: request,
    response: response
  });

  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function welcome(agent) {
    agent.add(`Co mogę dla ciebie zrobić? Mogę: podać licznik, wagę, długość zakładki itp.!`);
  }

  function nara(agent) {
    let close = agent.close();
    close.ask('Do usłyszenia.'); // Use Actions on Google library
    agent.add(close); // Add Actions on Google library responses to your agent's response
  }

  function odporne(agent) {
    agent.add(`Odporne są na działanie: wilgoci, olejów, kwasów mineralnych, chłodziw i oparów benzyn`);
  }
  function zw(agent) {
    agent.add(`Zawiesia wężowe to elastyczne zawiesie bezkońcowe składające się z nośnego rdzenia z przędzy, całkowicie zamkniętego w tkanej powłoce – z osprzętem lub bez.
Rdzeń nośny jest wielokrotnie zwijaną przędzą – włókno poliestrowe, poliamidowe lub polipropylenowe. Tkana powłoka to w zależności od typu zawiesia impregnowany rękaw ochronny chroniący przędzę przed uszkodzeniem w odpowiadającym tonażowi kolorze, posiada trwałe oznakowania 
jak np. czarny nadruk określający limit nośności prostej oraz czarne treski – każda kreska oznacza jedną tonę nośności zawiesia. 
`);
  }
  function fallback(agent) {
    agent.add(`Nie zrozumiałem ciebie.`);
    agent.add(`Przepraszam, możesz powtórzyć ? `);
  }

  function dzien(agent) {
    const currentDate = new Date();
    const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    const odp = 'Dzisiaj jest : ' + days[currentDate.getDay()] + '. ';
    agent.add(odp);
  }

  function godzina(agent) {
    const currentDate = new Date();
    const godzinaJest = currentDate.getHours() + 2;
    const minutJest = currentDate.getMinutes();
    const odp = 'Jest godzina ' + godzinaJest + ' : ' + minutJest;
    agent.add(odp);
  }

  function ula(agent) {
    const odp = 'Panowie weźcie się do roboty!';
    agent.add(odp);
  }

  function zlecenie(agent) {
    const odp = 'Podaj  zlecenie!';
    console.log(agent);
    agent.add(odp);
  }

  function waga(agent) {
    const tonaz = Number(agent.parameters.tonaz);
    const dlugosc = Number(agent.parameters.dlugosc);

    if (!tonaz) {
      agent.add(`tonaz: nie udało się.`);
    }
    if (!dlugosc) {
      agent.add(`dlugosc: nie udało się.`);
    }
    let szp;
    let result;
    let wynikWaga;
    let licznikMetr;
    if (tonaz && dlugosc) {
      // agent.add(`tonaz: ${tonaz} wll, l1: ${dlugosc}`);

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
        let wynikWaga = +(zuzyto * 0.0066).toFixed(2);
        let odp2 = ` OK. ${tonaz.toString()} ton ${dlugosc} metrów waży ${wynikWaga} kilogramów.`;
        agent.add(odp2);

        let odp =
          'Nawinięto ' +
          +nawinieto.toFixed(2) +
          ' metrów,   zużyto: ' +
          +zuzyto.toFixed(2) +
          ' ciękich nici, o wadze: ' +
          wynikWaga +
          ' kilogramów.';

        agent.add(odp);
      } else if (tonaz > 3) {
        let wynikWaga = +(zuzyto * 0.0132).toFixed(2);
        let odp2 = ` OK. ${tonaz.toString()} ton ${dlugosc} metrów waży ${wynikWaga} kilogramów.`;
        agent.add(odp2);

        let odp =
          'Nawinięto ' +
          +nawinieto.toFixed(2) +
          ' metrów,   zużyto: ' +
          +zuzyto.toFixed(2) +
          ' grubych nici o wadze: ' +
          +(zuzyto * 0.0132).toFixed(2) +
          ' kilogramów.';
        agent.add(odp);
      } else {
        agent.add('czy to blad czy to blad');
      }
      // agent.add(`Powiedz ile sztuk to szybko przeliczę`);
    }
  }

  function czasowka(agent) {
    const odp = 'Do wyrobienia normy brakuje ci 130 minut, czyli dwie godziny i 10 minut';
    agent.add(odp);
  }

  function dlugoscZakladki(agent) {
    let tonaz = agent.parameters.tonaz;
    console.log(`User requested   ${tonaz}  wlll`);
    let convertedTemp;
    // Sent the context to store the parameter information
    // and make sure the followup Rankine
    agent.setContext({
      name: 'tonaz',
      lifespan: 5,
      parameters: {
        tonaz: tonaz
      }
    });
    if (tonaz === 1) {
      let convertedTemp = 30;
      agent.add(`${tonaz} ton ma ${convertedTemp} centymetrów zakładki.`);
    }
    if (tonaz === 2) {
      let convertedTemp = 30;
      agent.add(`${tonaz} ton ma ${convertedTemp} centymetrów zakładki.`);
    }
    if (tonaz === 3) {
      let convertedTemp = 30;
      agent.add(`${tonaz} ton ma ${convertedTemp} centymetrów zakładki.`);
    }
    if (tonaz === 4) {
      let convertedTemp = 40;
      agent.add(`${tonaz} ton ma ${convertedTemp} centymetrów zakładki.`);
    }
    if (tonaz === 5) {
      let convertedTemp = 50;
      agent.add(`${tonaz} ton ma ${convertedTemp} centymetrów zakładki.`);
    }
    if (tonaz === 6) {
      let convertedTemp = 60;
      agent.add(`${tonaz} ton ma ${convertedTemp} centymetrów zakładki.`);
    }
    if (tonaz === 8) {
      let convertedTemp = 60;
      agent.add(`${tonaz} ton ma    ${convertedTemp} centymetrów zakładki. `);
    }
    if (agent.parameters.tonaz === 10) {
      let convertedTemp = 60;
      agent.add(`${tonaz} ton ma    ${convertedTemp} centymetrów zakładki.  `);
    } else {
      let convertedTemp = 100;
      agent.add(`${tonaz} ton ma    ${convertedTemp} centymetrów zakładki.  `);
    }
  }

  function ileSzpul(agent) {
    let tonaz = agent.parameters.tonaz;
    switch (tonaz) {
      case 1:
        agent.add(` Potrzebujesz 1 szpule cieńkich nici na ${tonaz}.`);

        break;
      case 2:
        agent.add(` Potrzebujesz 2  szpule cieńkich nici na ${tonaz}.`);
        break;
      case 3:
        agent.add(` Potrzebujesz 3  szpule cieńkich nici na  ${tonaz}.  `);

        break;
      case 4:
        agent.add(` Potrzebujesz  2 szpule grubych nici na ${tonaz}.`);

        break;
      case 5:
        agent.add(` Potrzebujesz  3 szpule grubych nici na ${tonaz}.`);
        break;
      case 6:
        agent.add(` Potrzebujesz  4 szpul grubych nici   na ${tonaz}.`);

        break;
      case 8:
        agent.add(` Potrzebujesz  5 szpul grubych nici   na ${tonaz}.`);

        break;
      case 10:
        agent.add(` Potrzebujesz  6 szpul grubych nici   na ${tonaz}.`);

        break;
      case 15:
        agent.add(` Potrzebujesz  6 szpul grubych nici   na ${tonaz}.`);
        break;
      case 20:
        agent.add(` Potrzebujesz  12 szpul grubych nici   na ${tonaz}.`);
        break;
      case 25:
        agent.add(` Potrzebujesz  12 szpul grubych nici   na ${tonaz}.`);
        break;
      case 30:
        agent.add(` Potrzebujesz  12 szpul grubych nici   na ${tonaz}.`);
        break;
      case 35:
        agent.add(` Potrzebujesz  12 szpul grubych nici   na ${tonaz}.`);
        break;
      case 40:
        agent.add(` Potrzebujesz  12 szpul grubych nici   na ${tonaz}.`);
        break;
      case 45:
        agent.add(` Potrzebujesz  12 szpul grubych nici   na ${tonaz}.`);
        break;
      case 50:
        agent.add(` Potrzebujesz  12 szpul grubych nici   na ${tonaz}.`);
        break;
      case 60:
        agent.add(` Potrzebujesz  12 szpul grubych nici   na ${tonaz}.`);
        break;
      case 200:
        agent.add(` Potrzebujesz  12 szpul grubych nici   na ${tonaz}.`);
        break;
      case 100:
        agent.add(` Potrzebujesz  12 szpul grubych nici   na ${tonaz}.`);
        break;

      default:
        return agent.add(` Potrzebujesz napewno jakies szpule.`);
    }
  }

  function ustawLicznik(agent) {
    let tonaz = Number(agent.parameters.tonaz);
    let dlugosc = Number(agent.parameters.dlugosc);
    if (!tonaz) {
      agent.add(`Podaj tonaż.`);
    }

    if (!dlugosc) {
      agent.add(`Podaj długość.`);
    }

    let licznikMetr = 0;
    let licznikRezultat = 0;
    if (tonaz === 0.5) {
      licznikMetr = 20;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(` ${tonaz} ton, L1: ${dlugosc} m. Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 1) {
      licznikMetr = 22;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(` ${tonaz} ton, L1: ${dlugosc} m. Ustaw licznik na:  ${+licznikRezultat.toFixed(2)} metrów.`);
    }
    if (tonaz === 1.5) {
      licznikMetr = 17;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(` ${tonaz} ton, L1: ${dlugosc} m. Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 2) {
      licznikMetr = 22;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(` ${tonaz} ton, L1: ${dlugosc} m. Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 3) {
      licznikMetr = 22;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(` ${tonaz} ton, L1: ${dlugosc} m. Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 4) {
      licznikMetr = 22;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(` ${tonaz} ton, L1: ${dlugosc} m. Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 5) {
      licznikMetr = 20;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(` ${tonaz} ton, L1: ${dlugosc} m. Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 6) {
      licznikMetr = 20;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(` ${tonaz} ton, L1: ${dlugosc} m. Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 8) {
      licznikMetr = 20;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(` ${tonaz} ton, L1: ${dlugosc} m. Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 10) {
      licznikMetr = 24;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(`${tonaz} ton, L1: ${dlugosc} m. Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 12) {
      licznikMetr = 28;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(` ${tonaz} ton, L1: ${dlugosc} m. Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 15) {
      licznikMetr = 36;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(` ${tonaz} ton, L1: ${dlugosc} m. Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 20) {
      licznikMetr = 26;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(` ${tonaz} ton, L1: ${dlugosc} m. Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 25) {
      licznikMetr = 32;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(` ${tonaz} ton, L1: ${dlugosc} m. Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 30) {
      licznikMetr = 38;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(` ${tonaz} ton, L1: ${dlugosc} m. Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 35) {
      licznikMetr = 44;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(` ${tonaz} ton, L1: ${dlugosc} m. Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 40) {
      licznikMetr = 50;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(` ${tonaz} ton, L1: ${dlugosc} m. Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 45) {
      licznikMetr = 54;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(` ${tonaz} ton, L1: ${dlugosc} m. Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 50) {
      licznikMetr = 64;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(` ${tonaz} ton, L1: ${dlugosc} m. Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 100) {
      licznikMetr = 126;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(` ${tonaz} ton, L1: ${dlugosc} m. Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 200) {
      licznikMetr = 252;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(` ${tonaz} ton, L1: ${dlugosc} m. Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
    if (tonaz === 300) {
      licznikMetr = 384;
      licznikRezultat = licznikMetr * dlugosc;
      agent.add(`${tonaz} ton ${dlugosc} m. Ustaw licznik na: ${licznikRezultat} metrów.`);
    }
  }

  function yourFunctionHandler(agent) {
    agent.add(`Zawiesia to moja pasja!`);
    agent.add(
      new Card({
        title: `Tytuł: To jest tytuł karty.`,
        imageUrl: 'https://muntech24.pl/userdata/gfx/1ca5ef81854d9978213d398a5646abb7.jpg',
        text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
        buttonText: 'This is a button',
        buttonUrl: 'https://dolezych.pl/'
      })
    );
    agent.add(new Suggestion(`Szybka odpowiedź`));
    agent.add(new Suggestion(`Sugestia`));
    agent.setContext({
      name: 'weather',
      lifespan: 2,
      parameters: {
        city: 'Rome'
      }
    });
  }

  function googleAssistantHandler(agent) {
    let conv = agent.conv(); // Get Actions on Google library conv instance
    conv.ask('Witam Cię z biblioteki Actions on Google'); // Use Actions on Google library
    agent.add(conv); // Add Actions on Google library responses to your agent's response
  }

  function pakowanie(agent) {
    const tonaz = agent.parameters.tonaz;
    const dlugosc = agent.parameters.dlugosc;
    if (!tonaz) {
      agent.add(` Nie wiem jaki tonaz pakujesz.`);
    }
    if (!dlugosc) {
      agent.add(` Nie wiem jaka dlugosc pakujesz.`);
    }

    if (tonaz === 1) {
      if (dlugosc === 1) {
        agent.add(` 1 tona 1 metr banderoluj raz, pakuj po 10 sztuk i dwa razy zepnij taśmą. `);
      }

      if (dlugosc === 2) {
        agent.add(` 1 tona 2 metry banderoluj dwa razy, pakuj po 5 sztuk i    raz   taśmą. `);
      }
      if (dlugosc === 3) {
        agent.add(` 1 tona  3 metry spiąć   raz, pakować po 5 sztuk i raz spiać wiązkę. `);
      }
      if (dlugosc === 4) {
        agent.add(` 1 tona 4 metry spiać raz pakować po 5 sztuk i raz taśmą.`);
      }
    } // 1 tona

    if (tonaz === 2) {
      if (dlugosc === 1) {
        agent.add(` 2 tony 1 metr  banderola jeden raz, pakuj  po 10 sztuk i 2 razy  spinaj.`);
      }
      if (dlugosc === 2) {
        agent.add(` 2 tony 2 metry  banderola dwa razy, pakuj po 5 sztuk i raz spinaj.`);
      }
      if (dlugosc === 3) {
        agent.add(` 2 tony 3 metry spiąć dwa razy, pakuj po 5 sztuk i wiązkę zepnij taśmą. `);
      }
      if (dlugosc === 4) {
        agent.add(` 2 tony 4 metry spiąć dwa razy, pakuj po 5 sztuk i wiązkę zepnij taśmą.  `);
      }
      if (dlugosc === 5) {
        agent.add(` 2 tony 5 metrów spiąć dwa razy pakować osobno.`);
      }
    } // 2 tony
    if (tonaz === 3) {
      if (dlugosc === 1) {
        agent.add(` 3 tony 1 metr  banderola jeden raz, pakuj po 10 sztuk i  2 razy spinaj.`);
      }
      if (dlugosc === 2) {
        agent.add(` 3 tony 2 metry  banderola dwa razy, pakuj po 5 sztuk i raz spinaj.`);
      }
      if (dlugosc === 3) {
        agent.add(` ${tonaz} tony ${dlugosc} metry spiąć dwa razy, pakuj po 5 sztuk,  wiązkę zepnij 2 razy taśmą. `);
      }
      if (dlugosc === 4) {
        agent.add(` 3 tony 4 metry spiąć dwa razy, pakuj po 5 sztuk i wiązkę zepnij taśmą dwa razy.  `);
      }
      if (dlugosc === 5) {
        agent.add(` 3 tony 5 metrów spiąć dwa razy pakować osobno.`);
      }
    } // 3 tony

    if (tonaz === 4) {
      if (dlugosc === 1) {
        agent.add(` 4 tony 1 metr spiąć jeden raz, pakować po 5 sztuk wiązkę też spiąć raz`);
      }
      if (dlugosc === 2) {
        agent.add(` 4 tony 2 metry spiąć dwa raz, pakować po 5 sztuk wiązkę spiąć raz`);
      }
      if (dlugosc === 4) {
        agent.add(` 4 tony 4 metry spiąć dwa razy, pakuj po 5 sztuk i wiązkę zepnij taśmą dwa razy.  `);
      }
      if (dlugosc >= 5) {
        agent.add(` 4 tony ${dlugosc} metrów spiąć dwa razy pakować osobno.`);
      }
    } // 4 tony
  }

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
  intentMap.set('nara', nara);
  intentMap.set('handler', googleAssistantHandler);
  intentMap.set('function handler', yourFunctionHandler);
  intentMap.set('pakowanie', pakowanie);
  intentMap.set('odporne', odporne);
  intentMap.set('zawiesia wezowe', zw);
  agent.handleRequest(intentMap);
});

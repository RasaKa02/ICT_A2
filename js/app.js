/* =============================================================
   MijnGezondheid – inclusive prototype for elderly users
   Vanilla JS, no dependencies. Drives: i18n (NL/EN), view router,
   accessibility toggles (persisted), text-to-speech, guided tour.
   ============================================================= */
(function () {
  "use strict";

  /* ---------------- i18n dictionary ---------------- */
  // Values may contain HTML; they are written with innerHTML.
  // No [data-i18n] element may contain another [data-i18n] descendant.
  var I18N = {
    en: {
      "bar.language": "Language", "bar.textsize": "Text size",
      "bar.contrast": "High contrast", "bar.readaloud": "Read aloud",
      "bar.tour": "Step by step instructions", "bar.stopspeak": "Stop reading",
      "bar.notes": "Show change notes",
      "loggedin": "You are logged in as:",
      "banner.offeredby": "Offered by:",
      "login.title": "Sign in", "login.intro": "Enter your name and password to continue.",
      "login.nameLabel": "Your name", "login.passLabel": "Password",
      "login.submit": "Sign in", "login.logout": "Sign out",
      "login.error": "Please enter your name to continue.",
      "guided.helpBtn": "Help Me", "guided.readPageBtn": "Read Page Aloud",
      "guided.moreOpts": "More options", "guided.lessOpts": "Fewer options",
      "idle.title": "Do you need help?",
      "idle.show": "Step by step instructions",
      "idle.read": "Read instructions aloud",
      "idle.continue": "Continue on my own",
      "help.close": "Close",
      "settings.langTitle": "Language",
      "settings.contrastTitle": "Contrast",
      "settings.contrastDesc": "Dark tiles for better readability.",
      "settings.guidedContrast": "Guided view always uses high-contrast tiles.",
      "settings.modeTitle": "Choose your view",
      "settings.modeDesc": "Choose how you would like to use the portal.",
      "settings.currentMode": "Current mode",
      "help.home": "This is your homepage. Choose one of the large buttons to continue. You can make an appointment, request medicines, or ask your GP a question.",
      "help.appt-landing": "Here you can make a new appointment or view your upcoming appointments. Press 'Make an appointment' to start.",
      "help.appt-intro": "Your GP wants you to answer a few questions first. Press the button to start the questions.",
      "help.appt-q": "Answer the question by pressing one of the options. Then press 'Next' to continue.",
      "help.appt-advice": "This is our advice for you. Read it carefully. Then press the button to continue.",
      "help.appt-slots": "Choose a day first, then a time. Then press the big button to confirm your appointment.",
      "help.appt-confirm": "Well done! Your appointment has been made. You can go back to the homepage.",
      "help.meds-home": "Here you can order repeat medication. Press 'Order medicines' to start.",
      "help.meds-what": "Choose which prescription medicines you want to order — you can choose more than one. If your medicine is not listed, or you are not sure, choose one of those options instead. Then press Next.",
      "help.meds-how": "Choose where you want to pick up the medicine. Then press Next.",
      "help.meds-check": "Check your choices. This is only an overview — nothing has been sent yet. If everything is correct, submit the order.",
      "help.meds-confirm": "Your order has been sent. You can see a summary below, and the phone number to call if something is wrong.",
      "help.chat-type": "Choose whether you want to ask the GP or the pharmacy a question, or choose to make an appointment instead.",
      "help.chat-category": "Choose the option that best describes what your question is about. Then press Next.",
      "help.chat-form": "Write your question in the text box. Then press the button to review your question before sending it.",
      "help.chat-review": "Check that everything is correct. Press Edit to change something, or press Confirm and send to send your question.",
      "help.chat-confirm": "Your question has been sent. You can see by which date you will receive an answer.",
      "help.settings": "Here you can choose how you want to use the portal. Choose Standard or Guided view.",
      "chooser.title": "How would you like to use the portal?",
      "chooser.sub": "You can change this later in Settings.",
      "chooser.std.title": "Standard view",
      "chooser.std.f1": "More information on screen", "chooser.std.f2": "Faster navigation",
      "chooser.guided.title": "Guided view",
      "chooser.guided.f1": "Larger text", "chooser.guided.f2": "Bigger buttons",
      "chooser.guided.f3": "Step-by-step assistance", "chooser.guided.f4": "Read-aloud support",

      "home.title": "My health",
      "tile.appt": "Make and view appointments", "tile.medicines": "My medicines",
      "tile.chat": "Ask the GP / pharmacy",
      "tile.file": "My file",
      "tile.paths": "My care paths", "tile.details": "GP / pharmacy details",
      "tile.news": "News", "tile.settings": "Settings",

      "back.home": "Back to home", "back.prev": "Back to previous page",
      "nav.previous": "Previous", "nav.next": "Next",

      "apptLanding.title": "Make and view appointments",
      "apptLanding.make": "Make an appointment",
      "apptLanding.history": "View past appointments",
      "apptLanding.upcoming": "Your upcoming appointments",
      "apptLanding.none": "No upcoming appointments have been found for you.",

      "apptIntro.title": "Preparing for your appointment",
      "apptIntro.lead": "Your GP would like you to answer a few simple questions about your complaint first.",
      "apptIntro.sub": "This helps us give you the right advice, or book the right appointment for you. It takes about 2 minutes.",
      "apptIntro.urgent": "Is it urgent? Always call your GP for urgent questions. Call 112 for life-threatening situations.",
      "apptIntro.start": "Start the questions",
      "apptIntro.prefer": "Prefer to speak to a person? Call the practice:",

      "apptQ.title": "A few questions", "apptQ.hatch": "Is this too much? You can always call the practice instead:",
      "apptQ.provider": "Huisartsenpraktijk Koedijk", "apptQ.sectionLabel": "Questions",
      "apptQ.backLink": "Back to the instruction page",
      "apptQ.complete": "Thank you for answering the questions. Click on the ‘Next’ button for your advice.",
      "apptAdvice.title": "Your personal advice",
      "apptAdvice.notScheduledPrefix": "An appointment has not been scheduled yet. If you would like to schedule one, press the button",
      "apptAdvice.notScheduledSuffix": "below.",
      "apptAdvice.notScheduledUrgent": "An appointment has not been made yet. Please call the practice now using the number below.",

      "apptSlots.title": "Choose a day and a time",
      "apptSlots.day": "1. Choose a day", "apptSlots.time": "2. Choose a time",
      "apptSlots.confirm": "Confirm this appointment",

      "apptConfirm.title": "Your appointment is booked",
      "apptConfirm.msg": "Thank you. Your appointment has been booked. You will also receive a confirmation message.",
      "apptConfirm.when": "When:", "apptConfirm.where": "Where:",

      "meds.title": "My medicines",
      "meds.lead": "Request repeat medication, view your medicine overview, or view medicine documents.",
      "meds.choose": "Choose a medicine section",
      "meds.order": "Order medicines",
      "meds.overview": "Medicine overview",
      "meds.documents": "Medicine documents",
      "meds.orderTitle": "Order medicines",
      "meds.step.what": "What",
      "meds.step.how": "How",
      "meds.step.check": "Check",
      "meds.status.what": "Step 1 of 3: choose the medicine",
      "meds.status.how": "Step 2 of 3: choose where to pick it up",
      "meds.status.check": "Step 3 of 3: check and submit",
      "meds.whatTitle": "Which medicines do you want to order?",
      "meds.multiSelectHint": "You can choose more than one medicine.",
      "meds.howTitle": "How do you want to pick up your medicine?",
      "meds.checkTitle": "Check your order",
      "meds.prescriptionOnly": "Only available with a prescription",
      "meds.med1": "Salbutamol inhaler 100 micrograms",
      "meds.med1Dose": "Use when needed, up to 8 puffs a day",
      "meds.med2": "Lisinopril 10 mg tablets",
      "meds.med2Dose": "1 tablet per day",
      "meds.pickup1": "Pick up at Apotheek Koedijk",
      "meds.pickup1d": "Daalmeerpad 12, Koedijk",
      "meds.pickup2": "Pick up at Apotheek Alkmaar Centrum",
      "meds.pickup2d": "Laat 88, Alkmaar",
      "meds.pickup3": "Pick up at the GP office",
      "meds.pickup3d": "Huisartsenpraktijk Koedijk, De Hertog 2",
      "meds.summaryMedicine": "Medicines:",
      "meds.summaryPickup": "Pickup location:",
      "meds.submit": "Send request",
      "meds.confirmTitle": "Your order has been sent",
      "meds.confirmMsg": "Your medicine request has been sent to the GP practice. You will receive a message by email or text when you can pick it up.",
      "meds.more": "Back to my medicines",
      "meds.notSubmittedNotice": "This is a summary of your request. It has not been sent yet. Press \"Send request\" to send it.",
      "meds.medOther": "My medicine is not in this list",
      "meds.medOtherHint": "Tell us which medicine you mean",
      "meds.medOtherInputLabel": "Which medicine do you need?",
      "meds.medUnsure": "I'm not sure which medicine I need",
      "meds.medUnsureHint": "The practice will contact you to discuss this",
      "meds.unsureHelp": "Unsure about your medication or how to use it? Call the practice or pharmacy:",
      "meds.notOnList": "(not on the list)",
      "meds.toDiscuss": "Not sure — to discuss with the practice",
      "meds.confirmCallNote": "Made a mistake? Call us:",

      "chatType.title": "Ask the GP or pharmacy",
      "chatType.lead": "Who would you like to contact?",
      "chatType.gp": "Ask the GP a question<small>Medical questions or complaints</small>",
      "chatType.pharmacy": "Ask the pharmacy a question<small>Questions about your medicines</small>",
      "chatType.apptOption": "I'd like to make an appointment instead<small>Skip the message — book a time directly</small>",
      "chatType.urgent": "Is it urgent? Always call the GP: <a href=\"tel:0725613913\">072-561 3913</a>. Call 112 for life-threatening situations.",

      "chatCategory.title": "What is your question about?",
      "chatCategory.lead": "Choose the option that fits best.",
      "chatCategory.opt1": "Ask a new question",
      "chatCategory.opt1Hint": "Something you have not discussed before",
      "chatCategory.opt2": "About something from before",
      "chatCategory.opt2Hint": "A complaint you discussed earlier",
      "chatCategory.opt3": "Repeat prescription",
      "chatCategory.opt4": "Test results",
      "chatCategory.opt5": "Something else",

      "chatForm.title": "Write your question",
      "chatForm.subjectLabel": "1. What is your question about? <span class=\"hint\">(a few words)</span>",
      "chatForm.messageLabel": "2. Write your question here <span class=\"hint\">(in your own words)</span>",
      "chatForm.attachmentLabel": "3. Add a file or picture <span class=\"hint\">(optional)</span>",
      "chatForm.attachmentStepLabel": "Detailed instructions for this step:",
      "chatForm.attachmentHint": "- Press the \"Choose File\" button.<br>- Find the photo or document you want to send.<br>- Click on the photo or document once.<br>- Press \"Open\".<br>- The file name will appear next to the button.<br>- Continue with your message and press \"Review my question\".",
      "chatForm.reply": "A doctor's assistant usually replies within 2 working days. Your answer will appear in this portal.",
      "chatForm.review": "Review my question",
      "chatForm.error": "Please write your question before sending.",

      "chatReview.title": "Check your question",
      "chatReview.notice": "This is an overview only — your question has not been sent yet. Press \"Confirm and send\" to send it.",
      "chatReview.to": "To:", "chatReview.about": "About:",
      "chatReview.subject": "Subject:", "chatReview.message": "Your question:",
      "chatReview.attachment": "Attachment:",
      "chatReview.noAttachment": "No file added",
      "chatReview.noSubject": "Not provided",
      "chatReview.edit": "Edit my question",
      "chatReview.confirmSend": "Confirm and send",

      "chatLabel.gp": "GP", "chatLabel.pharmacy": "Pharmacy",

      "chatConfirm.title": "Your question has been sent",
      "chatConfirm.msg": "Thank you. Your question has been sent to the practice.",
      "chatConfirm.replyBy": "You will receive a reply in this portal by:",

      "welcome.title": "Welcome to your health portal",
      "welcome.standard.intro": "This website is made easier to use. At the top of the website you can use <b>Read aloud</b> to hear text on the page.",
      "welcome.standard.li1": "Other settings, such as <b>high contrast</b>, <b>language</b>, and <b>text size</b>, can be found in <b>Settings</b>.",
      "welcome.guided.intro": "This website is made easier to use. The toolbar at the top of the screen contains <b>Read aloud</b> and <b>Step by step instructions</b>.",
      "welcome.guided.li1": "Other settings, such as <b>high contrast</b>, <b>language</b>, and <b>text size</b>, can be found in <b>Settings</b>.",
      "welcome.close": "Start using the portal",
      "tour.close": "Close",

      "note.apptAdvice": "A phone number is now always shown, regardless of the advice given. A notice has also been added to make clear that no appointment has been booked yet. The notice refers to the exact button the user needs to click. If a GP appointment is not recommended, the user can still book one by clicking the \"Schedule an appointment\" button. This replaces the less clear option \"I would still like an appointment\".",
      "note.chatType": "The option to ask a question is now split into two clear choices: \"Ask the GP\" and \"Ask the pharmacy.\" A shortcut has been added for users who want to book an appointment instead. The page now also shows a warning for urgent situations, including the practice phone number.",
      "note.chatCategory": "Added a screen where users can choose what their question is about from several clear options. The button \"A new question or complaint\" was renamed to \"Ask a new question\" to make the wording simpler and easier to understand.",
      "note.chatForm": "The subject field now fills in automatically based on the topic the user selected. Matching suggestion chips are also shown to help the user write their message. A review screen has been added before submission, and the button was changed from \"Submit my question\" to \"Review my question\" to match this new step.",
      "note.chatReview": "Added a review screen where users can check their question before sending it. A clear message has been added to show that the question has not been sent yet and will only be submitted after the user confirms it.",
      "note.chatConfirm": "The confirmation screen now clearly shows what the request was about and who it was sent to. It also gives a specific reply-by date and explains that the answer will appear in this portal.",
      "note.medsWhat": "Added \"Not in this list\" and \"Not sure\" options for cases where the user cannot find their medicine or is unsure which one to choose. A simple dosage instruction is now shown under each medicine. A phone number has also been added for users who need help with their medication or how to use it. Users can now also select more than one medicine to order at once.",
      "note.medsCheck": "Added a clear review notice to explain that this page is only a summary and that the request has not been sent yet. The notice also tells users which button to press to send the request.",
      "note.medsConfirm": "Added a clear notice explaining that the request has not been submitted yet. A phone number is now shown for users who notice a mistake or need help. The message has been made clearer by explaining how the user will receive further updates."
    },
    nl: {
      "bar.language": "Taal", "bar.textsize": "Tekstgrootte",
      "bar.contrast": "Hoog contrast", "bar.readaloud": "Voorlezen",
      "bar.tour": "Laat zien hoe", "bar.stopspeak": "Stop voorlezen",
      "bar.notes": "Wijzigingsnotities tonen",
      "loggedin": "U bent aangemeld als:",
      "banner.offeredby": "Aangeboden door:",
      "login.title": "Aanmelden", "login.intro": "Vul uw naam en wachtwoord in om verder te gaan.",
      "login.nameLabel": "Uw naam", "login.passLabel": "Wachtwoord",
      "login.submit": "Aanmelden", "login.logout": "Afmelden",
      "login.error": "Vul uw naam in om verder te gaan.",
      "guided.helpBtn": "Hulp", "guided.readPageBtn": "Pagina voorlezen",
      "guided.moreOpts": "Meer opties", "guided.lessOpts": "Minder opties",
      "idle.title": "Heeft u hulp nodig?",
      "idle.show": "Stap voor stap uitleg",
      "idle.read": "Instructies voorlezen",
      "idle.continue": "Ik ga zelf verder",
      "help.close": "Sluiten",
      "settings.langTitle": "Taal",
      "settings.contrastTitle": "Contrast",
      "settings.contrastDesc": "Donkere tegels voor beter leesbaar contrast.",
      "settings.guidedContrast": "Begeleide weergave gebruikt altijd hoog contrast op de tegels.",
      "settings.modeTitle": "Weergave kiezen",
      "settings.modeDesc": "Kies hoe u het portaal wilt gebruiken.",
      "settings.currentMode": "Huidige modus",
      "help.home": "Dit is uw startpagina. Kies een van de grote knoppen om verder te gaan. U kunt een afspraak maken, medicijnen aanvragen of een vraag stellen aan uw huisarts.",
      "help.appt-landing": "Hier kunt u een nieuwe afspraak maken of uw komende afspraken bekijken. Druk op 'Een afspraak maken' om te beginnen.",
      "help.appt-intro": "Uw huisarts vraagt u eerst een paar vragen te beantwoorden. Druk op de knop om met de vragen te beginnen.",
      "help.appt-q": "Beantwoord de vraag door op één van de opties te drukken. Druk dan op 'Volgende' om door te gaan.",
      "help.appt-advice": "Dit is ons advies voor u. Lees het goed door. Druk daarna op de knop om verder te gaan.",
      "help.appt-slots": "Kies eerst een dag, en daarna een tijd. Druk dan op de grote knop om de afspraak te bevestigen.",
      "help.appt-confirm": "Gefeliciteerd! Uw afspraak is gemaakt. U kunt terugkeren naar de startpagina.",
      "help.meds-home": "Hier kunt u herhaalmedicatie bestellen. Druk op 'Medicijnen bestellen' om te beginnen.",
      "help.meds-what": "Kies welke medicijnen op recept u wilt bestellen — u kunt meer dan één kiezen. Staat uw medicijn er niet bij, of weet u het niet zeker? Kies dan een van die opties. Druk daarna op Volgende.",
      "help.meds-how": "Kies waar u het medicijn wilt ophalen. Druk daarna op Volgende.",
      "help.meds-check": "Controleer uw keuzes. Dit is alleen een overzicht — er is nog niets verstuurd. Klopt alles? Verstuur dan de bestelling.",
      "help.meds-confirm": "Uw bestelling is verstuurd. Hieronder ziet u een overzicht en het telefoonnummer dat u kunt bellen als er iets niet klopt.",
      "help.chat-type": "Kies of u een vraag wilt stellen aan de huisarts of de apotheek, of kies om in plaats daarvan een afspraak te maken.",
      "help.chat-category": "Kies de optie die het beste past bij waar uw vraag over gaat. Druk daarna op Volgende.",
      "help.chat-form": "Schrijf uw vraag in het tekstvak. Druk daarna op de knop om uw vraag te controleren voordat u die verstuurt.",
      "help.chat-review": "Controleer of alles klopt. Druk op Wijzig om iets te veranderen, of druk op Bevestigen en versturen om uw vraag te versturen.",
      "help.chat-confirm": "Uw vraag is verstuurd. U kunt zien voor welke datum u een antwoord krijgt.",
      "help.settings": "Hier kunt u kiezen hoe u het portaal wilt gebruiken. Kies Standaard of Begeleide weergave.",
      "chooser.title": "Hoe wilt u het portaal gebruiken?",
      "chooser.sub": "U kunt dit later wijzigen via Instellingen.",
      "chooser.std.title": "Standaardweergave",
      "chooser.std.f1": "Meer informatie op het scherm", "chooser.std.f2": "Snellere navigatie",
      "chooser.guided.title": "Begeleide weergave",
      "chooser.guided.f1": "Grotere tekst", "chooser.guided.f2": "Grotere knoppen",
      "chooser.guided.f3": "Stap-voor-stap hulp", "chooser.guided.f4": "Voorleesondersteuning",

      "home.title": "Mijn gezondheid",
      "tile.appt": "Afspraak maken en bekijken", "tile.medicines": "Mijn medicijnen",
      "tile.chat": "Vraag aan huisarts / apotheek",
      "tile.file": "Mijn dossier",
      "tile.paths": "Mijn zorgpaden", "tile.details": "Gegevens huisarts / apotheek",
      "tile.news": "Nieuws", "tile.settings": "Instellingen",

      "back.home": "Terug naar home", "back.prev": "Terug naar vorige pagina",
      "nav.previous": "Vorige", "nav.next": "Volgende",

      "apptLanding.title": "Afspraak maken en bekijken",
      "apptLanding.make": "Een afspraak maken",
      "apptLanding.history": "Eerdere afspraken bekijken",
      "apptLanding.upcoming": "Uw komende afspraken",
      "apptLanding.none": "Er zijn geen komende afspraken voor u gevonden.",

      "apptIntro.title": "Voorbereiding op uw afspraak",
      "apptIntro.lead": "Uw huisarts vraagt u eerst een paar eenvoudige vragen over uw klacht te beantwoorden.",
      "apptIntro.sub": "Zo kunnen wij u het juiste advies geven of de juiste afspraak inplannen. Het duurt ongeveer 2 minuten.",
      "apptIntro.urgent": "Is het spoed? Bel bij spoed altijd uw huisarts. Bel 112 bij levensgevaar.",
      "apptIntro.start": "Begin met de vragen",
      "apptIntro.prefer": "Liever met iemand praten? Bel de praktijk:",

      "apptQ.title": "Een paar vragen", "apptQ.hatch": "Is dit te veel? U kunt ook gewoon de praktijk bellen:",
      "apptQ.provider": "Huisartsenpraktijk Koedijk", "apptQ.sectionLabel": "Vragen",
      "apptQ.backLink": "Terug naar de instructiepagina",
      "apptQ.complete": "Bedankt voor het beantwoorden van de vragen. Klik op 'Volgende' voor uw advies.",
      "apptAdvice.title": "Uw persoonlijke advies",
      "apptAdvice.notScheduledPrefix": "Er is nog geen afspraak ingepland. Wilt u een afspraak inplannen? Druk dan op de knop",
      "apptAdvice.notScheduledSuffix": "hieronder.",
      "apptAdvice.notScheduledUrgent": "Er is nog geen afspraak gemaakt. Bel nu de praktijk via het nummer hieronder.",

      "apptSlots.title": "Kies een dag en een tijd",
      "apptSlots.day": "1. Kies een dag", "apptSlots.time": "2. Kies een tijd",
      "apptSlots.confirm": "Bevestig deze afspraak",

      "apptConfirm.title": "Uw afspraak is gemaakt",
      "apptConfirm.msg": "Dank u wel. Uw afspraak is gemaakt. U ontvangt ook een bevestiging.",
      "apptConfirm.when": "Wanneer:", "apptConfirm.where": "Waar:",

      "meds.title": "Mijn medicijnen",
      "meds.lead": "Herhaalmedicatie aanvragen, uw medicijnoverzicht bekijken en uw medicijndocumenten bekijken.",
      "meds.choose": "Kies een onderdeel van uw medicatie",
      "meds.order": "Medicijnen bestellen",
      "meds.overview": "Medicijnoverzicht",
      "meds.documents": "Medicijndocumenten",
      "meds.orderTitle": "Medicijnen bestellen",
      "meds.step.what": "Wat",
      "meds.step.how": "Hoe",
      "meds.step.check": "Check",
      "meds.status.what": "Stap 1 van 3: kies het medicijn",
      "meds.status.how": "Stap 2 van 3: kies waar u het ophaalt",
      "meds.status.check": "Stap 3 van 3: controleer en verstuur",
      "meds.whatTitle": "Welke medicijnen wilt u bestellen?",
      "meds.multiSelectHint": "U kunt meer dan één medicijn kiezen.",
      "meds.howTitle": "Hoe wilt u uw medicijn ophalen?",
      "meds.checkTitle": "Controleer uw bestelling",
      "meds.prescriptionOnly": "Alleen verkrijgbaar op recept",
      "meds.med1": "Salbutamol inhalator 100 microgram",
      "meds.med1Dose": "Gebruik indien nodig, maximaal 8 pufjes per dag",
      "meds.med2": "Lisinopril 10 mg tabletten",
      "meds.med2Dose": "1 tablet per dag",
      "meds.pickup1": "Ophalen bij Apotheek Koedijk",
      "meds.pickup1d": "Daalmeerpad 12, Koedijk",
      "meds.pickup2": "Ophalen bij Apotheek Alkmaar Centrum",
      "meds.pickup2d": "Laat 88, Alkmaar",
      "meds.pickup3": "Ophalen bij de huisartsenpraktijk",
      "meds.pickup3d": "Huisartsenpraktijk Koedijk, De Hertog 2",
      "meds.summaryMedicine": "Medicijnen:",
      "meds.summaryPickup": "Ophaallocatie:",
      "meds.submit": "Verzoek versturen",
      "meds.confirmTitle": "Uw bestelling is verstuurd",
      "meds.confirmMsg": "Uw medicijnaanvraag is verstuurd naar de huisartsenpraktijk. U krijgt bericht via e-mail of sms wanneer u het kunt ophalen.",
      "meds.more": "Terug naar mijn medicijnen",
      "meds.notSubmittedNotice": "Dit is een samenvatting van uw aanvraag. Deze is nog niet verstuurd. Druk op \"Verzoek versturen\" om te versturen.",
      "meds.medOther": "Mijn medicijn staat niet in deze lijst",
      "meds.medOtherHint": "Laat ons weten welk medicijn u bedoelt",
      "meds.medOtherInputLabel": "Welk medicijn heeft u nodig?",
      "meds.medUnsure": "Ik weet niet zeker welk medicijn ik nodig heb",
      "meds.medUnsureHint": "De praktijk neemt contact met u op om dit te bespreken",
      "meds.unsureHelp": "Twijfelt u over uw medicatie of hoe u het moet gebruiken? Bel de praktijk of apotheek:",
      "meds.notOnList": "(niet op de lijst)",
      "meds.toDiscuss": "Niet zeker — te bespreken met de praktijk",
      "meds.confirmCallNote": "Foutje gemaakt? Bel ons:",

      "chatType.title": "Vraag aan huisarts of apotheek",
      "chatType.lead": "Met wie wilt u contact opnemen?",
      "chatType.gp": "Stel een vraag aan de huisarts<small>Medische vragen of klachten</small>",
      "chatType.pharmacy": "Stel een vraag aan de apotheek<small>Vragen over uw medicijnen</small>",
      "chatType.apptOption": "Ik wil liever een afspraak maken<small>Geen bericht nodig — plan direct een tijd</small>",
      "chatType.urgent": "Is het spoed? Bel altijd de huisarts: <a href=\"tel:0725613913\">072-561 3913</a>. Bel 112 bij levensgevaar.",

      "chatCategory.title": "Waar gaat uw vraag over?",
      "chatCategory.lead": "Kies de optie die het beste past.",
      "chatCategory.opt1": "Nieuwe vraag stellen",
      "chatCategory.opt1Hint": "Iets dat u nog niet besproken heeft",
      "chatCategory.opt2": "Over iets van eerder",
      "chatCategory.opt2Hint": "Een klacht die u eerder besprak",
      "chatCategory.opt3": "Herhaalrecept",
      "chatCategory.opt4": "Uitslag onderzoek",
      "chatCategory.opt5": "Iets anders",

      "chatForm.title": "Schrijf uw vraag",
      "chatForm.subjectLabel": "1. Waar gaat uw vraag over? <span class=\"hint\">(een paar woorden)</span>",
      "chatForm.messageLabel": "2. Schrijf hier uw vraag <span class=\"hint\">(in uw eigen woorden)</span>",
      "chatForm.attachmentLabel": "3. Voeg een bestand of foto toe <span class=\"hint\">(optioneel)</span>",
      "chatForm.attachmentStepLabel": "Gedetailleerde instructies voor deze stap:",
      "chatForm.attachmentHint": "- Druk op de knop \"Bestand kiezen\".<br>- Zoek de foto of het document dat u wilt versturen.<br>- Klik eenmaal op de foto of het document.<br>- Druk op \"Open\".<br>- De bestandsnaam verschijnt naast de knop.<br>- Ga verder met uw bericht en druk op \"Bekijk mijn vraag\".",
      "chatForm.reply": "Een doktersassistent reageert meestal binnen 2 werkdagen. Uw antwoord verschijnt in dit portaal.",
      "chatForm.review": "Bekijk mijn vraag",
      "chatForm.error": "Schrijf eerst uw vraag voordat u verstuurt.",

      "chatReview.title": "Controleer uw vraag",
      "chatReview.notice": "Dit is alleen een overzicht — uw vraag is nog niet verstuurd. Druk op \"Bevestigen en versturen\" om te versturen.",
      "chatReview.to": "Aan:", "chatReview.about": "Over:",
      "chatReview.subject": "Onderwerp:", "chatReview.message": "Uw vraag:",
      "chatReview.attachment": "Bijlage:",
      "chatReview.noAttachment": "Geen bestand toegevoegd",
      "chatReview.noSubject": "Niet ingevuld",
      "chatReview.edit": "Wijzig mijn vraag",
      "chatReview.confirmSend": "Bevestigen en versturen",

      "chatLabel.gp": "Huisarts", "chatLabel.pharmacy": "Apotheek",

      "chatConfirm.title": "Uw vraag is verstuurd",
      "chatConfirm.msg": "Dank u wel. Uw vraag is naar de praktijk verstuurd.",
      "chatConfirm.replyBy": "U ontvangt antwoord in dit portaal vóór:",

      "welcome.title": "Welkom bij uw gezondheidsportaal",
      "welcome.standard.intro": "Deze website is makkelijker gemaakt in gebruik. Bovenaan de website kunt u <b>Voorlezen</b> gebruiken om tekst op de pagina te horen.",
      "welcome.standard.li1": "Andere instellingen, zoals <b>hoog contrast</b>, <b>taal</b> en <b>tekstgrootte</b>, vindt u bij <b>Instellingen</b>.",
      "welcome.guided.intro": "Deze website is makkelijker gemaakt in gebruik. De balk bovenaan het scherm bevat <b>Voorlezen</b> en <b>Stap voor stap uitleg</b>.",
      "welcome.guided.li1": "Andere instellingen, zoals <b>hoog contrast</b>, <b>taal</b> en <b>tekstgrootte</b>, vindt u bij <b>Instellingen</b>.",
      "welcome.close": "Begin met het portaal",
      "tour.close": "Sluiten"
    }
  };

  /* ---------------- Questionnaire content ---------------- */
  // Each question: id, text key, optional help key, options [{key, danger?, flag?}]
  var QUESTIONS = {
    en: [
      { q: "Who is this for?", help: "We ask this for your safety.",
        opts: ["For myself", "For someone else"] },
      { q: "Do you have any of these serious symptoms right now?",
        help: "If yes, this is urgent. If the person is not responding, call 112.",
        opts: [
          { t: "I have trouble breathing", danger: true },
          { t: "I feel like I am going to faint", danger: true },
          { t: "I am losing a lot of blood right now", danger: true },
          { t: "No, I do not have these symptoms" }
        ] },
      { q: "Which part of the body bothers you most?",
        help: "Choose the one that fits best.",
        opts: ["Head", "Chest", "Stomach or belly", "Arm or leg", "Skin", "Something else / not sure"] },
      { q: "How long have you had this complaint?",
        opts: [{ t: "Less than a week" }, { t: "1 to 2 weeks" }, { t: "Longer than 2 weeks", flag: "long" }] },
      { q: "How bad does it feel right now?",
        opts: [{ t: "Mild" }, { t: "Moderate" }, { t: "Severe", flag: "severe" }] },
      { q: "Do you have a fever?",
        opts: [{ t: "Yes", flag: "fever" }, { t: "No" }] }
    ],
    nl: [
      { q: "Voor wie is dit?", help: "Dit vragen wij voor uw veiligheid.",
        opts: ["Voor mijzelf", "Voor iemand anders"] },
      { q: "Heeft u op dit moment een van deze ernstige klachten?",
        help: "Zo ja, dan is het spoed. Reageert de persoon niet? Bel 112.",
        opts: [
          { t: "Ik heb moeite met ademen", danger: true },
          { t: "Ik voel dat ik ga flauwvallen", danger: true },
          { t: "Ik verlies nu veel bloed", danger: true },
          { t: "Nee, ik heb deze klachten niet" }
        ] },
      { q: "Welk deel van het lichaam stoort u het meest?",
        help: "Kies wat het beste past.",
        opts: ["Hoofd", "Borst", "Buik of maag", "Arm of been", "Huid", "Iets anders / weet ik niet"] },
      { q: "Hoe lang heeft u deze klacht al?",
        opts: [{ t: "Minder dan een week" }, { t: "1 tot 2 weken" }, { t: "Langer dan 2 weken", flag: "long" }] },
      { q: "Hoe erg voelt het nu?",
        opts: [{ t: "Mild" }, { t: "Matig" }, { t: "Ernstig", flag: "severe" }] },
      { q: "Heeft u koorts?",
        opts: [{ t: "Ja", flag: "fever" }, { t: "Nee" }] }
    ]
  };

  var ADVICE = {
    en: {
      urgent: { title: "Please call your GP now",
        body: "Based on your answers, your complaint may need quick attention. Please call the practice now. If it is life-threatening, call 112.",
        cta: null },
      book: { title: "We recommend an appointment",
        body: "Based on your answers, it is a good idea to see your GP. You can book a suitable time below.",
        cta: "Choose a day and time" },
      self: { title: "An appointment is probably not needed",
        body: "Based on your answers, you most likely do not need to see your GP yet. Here is some advice you can try yourself:",
        tips: ["Take enough rest and drink plenty of water.",
               "Watch how you feel over the next few days.",
               "If the complaint gets worse or lasts longer, contact the practice."],
        cta: "Schedule an appointment" }
    },
    nl: {
      urgent: { title: "Bel nu uw huisarts",
        body: "Op basis van uw antwoorden kan uw klacht snel aandacht nodig hebben. Bel nu de praktijk. Bij levensgevaar belt u 112.",
        cta: null },
      book: { title: "Wij raden een afspraak aan",
        body: "Op basis van uw antwoorden is het verstandig om naar uw huisarts te gaan. Hieronder kunt u een tijd kiezen.",
        cta: "Kies een dag en tijd" },
      self: { title: "Een afspraak is waarschijnlijk niet nodig",
        body: "Op basis van uw antwoorden hoeft u waarschijnlijk nog niet naar de huisarts. Hier is advies dat u zelf kunt proberen:",
        tips: ["Neem voldoende rust en drink genoeg water.",
               "Let de komende dagen op hoe u zich voelt.",
               "Wordt de klacht erger of duurt het langer? Neem dan contact op met de praktijk."],
        cta: "Afspraak inplannen" }
    }
  };

  var SLOTS = {
    en: { days: ["Mon 22 June", "Tue 23 June", "Wed 24 June", "Thu 25 June"],
          times: ["09:00", "10:30", "13:15", "15:45"] },
    nl: { days: ["ma 22 juni", "di 23 juni", "wo 24 juni", "do 25 juni"],
          times: ["09:00", "10:30", "13:15", "15:45"] }
  };

  /* ---------------- Guided tour steps ---------------- */
  var TOURS = {
    en: {
      home: [
        { sel: "#tile-appt", t: "To make a doctor's appointment, click this big tile." },
        { sel: "#tile-meds", t: "To order repeat medication, click My medicines." },
        { sel: "#tile-chat", t: "To ask the doctor a question, use this tile." },
        { sel: "#btn-readaloud", t: "Turn this on, then click any text to hear it read aloud." }
      ],
      "guided-home": [
        { sel: ".guided-home", t: "Welcome! This page gives you access to your healthcare services." },
        { sel: "#gtile-appt",     t: "To schedule a new appointment or view existing appointments, select \"Make and view appointments.\"" },
        { sel: "#gtile-meds",     t: "To view your medications or request a prescription refill, select \"My medicines.\"" },
        { sel: "#gtile-chat",     t: "To send a message or question to your doctor or pharmacy, select \"Ask the GP or pharmacy.\"" },
        { sel: "#gtile-files",    t: "My file is not part of this prototype." },
        { sel: "#gtile-care",     t: "To view your treatment plans and healthcare journeys, select \"My care paths.\"" },
        { sel: "#gtile-gp",       t: "To see contact information for your GP practice or pharmacy, select \"GP / pharmacy details.\"" },
        { sel: "#gtile-news",     t: "To read healthcare announcements and updates, select \"News.\"" },
        { sel: "#gtile-settings", t: "To change preferences such as language, accessibility settings, or display options, select \"Settings.\"" },
        { sel: "#btn-tour",       t: "If you need assistance using this website, select \"Step by step instructions\" at the top of the page." }
      ],
      "appt-landing": [
        { sel: "[data-view='appt-landing'] h1", t: "This is the appointments page. From here you can make a new appointment or view past ones." },
        { sel: "#appt-make-btn",    t: "To schedule a new appointment with your GP, select \"Make an appointment.\"" },
        { sel: "#appt-history-btn", t: "To see appointments you have had before, select \"View past appointments.\"" },
        { sel: "#appt-upcoming-card", t: "Your upcoming appointments are shown here. Currently no upcoming appointments have been found." },
        { sel: "#appt-back-home",   t: "When you are done, select \"Back to home\" to return to the main page." }
      ],
      "appt-intro": [
        { sel: "#appt-intro-card",   t: "This page prepares you for your appointment. Your GP would like you to answer a few simple questions about your complaint first. It takes about 2 minutes." },
        { sel: "#appt-intro-urgent", t: "Important: if your situation is urgent, always call your GP directly. For life-threatening situations, call 112 immediately." },
        { sel: "#btn-start-q",       t: "When you are ready, select \"Start the questions\" to begin." },
        { sel: "#appt-intro-call",   t: "If you prefer to speak to a person, you can call the practice directly at 072-561 3913." }
      ],
      "appt-q": [
        { sel: ".progress", t: "This bar shows how far you are. You answer one question at a time." },
        { sel: "#appt-question", t: "Read the question and tap your answer. The buttons are large." },
        { sel: "#q-next", t: "When you have chosen, press Next to continue." },
        { sel: ".call-hatch", t: "Too difficult? You can always phone the practice instead." }
      ],
      "meds-home": [
        { sel: "#meds-order-btn", t: "Choose Order medicines to request repeat medication." },
        { sel: "[data-view='meds-home'] .link-back", t: "Use this button to return to the homepage." }
      ],
      "meds-what": [
        { sel: "#meds-medicine-options", t: "Choose the medicines you want to order. You can choose more than one." },
        { sel: "#meds-what-next", t: "After choosing a medicine, press Next." }
      ],
      "meds-how": [
        { sel: "#meds-pickup-options", t: "Choose where you want to pick up your medicine." },
        { sel: "#meds-how-next", t: "After choosing a pickup location, press Next." }
      ],
      "meds-check": [
        { sel: "#meds-check-summary", t: "Check the medicine and pickup location." },
        { sel: "#meds-submit", t: "If everything is correct, submit the order." }
      ],
      "meds-confirm": [
        { sel: "[data-view='meds-confirm'] .notice", t: "Your order has been sent to the practice." },
        { sel: "[data-view='meds-confirm'] .btn[data-go='home']", t: "Return to the homepage when you are done." }
      ],
      "chat-type": [
        { sel: "#chat-recipient-gp", t: "To ask your GP a question, select this button." },
        { sel: "#chat-recipient-pharmacy", t: "To ask the pharmacy a question, select this button." },
        { sel: "#chat-type-urgent", t: "If your question is urgent, always call the practice instead of sending a message." }
      ],
      "chat-category": [
        { sel: "#chat-category-options", t: "Choose the option that best describes what your question is about." },
        { sel: "#chat-category-next", t: "After choosing an option, press Next." }
      ],
      "chat-form": [
        { sel: "#chat-subject", t: "First, type what your question is about in a few words." },
        { sel: ".example-chips", t: "Not sure? Tap one of these examples to fill it in." },
        { sel: "#chat-message", t: "Then write your question here in your own words." },
        { sel: "#chat-attachment", t: "If you want, click Choose File and select a picture or document to send with your question." },
        { sel: "#btn-send-chat", t: "Finally, press this button to review your question before sending it." }
      ],
      "chat-review": [
        { sel: "#chat-review-summary", t: "Check that everything is correct before sending." },
        { sel: "#btn-confirm-chat", t: "If everything is correct, press this button to send your question." }
      ]
    },
    nl: {
      home: [
        { sel: "#tile-appt", t: "Wilt u een afspraak maken? Klik op deze grote tegel." },
        { sel: "#tile-meds", t: "Wilt u herhaalmedicatie bestellen? Klik op Mijn medicijnen." },
        { sel: "#tile-chat", t: "Een vraag aan de dokter stelt u via deze tegel." },
        { sel: "#btn-readaloud", t: "Zet dit aan en klik daarna op tekst om die te laten voorlezen." }
      ],
      "guided-home": [
        { sel: ".guided-home", t: "Welkom bij MijnGezondheid.net. Op deze pagina heeft u toegang tot uw gezondheidsdiensten." },
        { sel: "#gtile-appt",     t: "Om een afspraak te plannen of bestaande afspraken te bekijken, kiest u \"Afspraak maken en bekijken.\"" },
        { sel: "#gtile-meds",     t: "Om uw medicijnen te bekijken of een herhaalrecept aan te vragen, kiest u \"Mijn medicijnen.\"" },
        { sel: "#gtile-chat",     t: "Om een bericht of vraag te sturen naar uw huisarts of apotheek, kiest u \"Vraag aan huisarts / apotheek.\"" },
        { sel: "#gtile-files",    t: "Mijn dossier zit niet in dit prototype." },
        { sel: "#gtile-care",     t: "Om uw behandelplannen en zorgtrajecten te bekijken, kiest u \"Mijn zorgpaden.\"" },
        { sel: "#gtile-gp",       t: "Om de contactgegevens van uw huisarts of apotheek te zien, kiest u \"Gegevens huisarts / apotheek.\"" },
        { sel: "#gtile-news",     t: "Om gezondheidsmeldingen en updates te lezen, kiest u \"Nieuws.\"" },
        { sel: "#gtile-settings", t: "Om instellingen te wijzigen zoals taal, toegankelijkheid of weergave, kiest u \"Instellingen.\"" },
        { sel: "#btn-tour",       t: "Als u hulp nodig heeft bij het gebruik van deze website, kiest u \"Stap voor stap uitleg\" bovenaan de pagina." }
      ],
      "appt-landing": [
        { sel: "[data-view='appt-landing'] h1", t: "Dit is de afsprakenpagina. Hier kunt u een nieuwe afspraak maken of eerdere afspraken bekijken." },
        { sel: "#appt-make-btn",    t: "Om een nieuwe afspraak te maken bij uw huisarts, kiest u \"Afspraak maken.\"" },
        { sel: "#appt-history-btn", t: "Om eerdere afspraken te bekijken, kiest u \"Afspraken bekijken.\"" },
        { sel: "#appt-upcoming-card", t: "Uw komende afspraken worden hier getoond. Er zijn momenteel geen komende afspraken gevonden." },
        { sel: "#appt-back-home",   t: "Als u klaar bent, kiest u \"Terug naar home\" om terug te gaan naar de startpagina." }
      ],
      "appt-intro": [
        { sel: "#appt-intro-card",   t: "This page prepares you for your appointment. Your GP would like you to answer a few simple questions about your complaint first. It takes about 2 minutes." },
        { sel: "#appt-intro-urgent", t: "Important: if your situation is urgent, always call your GP directly. For life-threatening situations, call 112 immediately." },
        { sel: "#btn-start-q",       t: "When you are ready, select \"Start the questions\" to begin." },
        { sel: "#appt-intro-call",   t: "If you prefer to speak to a person, you can call the practice directly at 072-561 3913." }
      ],
      "appt-q": [
        { sel: ".progress", t: "Deze balk laat zien hoe ver u bent. U beantwoordt één vraag tegelijk." },
        { sel: "#appt-question", t: "Lees de vraag en tik op uw antwoord. De knoppen zijn groot." },
        { sel: "#q-next", t: "Heeft u gekozen? Druk op Volgende om verder te gaan." },
        { sel: ".call-hatch", t: "Te moeilijk? U kunt ook altijd de praktijk bellen." }
      ],
      "meds-home": [
        { sel: "#meds-order-btn", t: "Kies Medicijnen bestellen om herhaalmedicatie aan te vragen." },
        { sel: "[data-view='meds-home'] .link-back", t: "Met deze knop gaat u terug naar de startpagina." }
      ],
      "meds-what": [
        { sel: "#meds-medicine-options", t: "Kies welke medicijnen u wilt bestellen. U kunt meer dan één kiezen." },
        { sel: "#meds-what-next", t: "Heeft u een medicijn gekozen? Druk op Volgende." }
      ],
      "meds-how": [
        { sel: "#meds-pickup-options", t: "Kies waar u uw medicijn wilt ophalen." },
        { sel: "#meds-how-next", t: "Heeft u een ophaallocatie gekozen? Druk op Volgende." }
      ],
      "meds-check": [
        { sel: "#meds-check-summary", t: "Controleer het medicijn en de ophaallocatie." },
        { sel: "#meds-submit", t: "Klopt alles? Verstuur dan de bestelling." }
      ],
      "meds-confirm": [
        { sel: "[data-view='meds-confirm'] .notice", t: "Uw bestelling is naar de praktijk verstuurd." },
        { sel: "[data-view='meds-confirm'] .btn[data-go='home']", t: "Ga terug naar de startpagina wanneer u klaar bent." }
      ],
      "chat-type": [
        { sel: "#chat-recipient-gp", t: "Wilt u een vraag stellen aan de huisarts? Kies dan deze knop." },
        { sel: "#chat-recipient-pharmacy", t: "Wilt u een vraag stellen aan de apotheek? Kies dan deze knop." },
        { sel: "#chat-type-urgent", t: "Is uw vraag spoedeisend? Bel dan altijd de praktijk in plaats van een bericht te sturen." }
      ],
      "chat-category": [
        { sel: "#chat-category-options", t: "Kies de optie die het beste past bij waar uw vraag over gaat." },
        { sel: "#chat-category-next", t: "Heeft u een optie gekozen? Druk op Volgende." }
      ],
      "chat-form": [
        { sel: "#chat-subject", t: "Typ eerst in een paar woorden waar uw vraag over gaat." },
        { sel: ".example-chips", t: "Weet u het niet zeker? Tik op een voorbeeld om het in te vullen." },
        { sel: "#chat-message", t: "Schrijf daarna uw vraag in uw eigen woorden." },
        { sel: "#chat-attachment", t: "Als u wilt, klik op Bestand kiezen en selecteer een foto of document om mee te sturen." },
        { sel: "#btn-send-chat", t: "Druk tot slot op deze knop om uw vraag te controleren voordat u die verstuurt." }
      ],
      "chat-review": [
        { sel: "#chat-review-summary", t: "Controleer of alles klopt voordat u verstuurt." },
        { sel: "#btn-confirm-chat", t: "Klopt alles? Druk dan op deze knop om uw vraag te versturen." }
      ]
    }
  };

  /* ---------------- State ---------------- */
  var LS = window.localStorage;
  var state = {
    lang: LS.getItem("mg_lang") || "nl",
    size: LS.getItem("mg_size") || "1",
    contrast: LS.getItem("mg_contrast") === "1",
    readaloud: LS.getItem("mg_readaloud") === "1",
    viewMode: LS.getItem("mg_view") || "standard",
    notesOn: LS.getItem("mg_notes") === null ? true : LS.getItem("mg_notes") === "1"
  };
  var qIndex = 0, qAnswers = [];
  var chosenDay = null, chosenTime = null;
  var chosenMedicines = [], chosenPickup = null, chosenMedicineOther = "";
  var chosenChatRecipient = null, chosenChatCategory = null, chatSubjectAutoFilled = false;

  var $ = function (s, root) { return (root || document).querySelector(s); };
  var $$ = function (s, root) { return Array.prototype.slice.call((root || document).querySelectorAll(s)); };
  function t(key) { return (I18N[state.lang] && I18N[state.lang][key]) || I18N.en[key] || key; }

  function updateWelcomeCopy() {
    var mode = state.viewMode === "guided" ? "guided" : "standard";
    $$("[data-welcome-i18n]").forEach(function (el) {
      var key = "welcome." + mode + "." + el.getAttribute("data-welcome-i18n");
      el.innerHTML = t(key);
    });
  }

  /* ---------------- i18n apply ---------------- */
  function applyLang() {
    document.documentElement.lang = state.lang;
    $$("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (I18N[state.lang][key] != null) el.innerHTML = I18N[state.lang][key];
    });
    // toolbar language buttons pressed state
    $$("[data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === state.lang));
    });
    updateWelcomeCopy();
    refreshSpeakButtons();
  }

  /* ---------------- View router ---------------- */
  function showView(name) {
    stopWalkthrough();
    stopSpeaking();
    $$(".view").forEach(function (v) {
      v.classList.toggle("is-active", v.getAttribute("data-view") === name);
    });
    document.documentElement.setAttribute("data-current-view", name);
    if (name === "appt-q") startQuestionnaire();
    if (name === "appt-advice") renderAdvice();
    if (name === "appt-slots") renderSlots();
    if (name === "meds-check") renderMedicineCheck();
    if (name === "meds-confirm") renderMedicineConfirm();
    if (name === "chat-review") renderChatReview();
    if (name === "chat-confirm") renderChatConfirm();
    window.scrollTo(0, 0);
    var active = $('.view[data-view="' + name + '"]');
    refreshSpeakButtons();
    if (active) {
      var h = active.querySelector("h1");
      if (h) { h.setAttribute("tabindex", "-1"); h.focus(); }
    }
  }

  /* ---------------- Accessibility toggles ---------------- */
  function applySize() {
    document.documentElement.style.setProperty("--font-scale", state.size);
    $$("[data-size]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-size") === state.size));
    });
  }
  function applyContrast() {
    document.documentElement.setAttribute("data-theme", state.contrast ? "contrast" : "default");
    $("#btn-contrast").setAttribute("aria-pressed", String(state.contrast));
  }
  function applyReadaloud() {
    document.body.classList.toggle("readaloud-on", state.readaloud);
    $("#btn-readaloud").setAttribute("aria-pressed", String(state.readaloud));
    $("#btn-stopspeak").classList.toggle("sr-only", !state.readaloud);
    refreshSpeakButtons();
  }
  function applyNotes() {
    document.documentElement.setAttribute("data-notes", state.notesOn ? "on" : "off");
    $("#btn-notes").setAttribute("aria-pressed", String(state.notesOn));
  }
  function updateModeIndicator() {
    var isGuided = state.viewMode === "guided";
    var stdBtn = $("#settings-std");
    var guidedBtn = $("#settings-guided");
    if (stdBtn) stdBtn.classList.toggle("is-active", !isGuided);
    if (guidedBtn) guidedBtn.classList.toggle("is-active", isGuided);
  }

  /* ---------------- Text to speech ---------------- */
  function speak(text) {
    if (!("speechSynthesis" in window) || !text) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text.replace(/\s+/g, " ").trim());
    u.lang = state.lang === "nl" ? "nl-NL" : "en-US";
    var voices = window.speechSynthesis.getVoices();
    var match = voices.filter(function (v) { return v.lang && v.lang.toLowerCase().indexOf(u.lang.slice(0, 2)) === 0; })[0];
    if (match) u.voice = match;
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  }
  function stopSpeaking() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    $$(".speaking-now").forEach(function (e) { e.classList.remove("speaking-now"); });
  }
  function readableText(el) {
    var clone = el.cloneNode(true);
    $$(".speak-btn", clone).forEach(function (b) { b.remove(); });
    return clone.textContent;
  }
  // Inject a speaker button into each speakable element in the active view.
  function refreshSpeakButtons() {
    $$(".speak-btn").forEach(function (b) { b.remove(); });
    if (!state.readaloud) return;
    var active = $(".view.is-active");
    if (!active) return;
    $$(".speakable", active).forEach(function (el) {
      if (el.closest("button")) return;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "speak-btn";
      btn.setAttribute("aria-label", t("bar.readaloud"));
      btn.innerHTML = '<svg aria-hidden="true"><use href="#i-speaker"/></svg>';
      btn.addEventListener("click", function (ev) {
        ev.stopPropagation();
        speakElement(el);
      });
      el.appendChild(btn);
    });
  }
  function speakElement(el) {
    stopSpeaking();
    el.classList.add("speaking-now");
    speak(readableText(el));
  }

  /* ---------------- Questionnaire ---------------- */
  function startQuestionnaire() {
    qIndex = 0; qAnswers = [];
    $("#q-prev").style.display = "";
    renderQuestion();
  }
  function renderQuestion() {
    if (state.viewMode === "guided") {
      renderGuidedQuestion();
    } else {
      renderStandardAllQuestions();
    }
    refreshSpeakButtons();
  }

  function renderGuidedQuestion() {
    var qs = QUESTIONS[state.lang];
    var q = qs[qIndex];
    var box = $("#appt-question");
    var html = '<p class="q-title speakable">' + escapeHtml(q.q) + "</p>";
    if (q.help) html += '<p class="q-help speakable">' + escapeHtml(q.help) + "</p>";
    html += '<div class="options" role="group">';
    q.opts.forEach(function (o, i) {
      var label = typeof o === "string" ? o : o.t;
      var sel = qAnswers[qIndex] === i ? " selected" : "";
      html += '<button type="button" class="option' + sel + '" data-opt="' + i + '" data-qi="' + qIndex + '">' +
              '<span class="opt-mark" aria-hidden="true"></span><span>' + escapeHtml(label) + "</span></button>";
    });
    html += "</div>";
    box.innerHTML = html;
    $$(".option", box).forEach(function (btn) {
      btn.addEventListener("click", function () {
        qAnswers[qIndex] = parseInt(btn.getAttribute("data-opt"), 10);
        $$(".option", box).forEach(function (b) { b.classList.remove("selected"); });
        btn.classList.add("selected");
        $("#q-next").disabled = false;
      });
    });
    var total = qs.length;
    $("#q-progress-fill").style.width = Math.round(((qIndex + 1) / total) * 100) + "%";
    $("#q-progress-text").textContent = (state.lang === "nl" ? "Vraag " : "Question ") +
      (qIndex + 1) + (state.lang === "nl" ? " van " : " of ") + total;
    $("#q-prev").disabled = qIndex === 0;
    $("#q-next").disabled = qAnswers[qIndex] == null;
    $("#q-next").textContent = qIndex === total - 1 ? (state.lang === "nl" ? "Bekijk advies" : "See my advice") : t("nav.next");
  }

  function renderStandardAllQuestions() {
    var qs = QUESTIONS[state.lang];
    var box = $("#q-all-questions");
    var html = "";
    qs.forEach(function (q, qi) {
      html += '<div class="q-form-item">';
      html += '<div class="q-form-num">' + (qi + 1) + "</div>";
      html += '<div class="q-form-text speakable">' + escapeHtml(q.q) + "</div>";
      html += '<div class="q-form-opts" role="group">';
      q.opts.forEach(function (o, i) {
        var label = typeof o === "string" ? o : o.t;
        var sel = qAnswers[qi] === i ? " selected" : "";
        html += '<button type="button" class="q-form-opt' + sel + '" data-qi="' + qi + '" data-opt="' + i + '">' +
                '<span class="opt-radio" aria-hidden="true"></span><span>' + escapeHtml(label) + "</span></button>";
      });
      html += "</div></div>";
    });
    box.innerHTML = html;

    $$(".q-form-opt", box).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var qi = parseInt(btn.getAttribute("data-qi"), 10);
        qAnswers[qi] = parseInt(btn.getAttribute("data-opt"), 10);
        $$('.q-form-opt[data-qi="' + qi + '"]', box).forEach(function (b) { b.classList.remove("selected"); });
        btn.classList.add("selected");
        updateStandardComplete();
      });
    });
    updateStandardComplete();
    $("#q-prev").disabled = true;
    $("#q-prev").style.display = "none";
  }

  function updateStandardComplete() {
    var qs = QUESTIONS[state.lang];
    var allAnswered = qs.every(function (_, qi) { return qAnswers[qi] != null; });
    var notice = $("#q-complete-notice");
    if (allAnswered) {
      notice.style.display = "block";
      notice.innerHTML = '<div class="notice success"><svg class="n-ico" aria-hidden="true" style="color:var(--ok)"><use href="#i-check"/></svg><span>' + escapeHtml(t("apptQ.complete")) + "</span></div>";
      $("#q-next").disabled = false;
      $("#q-next").textContent = state.lang === "nl" ? "Bekijk advies" : "See my advice";
    } else {
      notice.style.display = "none";
      $("#q-next").disabled = true;
      $("#q-next").textContent = t("nav.next");
    }
  }

  function nextQuestion() {
    if (state.viewMode !== "guided") {
      showView("appt-advice");
      return;
    }
    var qs = QUESTIONS[state.lang];
    if (qAnswers[qIndex] == null) return;
    if (qIndex < qs.length - 1) { qIndex++; renderGuidedQuestion(); }
    else showView("appt-advice");
  }
  function prevQuestion() { if (qIndex > 0) { qIndex--; renderGuidedQuestion(); } }

  function computeAdvice() {
    var qs = QUESTIONS[state.lang];
    // Q2 (index 1): any danger option selected -> urgent
    var a2 = qs[1].opts[qAnswers[1]];
    if (a2 && a2.danger) return "urgent";
    // gather flags
    var flags = {};
    qs.forEach(function (q, i) {
      var o = q.opts[qAnswers[i]];
      if (o && o.flag) flags[o.flag] = true;
    });
    if (flags.severe || flags.long || flags.fever) return "book";
    return "self";
  }
  function renderAdvice() {
    var kind = computeAdvice();
    var a = ADVICE[state.lang][kind];
    var box = $("#appt-advice-content");
    var html = "";
    if (a.cta) {
      html += '<p class="speakable muted">' + escapeHtml(t("apptAdvice.notScheduledPrefix")) +
        ' <strong>&quot;' + escapeHtml(a.cta) + '&quot;</strong> ' +
        escapeHtml(t("apptAdvice.notScheduledSuffix")) + "</p>";
    } else if (kind === "urgent") {
      html += '<p class="speakable muted">' + escapeHtml(t("apptAdvice.notScheduledUrgent")) + "</p>";
    }
    html += '<div class="notice ' + (kind === "urgent" ? "warn" : kind === "book" ? "info" : "success") + '">' +
      '<svg class="n-ico" aria-hidden="true"><use href="#i-' + (kind === "urgent" ? "warn" : kind === "book" ? "info" : "check") + '"/></svg>' +
      '<div><strong class="speakable">' + escapeHtml(a.title) + "</strong>" +
      '<p class="speakable" style="margin:.4rem 0 0">' + escapeHtml(a.body) + "</p></div></div>";
    if (a.tips) {
      html += '<div class="card"><ul>';
      a.tips.forEach(function (tip) { html += '<li class="speakable">' + escapeHtml(tip) + "</li>"; });
      html += "</ul></div>";
    }
    var callText = kind === "urgent"
      ? (state.lang === "nl" ? "Bel de praktijk:" : "Call the practice:")
      : kind === "book"
      ? (state.lang === "nl" ? "Vragen? Bel de praktijk:" : "Questions? Call the practice:")
      : (state.lang === "nl" ? "Toch liever bellen? Bel de praktijk:" : "Prefer to call instead? Call the practice:");
    html += '<div class="call-hatch"><svg class="n-ico" aria-hidden="true" style="color:var(--magenta)"><use href="#i-phone"/></svg>' +
      '<span class="speakable">' + callText + '</span>' +
      '<a href="tel:0725613913">072-561 3913</a></div>';
    if (a.cta) {
      html += '<button class="btn block" id="btn-to-slots" style="margin-top:1rem">' + escapeHtml(a.cta) + "</button>";
    }
    box.innerHTML = html;
    if ($("#btn-to-slots")) $("#btn-to-slots").addEventListener("click", function () { showView("appt-slots"); });
    refreshSpeakButtons();
  }

  /* ---------------- Slots ---------------- */
  function renderSlots() {
    chosenDay = null; chosenTime = null;
    var s = SLOTS[state.lang];
    var dayBox = $("#slot-days"), timeBox = $("#slot-times");
    dayBox.innerHTML = ""; timeBox.innerHTML = "";
    s.days.forEach(function (d) { dayBox.appendChild(makeSlot(d, "day")); });
    s.times.forEach(function (tm) { timeBox.appendChild(makeSlot(tm, "time")); });
    $("#btn-book").disabled = true;
  }
  function makeSlot(label, kind) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "slot"; b.textContent = label;
    b.addEventListener("click", function () {
      var siblings = kind === "day" ? $$("#slot-days .slot") : $$("#slot-times .slot");
      siblings.forEach(function (x) { x.classList.remove("selected"); });
      b.classList.add("selected");
      if (kind === "day") chosenDay = label; else chosenTime = label;
      $("#btn-book").disabled = !(chosenDay && chosenTime);
    });
    return b;
  }

  /* ---------------- Medicines order flow ---------------- */
  function medicineLabel(id) {
    if (id === "salbutamol") return t("meds.med1");
    if (id === "lisinopril") return t("meds.med2");
    if (id === "other") return (chosenMedicineOther || "").trim() + " " + t("meds.notOnList");
    if (id === "unsure") return t("meds.toDiscuss");
    return "";
  }
  function pickupLabel(id) {
    if (id === "koedijk") return t("meds.pickup1") + " - " + t("meds.pickup1d");
    if (id === "alkmaar") return t("meds.pickup2") + " - " + t("meds.pickup2d");
    if (id === "gp") return t("meds.pickup3") + " - " + t("meds.pickup3d");
    return "";
  }
  function updateMedsWhatNext() {
    var ok = chosenMedicines.length > 0;
    if (ok && chosenMedicines.indexOf("other") !== -1) ok = !!(chosenMedicineOther && chosenMedicineOther.trim());
    $("#meds-what-next").disabled = !ok;
  }
  function selectMedicine(id) {
    var i = chosenMedicines.indexOf(id);
    if (i === -1) chosenMedicines.push(id); else chosenMedicines.splice(i, 1);
    $$(".med-choice").forEach(function (b) {
      var isSelected = chosenMedicines.indexOf(b.getAttribute("data-med")) !== -1;
      b.classList.toggle("selected", isSelected);
      b.setAttribute("aria-pressed", String(isSelected));
    });
    var otherField = $("#meds-other-field");
    var otherSelected = chosenMedicines.indexOf("other") !== -1;
    if (otherField) otherField.style.display = otherSelected ? "block" : "none";
    if (!otherSelected) chosenMedicineOther = "";
    updateMedsWhatNext();
  }
  function selectPickup(id) {
    chosenPickup = id;
    $$(".pickup-choice").forEach(function (b) {
      b.classList.toggle("selected", b.getAttribute("data-pickup") === id);
    });
    $("#meds-how-next").disabled = !chosenPickup;
  }
  function goMedicineHow() {
    if (!$("#meds-what-next").disabled) showView("meds-how");
  }
  function goMedicineCheck() {
    if (chosenPickup) showView("meds-check");
  }
  function submitMedicine() {
    if (chosenMedicines.length && chosenPickup) showView("meds-confirm");
  }
  function resetMedicineOrder() {
    chosenMedicines = [];
    chosenPickup = null;
    chosenMedicineOther = "";
    $$(".med-choice, .pickup-choice").forEach(function (b) { b.classList.remove("selected"); });
    $$(".med-choice").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
    $("#meds-what-next").disabled = true;
    $("#meds-how-next").disabled = true;
    var otherField = $("#meds-other-field");
    if (otherField) otherField.style.display = "none";
    var otherInput = $("#meds-other-input");
    if (otherInput) otherInput.value = "";
  }
  function medicinesSummaryHtml() {
    return '<p class="speakable"><strong>' + escapeHtml(t("meds.summaryMedicine")) + "</strong></p>" +
      "<ul>" + chosenMedicines.map(function (id) {
        return '<li class="speakable">' + escapeHtml(medicineLabel(id)) + "</li>";
      }).join("") + "</ul>";
  }
  function renderMedicineCheck() {
    var box = $("#meds-check-summary");
    if (!box) return;
    if (!chosenMedicines.length || !chosenPickup) {
      showView(!chosenMedicines.length ? "meds-what" : "meds-how");
      return;
    }
    box.innerHTML = medicinesSummaryHtml() +
      '<p class="speakable"><strong>' + escapeHtml(t("meds.summaryPickup")) + "</strong> " +
      escapeHtml(pickupLabel(chosenPickup)) + "</p>";
    refreshSpeakButtons();
  }
  function renderMedicineConfirm() {
    var box = $("#meds-confirm-summary");
    if (!box) return;
    if (!chosenMedicines.length || !chosenPickup) { box.innerHTML = ""; return; }
    box.innerHTML = medicinesSummaryHtml() +
      '<p class="speakable"><strong>' + escapeHtml(t("meds.summaryPickup")) + "</strong> " +
      escapeHtml(pickupLabel(chosenPickup)) + "</p>";
    refreshSpeakButtons();
  }

  window.MGSelectMedicine = selectMedicine;
  window.MGSelectPickup = selectPickup;
  window.MGGoMedicineHow = goMedicineHow;
  window.MGGoMedicineCheck = goMedicineCheck;
  window.MGSubmitMedicine = submitMedicine;

  /* ---------------- Chat (ask the GP / pharmacy) flow ---------------- */
  var CHAT_CATEGORY_KEYS = {
    "new": "chatCategory.opt1", before: "chatCategory.opt2",
    prescription: "chatCategory.opt3", results: "chatCategory.opt4", other: "chatCategory.opt5"
  };
  var CHAT_FORM_CHIPS = {
    en: {
      "new": ["New complaint", "General question"],
      before: ["Follow-up on an earlier visit", "Result of treatment"],
      prescription: ["Repeat prescription Salbutamol", "Repeat prescription Lisinopril"],
      results: ["Blood test result", "Hospital test result"],
      other: ["Skin rash", "Something else"]
    },
    nl: {
      "new": ["Nieuwe klacht", "Algemene vraag"],
      before: ["Vervolg op eerder consult", "Resultaat van behandeling"],
      prescription: ["Herhaalrecept Salbutamol", "Herhaalrecept Lisinopril"],
      results: ["Uitslag bloedonderzoek", "Uitslag ziekenhuisonderzoek"],
      other: ["Huiduitslag", "Iets anders"]
    }
  };
  function chatRecipientLabel(rec) {
    return rec === "pharmacy" ? t("chatLabel.pharmacy") : t("chatLabel.gp");
  }
  function chatCategoryLabel(cat) {
    return t(CHAT_CATEGORY_KEYS[cat] || "chatCategory.opt5");
  }
  function computeReplyByDate() {
    var d = new Date();
    var added = 0;
    while (added < 2) {
      d.setDate(d.getDate() + 1);
      var day = d.getDay();
      if (day !== 0 && day !== 6) added++;
    }
    var locale = state.lang === "nl" ? "nl-NL" : "en-GB";
    return d.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" });
  }
  function selectChatRecipient(rec) {
    chosenChatRecipient = rec;
    showView("chat-category");
  }
  function selectChatCategory(cat) {
    chosenChatCategory = cat;
    $$(".chat-cat-choice").forEach(function (b) {
      b.classList.toggle("selected", b.getAttribute("data-cat") === cat);
    });
    $("#chat-category-next").disabled = false;
  }
  function renderChatFormChips() {
    var box = $("#chat-subject-chips");
    if (!box) return;
    var list = (CHAT_FORM_CHIPS[state.lang] && CHAT_FORM_CHIPS[state.lang][chosenChatCategory]) || CHAT_FORM_CHIPS[state.lang].other;
    box.innerHTML = "";
    list.forEach(function (label) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip";
      btn.textContent = label;
      btn.addEventListener("click", function () {
        $("#chat-subject").value = label;
        $("#chat-subject").focus();
        chatSubjectAutoFilled = true;
      });
      box.appendChild(btn);
    });
  }
  function goChatForm() {
    if (!chosenChatCategory) return;
    var subjectInput = $("#chat-subject");
    if (subjectInput && (!subjectInput.value.trim() || chatSubjectAutoFilled)) {
      subjectInput.value = chatCategoryLabel(chosenChatCategory);
      chatSubjectAutoFilled = true;
    }
    renderChatFormChips();
    showView("chat-form");
  }
  function resetChatFlow() {
    chosenChatRecipient = null;
    chosenChatCategory = null;
    chatSubjectAutoFilled = false;
    $$(".chat-cat-choice").forEach(function (b) { b.classList.remove("selected"); });
    var next = $("#chat-category-next");
    if (next) next.disabled = true;
    $("#chat-subject").value = "";
  }
  function renderChatReview() {
    var box = $("#chat-review-summary");
    if (!box) return;
    var subject = $("#chat-subject").value.trim();
    var message = $("#chat-message").value.trim();
    var files = $("#chat-attachment").files;
    var fileName = files && files[0] ? files[0].name : "";
    box.innerHTML =
      '<p class="speakable"><strong>' + escapeHtml(t("chatReview.to")) + "</strong> " + escapeHtml(chatRecipientLabel(chosenChatRecipient)) + "</p>" +
      '<p class="speakable"><strong>' + escapeHtml(t("chatReview.about")) + "</strong> " + escapeHtml(chatCategoryLabel(chosenChatCategory)) + "</p>" +
      '<p class="speakable"><strong>' + escapeHtml(t("chatReview.subject")) + "</strong> " + escapeHtml(subject || t("chatReview.noSubject")) + "</p>" +
      '<p class="speakable"><strong>' + escapeHtml(t("chatReview.message")) + "</strong> " + escapeHtml(message) + "</p>" +
      '<p class="speakable"><strong>' + escapeHtml(t("chatReview.attachment")) + "</strong> " + escapeHtml(fileName || t("chatReview.noAttachment")) + "</p>";
    refreshSpeakButtons();
  }
  function renderChatConfirm() {
    var box = $("#chat-confirm-summary");
    if (!box) return;
    box.innerHTML =
      '<p class="speakable"><strong>' + escapeHtml(t("chatReview.to")) + "</strong> " + escapeHtml(chatRecipientLabel(chosenChatRecipient)) + "</p>" +
      '<p class="speakable"><strong>' + escapeHtml(t("chatReview.about")) + "</strong> " + escapeHtml(chatCategoryLabel(chosenChatCategory)) + "</p>" +
      '<p class="speakable"><strong>' + escapeHtml(t("chatConfirm.replyBy")) + "</strong> " + escapeHtml(computeReplyByDate()) + "</p>";
    refreshSpeakButtons();
  }
  function submitChat() {
    $("#chat-subject").value = "";
    $("#chat-message").value = "";
    $("#chat-attachment").value = "";
    showView("chat-confirm");
  }

  window.MGSelectChatRecipient = selectChatRecipient;
  window.MGSelectChatCategory = selectChatCategory;
  window.MGGoChatForm = goChatForm;
  window.MGSubmitChat = submitChat;

  /* ---------------- Guided tour ---------------- */
  var tour = { steps: [], i: 0, active: false, speak: false };
  function startTour(withSpeak) {
    var viewName = ($(".view.is-active") || {}).getAttribute ? $(".view.is-active").getAttribute("data-view") : "home";
    var tourKey = (state.viewMode === "guided" && viewName === "home") ? "guided-home" : viewName;
    var set = (TOURS[state.lang] && TOURS[state.lang][tourKey]) || (TOURS[state.lang] && TOURS[state.lang].home);
    if (!set) return;
    tour.steps = set; tour.i = 0; tour.active = true; tour.speak = !!withSpeak;
    $("#tour-dim").classList.add("is-open");
    showTourStep();
  }
  function showTourStep() {
    var step = tour.steps[tour.i];
    var target = $(step.sel);
    if (!target) {
      if (tour.i < tour.steps.length - 1) { tour.i++; showTourStep(); return; }
      endTour(); return;
    }
    var r = target.getBoundingClientRect();
    var top = r.top + window.scrollY, left = r.left + window.scrollX;
    var hl = $("#tour-highlight");
    hl.style.display = "block";
    hl.style.top = (top - 6) + "px"; hl.style.left = (left - 6) + "px";
    hl.style.width = (r.width + 12) + "px"; hl.style.height = (r.height + 12) + "px";

    var tip = $("#tour-tip");
    tip.style.display = "block";
    $("#tour-text").textContent = step.t;
    $("#tour-step").textContent = (tour.i + 1) + " / " + tour.steps.length;
    $("#tour-back").style.visibility = tour.i === 0 ? "hidden" : "visible";
    $("#tour-next").textContent = tour.i === tour.steps.length - 1 ? (state.lang === "nl" ? "Klaar" : "Done") : t("nav.next");
    // place tip below the target, or above if no room
    var tipTop = top + r.height + 14;
    if (tipTop + 160 > window.scrollY + window.innerHeight) tipTop = Math.max(top - 170, window.scrollY + 10);
    var tipLeft = Math.min(left, window.innerWidth - 340);
    tip.style.top = tipTop + "px"; tip.style.left = Math.max(10, tipLeft) + "px";
    target.scrollIntoView({ block: "center", behavior: "smooth" });
    if (tour.speak) speak(step.t);
  }
  function endTour() {
    tour.active = false; tour.speak = false;
    stopSpeaking();
    $("#tour-dim").classList.remove("is-open");
    $("#tour-highlight").style.display = "none";
    $("#tour-tip").style.display = "none";
  }

  /* ---------------- Step-by-step walkthrough (idle popup, no overlay) ---------------- */
  var wt = { steps: [], i: 0, active: false };
  function startWalkthrough() {
    var viewName = ($(".view.is-active") || {}).getAttribute ? $(".view.is-active").getAttribute("data-view") : "home";
    var tourKey = (state.viewMode === "guided" && viewName === "home") ? "guided-home" : viewName;
    wt.steps = (TOURS[state.lang] && TOURS[state.lang][tourKey]) || (TOURS[state.lang] && TOURS[state.lang]["guided-home"]) || [];
    if (!wt.steps.length) return;
    wt.i = 0; wt.active = true;
    wtStep();
  }
  function wtStep() {
    clearWtHighlight();
    if (!wt.active || wt.i >= wt.steps.length) { wt.active = false; return; }
    var step = wt.steps[wt.i];
    var target = $(step.sel);
    if (target) {
      target.classList.add("wt-highlight");
      target.scrollIntoView({ block: "center", behavior: "smooth" });
    }
    if (!("speechSynthesis" in window)) {
      wt.i++; setTimeout(wtStep, 2000); return;
    }
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(step.t.replace(/\s+/g, " ").trim());
    u.lang = state.lang === "nl" ? "nl-NL" : "en-US";
    var voices = window.speechSynthesis.getVoices();
    var match = voices.filter(function (v) { return v.lang && v.lang.toLowerCase().indexOf(u.lang.slice(0, 2)) === 0; })[0];
    if (match) u.voice = match;
    u.rate = 0.9;
    u.onend = function () { clearWtHighlight(); wt.i++; setTimeout(wtStep, 400); };
    u.onerror = function () { clearWtHighlight(); wt.i++; setTimeout(wtStep, 400); };
    window.speechSynthesis.speak(u);
  }
  function clearWtHighlight() {
    $$(".wt-highlight").forEach(function (el) { el.classList.remove("wt-highlight"); });
  }
  function stopWalkthrough() {
    wt.active = false;
    clearWtHighlight();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  /* ---------------- helpers ---------------- */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------------- Wire up events ---------------- */
  function init() {
    // restore persisted state
    applyLang(); applySize(); applyContrast(); applyReadaloud(); applyNotes();
    document.documentElement.setAttribute("data-current-view", "home");

    // navigation buttons (data-go)
    document.addEventListener("click", function (e) {
      var nav = e.target.closest("[data-go]");
      if (nav) {
        if (nav.id === "meds-order-btn") resetMedicineOrder();
        if (nav.id === "tile-chat" || nav.id === "gtile-chat") resetChatFlow();
        showView(nav.getAttribute("data-go"));
        return;
      }
      // click-to-read on any speakable text (when read-aloud on)
      if (state.readaloud) {
        var sp = e.target.closest(".speakable");
        if (sp && !e.target.closest(".speak-btn") && !e.target.closest("button")) speakElement(sp);
      }
    });

    // language
    $$("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.lang = b.getAttribute("data-lang");
        LS.setItem("mg_lang", state.lang);
        applyLang();
        // re-render dynamic views in the new language
        var active = ($(".view.is-active") || {}).getAttribute && $(".view.is-active").getAttribute("data-view");
        if (active === "appt-q") renderQuestion();
        if (active === "appt-advice") renderAdvice();
        if (active === "appt-slots") renderSlots();
        if (active === "meds-check") renderMedicineCheck();
        if (active === "meds-confirm") renderMedicineConfirm();
        if (active === "chat-form") renderChatFormChips();
        if (active === "chat-review") renderChatReview();
        if (active === "chat-confirm") renderChatConfirm();
      });
    });

    // text size
    $$("[data-size]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.size = b.getAttribute("data-size");
        LS.setItem("mg_size", state.size);
        applySize();
      });
    });

    // contrast
    $("#btn-contrast").addEventListener("click", function () {
      state.contrast = !state.contrast;
      LS.setItem("mg_contrast", state.contrast ? "1" : "0");
      applyContrast();
    });

    // read aloud
    $("#btn-readaloud").addEventListener("click", function () {
      state.readaloud = !state.readaloud;
      LS.setItem("mg_readaloud", state.readaloud ? "1" : "0");
      if (!state.readaloud) stopSpeaking();
      applyReadaloud();
    });
    $("#btn-stopspeak").addEventListener("click", stopSpeaking);

    // change notes (sticky notes) toggle
    $("#btn-notes").addEventListener("click", function () {
      state.notesOn = !state.notesOn;
      LS.setItem("mg_notes", state.notesOn ? "1" : "0");
      applyNotes();
    });

    // questionnaire nav
    $("#q-next").addEventListener("click", nextQuestion);
    $("#q-prev").addEventListener("click", prevQuestion);

    // slots booking
    $("#btn-book").addEventListener("click", function () {
      var when = (chosenDay || "") + ", " + (chosenTime || "");
      $("#confirm-when").textContent = when;
      showView("appt-confirm");
    });

    // medicines order flow
    $$(".pickup-choice").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        selectPickup(btn.getAttribute("data-pickup"));
      });
    });
    $("#meds-what-next").addEventListener("click", function () {
      goMedicineHow();
    });
    $("#meds-how-next").addEventListener("click", function () {
      goMedicineCheck();
    });
    $("#meds-submit").addEventListener("click", function () {
      submitMedicine();
    });
    $("#meds-other-input").addEventListener("input", function () {
      chosenMedicineOther = this.value;
      updateMedsWhatNext();
    });

    $("#chat-subject").addEventListener("input", function () {
      chatSubjectAutoFilled = false;
    });

    // chat: review (with validation), then confirm-and-send is wired via MGSubmitChat
    $("#btn-send-chat").addEventListener("click", function () {
      var msg = $("#chat-message").value.trim();
      var err = $("#chat-error");
      if (!msg) { err.style.display = "block"; $("#chat-message").focus(); return; }
      err.style.display = "none";
      showView("chat-review");
    });

    // login / view-chooser / logout
    var loginOverlay   = $("#login-overlay");
    var chooserOverlay = $("#view-chooser");
    var welcomeOverlay = $("#welcome-overlay");

    function showLogin() {
      loginOverlay.classList.add("is-open");
      chooserOverlay.classList.remove("is-open");
      welcomeOverlay.classList.remove("is-open");
      var inp = $("#login-name");
      if (inp) { inp.value = ""; setTimeout(function(){ inp.focus(); }, 50); }
    }

    function applyUser(name) {
      var el = $("#display-name");
      if (el) el.textContent = name;
    }

    function applyViewPreference(pref) {
      state.viewMode = pref;
      document.documentElement.setAttribute("data-view-mode", pref);
      if (pref === "guided") {
        state.size = "1.4";
        LS.setItem("mg_size", state.size);
        applySize();
        state.readaloud = true;
        LS.setItem("mg_readaloud", "1");
        applyReadaloud();
        // guided mode always has high contrast enabled
        state.contrast = true;
        LS.setItem("mg_contrast", "1");
        applyContrast();
      } else {
        state.size = "1";
        LS.setItem("mg_size", state.size);
        applySize();
        state.readaloud = false;
        LS.setItem("mg_readaloud", "0");
        applyReadaloud();
      }
      updateModeIndicator();
      updateWelcomeCopy();
    }

    function openChooser() {
      chooserOverlay.classList.add("is-open");
      $("#choose-standard").focus();
    }

    function openWelcome() {
      updateWelcomeCopy();
      welcomeOverlay.classList.add("is-open");
    }

    function pickView(pref) {
      LS.setItem("mg_view", pref);
      applyViewPreference(pref);
      chooserOverlay.classList.remove("is-open");
      if (!LS.getItem("mg_welcomed")) openWelcome();
    }

    $("#choose-standard").addEventListener("click", function() { pickView("standard"); });
    $("#choose-guided").addEventListener("click",   function() { pickView("guided"); });

    function doLogin() {
      var name = $("#login-name").value.trim();
      var err  = $("#login-error");
      if (!name) { err.style.display = "block"; $("#login-name").focus(); return; }
      err.style.display = "none";
      LS.setItem("mg_user", name);
      applyUser(name);
      loginOverlay.classList.remove("is-open");
      openChooser();
    }

    $("#btn-login").addEventListener("click", doLogin);
    $("#login-name").addEventListener("keydown", function(e){ if (e.key === "Enter") doLogin(); });
    $("#login-pass").addEventListener("keydown", function(e){ if (e.key === "Enter") doLogin(); });

    $("#btn-logout").addEventListener("click", function () {
      LS.removeItem("mg_user");
      LS.removeItem("mg_welcomed");
      LS.removeItem("mg_view");
      showLogin();
    });

    // boot: restore session or show login
    var savedUser = LS.getItem("mg_user");
    if (savedUser) {
      applyUser(savedUser);
      var savedView = LS.getItem("mg_view");
      if (savedView) {
        applyViewPreference(savedView);
      } else {
        openChooser();
      }
    } else {
      showLogin();
    }

    // welcome card
    var overlay = welcomeOverlay;
    if (!LS.getItem("mg_welcomed") && LS.getItem("mg_user") && LS.getItem("mg_view")) openWelcome();
    $("#welcome-close").addEventListener("click", function () {
      overlay.classList.remove("is-open");
      LS.setItem("mg_welcomed", "1");
    });

    // settings view — mode chooser buttons
    $("#settings-std").addEventListener("click", function() {
      pickView("standard"); showView("home");
    });
    $("#settings-guided").addEventListener("click", function() {
      pickView("guided"); showView("home");
    });

    // ---- Help overlay (triggered from idle popup) ----
    $("#help-close").addEventListener("click", function() {
      $("#help-overlay").classList.remove("is-open");
    });

    // ---- Highlight next action ----
    var PRIMARY_SEL = {
      "home":          function() { return state.viewMode === "guided" ? ".guided-tile:not([disabled])" : ".tile:not([disabled])"; },
      "appt-landing":  function() { return ".action-btn:not([disabled])"; },
      "appt-intro":    function() { return "#btn-start-q"; },
      "appt-q":        function() { return "#q-next"; },
      "appt-advice":   function() { return ".btn:not([disabled])"; },
      "appt-slots":    function() { return "#btn-book"; },
      "appt-confirm":  function() { return ".btn[data-go='home']"; },
      "meds-home":     function() { return "#meds-order-btn"; },
      "meds-what":     function() { return "#meds-what-next"; },
      "meds-how":      function() { return "#meds-how-next"; },
      "meds-check":    function() { return "#meds-submit"; },
      "meds-confirm":  function() { return ".btn[data-go='home']"; },
      "chat-type":     function() { return "#chat-recipient-gp"; },
      "chat-category": function() { return "#chat-category-next"; },
      "chat-form":     function() { return "#btn-send-chat"; },
      "chat-review":   function() { return "#btn-confirm-chat"; },
      "chat-confirm":  function() { return ".btn[data-go='home']"; },
      "settings":      function() { return ".chooser-opt"; }
    };
    function highlightNextAction() {
      var view = ($(".view.is-active") || {}).getAttribute && $(".view.is-active").getAttribute("data-view") || "home";
      var fn = PRIMARY_SEL[view] || function() { return ".btn:not([disabled])"; };
      var el = $(fn());
      if (!el) return;
      $$(".action-highlight").forEach(function(x) { x.classList.remove("action-highlight"); });
      el.classList.add("action-highlight");
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      setTimeout(function() { el.classList.remove("action-highlight"); }, 4000);
    }

    // ---- Idle timer (guided mode only, 45 s) ----
    var idleTimer = null;
    var IDLE_MS = 45000;
    function resetIdle() {
      clearTimeout(idleTimer);
      if (state.viewMode !== "guided") return;
      if ($("#idle-popup").classList.contains("is-open")) return;
      idleTimer = setTimeout(function() {
        applyLang();
        $("#idle-popup").classList.add("is-open");
        var focusBtn = $("#idle-show");
        if (focusBtn) setTimeout(function(){ focusBtn.focus(); }, 60);
      }, IDLE_MS);
    }
    ["click","keydown","scroll","touchstart"].forEach(function(evt) {
      document.addEventListener(evt, resetIdle, { passive: true });
    });
    var mouseMoveDebounce = null;
    document.addEventListener("mousemove", function() {
      if (!mouseMoveDebounce) {
        mouseMoveDebounce = setTimeout(function() { resetIdle(); mouseMoveDebounce = null; }, 500);
      }
    }, { passive: true });

    $("#idle-show").addEventListener("click", function() {
      $("#idle-popup").classList.remove("is-open");
      showView("home");
      setTimeout(startWalkthrough, 150);
      resetIdle();
    });
    $("#idle-read").addEventListener("click", function() {
      $("#idle-popup").classList.remove("is-open");
      var view = ($(".view.is-active") || {}).getAttribute && $(".view.is-active").getAttribute("data-view") || "home";
      speak(t("help." + view) || t("help.home"));
      resetIdle();
    });
    $("#idle-continue").addEventListener("click", function() {
      $("#idle-popup").classList.remove("is-open");
      resetIdle();
    });

    // start idle timer once view preference is known
    resetIdle();

    // tour controls
    $("#btn-tour").addEventListener("click", startWalkthrough);
    $("#tour-close").addEventListener("click", endTour);
    $("#tour-next").addEventListener("click", function () {
      if (tour.i < tour.steps.length - 1) { tour.i++; showTourStep(); } else endTour();
    });
    $("#tour-back").addEventListener("click", function () {
      if (tour.i > 0) { tour.i--; showTourStep(); }
    });
    window.addEventListener("resize", function () { if (tour.active) showTourStep(); });

    // voices may load late
    if ("speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = function () {};
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

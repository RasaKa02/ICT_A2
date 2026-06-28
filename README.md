# Inclusive Healthcare Portal — Prototype (target group: elderly)

A mid-fidelity, clickable prototype of a Dutch GP portal (modelled on **MijnGezondheid.net**),
redesigned so **elderly users** can independently complete core healthcare tasks online.

## How to run / demo
- **Easiest:** double-click `index.html` to open it in your browser (Chrome or Edge recommended,
  because they have the best built-in text-to-speech voices).
- **Like a hosted site (optional):** from this folder run `python -m http.server 8000`, then open
  <http://localhost:8000>.
- **Shareable link for the report:** push this folder to a GitHub repo and enable **GitHub Pages**
  (Settings → Pages → deploy from `main`/root). The site URL is your prototype link.

> Read-aloud uses the browser's Web Speech API. If you hear no voice in Firefox, use Chrome/Edge.
> Settings (language, text size, contrast, read-aloud) are remembered via `localStorage`; to see
> the first-visit welcome card again, clear site data or open a private window.

## The 3 use cases
1. **Make an appointment:**  the original portal's hostile 10+ question questionnaire is redesigned
   into a guided, *one-question-per-screen* flow that ends in **personalised advice** (call now /
   book an appointment / self-care) and always shows the practice's phone number, with an
   appointment day+time picker. An appointment can also be booked directly from the "Ask the GP /
   pharmacy" entry point, for users who'd rather not write a message.
2. **Order medicines:** request repeat medication through a what/how/check flow. The medicine
   step also covers "my medicine isn't on this list" and "I'm not sure which medicine I need",
   shows plain-language usage instructions, and makes clear the check step is an overview only
   (nothing is sent until you submit).
3. **Ask the GP / pharmacy:** asking the GP and asking the pharmacy are separate starting choices,
   followed by a topic picker, a guided message form, and a review step before anything is sent.

**For clarity, what can actually be done in this prototype:**
- Make an appointment: open the "Make and view appointments" tile → Start the questions → answer
  the short questionnaire (guided or standard view) → see personalised advice (with a phone number
  shown regardless of outcome) → (if needed) choose a day and time and confirm. The app shows a
  confirmation screen with the appointment summary.
- Order medicines: open "My medicines" → choose "Order medicines" → choose a prescription
  medicine (or "not in this list" / "not sure") → see how to use it → choose where to pick it up →
  check the summary (clearly marked as not yet sent) → submit the order. The app shows a
  confirmation page with a summary of the choices and a phone number to call about mistakes.
- Ask the GP / pharmacy: open "Ask the GP / pharmacy" → choose GP or pharmacy (or make an
  appointment instead) → choose what the question is about → write a subject and message →
  optionally attach a file → review everything on a check screen → "Confirm and send" →
  confirmation screen with a concrete reply-by date. (No backend delivery; this is a prototype
  flow.)

(Note that the sign in part is just there for display, you can put in any name and it will work)

## Inclusive design features (what's actually implemented)
The prototype focuses on three accessibility supports: a lightweight accessibility bar, a
Settings screen with persistent preferences, and an explicit "guided" view that enables
multiple accessibility defaults.

- **Accessibility bar (top of every screen):** the bar contains a `Read aloud` toggle, a
  `Step by step instructions` button (guided tour / walkthrough), and a hidden `Stop reading`
  control that is shown when read-aloud is active. It does NOT contain live language or text-size
  controls — those live in the Settings view (see below).
- **Settings:** language selection (NL / EN), a contrast toggle, and a view chooser (Standard vs
  Guided). Language and contrast are persisted in `localStorage` and applied immediately when
  changed. Larger text is provided
  by selecting the Guided view.
- **Guided view:** an accessibility-first mode that automatically enables larger text,
  bigger buttons, high-contrast tiles, read-aloud, and the idle help prompt. It is selectable
  from the initial view chooser (upon sign in) or via `Settings → Begeleide weergave`.
- **Read-aloud:** uses the browser Web Speech API. When enabled, speakable elements in the
  active view get a small speaker button; clicking the speaker (or clicking the speakable area)
  reads the visible text. Speech voices are provided by the browser and availability depends on
  the user agent (Chrome / Edge usually have the best built-in voices).
- **Step-by-step help / guided tour:** two related helpers exist:
  - A lightweight walkthrough ("Show me what to do") that highlights controls in sequence and can
    optionally read the step text aloud.
  - A tour overlay that focuses a target element, shows a tip, and provides next/previous controls.

Other small accessibility details included in the UI: visible keyboard focus outlines, large
tap/click targets, icons, and an in-flow "call the practice"
escape hatch on screens that might be difficult to complete.

## Screen → task map 
| Screen (`data-view`) | Part of |
|---|---|
| `home` | Dashboard / entry point |
| `appt-landing` → `appt-intro` → `appt-q` → `appt-advice` → `appt-slots` → `appt-confirm` | Task 1: appointment |
| `meds-home` → `meds-what` → `meds-how` → `meds-check` → `meds-confirm` | Task 2: order medicines |
| `chat-type` → `chat-category` → `chat-form` → `chat-review` → `chat-confirm` | Task 3: ask the GP / pharmacy |

## Files
- `index.html` — all screens as inline `<section data-view>` views + the SVG icon sprite.
- `css/styles.css` — portal styling; font-scale and contrast driven by CSS custom properties.
- `js/app.js` — i18n dictionary, view router, toggles (+ `localStorage`), TTS, questionnaire,
  advice logic, slot picker, medicine order flow, and the guided-tour engine.

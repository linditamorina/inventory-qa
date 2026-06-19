# Inventory Management System - QA Automation

Ky repozitor përmban suitën e testimeve të automatizuara E2E (End-to-End) për **Sistemin e Menaxhimit të Stokut** (Inventory Management System). Qëllimi i këtij projekti është të sigurojë cilësinë dhe stabilitetin e aplikacionit të menaxhimit të inventarit përmes testimeve të vazhdueshme.

## 🛠 Teknologjitë e Përdorura

* **Framework i Testimit:** [Playwright](https://playwright.dev/)
* **Gjuha Programuese:** TypeScript
* **Mjedisi:** Node.js
* **Raportimi:** Playwright HTML Reporter & Jira (për menaxhimin e Bug-eve)
* **CI/CD:** GitHub Actions (Integrim i vazhdueshëm për ekzekutimin automatik të testeve)

## 🧪 Skenarët e Testuar (Test Coverage)

Deri më tani, suita e testimeve mbulon funksionalitetet e mëposhtme:

* **Autentikimi & Siguria (`login.spec.ts` & `auth.setup.ts`):** * Verifikimi i hyrjes me sukses të përdoruesit dhe ruajtja e gjendjes së sesionit (session storage).
* **Navigimi (`sidebar.spec.ts`):** * Testimi i navigimit dinamik nëpër meny (Dashboard, Inventory, Orders, Categories, Reports, Staff).
* **Dashboard (`dashboard.spec.ts`):** * Verifikimi i paraqitjes së të dhënave përmbledhëse dhe grafikëve të stokut.
* **Menaxhimi i Produkteve (`inventory.spec.ts`):**
  * Hapja dhe validimi i modalit "Shto Produkt".
  * Testimi i veprimeve mbi produktet ekzistuese (Edito, Fshije, Historiku).
  * **Modali i Stokut:** Validimi rigoroz i fushës "Sasia", duke u siguruar që sistemi refuzon vlerat negative dhe karakteret eksponenciale (Bug Report i hapur).

## 🚀 Instalimi dhe Ekzekutimi

Për të ekzekutuar këtë projekt në kompjuterin tuaj, ndiqni këta hapa:

1. **Klononi repozitorin:**
```bash
   git clone [https://github.com/linditamorina/inventory-qa.git](https://github.com/linditamorina/inventory-qa.git)
   cd inventory-qa
```
Instaloni dependencat:

Bash
   npm install
   
Instaloni shfletuesit për Playwright:

Bash
   npx playwright install
   
Ekzekutoni testet:

Bash
   npx playwright test
   
Shikoni Raportin e Testimeve (HTML):

Bash
   npx playwright show-report
   
🐛 Raportimi i Gabimeve (Bug Tracking)
Kur testet e Playwright dështojnë për shkak të logjikës së aplikacionit (si p.sh. mungesa e validimit në fushat input), raportet gjenerohen automatikisht. Këto gjetje më pas dokumentohen si "Bug Tickets" në Jira për ekipin e zhvillimit.
Autor: Lindita Morina

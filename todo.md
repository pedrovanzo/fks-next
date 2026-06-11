# Temporary
 This is a temporary to-do list to add the following core concepts, execute tasks and think about MVP features.
## Imediate tasks:

* componentize the structures that are confirmed on the MVP.
* UI: add a grid or list view option.
## Core concepts to add:

* Connect related folders and links with a "related" label.
* Expand to browser session persistance. Understand how to first.
* Reimagine and implement the predefined folder structure feature (pre built folder structures on one click).
* Internationalization.
* Define most efficient DB and host.
* Gating usage to free and Pro plans.
* Add a standalone handle for each folder and session.
* Add saving and sharing functionalities to session, folders and links.
## Grilling sessions

1. **Terminology** — first of multiple sessions; starts with code names + core functionalities. Subsequent sessions expand as new topics are resolved. Includes tentative Session definition (browser extension tab-capture → Session entity).
2. **MVP scope** — what's in v1, what's post-v1, what's explicitly out of scope. Runs after terminology so Claude knows the domain before scoping.
3. **Data model + structure** — entity relationships, storage shape, cascade rules. Required subtopic: "Related" labels (folder↔link connections).
4. **Database + auth** — DB choice, auth method. Must resolve before Sharing session.
5. **Sharing + standalone handles** — public/private visibility, URI slug design, snapshot vs live shared content, read-only vs collaborative access.
6. **Browser extension** — extension↔app architecture, tab capture into Session, auth handoff, cross-browser compatibility.
7. **Plans + feature gates + payment** — free vs Pro tiers, feature gating strategy, payment system.
8. **i18n** — internationalization approach.
9. **Hosting** — deployment target, infrastructure.
10. **UI/UX** — interface design, patterns, user flows.
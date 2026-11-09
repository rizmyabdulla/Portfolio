---
title: "TellerCat: AI agents for every customer channel"
description: "A look at TellerCat, the AI chat and voice agent platform I'm building: one shared inbox, instant human takeover, and an agent that only answers from what you give it."
date: "2026-11-09"
tags: ["TellerCat", "AI", "Building"]
draft: false
---

Businesses answer customers in a lot of places: WhatsApp, Instagram, email, a website chat box, the phone. Replies slow down. Messages get lost. And the usual fixes are either helpdesks priced per seat, or developer platforms that need engineers to wire everything together.

[TellerCat](https://tellercat.com) is what I'm building to close that gap. A business puts an AI agent on its customer channels, with its own team always **one click away**.

TellerCat is still in development and isn't open to customers yet. This post is about what I'm building and why.

## The idea in one line

> AI agents for every channel: chat and voice, one shared inbox.

It's meant to work for any business and any team size, from a single owner to a bigger team or an agency. A salon, a shop, a clinic or a law firm should all be able to use it the same way.

## From website to working agent

I set myself a goal that shapes everything else: **a working agent in about 15 minutes**, starting from nothing but a website.

1. **Paste your website** (or upload documents, or a few FAQs). TellerCat builds the knowledge base and a ready agent.
2. **Test it in the chat.** Every answer shows where it came from.
3. **Connect your channels.** WhatsApp, Instagram, email, or a one-line web chat script.

There are no flow charts to draw and no developers needed to get started.

## One thread per customer

A customer might message on WhatsApp on Monday, email on Tuesday, and phone on Friday. In TellerCat those become **one history**. Chats, emails and call transcripts join the same thread when the phone number or verified email matches, and nothing is merged on a guess.

Channels use the official APIs with the business's own accounts. No shared numbers, and no unofficial WhatsApp connectors that risk getting an account banned.

## An agent that doesn't make things up

This is the principle I'm most stubborn about. The agent answers only from what you give it: your website, your documents, your FAQs and your connected tools. When it can't answer, it says so.

- **Sources on every answer**, so you can see where it came from.
- **Guardrails** for topics to refuse and price or discount limits, and human approval before sensitive actions.
- **One-click learning:** questions the agent couldn't answer can be added to the knowledge base straight away.

## Your team, one click away

The AI should know when to step aside. It hands over to a person when:

- the customer asks for one
- they sound upset
- the answer isn't in the knowledge base
- a rule you've set matches
- a tool fails or the customer keeps repeating themselves

Anyone on the team can also step into any conversation at any time, with an AI summary of what's happened so far. Staff work in a shared inbox with notes, @mentions and canned replies.

## Voice, too

The phone matters. The voice agent uses the same instructions, tools and knowledge as the chat agent, so a call's transcript and summary land in the same customer thread. If a call needs a person, it's transferred with a short spoken summary, so the customer doesn't have to start over.

Voice has two engine modes. **Standard** is the default, and is best when exact wording and complete transcripts matter. **Native** (in beta) is one realtime speech model, for a more natural flow. Call recording is off by default, and callers hear a notice first when it's on.

## Workflows, insights and languages

Around the core, there's a lot designed to keep things practical:

- **Workflows** such as reminders that stop when the customer replies, appointment and order updates, and approval steps
- **Insights** on resolution rate, handoff reasons, cost per agent and channel, and response times
- **20 languages** in chat and voice at launch, with replies in the customer's own language
- **Integrations** with Google Calendar, Google Sheets, Shopify, WooCommerce, Stripe and HubSpot

## How I'm building it

Under the hood, the pieces I picked are deliberately boring and well-proven. Chatwoot handles channels and conversations. My own backend, built with Python and FastAPI, runs the agents, billing and tenants. LiveKit Agents runs both text and voice turns, Temporal handles durable work like reminders and campaigns, and Postgres with pgvector stores the knowledge. Staff only ever see TellerCat's own web app.

TellerCat is being built as one complete platform and tested thoroughly before any customer uses it, which is why you can't sign up for it today.

## Pricing and what's next

Prices aren't published yet. They'll be set from real measured costs. The plan is flat monthly fees with included conversations and voice minutes, no per-seat charge for the AI, and a monthly cost cap you control, so a bill can at most double.

If you'd like to hear when it opens, you can join the early-access list at [tellercat.com](https://tellercat.com). It's a single email when it's ready.

Got thoughts or a use case in mind? [Say hello](mailto:rizmyabdulla@gmail.com).

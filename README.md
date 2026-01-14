# Parafin Elements Quickstart

[Parafin Widget](https://docs.parafin.com/capital/present-offers/embedded/reference) is a React component available via the `@parafin/react` npm package that allows you to embed Parafin’s capital experience directly within your app.

This project demonstrates Parafin’s embedded capital UI and showcases four Flex Loan lifecycle states using Parafin’s sandbox APIs.

![Parafin Widget preview](/img/elements-preview.gif)

## Overview

The app renders Parafin’s embedded capital widget and allows switching between predefined scenarios, each representing a different stage of the Flex Loan lifecycle:

- No offers available
- Pre-approved offer available
- Capital on its way
- Offer accepted with outstanding balance

Each scenario is backed by a different personId configured in sandbox.

## Prerequisites

- Access to a [Parafin dashboard](https://dashboard.parafin.com)
- [Node.js](https://nodejs.org/en/)

## Instructions

### 1. Clone the repository

First, clone the quickstart repository and install dependencies:

```bash
$ git clone https://github.com/montythind1/parafin-demo.git
$ cd parafin-demo
$ npm install
```

### 2. Configure API credentials

Rename the sample.env file to .env.

The sample file contains placeholder values based on sandbox usage.

```bash
$ mv sample.env .env
```

### 3. Run the app

Start the application:

In the project directory, run:

```bash
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app with an embedded Parafin Widget in your browser.

## Flex Loan UI States — How Each State Is Simulated

Each state is represented by a different sandbox Person and corresponding Parafin setup.

### Common setup (all states)

For every scenario, the following entities exist:

- **Business**
- **Person**, linked to the business as an owner or representative

A bank account is only required during the application step.

### 1. No Offers Available

**How it’s triggered**
- Business and Person are created
- No capital product offer is generated

**UI result**
- No loan offers displayed
- No “Apply now” call-to-action

Represents a merchant that exists but is not yet eligible for capital.

### 2. Pre-Approved Offer Available

**How it’s triggered**
- Business and Person are created
- A pre-approved offer is generated using the sandbox API:  
``` POST /v1/sandbox/capital_product_offers ```

**UI result**
- Pre-approved Flex Loan displayed
- “Apply now” call-to-action visible

Represents a merchant that has passed underwriting and is eligible to apply.

### 3. Capital on Its Way

**How it’s triggered**
- Start from a pre-approved offer
- User clicks “Apply now” in the embedded widget
- Bank account is provided during the application
- Application is manually approved in sandbox:  
``` POST /v1/sandbox/capital_product_application/{id}/approve ```

**UI result**
- Offer accepted
- Status transitions to “Capital on its way”

### 4. Offer Accepted, Outstanding Balance

**How it’s triggered**
- Start from “Capital on its way”
- Capital product is funded using the sandbox API:  
``` POST /v1/sandbox/fund_capital_product ```

**UI result**
- Capital summary displayed
- Outstanding balance visible
- Loan is active
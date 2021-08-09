# NFL Odds

## Table of contents
1. [Motivation](#motivation)
3. [Technologies used](#tech)
4. [Usage](#usage)

## Motivation <a name="motivation"/>
NFL Odds is an analytical web app that I built for the purpose of helping me win more money on daily fantasy sports betting sites like Fanduel and DraftKings. The winning more money part is up for debate though, to be completely honest.

This app provides summarized betting odds data from multiple bookmakers for the current and next week. Users can view statistics like the average/median/minimum/maximum for 3 betting odds categories: Over/Under, Spread, and Moneyline. The data should serve as an aid when searching for the most opportunistic games to bet on. For added convenience, users can sort the games by statistic.

![](demo.gif)

## Technologies used <a name="tech"/>
- React
- Node.js
- Express
- MongoDB
- Mongoose
- Bootstrap
- Framer Motion

## Usage <a name="usage"/>
1. Get a free API key at: https://the-odds-api.com/
2. Create a new `apiKey.js` file with your personal API key by using the `example.apiKey.js` file as a template
3. Follow the commands below:
```
npm install
npm run build
npm start
```
Access app at: http://localhost:3000/

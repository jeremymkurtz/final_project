// Express Server
import 'dotenv/config'
import express from 'express'
import ViteExpress from 'vite-express'
import cookie from 'cookie-session'
import { MongoClient, ObjectId, Collection } from 'mongodb'
import { lookupPlayerFromAbbr } from './utils.js'

const app = express()

app.use(express.static('src'))
// app.use(express.static('dist'))
app.use(express.json())

// --------------------MONGO DB------------------------

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`
const client = new MongoClient(uri)

let collection: Collection
let loginData: Collection
let schools: Collection
let players: Collection

async function run() {
    await client.connect()
    collection = client.db("assignment3").collection("matches")
    loginData = client.db("assignment3").collection("login-info")
    schools = client.db("assignment3").collection("schools")
    players = client.db("assignment3").collection("players")
}

try {
    run().then(_ => console.log("connected to database"));
} catch (e) {
    console.error(e)
}
// -------------------MIDDLEWARE-----------------------
// use express.urlencoded to get data sent by default form actions
// or GET requests
app.use(express.urlencoded({extended: true}));

// cookie middleware! The keys are used for encryption and should be
// changed
app.use(cookie({
    name: 'session',
    keys: [ 'key1', 'key2' ]
}));

// add some middleware that always sends unauthenticated users to the login page
// app.use( function( req,res,next) {
//   if( req.session.login === true )
//     next()
// else
// res.sendFile( __dirname + '/public/main.html' )
// })

app.use('/newLogin', async ( req: express.Request, res: express.Response ) => {
    req.body.type = "user"
    console.log(req.body)

    const result = await loginData.insertOne(req.body)
    res.json(result)

});

// -------------------ROUTES-----------------------
// --- GET ---
app.get("/docs", async ( req: express.Request, res: express.Response ) => {
    if (collection !== null) {
        const docs = await collection.find({}).toArray()
        res.json(docs)
    }
});

app.get('/getMatch', async ( req: express.Request, res: express.Response ) => {
    const matchId = req.query.id;
    if (!matchId) {
        return res.status(400).json({error: 'Match ID is required'});
    }
    let match = null;
    if (typeof matchId === "string") {
        match = await collection.findOne({_id: ObjectId.createFromHexString(matchId)});
    }
    // const match = await collection.findOne({ _id: matchId });
    if (!match) {
        return res.status(404).json({error: 'Match not found'});
    }

    res.json(match);
});

app.get('/logout', ( req: express.Request, res: express.Response ) => {
    req.session = null; // Clear the session
    res.redirect('/'); // Redirect to the root URL
});

app.get('/userMatches', async ( req: express.Request, res: express.Response ) => {
    if (!req.session.login) {
        return res.status(401).send('Unauthorized');
    }

    const user = req.session.user;
    const matches = await collection.find({owner: user}).toArray();
    res.json(matches);
});

app.get('/schools',async (req: express.Request, res: express.Response) => {
    if (schools !== null) {
        const docs = await schools.find({}).toArray()
        res.json(docs)
    }
})

app.get('/getSchool', (req: express.Request, res: express.Response) => {
    const schoolName = req.body;
    if(!schoolName) {
        return res.status(400).json({error: 'School name is required'});
    }

    const school = schools.findOne({name: schoolName});
    if(!school) {
        return res.status(404).json({error: 'School not found'});
    }
    res.json(school);
})

app.get('/getStartBracket', async (req: express.Request, res: express.Response) => {
    try {
        const allSchools = await schools.find({}).toArray();
        const totalPoints = allSchools.reduce((sum, school) => sum + school.points, 0);
        const allHaveSeeds = allSchools.every(school => school.seed);
        if (allHaveSeeds) {
            res.status(100).send('Already have seeds');
        }
        else if(totalPoints >= 30) {
            res.status(200).send('Good request');
        }
        else {
            res.status(400).send('Bad request: Total points less than 30');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.get('/getSeeds', async (req: express.Request, res: express.Response) => {
    const allSchools = await schools.find({}).toArray();
    const seeds: { [key: string]: string } = {};
    allSchools.forEach((school, index) => {
        seeds[school.abbr] = school.seed;
    });
    res.json(seeds)
});



app.get('/getFullBracket', async (req: express.Request, res: express.Response) => {
    try {
        const allSchools = await schools.find({}).toArray();
        const seeds: { [key: string]: { abbr: string, bracket: number  } } = {};
        allSchools.forEach((school, index) => {
            seeds[school.seed] = {abbr: school.abbr, bracket: school.bracket};
        });


        const quarterFinals: { [key: string]: string } = {};
        const semiFinals: { [key: string]: string } = {};
        const finals: { [key: string]: string } = {};

        // Assign whole bracket
        quarterFinals['1'] = seeds['1A'].abbr;
        quarterFinals['2'] = seeds['5A'].bracket > seeds['4B'].bracket ? seeds['5A'].abbr : (seeds['5A'].bracket < seeds['4B'].bracket ? seeds['4B'].abbr : 'undetermined');
        quarterFinals['3'] = seeds['3A'].bracket > seeds['6B'].bracket ? seeds['3A'].abbr : (seeds['3A'].bracket < seeds['6B'].bracket ? seeds['6B'].abbr : 'undetermined');
        quarterFinals['4'] = seeds['2B'].abbr;
        quarterFinals['5'] = seeds['2A'].abbr;
        quarterFinals['6'] = seeds['6A'].bracket > seeds['3B'].bracket ? seeds['6A'].abbr : (seeds['6A'].bracket < seeds['3B'].bracket ? seeds['3B'].abbr : 'undetermined');
        quarterFinals['7'] = seeds['4A'].bracket > seeds['5B'].bracket ? seeds['4A'].abbr : (seeds['4A'].bracket < seeds['5B'].bracket ? seeds['5B'].abbr : 'undetermined');
        quarterFinals['8'] = seeds['1B'].abbr;
        semiFinals['1'] = quarterFinals['1'] > quarterFinals['2'] ? quarterFinals['1'] : (quarterFinals['1'] < quarterFinals['2'] ? quarterFinals['2'] : 'undetermined');
        semiFinals['2'] = quarterFinals['3'] > quarterFinals['4'] ? quarterFinals['3'] : (quarterFinals['3'] < quarterFinals['4'] ? quarterFinals['4'] : 'undetermined');
        semiFinals['3'] = quarterFinals['5'] > quarterFinals['6'] ? quarterFinals['5'] : (quarterFinals['5'] < quarterFinals['6'] ? quarterFinals['6'] : 'undetermined');
        semiFinals['4'] = quarterFinals['7'] > quarterFinals['8'] ? quarterFinals['7'] : (quarterFinals['7'] < quarterFinals['8'] ? quarterFinals['8'] : 'undetermined');
        finals['1'] = semiFinals['1'] > semiFinals['2'] ? semiFinals['1'] : (semiFinals['1'] < semiFinals['2'] ? semiFinals['2'] : 'undetermined');
        finals['2'] = semiFinals['3'] > semiFinals['4'] ? semiFinals['3'] : (semiFinals['3'] < semiFinals['4'] ? semiFinals['4'] : 'undetermined');
        const winner = finals['1'] > finals['2'] ? finals['1'] : (finals['1'] < finals['2'] ? finals['2'] : 'undetermined');


        res.json({"quarterFinals" : quarterFinals, "semiFinals":semiFinals, "finals": finals, "winner": winner});
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// --- POST ---
app.post('/login', async ( req: express.Request, res: express.Response ) => {
    // express.urlencoded will put your key value pairs
    // into an object, where the key is the name of each
    // form field and the value is whatever the user entered
    console.log(req.body)
    let username = req.body.user
    let password = req.body.pass


    // below is *just a simple authentication example*
    // for A3, you should check username / password combos in your database
    let loginDoc = await loginData.findOne({user: username, pass: password})
// Find the user with the matching username

    // If a user is found, check if the password matches
    if (loginDoc != null && loginDoc.user === username && loginDoc.pass === password) {

        // define a variable that we can check in other middleware
        // the session object is added to our requests by the cookie-session middleware
        req.session.user = loginDoc.user
        req.session.login = true

        // since login was successful, send the user to the main content
        // use redirect to avoid authentication problems when refreshing
        // the page or using the back button, for details see:
        // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern
        res.status(200).send("Login and Password correct")
    } else {
        console.log("not found")
        res.status(400).send("Either Login or Password are incorrect")
        // password incorrect, redirect back to login page
        // res.sendFile( __dirname + '/views/index.html' )
    }
});

app.get('/userMatches', async (req: express.Request, res: express.Response) => {
    if (!req.session.login) {
        return res.status(401).send('Unauthorized');
    }

    const user = req.session.user;
    const matches = await collection.find({ owner: user}).toArray();
    res.json(matches);
});


// route to get all docs
app.get("/docs", async (req: express.Request, res: express.Response) => {
    if (collection !== null) {
        const docs = await collection.find({}).toArray()
        res.json( docs )
    }
})

app.post('/addPlayer', async (req: express.Request, res: express.Response) => {
    const player = req.body;
    const abbr = player.abbr.slice(0, 3);
    const school = await schools.findOne({abbr: abbr});
    school.players.push(player);
    await schools.replaceOne({abbr: abbr}, school);
})

app.post('/addSchool', async (req: express.Request, res: express.Response) => {
    const school = req.body;
    await schools.insertOne(school)
})

app.get('/getSchoolData', async (req: express.Request, res: express.Response) => {
    const user = req.session.user;
    const school = await schools.findOne({coach: user});
    res.json(school);
})

app.get('/getCoach', async (req: express.Request, res: express.Response) => {
    if (!req.session.login) {
        return res.json('Unauthorized');
    }

    const user = req.session.user;
    const userData = await loginData.findOne({user: user});

    if(userData.type !== "coach") {
        return res.json('Unauthorized');
    }

    res.json(userData.user);
})

app.get('/getUserType', async (req: express.Request, res: express.Response) => {
    if (!req.session.login) {
        return res.json('user');
    }

    const user = req.session.user;
    const userData = await loginData.findOne({user: user});

    res.json(userData.type);
})

app.post( '/add', async (req: express.Request,res: express.Response) => {
    const matchData = req.body;
    const schoolsDict = [
        { abbr: "SAN", name: "Sandburg" },
        { abbr: "AND", name: "Andrew" },
        { abbr: "NT", name: "New Trier" },
        { abbr: "DGN", name: "Downers Grove North" },
        { abbr: "FR", name: "Fremd" },
        { abbr: "HER", name: "Hersey" },
        { abbr: "HS", name: "Hinsdale South" },
        { abbr: "LT", name: "Lockport" },
        { abbr: "NN", name: "Naperville North" },
        { abbr: "DF", name: "Deerfield" },
        { abbr: "WY", name: "Whitney Young" },
        { abbr: "YK", name: "York" }
    ];

    // determine school
    const findSchoolName = (code: string) => {
        const school = schoolsDict.find(s => code.startsWith(s.abbr));
        return school ? school.abbr : "Unknown School";
    };

    matchData.SchoolA = findSchoolName(matchData.PlayerA1);
    matchData.SchoolB = findSchoolName(matchData.PlayerB1);




    // Logic to determine the winner
    let winner;
    if (matchData.Game1B > matchData.Game1A && matchData.Game2B > matchData.Game2A) {
        winner = matchData.SchoolB;
    } else if (matchData.Game1A > matchData.Game1B && matchData.Game2A > matchData.Game2B) {
        winner = matchData.SchoolA;
    } else if (matchData.Game3A > matchData.Game3B) {
        winner = matchData.SchoolA;
    } else{
        winner = matchData.SchoolB;
    }

    // Add the winner to the match data
    matchData.winner = winner;
    matchData.owner = req.session.user;
    const result = await collection.insertOne( matchData )
    matchData._id =result.insertedId

    const school = await schools.findOne({abbr: winner});
    if(school){
        const wins = await collection.countDocuments({winner: winner, round: matchData.round});
        if(matchData.MatchType === "Round Robin") {
            if (wins % 4 === 0) {
                await schools.updateOne({abbr: winner}, {$inc: {points: 1}});
            }
        }
        else{
            if( wins % 3 === 0){
                await schools.updateOne({abbr: winner}, {$inc: {bracket: 1}});
            }
        }
    }


    res.json( matchData )
})

app.post('/makeSeeds', async (req: express.Request, res: express.Response) => {
    try {
        const allSchools = await schools.find({}).toArray();

        // Separate schools into pools A and B
        const poolA = allSchools.filter(school => school.pool === 'A');
        const poolB = allSchools.filter(school => school.pool === 'B');

        // Sort schools within each pool based on points in descending order
        poolA.sort((a, b) => b.points - a.points);
        poolB.sort((a, b) => b.points - a.points);

        const seeds: { [key: string]: string } = {};

        // Assign seeds for pool A
        for (let i = 0; i < poolA.length; i++) {
            const school = poolA[i];
            const seed = `${i + 1}A`;
            seeds[seed] = school.abbr;
            await schools.updateOne({ abbr: school.abbr }, { $set: { seed: seed } });
        }

        // Assign seeds for pool B
        for (let i = 0; i < poolB.length; i++) {
            const school = poolB[i];
            const seed = `${i + 1}B`;
            seeds[seed] = school.abbr;
            await schools.updateOne({ abbr: school.abbr }, { $set: { seed: seed } });
        }

        res.json(seeds);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
app.delete( '/remove', async (req: express.Request,res: express.Response) => {
    const result = await collection.deleteOne({
        _id: ObjectId.createFromHexString( req.body._id )
    })

    res.json( result )
})

app.get('/getMatch', async (req: express.Request, res: express.Response) => {
    const matchId = req.query.id;
    if (!matchId) {
        return res.status(400).json({ error: 'Match ID is required' });
    }
    let match = null;
    if (typeof matchId === "string") {
        match = await collection.findOne({_id: ObjectId.createFromHexString(matchId)});
    }
    // const match = await collection.findOne({ _id: matchId });
    if (!match) {
        return res.status(404).json({ error: 'Match not found' });
    }

    res.json(match);
});

app.post('/update', async ( req: express.Request, res: express.Response ) => {
    const matchData = req.body;
    const matchId = req.query.id;
    // Logic to determine the winner
    let winner;
    if (matchData.Game1B > matchData.Game1A && matchData.Game2B > matchData.Game2A) {
        winner = matchData.SchoolB;
    } else if (matchData.Game1A > matchData.Game1B && matchData.Game2A > matchData.Game2B) {
        winner = matchData.SchoolA;
    } else if (matchData.Game3A > matchData.Game3B) {
        winner = matchData.SchoolA;
    } else {
        winner = matchData.SchoolB;
    }

    // Add the winner to the match data
    matchData.winner = winner;
    let result = null;
    if (typeof matchId === "string") {
        result = await collection.updateOne(
            {_id: ObjectId.createFromHexString(matchId)},
            // { _id: matchId },
            {$set: matchData}
        )
    }
    matchData._id = matchId;

    res.json(matchData)
});

app.post('/getPlayer', async ( req: express.Request, res: express.Response ) => {
    // Example of how to call this endpoint from the client
    /*
    <button onClick={async () => {
                    const response = await fetch('/getPlayer', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            abbr: 'AND12',
                        }),
                    });
                    if (response.ok) {
                        const res = await response.json();
                        console.log(res);
                    }
                }}>
                Test getPlayer
     </button>
     */
    const player = await lookupPlayerFromAbbr(req.body.abbr, schools)
    res.json(player)
});

// --- DELETE ---
// assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
app.delete('/remove', async ( req: express.Request, res: express.Response ) => {
    const result = await collection.deleteOne({
        _id: ObjectId.createFromHexString(req.body._id)
    })

    res.json(result)
});

ViteExpress.listen(app, 3000)

// app.listen( process.env.PORT || 3000 )
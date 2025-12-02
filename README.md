# hello traveller! welcome to **_sidequests!!!_**

sidequests is a local community-driven platform that encourages users to help one another out through the making and embarking of quests!
users can redeem quests from other users to gain magic!

when a quest is completed, users can make a post about their quest together, and it will appear in the community tab!

## features (so far)

- Uses a PostgreSQL instance inside of docker, meaning it is fully self-contained and ready to deploy!
- Drizzle ORM for type-safe database queries
- Nuxt-auth-utils for user authentication

### questions
- how do we incentivize people to get magic
  - customize your avatar or account - name flair (?)
  - game associated (?)

---

# development

### install dependencies
1. Install Bun from https://bun.sh/
2. Run `bun install`

### database setup
1. Make a `.env` file, using `.env.example` as a template

2. To run the PostgreSQL instance in Docker, simply run `docker compose up`

3. Once that is running, run `bun run db:init`, the command is found in the `package.json`. 
This just sets up the schemas in the database for you (given everything else is working). 
For the time being, you will need to make your own testing data.

4. You can run `bun run studio` to run [**drizzle-kit studio**](https://orm.drizzle.team/docs/drizzle-kit-studio), which is a great way to interact with the database graphically!
   

After you have done all of this, run `bun run dev` to start developing!

Make a new account with a passkey and start populating your database with testing data!
- If you don't want to make your test data manually, you can check out Drizzle's [seeding](https://orm.drizzle.team/docs/seed-overview) functionality!

_**you should be off to the races! happy developing!**_

---

# to-dos!
### quests
- [x] join quest confirmation pop-up
- [x] leave quest confirmation pop-up
- [x] share quest (access by link)
- [ ] add joining period for quests (different than quest time!)
- [ ] location map for quests - [Leaflet](https://leaflet.nuxtjs.org/)
- [ ] show all quests in map to see what's around
- [ ] calendar view showing all quests
- [ ] quest concluding functionality (giving people magic and the credit)
- [ ] community posts from quests
- [ ] make different types of quests (public, magic)
- [ ] figure out how much magic each quest is worth
- [ ] make factions of questers

### profiles
- [ ] show who you've done quests with in the past
- [ ] show friends (ranked by magic?)
- [ ] edit your profile

### adventures (public quests)
- [ ] each quest is worth one magic. encourages people to engage with their communities!
- [ ] show how many people are going on this adventure
- [ ] on map, show number of people going on adventure

### ui
- [ ] make swipable UI
- [ ] add buttons to make navigation easy!
- [ ] graphic design for awesome buttons and stuff
- [ ] add image uploading
- [ ] add filters for quests
  - location
  - date
  - magic

### PWA (progressive web app)
- [ ] cache relevant UI data
- [ ] send notifications

### user stuff
- [x] add passkey support
- [ ] edit user profile
- [ ] profile pictures!
- [ ] delete comments, posts, etc.
- [ ] add friends list!
- [ ] encrypted messaging between friends
- [ ] add report functionality

### comments
- [ ] post limit rate for commenting
- [ ] refresh data after posting (show comment upon post)
- [ ] delete function
- [ ] tag users (with autocomplete)
- [ ] reply to other comments
 
### dev stuff
- [x] populate dev environment database with testing data
- [ ] research how to prevent SQL injection!
- [ ] figure out image upload!!!
- [ ] research database safety protocols!
- [ ] figure out how to get email server running on docker - used for moderation purposes
- [ ] encrypted group chats!

## future ideas
- [ ] promote eboards to use sidequests to post adventures!
- [ ] federated network, every instance is connected! ([Fedify](https://fedify.dev/), ActivityPub)

```
              *                 get questing!!!
             / \
            /___\
           ( o o )            * *
           )  L  (           /   * *
   ________()(-)()________  /     * * *
 E\| _____ )()()() ______ |/B     * * *
   |/      ()()()(       \|      * * * *
           | )() |
           /     \
          / *  *  \
         /   *  *  \
        / *_  *  _  \   jiri
```

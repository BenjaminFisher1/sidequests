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

## to-dos!
### quests
- join quest confirmation pop-up
- leave quest confirmation pop-up
- share quest (access by link)
- location map for quests
- show all quests in map to see what's around
- calendar view showing all quests
- quest concluding functionality (giving people magic and the credit)
- community posts from quests
- make different types of quests (public, magic)
- ADVENTURES -  quests worth 
- figure out how much magic each quest is worth
- make factions of questers

### profiles
- show who you've done quests with in the past
- show friends (ranked by magic?)

### adventures (public quests)
- show how many people are going on this adventure
- on map, show number of people going on adventure

### user stuff
- add passkey support
- edit user profile
- delete comments, posts, etc.
- add friends list!
- encrypted messaging between friends

### dev stuff
- populate dev environment database with testing data
- research how to prevent SQL injection!
- figure out image upload!!!
- user notifications (in app and with PWA)
- research how to make PWA version
- research database safety protocols!
- graphic design needed for icons and UI
- figure out how to get email server running on docker
- encrypted group chats!

## future ideas
- promote eboards to use sidequests to post adventures!

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

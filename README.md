# Forever Home


## Client

- *Join Game*
  - Connect via websocket
  - Get pet and owner, and store locally
  - Render pet, owner and stats (with matching details highlighted)
- *Initiate Trade*
  - User clicks trade button
  - Given two options - Scan or View Code
    - Scan opens full-screen scanner
    - View Code opens full-screen code
  - On scan call websocket to trade


## Server

- *Join Game*
  - Generate Pet and Owner
  - Calculate Match Rating
  - Store Pet, Owner and match in DB
- *Initiate Trade*
  - Given two ids, swap pets for users
  - Update match rating
  - Notify users of update
# Moments
___
## Tier 1: MVPs

CUSTOMER/USER EXPERIENCE:
1. User is able to sign up
  - User entry is created in the user table (Postgres), and allows a one-to-many
  relationship with the image table
2. User is able to sign in
3. User is able to connect Moments account with Spotify
4. User is able to give permission to the app to access camera to take/upload a photo
5. When user submits an image:
  - Image entry is 'findOrCreate'd based off of the returned colorData in the image table,
  and allows a one-to-many relationship with many songs. Image entry will include
  imageUrl, name, and colorData
  - Song entry will be created in the song table, which is associated with the above
  image entry
6. User is able to obtain a new song after submission and play the song
7. User is able to access history by image to get a new song and play the new song
8. User is able to access song history by image + song to find a previous song and play it
9. User is able to sign out

ENGINEER EXPERIENCE:
1. Engineer has a well-seeded database to simulate different interactions with the history
  - User data: id, firstName, lastName, spotifyToken, email
  - Image data: id, imageId, colorData, userId
  - Song data: id, spotifySongId, track, artist, album, imageId
2. Engineer has limited one account per email
3. Engineer has a secured database so nobody is able to unrightfully manipulate the user's data
4. Engineer has created an algorithm to pick a genre based on the color(s) found in the image
5. Engineer has deployed the app with Expo

## Tier 2:

CUSTOMER/USER EXPERIENCE:
1. User is able to play songs through the app
2. User is able to clear/delete history
3. User is able to search history
4. User is able to share with friends
5. User is able to favorite image-song pairs

ENGINEER EXPERIENCE:
1. Engineer has updated the color reading algorithm to query multiple genres/parameters
2. Engineer is able to create an email validator at sign-up

## Tier 3:

CUSTOMER/USER EXPERIENCE:
1. User is able to see a song visualizer when playing the song
2. User is able to view other users' favorite image-song pairs
3. User is able to search for songs and manually set a song to their experience
4. User is able to set profile as public/private
5. User is able to update a profile picture

ENGINEER EXPERIENCE:
1. Engineer has updated database to allow profile pictures for the user
2. Engineer has updated homepage to have a searchbar


## Tier 4:

CUSTOMER/USER EXPERIENCE:
1. User is able to choose if the generated song matches the image and provide data to the engineers
2. User is able to create collections of songs/memories to share
3. User is able to edit their profile page

ENGINEER EXPERIENCE:
1. Engineer has integrated ML technology that will be able to update recommendations
based on the users' inputs

## Database Design
![Database Schema](https://imgur.com/JajBPWL)

## User
![Flowchart](https://imgur.com/KdJl0G2)
Link: https://excalidraw.com/#json=6yanzjP_Vw9K1iynMW-W1,Ylv0U80wW6fSuM5NosCMqA


## Routes

# Backend
|   Route       |   Methods   |   Purpose       |
| ------------- | ----------- | --------------- |
| /auth/        | GET         | Temporary redirect page |
| /auth/login   | GET         | Login to Spotify |
| /auth/callback | GET        | Callback route for Spotify |
| /auth/find-song | GET       | Find songs by genre |

#Frontend
|   Route       |   Purpose       |
| ------------- | --------------- |
| /             | Displays landing page |
| /login        | Login page for users |
| /signup       | Signup page for users |
| /home         | Homepage for logged in users |
| /find-song    | Option menu to take/upload photo/image |
| /find-song/:image | Display the generated image and song combination |
| /player/:song-id | Display the player to play the track |
| /history-1    | history by image |
| /history-2    | history by image + song |

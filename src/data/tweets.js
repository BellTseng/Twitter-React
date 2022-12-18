export const defaultTweetList = [{
  "id": 1,
  "description": "deserunt qui. Error optio sapient AAA",
  "UserId": 2,
  "createdAt": "2022-12-11T01:19:30.000Z",
  "updatedAt": "2022-12-11T01:19:30.000Z",
  "replyCount": 4,
  "likeCount": 0,
  "User": {
    "id": 2,
    "account": "user1",
    "name": "User1",
    "avatar": "https://loremflickr.com/320/240/logo/?lock=1"
  },
  "isLiked": false
}, {
  "id": 11,
  "description": "deserunt qui. Error optio sapient BBB",
  "UserId": 21,
  "createdAt": "2022-12-11T01:19:30.000Z",
  "updatedAt": "2022-12-11T01:19:30.000Z",
  "replyCount": 41,
  "likeCount": 2,
  "User": {
    "id": 21,
    "account": "user1",
    "name": "User1",
    "avatar": "https://loremflickr.com/320/240/logo/?lock=1"
  },
  "isLiked": false
},
];


export const defaultTweet = {
  "id": 3,
  "description": " numquam praesentium autem maxime. Aspernatur at",
  "UserId": 2,
  "createdAt": "2022-12-13T13:14:22.000Z",
  "updatedAt": "2022-12-13T13:14:22.000Z",
  "replyCount": 3,
  "likeCount": 0,
  "User": {
    "id": 2,
    "account": "user1",
    "name": "user1",
    "avatar": "https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
  },
  "isLiked": true
}


export const defaultReplys = [
  {
    "id": 1,
    "comment": "Sit odit aliquid vel.",
    "UserId": 12,//留言者
    "TweetId": 1,
    "createdAt": "2022-12-14T13:14:22.000Z",
    "updatedAt": "2022-12-14T13:14:22.000Z",
    "User": {//留言者資料
      "id": 12,
      "account": "user11",
      "name": "user11",
      "avatar": "https://loremflickr.com/320/240/logo/?lock=2"
    },
    "Tweet": {
      "UserId": 2,//推主
      "User": {//推主資料
        "id": 2,
        "account": "user1"
      }
    }
  },
];


export const follows = [
  {
    "id": 4,
    "name": "User3",
    "account": "user3",
    "avatar": "https://loremflickr.com/320/240/logo/?lock=3",
    "followerCount": 1,
    "isFollowed": 1
  },
  {
    "id": 5,
    "name": "User4",
    "account": "user4",
    "avatar": "https://loremflickr.com/320/240/logo/?lock=4",
    "followerCount": 1,
    "isFollowed": 1
  },
  {
    "id": 2,
    "name": "User1",
    "account": "user1",
    "avatar": "https://loremflickr.com/320/240/logo/?lock=1",
    "followerCount": 0,
    "isFollowed": 0
  } //rest users
]
const commonContentData: CommonContent = {
  header: {
    linkList: [
      { id: "1", name: "Home", linkTo: "/" },
      { id: "4", name: "All Feedbacks", linkTo: "/feedbacks" },
      { id: "5", name: "Top Users", linkTo: "/topusers" },
      { id: "6", name: "Global Search", linkTo: "/globalsearch" },
      { id: "7", name: "Track Accounts", linkTo: "/trackaccounts" },
      { id: "8", name: "Contacts", linkTo: "/contacts" },
    ],
    languagesList: [
      { id: "0", name: "English", shortсut: "en" },
      { id: "1", name: "Russian", shortсut: "ru" },
      { id: "2", name: "Ukraine", shortсut: "ua" },
      { id: "3", name: "Turkey", shortсut: "tu" },
      { id: "4", name: "Polish", shortсut: "pl" },
      { id: "5", name: "German", shortсut: "gr" },
      { id: "6", name: "French", shortсut: "fr" },
      { id: "7", name: "Spanish", shortсut: "sp" },
      { id: "8", name: "English", shortсut: "en" },
      { id: "9", name: "Russian1", shortсut: "ru" },
      { id: "10", name: "Ukraine", shortсut: "ua" },
      { id: "11", name: "Turkey", shortсut: "tu" },
      { id: "12", name: "Polish", shortсut: "pl" },
      { id: "13", name: "German", shortсut: "gr" },
      { id: "14", name: "French", shortсut: "fr" },
      { id: "15", name: "Spanish", shortсut: "sp" },
    ],
  },
  footer: {
    groupedLinksList: [
      {
        groupName: "Community",
        linkList: [
          { id: "1", name: "Sign Up", linkTo: "/signin" },
          { id: "2", name: "Log In", linkTo: "/login" },
          { id: "3", name: "About", linkTo: "/about" },
          { id: "4", name: "Contacts", linkTo: "/contacts" },
        ],
      },
      {
        groupName: "Users",
        linkList: [
          { id: "5", name: "Top User New", linkTo: "/topusers" },
          { id: "6", name: "Users Last", linkTo: "/#userslast" },
          { id: "7", name: "Last Comments", linkTo: "/lastcomments" },
          { id: "8", name: "All Feedbacks", linkTo: "/feedbacks" },
        ],
      },
      {
        groupName: "Navigation",
        linkList: [
          { id: "10", name: "Social Global", linkTo: "/#socialglobal" },
          { id: "11", name: "Search Track", linkTo: "/#searchtrack" },
          { id: "12", name: "Accounts", linkTo: "/#accounts" },
        ],
      },
    ],
    socialList: [
      { name: "youtube", linkTo: "/#youtube" },
      { name: "facebook", linkTo: "/#facebook" },
      { name: "twitter", linkTo: "/#twitter" },
      { name: "instagram", linkTo: "/#instagram" },
    ],
  },
};

const users: UserCommon[] = [
  {
    id: "1",
    name: { first: "Peter", last: "Rollins" },
    email: "petterrollllins@gmail.com",
    location: { country: "United States", city: "New York" },
    createDate: "2020-9-29",
    description: "Hi, i`m Peter. And I Introvert...",
    tag: "@petttter",
    avatar: "/avatars/avatar1_84x84.png",
    banStatus: false,
    stats: {
      feedbacks: 4,
      comments: 345,
      followers: 5101,
      following: 14,
    },
    socialLinks: [
      { name: "youtube", linkTo: "#youtube", nickname: "" },
      { name: "facebook", linkTo: "#facebook", nickname: "" },
      { name: "twitter", linkTo: "#twitter", nickname: "" },
      { name: "instagram", linkTo: "#instagram", nickname: "" },
    ],
    feedbacks: [
      {
        id: "1",
        author: {
          name: { first: "William", last: "Lawton" },
          avatar: "",
          id: "1",
        },
        image: "",
        title: "My first meeting with love",
        createDate: "2020-9-29",
        description:
          "Whether you’re crossing the George Washington Bridge into the Heights, riding the Metro North-south along the Hudson, or stuck in traffic along the Long Island Expressway, there’s nothing like that feeling of magic and inspiration that washes over you the moment you first spot the Manhattan skyline",
        statisctic: {
          likes: 30,
          dislikes: 1,
          comments: 13,
          notDecide: 5,
        },
      },
      {
        id: "2",
        createDate: "2020-9-29",
        author: {
          name: { first: "William", last: "Lawton" },
          avatar: "",
          id: "2",
        },
        image: "",
        title: "My first meeting with love",
        description:
          "Whether you’re crossing the George Washington Bridge into the Heights, riding the Metro North-south along the Hudson, or stuck in traffic along the Long Island Expressway, there’s nothing like that feeling of magic and inspiration that washes over you the moment you first spot the Manhattan skyline",
        statisctic: {
          likes: 30,
          dislikes: 1,
          comments: 13,
          notDecide: 5,
        },
      },
      {
        id: "4",
        createDate: "2020-9-29",
        author: {
          name: { first: "William", last: "Lawton" },
          avatar: "",
          id: "3",
        },
        image: "",
        title: "My first meeting with love",
        description:
          "Whether you’re crossing the George Washington Bridge into the Heights, riding the Metro North-south along the Hudson, or stuck in traffic along the Long Island Expressway, there’s nothing like that feeling of magic and inspiration that washes over you the moment you first spot the Manhattan skyline",
        statisctic: {
          likes: 30,
          dislikes: 1,
          comments: 13,
          notDecide: 5,
        },
      },
      {
        id: "5",
        createDate: "2020-9-29",
        author: {
          name: { first: "William", last: "Lawton" },
          avatar: "",
          id: "1",
        },
        image: "",
        title: "My first meeting with love",
        description:
          "Whether you’re crossing the George Washington Bridge into the Heights, riding the Metro North-south along the Hudson, or stuck in traffic along the Long Island Expressway, there’s nothing like that feeling of magic and inspiration that washes over you the moment you first spot the Manhattan skyline",
        statisctic: {
          likes: 30,
          dislikes: 1,
          comments: 13,
          notDecide: 5,
        },
      },
    ],
    drafts: [
      {
        id: "1",
        createDate: "2020-9-29",
        author: {
          name: { first: "William", last: "Lawton" },
          avatar: "",
          id: "1",
        },
        image: "",
        title: "My first meeting with love",
        description:
          "Whether you’re crossing the George Washington Bridge into the Heights, riding the Metro North-south along the Hudson, or stuck in traffic along the Long Island Expressway, there’s nothing like that feeling of magic and inspiration that washes over you the moment you first spot the Manhattan skyline",
        statisctic: {
          likes: 30,
          dislikes: 1,
          comments: 13,
          notDecide: 5,
        },
      },
    ],
  },
  {
    id: "2",
    name: { first: "Alex", last: "Fox" },
    email: "alexfoxxx@gmail.com",
    location: { country: "United States", city: "New York" },
    createDate: "2018-9-29",
    description: "Hi, i`m Alex. And I am a fox.",
    tag: "@foxxer",
    avatar: "/avatars/avatar2_84x84.png",
    banStatus: true,
    stats: {
      feedbacks: 1,
      comments: 20,
      followers: 1,
      following: 2001,
    },
    socialLinks: [
      { name: "youtube", linkTo: "#youtube", nickname: "" },
      { name: "facebook", linkTo: "#facebook", nickname: "" },
      { name: "twitter", linkTo: "#twitter", nickname: "" },
      { name: "instagram", linkTo: "#instagram", nickname: "" },
    ],
    feedbacks: [
      {
        id: "1",
        createDate: "2020-9-29",
        author: {
          name: { first: "William", last: "Lawton" },
          avatar: "",
          link: "#profile",
        },
        image: "",
        title: "My first meeting with love",
        description:
          "Whether you’re crossing the George Washington Bridge into the Heights, riding the Metro North-south along the Hudson, or stuck in traffic along the Long Island Expressway, there’s nothing like that feeling of magic and inspiration that washes over you the moment you first spot the Manhattan skyline",
        statisctic: {
          likes: 30,
          dislikes: 1,
          comments: 13,
          notDecide: 5,
        },
      },
    ],
  },
  {
    id: "3",
    name: { first: "Covet", last: "Flow" },
    email: "covetcovid@gmail.com",
    location: { country: "United States", city: "New York" },
    createDate: "2013-08-13",
    description: "Hi, i`m Covid... or Covet. Doesn't matter!",
    tag: "@coviddd",
    avatar: "/avatars/avatar3_84x84.png",
    banStatus: false,
    stats: {
      feedbacks: 2,
      comments: 300,
      followers: 10321,
      following: 501,
    },
    socialLinks: [
      { name: "youtube", linkTo: "#youtube", nickname: "" },
      { name: "facebook", linkTo: "#facebook", nickname: "" },
      { name: "twitter", linkTo: "#twitter", nickname: "" },
      { name: "instagram", linkTo: "#instagram", nickname: "" },
    ],
    feedbacks: [
      {
        id: "1",
        createDate: "2020-9-29",
        author: {
          name: { first: "William", last: "Lawton" },
          avatar: "",
          link: "#profile",
        },
        image: "",
        title: "My first meeting with love",
        description:
          "Whether you’re crossing the George Washington Bridge into the Heights, riding the Metro North-south along the Hudson, or stuck in traffic along the Long Island Expressway, there’s nothing like that feeling of magic and inspiration that washes over you the moment you first spot the Manhattan skyline",
        statisctic: {
          likes: 30,
          dislikes: 1,
          comments: 13,
          notDecide: 5,
        },
      },
    ],
  },
];

const chat: ChatMock[] = [
  {
    id: "1",
    conversation: [
      {
        date: {
          year: 2020,
          month: 10,
          date: 24,
        },
        messages: [
          {
            id: "4",
            self: false,
            time: {
              hour: 8,
              minutes: 17,
            },
            text:
              "The free Google service allows you to instantly translate words, phrases and web pages from English to over 100 languages ​​and vice versa.",
          },
          {
            id: "5",
            self: false,
            time: {
              hour: 9,
              minutes: 13,
            },
            text: "ahaha, how are you?",
          },
          {
            id: "6",
            self: true,
            time: {
              hour: 11,
              minutes: 19,
            },
            text: "Get off man...",
          },
        ],
      },
      {
        date: {
          year: 2020,
          month: 10,
          date: 21,
        },
        messages: [
          {
            id: "1",
            self: false,
            time: {
              hour: 10,
              minutes: 22,
            },
            text:
              "The free Google service allows you to instantly translate words, phrases and web pages from English to over 100 languages ​​and vice versa.",
          },
          {
            id: "2",
            self: false,
            time: {
              hour: 10,
              minutes: 24,
            },
            text: "Are you ok?",
          },
          {
            id: "3",
            self: true,
            time: {
              hour: 11,
              minutes: 51,
            },
            text: "I dont know...",
          },
        ],
      },
    ],
  },
  { id: "2", conversation: [] },
  { id: "3", conversation: [] },
];

export default commonContentData;
export { users, commonContentData, chat };

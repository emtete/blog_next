export const initialState = {
  mainPosts: [
    {
      title: "Collapsible Group Item #1",
      date: "1년 전",
      content: {
        blocks: [
          {
            key: "2v2v4",
            text: "Hey this editor rocks 😀",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 15,
                style: "color-rgb(0,0,0)",
              },
              {
                offset: 16,
                length: 7,
                style: "color-rgb(0,0,0)",
              },
              {
                offset: 0,
                length: 15,
                style: "fontsize-medium",
              },
              {
                offset: 21,
                length: 2,
                style: "fontsize-medium",
              },
              {
                offset: 0,
                length: 15,
                style: "fontfamily-Roboto",
              },
              {
                offset: 16,
                length: 7,
                style: "fontfamily-Roboto",
              },
              {
                offset: 9,
                length: 6,
                style: "BOLD",
              },
              {
                offset: 16,
                length: 5,
                style: "fontsize-30",
              },
            ],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      },
    },
    {
      title: "Collapsible Group Item #2",
      date: "2년 전",
      content: {
        blocks: [
          {
            key: "2v2v4",
            text: "Hey this 2editor rocks 😀",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 15,
                style: "color-rgb(0,0,0)",
              },
              {
                offset: 16,
                length: 7,
                style: "color-rgb(0,0,0)",
              },
              {
                offset: 0,
                length: 15,
                style: "fontsize-medium",
              },
              {
                offset: 21,
                length: 2,
                style: "fontsize-medium",
              },
              {
                offset: 0,
                length: 15,
                style: "fontfamily-Roboto",
              },
              {
                offset: 16,
                length: 7,
                style: "fontfamily-Roboto",
              },
              {
                offset: 9,
                length: 6,
                style: "BOLD",
              },
              {
                offset: 16,
                length: 5,
                style: "fontsize-30",
              },
            ],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      },
    },
    {
      title: "Collapsible Group Item #3",
      date: "3년 전",
      content: {
        blocks: [
          {
            key: "2v2v4",
            text: "Hey this 3editor rocks 😀",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 15,
                style: "color-rgb(0,0,0)",
              },
              {
                offset: 16,
                length: 7,
                style: "color-rgb(0,0,0)",
              },
              {
                offset: 0,
                length: 15,
                style: "fontsize-medium",
              },
              {
                offset: 21,
                length: 2,
                style: "fontsize-medium",
              },
              {
                offset: 0,
                length: 15,
                style: "fontfamily-Roboto",
              },
              {
                offset: 16,
                length: 7,
                style: "fontfamily-Roboto",
              },
              {
                offset: 9,
                length: 6,
                style: "BOLD",
              },
              {
                offset: 16,
                length: 5,
                style: "fontsize-30",
              },
            ],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      },
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;

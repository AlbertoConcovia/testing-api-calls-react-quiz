import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import App from "./App";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";

describe("App.test.js - API testing", () => {

const server = setupServer(
  rest.get("https://ghibliapi.herokuapp.com/films/", (req, res, ctx) => {
    return res(
      ctx.json({
        films: [
          {
            id: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
            title: "Castle in the Sky",
            image:
              "https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg",
          },
          {
            id: "3baf70d1-42bb-4437-b551-e5fed5a87abe",
            title: "Stars in the Sky",
            image:
              "https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg",
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

let requiredProps;
beforeEach(() => {
  requiredProps = {
    url: 'https://ghibliapi.herokuapp.com/films/',
  };
});

afterAll(() => server.close());

test("Check the first title has been rendered correctly in the document", async () => {
  render(<App {...requiredProps}/>);
  await waitFor(() => expect(screen.getByText(/Films from Studio Ghibli API/i)).toBeInTheDocument());
});


test(`Given the required props,
When the API response status code is 500,
Then error message should be present`, async () => {
  server.use(
    rest.get('https://ghibliapi.herokuapp.com/films/', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )
  render(<App {...requiredProps} />)
  await waitFor(() => expect(screen.getByText(/Oops… something went wrong, try again/i)).toBeInTheDocument());
})

test(`Given the required props,
When the API response status code is 418,
Then error message should be present`, async () => {
  server.use(
    rest.get('https://ghibliapi.herokuapp.com/films/', (req, res, ctx) => {
      return res(ctx.status(418))
    }),
  )

  render(<App {...requiredProps} />)
  await waitFor(() => expect(screen.getByText(/I'm a tea pot 🫖, silly/i)).toBeInTheDocument());
})

});
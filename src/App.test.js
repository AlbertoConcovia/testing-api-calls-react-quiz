import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import App from "./App";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Films from Studio Ghibli API/i);
  expect(linkElement).toBeInTheDocument();
});

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
afterAll(() => server.close());

test("Check the first title has been rendered correctly in the document", async () => {
  render(<App url="https://ghibliapi.herokuapp.com/films/" />);
  await waitFor(() => expect(screen.getByText(/Films from Studio Ghibli API/i)).toBeInTheDocument());
});


test('handles server error status code 500', async () => {
  server.use(
    rest.get('https://ghibliapi.herokuapp.com/films/', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )
  render(<App url='https://ghibliapi.herokuapp.com/films/' />)
  await waitFor(() => expect(screen.getByText(/Oops… something went wrong, try again/i)).toBeInTheDocument());
})

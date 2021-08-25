import request from "supertest";
import app from "../src/index";

it("a teapot can't make coffee", async () => {
  const res = await request(app).get("/api/coffee");

  expect(res.statusCode).toEqual(418);
});

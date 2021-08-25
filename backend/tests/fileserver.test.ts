import request from "supertest";
import app from "../src/index";
import syncDB from "./sync";

describe("logged out", () => {
  it("GET public file", async () => {
    const res = await request(app).get("/api/public/Cargo.lock");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("GET private file", async () => {
    const res = await request(app).get("/api/private/Cargo.lock");
    expect(res.statusCode).toEqual(403);
  });

  it("GET private file that doesn't exist", async () => {
    const res = await request(app).get("/api/private/missing.db");
    expect(res.statusCode).toEqual(403);
  });
});

describe("logged in", () => {
  let agent = request.agent(app);

  beforeAll(async () => {
    await syncDB();

    const res = await agent.post("/api/auth/login").send({
      username: "admin",
      password: "admin",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.headers["set-cookie"][0].startsWith("session"));
  });

  it("GET public file", async () => {
    const res = await request(app).get("/api/public/Cargo.lock");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("GET private file", async () => {
    const res = await agent.get("/api/private/Cargo.lock");

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("GET private file that doesn't exist", async () => {
    const res = await agent.get("/api/private/none.db");

    expect(res.statusCode).toEqual(404);
  });
});

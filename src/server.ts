import dotenv from "dotenv";
import fastify from "fastify";
import cors from "@fastify/cors";

dotenv.config();

const server = fastify({ logger: true });

const teams = [
  { id: 1, name: "mcLaren", base: "woking, united kingdom" },
  { id: 2, name: "mercedez", base: "brackley, united kingdom" },
  { id: 3, name: "red bull racing", base: "milton keynes, united kingdom" },
];

const drivers = [
  { id: 1, name: "max verstappen", team: "red bull" },
  { id: 2, name: "lewis hamilton", team: "ferrari" },
  { id: 2, name: "lando norris", team: "mcLaren" },
];

server.register(cors, {
    origin: "*",
})

server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);
  return { teams };
});

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);
  return { drivers };
});

interface DriverParams {
  id: string;
}

server.get<{ Params: DriverParams }>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find((d) => d.id === id);

    if (!driver) {
      response.type("application/json").code(404);
      return { message: "Driver not found" };
    } else {
      response.type("application/json").code(200);
      return {driver}
    }
  }
);

server.listen({ port: 3333 }, () => {
  console.log("Servidor rodando");
});

const prisma = require("../prisma");
const seed = async () => {
  // TODO: Create 10 players
  const createPlayers = async () => {
    const players = [
      { name: "Dog 1", breed: "Golden", status: "BENCH" },
      { name: "Dog 2", breed: "Lab", status: "BENCH" },
      { name: "Dog 3", breed: "German", status: "BENCH" },
      { name: "Dog 4", breed: "Wiener", status: "BENCH" },
      { name: "Dog 5", breed: "Corgi", status: "BENCH" },
      { name: "Dog 6", breed: "Aussie", status: "BENCH" },
      { name: "Dog 7", breed: "Poodle", status: "BENCH" },
      { name: "Dog 8", breed: "Cocker", status: "BENCH" },
      { name: "Dog 9", breed: "Schnauzer", status: "BENCH" },
      { name: "Dog 10", breed: "Greyhound", status: "BENCH" },
    ];
    await prisma.player.createMany({
      data: players,
    });
  };

  await createPlayers();
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

const prisma = require("../prisma");

const seed = async (numRestaurants = 3, numCustomers = 5, numReservations = 8) => {
  // TODO: this function

  // Create restaurants
  const restaurants = Array.from({ length: numRestaurants }, (_, i) => ({
    name: `Restaurant ${i + 1}`,
  }));
  await prisma.restaurant.createMany({ data: restaurants });

  // Create customers
  const customers = Array.from({ length: numCustomers }, (_, i) => ({
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@foo.bar`,
  }));
  await prisma.customer.createMany({ data: customers });

  // Create reservations connected to restaurants and customers
  for (let i = 0; i < numReservations; i++) {
    // Size of party randomly in [1,3]
    const partySize = 1 + Math.floor(Math.random() * 3);
  
    // Create array of objects w/ random customer ids
    const party = Array.from({ length: partySize }, () => ({
      id: 1 + Math.floor(Math.random() * numCustomers),
    }));
  
    // Create a new reservation w/ random restaurantId and connect to customers in party
    await prisma.reservation.create({
      data: {
        date: new Date(Date.now()).toDateString(),
        restaurantId: 1 + Math.floor(Math.random() * numRestaurants),
        party: { connect: party },
      },
    });
  }

};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
